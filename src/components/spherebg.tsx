import { useEffect, useRef } from "react";

interface SphereInstance {
  velocity: { x: number; y: number; z: number };
  rotationSpeed: { x: number; y: number };
  rotation: { x: number; y: number };
}

const SphereBg = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let animId: number;
    let destroyed = false;

    // Start fetching the module immediately (background parse)
    // but defer ALL WebGL work until after page is interactive
    const threePromise = import("three");

    const runWhenIdle = (cb: () => void) => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(cb, { timeout: 4000 });
      } else {
        setTimeout(cb, 1000);
      }
    };

    runWhenIdle(async () => {
      if (destroyed || !mountRef.current) return;

      const THREE = await threePromise;
      if (destroyed || !mountRef.current) return;

      const width    = mount.clientWidth;
      const height   = mount.clientHeight;
      const isMobile = width < 768;

      // ── Renderer ────────────────────────────────────────────────────
      // NO ACESFilmicToneMapping — triggers expensive shader compile on first render.
      // NO antialias — spheres are large blobs, zero visible difference.
      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      mount.appendChild(renderer.domElement);

      // ── Scene & Camera ──────────────────────────────────────────────
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        isMobile ? 80 : 60,
        width / height,
        0.1,
        200
      );
      camera.position.set(0, 0, isMobile ? 22 : 24);

      // ── Lighting ────────────────────────────────────────────────────
      // No PMREMGenerator / RoomEnvironment — that was the #1 blocking culprit.
      // Direct lights replicate the same warm/cool sheen at zero GPU-compile cost.
      scene.add(new THREE.AmbientLight(0xffffff, 1.2));
      const keyLight = new THREE.DirectionalLight(0xfff5e0, 4.0);
      keyLight.position.set(6, 8, 6);
      scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight(0xd0e8ff, 2.0);
      fillLight.position.set(-6, -4, 4);
      scene.add(fillLight);
      const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
      rimLight.position.set(0, -8, -6);
      scene.add(rimLight);

      // ── Sphere Config ───────────────────────────────────────────────
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

      const cfgs = baseConfigs.map((c) => ({
        ...c,
        r: c.r * rScale,
        x: c.x * xScale,
        y: c.y * yScale,
      }));

      const COUNT = cfgs.length;

      // ── InstancedMesh — 1 draw call ─────────────────────────────────
      const segs      = isMobile ? 20 : 28;
      const sharedGeo = new THREE.SphereGeometry(1, segs, segs);

      // MeshPhongMaterial compiles a much simpler shader than MeshStandardMaterial.
      // Visually: same glossy look, fraction of the GPU compile cost.
      const sharedMat = new THREE.MeshPhongMaterial({
        shininess: 120,
        specular: new THREE.Color(0xffffff),
      });

      const instanceMesh = new THREE.InstancedMesh(sharedGeo, sharedMat, COUNT);
      instanceMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      scene.add(instanceMesh);

      // ── Pre-allocate temporaries — zero per-frame heap allocs ────────
      const _m = new THREE.Matrix4();
      const _c = new THREE.Color();
      const _q = new THREE.Quaternion();
      const _s = new THREE.Vector3();
      const _p = new THREE.Vector3();
      const _e = new THREE.Euler();

      // ── Init instances ───────────────────────────────────────────────
      const positions: { x: number; y: number; z: number }[] = [];
      const radii: number[] = [];
      const instances: SphereInstance[] = [];

      for (let i = 0; i < COUNT; i++) {
        const cfg = cfgs[i];
        instanceMesh.setColorAt(i, _c.setHex(cfg.color));
        _s.setScalar(cfg.r);
        _m.compose(_p.set(cfg.x, cfg.y, cfg.z), _q.identity(), _s);
        instanceMesh.setMatrixAt(i, _m);

        positions.push({ x: cfg.x, y: cfg.y, z: cfg.z });
        radii.push(cfg.r);
        instances.push({
          velocity:      { x: (Math.random() - 0.5) * 0.006, y: (Math.random() - 0.5) * 0.006, z: (Math.random() - 0.5) * 0.002 },
          rotationSpeed: { x: (Math.random() - 0.5) * 0.003, y: (Math.random() - 0.5) * 0.003 },
          rotation:      { x: 0, y: 0 },
        });
      }

      if (instanceMesh.instanceColor) instanceMesh.instanceColor.needsUpdate = true;
      instanceMesh.instanceMatrix.needsUpdate = true;

      // ── Bounds ───────────────────────────────────────────────────────
      const BX = isMobile ?  8.0 : 22.0;
      const BY = isMobile ? 20.0 : 13.0;
      const BZ = 1.5;

      // ── Separation — pure math, no Three.js object calls ─────────────
      const separate = () => {
        for (let i = 0; i < COUNT; i++) {
          for (let j = i + 1; j < COUNT; j++) {
            const pi = positions[i], pj = positions[j];
            const dx = pj.x - pi.x, dy = pj.y - pi.y, dz = pj.z - pi.z;
            const dist2 = dx*dx + dy*dy + dz*dz;
            const minD  = radii[i] + radii[j] + 1.2;
            if (dist2 < minD * minD && dist2 > 0.000001) {
              const dist = Math.sqrt(dist2);
              const inv  = 1 / dist;
              const push = (minD - dist) * 0.5;
              const nx = dx*inv, ny = dy*inv, nz = dz*inv;

              pi.x -= nx*push; pi.y -= ny*push; pi.z -= nz*push;
              pj.x += nx*push; pj.y += ny*push; pj.z += nz*push;

              const vi = instances[i].velocity, vj = instances[j].velocity;
              const dotI = vi.x*nx + vi.y*ny + vi.z*nz;
              const dotJ = vj.x*nx + vj.y*ny + vj.z*nz;
              vi.x = (vi.x - 2*dotI*nx) * 0.7;
              vi.y = (vi.y - 2*dotI*ny) * 0.7;
              vi.z = (vi.z - 2*dotI*nz) * 0.7;
              vj.x = (vj.x - 2*dotJ*nx) * 0.7;
              vj.y = (vj.y - 2*dotJ*ny) * 0.7;
              vj.z = (vj.z - 2*dotJ*nz) * 0.7;
            }
          }
        }
      };

      // ── Mouse parallax ───────────────────────────────────────────────
      let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth  - 0.5) * 0.8;
        targetY = -(e.clientY / window.innerHeight - 0.5) * 0.6;
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // ── Resize ───────────────────────────────────────────────────────
      const ro = new ResizeObserver((entries) => {
        const { width: w, height: h } = entries[0].contentRect;
        camera.aspect = w / h;
        camera.fov    = w < 768 ? 80 : 60;
        camera.position.z = w < 768 ? 22 : 24;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
      ro.observe(mount);

      // ── Visibility ───────────────────────────────────────────────────
      let paused = false;
      const handleVis = () => { paused = document.visibilityState !== "visible"; };
      document.addEventListener("visibilitychange", handleVis);

      // ── Tick — zero allocations ──────────────────────────────────────
      const tick = () => {
        animId = requestAnimationFrame(tick);
        if (paused) return;

        for (let i = 0; i < COUNT; i++) {
          const pos  = positions[i];
          const inst = instances[i];
          const vel  = inst.velocity;

          pos.x += vel.x; pos.y += vel.y; pos.z += vel.z;

          if      (pos.x >  BX) { pos.x =  BX; vel.x = -Math.abs(vel.x); }
          else if (pos.x < -BX) { pos.x = -BX; vel.x =  Math.abs(vel.x); }
          if      (pos.y >  BY) { pos.y =  BY; vel.y = -Math.abs(vel.y); }
          else if (pos.y < -BY) { pos.y = -BY; vel.y =  Math.abs(vel.y); }
          if      (pos.z >  BZ) { pos.z =  BZ; vel.z = -Math.abs(vel.z); }
          else if (pos.z < -BZ) { pos.z = -BZ; vel.z =  Math.abs(vel.z); }

          inst.rotation.x += inst.rotationSpeed.x;
          inst.rotation.y += inst.rotationSpeed.y;
          _e.set(inst.rotation.x, inst.rotation.y, 0);
          _q.setFromEuler(_e);
          _s.setScalar(radii[i]);
          _p.set(pos.x, pos.y, pos.z);
          _m.compose(_p, _q, _s);
          instanceMesh.setMatrixAt(i, _m);
        }

        instanceMesh.instanceMatrix.needsUpdate = true;
        separate();

        currentX += (targetX - currentX) * 0.04;
        currentY += (targetY - currentY) * 0.04;
        camera.position.x = currentX;
        camera.position.y = currentY;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      tick();

      // ── Cleanup ──────────────────────────────────────────────────────
      const doCleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("visibilitychange", handleVis);
        ro.disconnect();
        sharedGeo.dispose();
        sharedMat.dispose();
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };

      if (destroyed) { doCleanup(); return; }
      (mount as any).__sphereCleanup = doCleanup;
    });

    return () => {
      destroyed = true;
      const fn = (mount as any).__sphereCleanup;
      if (fn) fn();
      else cancelAnimationFrame(animId);
    };
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