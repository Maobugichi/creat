import { useEffect, useRef } from "react";
import type { BufferGeometry } from "three";
import type { MeshStandardMaterial as MeshStandardMaterialType } from "three";

interface Sphere {
  mesh: any; // will be Mesh after Three.js loads
  velocity: any; // will be Vector3
  rotationSpeed: any; // will be Vector3
}

const SphereBg = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let animId: number;
    let cleanup: (() => void) | undefined;

    // ✅ Dynamic import — Three.js only loads when component mounts
    import("three").then(async (THREE) => {
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");

      if (!mountRef.current) return; // component unmounted during import

      const width = mount.clientWidth;
      const height = mount.clientHeight;

      // ─── Renderer ────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      mount.appendChild(renderer.domElement);

      // ─── Scene & Camera ─────────────────────────────────────────
      const scene = new THREE.Scene();
      const isMobile = width < 768;

      const fov = isMobile ? 80 : 60;
      const camZ = isMobile ? 22 : 24;

      const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 200);
      camera.position.set(0, 0, camZ);

      // ─── Environment ────────────────────────────────────────────
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const envRT = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
      scene.environment = envRT.texture;

      // ─── Lights ─────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));

      const keyLight = new THREE.DirectionalLight(0xfff5e0, 3.5);
      keyLight.position.set(6, 8, 6);
      keyLight.castShadow = true;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xe0f0ff, 1.5);
      fillLight.position.set(-6, -4, 4);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
      rimLight.position.set(0, -8, -6);
      scene.add(rimLight);

      // ─── Sphere Configuration ────────────────────────────────────
      const baseConfigs = [
        // ── LEFT EDGE STRIP (x: -22 to -10) ──────────────────────
        { r: 2.2, color: 0xff6b6b, roughness: 0.05, metalness: 0.90, x: -20.0, y:  7.0, z:  0.5 },
        { r: 1.8, color: 0xa78bfa, roughness: 0.06, metalness: 0.90, x: -18.0, y: -2.0, z: -0.5 },
        { r: 1.4, color: 0x60a5fa, roughness: 0.06, metalness: 0.90, x: -15.0, y:  3.0, z:  1.0 },
        { r: 2.0, color: 0xf472b6, roughness: 0.05, metalness: 0.92, x: -13.0, y: -8.0, z:  0.0 },
        // ── RIGHT EDGE STRIP (x: +10 to +22) ─────────────────────
        { r: 2.6, color: 0x6bceff, roughness: 0.05, metalness: 0.95, x:  20.0, y: -4.0, z: -1.0 },
        { r: 1.5, color: 0xfbbf24, roughness: 0.05, metalness: 0.93, x:  17.0, y:  6.0, z:  0.5 },
        { r: 1.2, color: 0x6bffb8, roughness: 0.04, metalness: 0.95, x:  14.0, y: -1.0, z:  1.0 },
        { r: 1.8, color: 0xff9f6b, roughness: 0.07, metalness: 0.88, x:  12.0, y:  9.0, z: -0.5 },
        // ── TOP/BOTTOM SLIVERS ────────────────────────────────────
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

      // ─── Create Spheres ──────────────────────────────────────────
      const spheres: Sphere[] = sphereConfigs.map((cfg) => {
        const geo = new THREE.SphereGeometry(cfg.r, 64, 64);
        const mat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          roughness: cfg.roughness,
          metalness: cfg.metalness,
          envMapIntensity: 2.5,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(cfg.x, cfg.y, cfg.z);
        mesh.castShadow = true;
        scene.add(mesh);

        return {
          mesh,
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
        };
      });

      // ─── Bounds ──────────────────────────────────────────────────
      const BOUNDS = {
        x: isMobile ?  8.0 : 22.0,
        y: isMobile ? 20.0 : 13.0,
        z: 1.5,
      };

      const _diff = new THREE.Vector3();

      const separateSpheres = () => {
        for (let i = 0; i < spheres.length; i++) {
          for (let j = i + 1; j < spheres.length; j++) {
            const a = spheres[i];
            const b = spheres[j];
            const minDist = sphereConfigs[i].r + sphereConfigs[j].r + 1.2;

            _diff.subVectors(b.mesh.position, a.mesh.position);
            const dist = _diff.length();

            if (dist < minDist && dist > 0.001) {
              const push = _diff.normalize().multiplyScalar((minDist - dist) * 0.5);
              a.mesh.position.sub(push);
              b.mesh.position.add(push);

              const axis = _diff.normalize();
              a.velocity.reflect(axis).multiplyScalar(0.7);
              b.velocity.reflect(axis).multiplyScalar(0.7);
            }
          }
        }
      };

      // ─── Mouse parallax ─────────────────────────────────────────
      const targetCameraOffset  = new THREE.Vector2(0, 0);
      const currentCameraOffset = new THREE.Vector2(0, 0);

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth  - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        targetCameraOffset.set(x * 0.4, -y * 0.3);
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // ─── Resize ─────────────────────────────────────────────────
      const resizeObserver = new ResizeObserver((entries) => {
        const { width: w, height: h } = entries[0].contentRect;
        const mobile = w < 768;

        camera.fov = mobile ? 80 : 60;
        camera.position.z = mobile ? 22 : 24;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
      resizeObserver.observe(mount);

      // ─── Visibility — pause when tab is hidden ───────────────────
      let isVisible = true;
      const handleVisibility = () => {
        isVisible = document.visibilityState === "visible";
      };
      document.addEventListener("visibilitychange", handleVisibility);

      // ─── Animation loop ──────────────────────────────────────────
      const axes = ["x", "y", "z"] as const;

      const animate = () => {
        if (!isVisible) {
          animId = requestAnimationFrame(animate);
          return;
        }

        animId = requestAnimationFrame(animate);

        spheres.forEach(({ mesh, velocity, rotationSpeed }) => {
          mesh.position.add(velocity);

          for (let k = 0; k < axes.length; k++) {
            const axis = axes[k];
            const bound = BOUNDS[axis];
            if (mesh.position[axis] > bound) {
              mesh.position[axis] = bound;
              velocity[axis] = -Math.abs(velocity[axis]);
            } else if (mesh.position[axis] < -bound) {
              mesh.position[axis] = -bound;
              velocity[axis] =  Math.abs(velocity[axis]);
            }
          }

          mesh.rotation.x += rotationSpeed.x;
          mesh.rotation.y += rotationSpeed.y;
        });

        separateSpheres();

        currentCameraOffset.lerp(targetCameraOffset, 0.04);
        camera.position.x = currentCameraOffset.x;
        camera.position.y = currentCameraOffset.y;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      // ─── Cleanup ─────────────────────────────────────────────────
      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("visibilitychange", handleVisibility);
        resizeObserver.disconnect();

        spheres.forEach(({ mesh }) => {
          (mesh.geometry as BufferGeometry).dispose();
          (mesh.material as MeshStandardMaterialType).dispose();
        });

        renderer.dispose();
        pmremGenerator.dispose();
        envRT.dispose();

        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
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