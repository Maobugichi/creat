import { useEffect, useRef } from "react";

interface SphereInstance {
  index: number;
  velocity: any;
  rotationSpeed: any;
  rotation: { x: number; y: number };
}

const SphereBg = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let animId: number;
    let cleanup: (() => void) | undefined;

    // ── Step 1: kick off the dynamic import immediately (non-blocking)
    // but defer the actual WebGL init + shader compile to idle time.
    // Splitting import from init means the JS is parsed in the background
    // while the page loads, and only the GPU-heavy work is deferred.
    const threePromise = import("three");
    const envPromise   = import("three/addons/environments/RoomEnvironment.js");

    const scheduleInit = (cb: () => void) => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(cb, { timeout: 3000 });
      } else {
        setTimeout(cb, 500);
      }
    };

    scheduleInit(async () => {
      const [THREE, { RoomEnvironment }] = await Promise.all([threePromise, envPromise]);

      if (!mountRef.current) return;

      const width    = mount.clientWidth;
      const height   = mount.clientHeight;
      const isMobile = width < 768;

      // ─── Renderer ──────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
        // Avoid depth buffer precision issues at no quality cost
        logarithmicDepthBuffer: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      mount.appendChild(renderer.domElement);

      // ─── Scene & Camera ────────────────────────────────────────────
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        isMobile ? 80 : 60,
        width / height,
        0.1,
        200
      );
      camera.position.set(0, 0, isMobile ? 22 : 24);

      // ─── Environment ───────────────────────────────────────────────
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const envRT = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
      scene.environment = envRT.texture;
      // Free the generator immediately — we only needed it for setup
      pmremGenerator.dispose();

      // ─── Lights ────────────────────────────────────────────────────
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

      // ─── Sphere Config ─────────────────────────────────────────────
      const baseConfigs = [
        { r: 2.2, color: 0xff6b6b, x: -20.0, y:  7.0, z:  0.5 },
        { r: 1.8, color: 0xa78bfa, x: -18.0, y: -2.0, z: -0.5 },
        { r: 1.4, color: 0x60a5fa, x: -15.0, y:  3.0, z:  1.0 },
        { r: 2.0, color: 0xf472b6, x: -13.0, y: -8.0, z:  0.0 },
        { r: 2.6, color: 0x6bceff, x:  20.0, y: -4.0, z: -1.0 },
        { r: 1.5, color: 0xfbbf24, x:  17.0, y:  6.0, z:  0.5 },
        { r: 1.2, color: 0x6bffb8, x:  14.0, y: -1.0, z:  1.0 },
        { r: 1.8, color: 0xff9f6b, x:  12.0, y:  9.0, z: -0.5 },
        { r: 1.3, color: 0xffd56b, x:  -5.0, y: 12.0, z:  0.5 },
        { r: 1.6, color: 0xc084fc, x:   5.0, y:-12.0, z:  0.0 },
      ];

      const rScale = isMobile ? 1.2  : 1.0;
      const xScale = isMobile ? 0.35 : 1.0;
      const yScale = isMobile ? 1.40 : 1.0;

      const sphereConfigs = baseConfigs.map((cfg) => ({
        ...cfg,
        r: cfg.r * rScale,
        x: cfg.x * xScale,
        y: cfg.y * yScale,
      }));

      const COUNT = sphereConfigs.length;

      // ─── InstancedMesh — 1 draw call for all spheres ───────────────
      const segs      = isMobile ? 20 : 28; // reduced further; still smooth
      const sharedGeo = new THREE.SphereGeometry(1, segs, segs);
      const sharedMat = new THREE.MeshStandardMaterial({
        roughness: 0.06,
        metalness: 0.92,
        envMapIntensity: 2.5,
      });

      const instancedMesh = new THREE.InstancedMesh(sharedGeo, sharedMat, COUNT);
      instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      scene.add(instancedMesh);

      // ── Pre-allocate ALL temporaries outside any loop ──────────────
      // This is the critical fix — new THREE.Euler() inside animate() was
      // creating a GC-able object 10× per frame = ~600 allocs/sec at 60fps.
      const _matrix = new THREE.Matrix4();
      const _color  = new THREE.Color();
      const _quat   = new THREE.Quaternion();
      const _scale  = new THREE.Vector3();
      const _pos    = new THREE.Vector3();
      const _diff   = new THREE.Vector3();
      const _euler  = new THREE.Euler(); // ← reused, never re-created

      // ─── Per-instance state ────────────────────────────────────────
      const instances: SphereInstance[] = sphereConfigs.map((cfg, i) => {
        instancedMesh.setColorAt(i, _color.setHex(cfg.color));
        _scale.setScalar(cfg.r);
        _matrix.compose(_pos.set(cfg.x, cfg.y, cfg.z), _quat.identity(), _scale);
        instancedMesh.setMatrixAt(i, _matrix);

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

      if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;
      instancedMesh.instanceMatrix.needsUpdate = true;

      // Track positions outside matrices to avoid costly decompose() calls
      const positions = sphereConfigs.map((cfg) => new THREE.Vector3(cfg.x, cfg.y, cfg.z));
      const radii     = sphereConfigs.map((cfg) => cfg.r);

      // ─── Bounds ────────────────────────────────────────────────────
      const BX = isMobile ?  8.0 : 22.0;
      const BY = isMobile ? 20.0 : 13.0;
      const BZ = 1.5;

      // ─── Sphere separation ─────────────────────────────────────────
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
              // re-normalize after sub for reflect axis
              _diff.normalize();
              instances[i].velocity.reflect(_diff).multiplyScalar(0.7);
              instances[j].velocity.reflect(_diff).multiplyScalar(0.7);
            }
          }
        }
      };

      // ─── Mouse parallax ────────────────────────────────────────────
      const targetOffset  = new THREE.Vector2(0, 0);
      const currentOffset = new THREE.Vector2(0, 0);

      const handleMouseMove = (e: MouseEvent) => {
        targetOffset.set(
          (e.clientX / window.innerWidth  - 0.5) * 0.8,
          -(e.clientY / window.innerHeight - 0.5) * 0.6
        );
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // ─── Resize ────────────────────────────────────────────────────
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

      // ─── Visibility — hard-stop RAF when hidden ────────────────────
      let isVisible = document.visibilityState === "visible";
      const handleVisibility = () => {
        isVisible = document.visibilityState === "visible";
        if (isVisible) tick(); // resume immediately on return
      };
      document.addEventListener("visibilitychange", handleVisibility);

      // ─── Animation loop — zero allocations ────────────────────────
      const tick = () => {
        animId = requestAnimationFrame(tick);

        for (let i = 0; i < COUNT; i++) {
          const inst = instances[i];
          const pos  = positions[i];
          const vel  = inst.velocity;

          // Move
          pos.x += vel.x;
          pos.y += vel.y;
          pos.z += vel.z;

          // Bounce — inlined axes loop to avoid array indexing overhead
          if      (pos.x >  BX) { pos.x =  BX; vel.x = -Math.abs(vel.x); }
          else if (pos.x < -BX) { pos.x = -BX; vel.x =  Math.abs(vel.x); }
          if      (pos.y >  BY) { pos.y =  BY; vel.y = -Math.abs(vel.y); }
          else if (pos.y < -BY) { pos.y = -BY; vel.y =  Math.abs(vel.y); }
          if      (pos.z >  BZ) { pos.z =  BZ; vel.z = -Math.abs(vel.z); }
          else if (pos.z < -BZ) { pos.z = -BZ; vel.z =  Math.abs(vel.z); }

          // Rotate — mutate the pre-allocated Euler, never new it
          inst.rotation.x += inst.rotationSpeed.x;
          inst.rotation.y += inst.rotationSpeed.y;
          _euler.set(inst.rotation.x, inst.rotation.y, 0);
          _quat.setFromEuler(_euler);

          _scale.setScalar(radii[i]);
          _matrix.compose(pos, _quat, _scale);
          instancedMesh.setMatrixAt(i, _matrix);
        }

        instancedMesh.instanceMatrix.needsUpdate = true;

        separateSpheres();

        currentOffset.lerp(targetOffset, 0.04);
        camera.position.x = currentOffset.x;
        camera.position.y = currentOffset.y;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      // Only run when visible
      if (isVisible) tick();

      // ─── Cleanup ───────────────────────────────────────────────────
      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("visibilitychange", handleVisibility);
        resizeObserver.disconnect();
        sharedGeo.dispose();
        sharedMat.dispose();
        envRT.dispose();
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
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