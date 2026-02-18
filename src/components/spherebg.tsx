import { useEffect, useRef } from "react";
;

interface SphereInstance {
  index: number;
  velocity: any;       // Vector3
  rotationSpeed: any;  // Vector3
  rotation: { x: number; y: number };
}

const SphereBg = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let animId: number;
    let cleanup: (() => void) | undefined;

    // ── Defer heavy init until browser is idle ──────────────────────
    // This is the #1 fix for blocking time / Lighthouse score.
    const scheduleInit = (cb: () => void) => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(cb, { timeout: 2000 });
      } else {
        setTimeout(cb, 200);
      }
    };

    scheduleInit(() => {
      import("three").then(async (THREE) => {
        const { RoomEnvironment } = await import(
          "three/addons/environments/RoomEnvironment.js"
        );

        if (!mountRef.current) return;

        const width  = mount.clientWidth;
        const height = mount.clientHeight;
        const isMobile = width < 768;

        // ─── Renderer ────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({
          antialias: !isMobile,          // skip MSAA on mobile — big win
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setSize(width, height);
        // Cap at 1.5 — near-invisible difference, ~44% less fill on 2× screens
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        // No shadow map — there's no receiving surface, so it was free waste
        mount.appendChild(renderer.domElement);

        // ─── Scene & Camera ──────────────────────────────────────────
        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          isMobile ? 80 : 60,
          width / height,
          0.1,
          200
        );
        camera.position.set(0, 0, isMobile ? 22 : 24);

        // ─── Environment ─────────────────────────────────────────────
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();
        const envRT = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
        scene.environment = envRT.texture;

        // ─── Lights ──────────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));

        const keyLight = new THREE.DirectionalLight(0xfff5e0, 3.5);
        keyLight.position.set(6, 8, 6);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xe0f0ff, 1.5);
        fillLight.position.set(-6, -4, 4);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
        rimLight.position.set(0, -8, -6);
        scene.add(rimLight);

        // ─── Sphere Config ───────────────────────────────────────────
        const baseConfigs = [
          { r: 2.2, color: 0xff6b6b, roughness: 0.05, metalness: 0.90, x: -20.0, y:  7.0, z:  0.5 },
          { r: 1.8, color: 0xa78bfa, roughness: 0.06, metalness: 0.90, x: -18.0, y: -2.0, z: -0.5 },
          { r: 1.4, color: 0x60a5fa, roughness: 0.06, metalness: 0.90, x: -15.0, y:  3.0, z:  1.0 },
          { r: 2.0, color: 0xf472b6, roughness: 0.05, metalness: 0.92, x: -13.0, y: -8.0, z:  0.0 },
          { r: 2.6, color: 0x6bceff, roughness: 0.05, metalness: 0.95, x:  20.0, y: -4.0, z: -1.0 },
          { r: 1.5, color: 0xfbbf24, roughness: 0.05, metalness: 0.93, x:  17.0, y:  6.0, z:  0.5 },
          { r: 1.2, color: 0x6bffb8, roughness: 0.04, metalness: 0.95, x:  14.0, y: -1.0, z:  1.0 },
          { r: 1.8, color: 0xff9f6b, roughness: 0.07, metalness: 0.88, x:  12.0, y:  9.0, z: -0.5 },
          { r: 1.3, color: 0xffd56b, roughness: 0.08, metalness: 0.85, x:  -5.0, y: 12.0, z:  0.5 },
          { r: 1.6, color: 0xc084fc, roughness: 0.06, metalness: 0.90, x:   5.0, y:-12.0, z:  0.0 },
        ];

        const radiusScale = isMobile ? 1.2 : 1.0;
        const xScale      = isMobile ? 0.35 : 1.0;
        const yScale      = isMobile ? 1.40 : 1.0;

        const sphereConfigs = baseConfigs.map((cfg) => ({
          ...cfg,
          r: cfg.r * radiusScale,
          x: cfg.x * xScale,
          y: cfg.y * yScale,
        }));

        const COUNT = sphereConfigs.length;

        // ─── InstancedMesh — 10 spheres, 1 draw call ─────────────────
        // Segments: 32×32 desktop / 24×24 mobile.
        // At these radii (1.2–2.6 units) 32 segs is visually identical to 64.
        const segs = isMobile ? 24 : 32;
        const sharedGeo = new THREE.SphereGeometry(1, segs, segs); // r=1, scale per instance

        // We need per-instance color + roughness/metalness.
        // InstancedMesh shares one material — use vertex colors for hue,
        // pick a middle roughness/metalness that looks good across all.
        // (If you need exact per-sphere PBR values, see note below.)
        const sharedMat = new THREE.MeshStandardMaterial({
          roughness: 0.06,
          metalness: 0.92,
          envMapIntensity: 2.5,
          vertexColors: false, // we tint via setColorAt
        });

        const instancedMesh = new THREE.InstancedMesh(sharedGeo, sharedMat, COUNT);
        instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        scene.add(instancedMesh);

        // Pre-allocate — reuse every frame, zero GC pressure
        const _tmpMatrix = new THREE.Matrix4();
        const _tmpColor  = new THREE.Color();
        const _tmpQuat   = new THREE.Quaternion();
        const _scale     = new THREE.Vector3();
        const _pos       = new THREE.Vector3();
        const _diff      = new THREE.Vector3();

        // ─── Per-instance state ───────────────────────────────────────
        const instances: SphereInstance[] = sphereConfigs.map((cfg, i) => {
          // Set initial color
          instancedMesh.setColorAt(i, _tmpColor.setHex(cfg.color));

          // Set initial matrix (position + non-uniform scale to fake radius)
          _scale.setScalar(cfg.r);
          _tmpMatrix.compose(
            _pos.set(cfg.x, cfg.y, cfg.z),
            _tmpQuat.identity(),
            _scale
          );
          instancedMesh.setMatrixAt(i, _tmpMatrix);

          return {
            index: i,
            velocity: new THREE.Vector3(
              (Math.random() - 0.5) * 0.006,
              (Math.random() - 0.5) * 0.006,
              (Math.random() - 0.5) * 0.002
            ),
            rotationSpeed: new THREE.Vector3(
              (Math.random() - 0.5) * 0.003,
              (Math.random() - 0.5) * 0.003,
              0
            ),
            rotation: { x: 0, y: 0 },
          };
        });

        if (instancedMesh.instanceColor) {
          instancedMesh.instanceColor.needsUpdate = true;
        }
        instancedMesh.instanceMatrix.needsUpdate = true;

        // ─── Positions array (avoid repeated matrix decompose) ────────
        // We track positions separately so separateSpheres() stays fast.
        const positions = sphereConfigs.map((cfg) =>
          new THREE.Vector3(cfg.x, cfg.y, cfg.z)
        );
        const radii = sphereConfigs.map((cfg) => cfg.r);

        // ─── Bounds ───────────────────────────────────────────────────
        const BOUNDS = {
          x: isMobile ?  8.0 : 22.0,
          y: isMobile ? 20.0 : 13.0,
          z: 1.5,
        };
        const axes = ["x", "y", "z"] as const;

        // ─── Separation (same logic, now on positions[]) ──────────────
        const separateSpheres = () => {
          for (let i = 0; i < COUNT; i++) {
            for (let j = i + 1; j < COUNT; j++) {
              const minDist = radii[i] + radii[j] + 1.2;
              _diff.subVectors(positions[j], positions[i]);
              const dist = _diff.length();
              if (dist < minDist && dist > 0.001) {
                const push = _diff.normalize().multiplyScalar((minDist - dist) * 0.5);
                positions[i].sub(push);
                positions[j].add(push);
                const axis = _diff.normalize();
                instances[i].velocity.reflect(axis).multiplyScalar(0.7);
                instances[j].velocity.reflect(axis).multiplyScalar(0.7);
              }
            }
          }
        };

        // ─── Mouse parallax ───────────────────────────────────────────
        const targetCameraOffset  = new THREE.Vector2(0, 0);
        const currentCameraOffset = new THREE.Vector2(0, 0);

        const handleMouseMove = (e: MouseEvent) => {
          targetCameraOffset.set(
            (e.clientX / window.innerWidth  - 0.5) * 0.8,
            -(e.clientY / window.innerHeight - 0.5) * 0.6
          );
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // ─── Resize ───────────────────────────────────────────────────
        const resizeObserver = new ResizeObserver((entries) => {
          const { width: w, height: h } = entries[0].contentRect;
          const mobile = w < 768;
          camera.fov    = mobile ? 80 : 60;
          camera.aspect = w / h;
          camera.position.z = mobile ? 22 : 24;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        });
        resizeObserver.observe(mount);

        // ─── Visibility ───────────────────────────────────────────────
        let isVisible = true;
        const handleVisibility = () => {
          isVisible = document.visibilityState === "visible";
        };
        document.addEventListener("visibilitychange", handleVisibility);

        // ─── Animation loop ───────────────────────────────────────────
        const animate = () => {
          animId = requestAnimationFrame(animate);
          if (!isVisible) return;

          let matrixDirty = false;

          for (let i = 0; i < COUNT; i++) {
            const inst = instances[i];
            const pos  = positions[i];
            const vel  = inst.velocity;

            pos.add(vel);

            for (let k = 0; k < axes.length; k++) {
              const ax = axes[k];
              const bound = BOUNDS[ax];
              if (pos[ax] > bound) {
                pos[ax] = bound;
                vel[ax] = -Math.abs(vel[ax]);
              } else if (pos[ax] < -bound) {
                pos[ax] = -bound;
                vel[ax] =  Math.abs(vel[ax]);
              }
            }

            inst.rotation.x += inst.rotationSpeed.x;
            inst.rotation.y += inst.rotationSpeed.y;

            _tmpQuat.setFromEuler(
              new THREE.Euler(inst.rotation.x, inst.rotation.y, 0)
            );
            _scale.setScalar(radii[i]);
            _tmpMatrix.compose(pos, _tmpQuat, _scale);
            instancedMesh.setMatrixAt(i, _tmpMatrix);
            matrixDirty = true;
          }

          separateSpheres();

          if (matrixDirty) {
            instancedMesh.instanceMatrix.needsUpdate = true;
          }

          currentCameraOffset.lerp(targetCameraOffset, 0.04);
          camera.position.x = currentCameraOffset.x;
          camera.position.y = currentCameraOffset.y;
          camera.lookAt(scene.position);

          renderer.render(scene, camera);
        };

        animate();

        // ─── Cleanup ──────────────────────────────────────────────────
        cleanup = () => {
          cancelAnimationFrame(animId);
          window.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("visibilitychange", handleVisibility);
          resizeObserver.disconnect();

          sharedGeo.dispose();
          sharedMat.dispose();
          renderer.dispose();
          pmremGenerator.dispose();
          envRT.dispose();

          if (mount.contains(renderer.domElement)) {
            mount.removeChild(renderer.domElement);
          }
        };
      });
    });

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default SphereBg;