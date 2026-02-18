import { useEffect, useRef } from "react";
import type { BufferGeometry } from "three";
import type { MeshStandardMaterial as MeshStandardMaterialType } from "three";

interface Sphere {
  mesh: any;
  velocity: any;
  rotationSpeed: any;
}

const SphereBg = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let animId: number;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      if (!mountRef.current) return;

      const width = mount.clientWidth;
      const height = mount.clientHeight;
      const isMobile = width < 768;

      // ─── Renderer (lighter) ─────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        antialias: false, // antialias off = faster
        alpha: true,
        powerPreference: "high-performance",
      });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.3));
      renderer.shadowMap.enabled = false;

      mount.appendChild(renderer.domElement);

      // ─── Scene & Camera ────────────────────────────────
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        isMobile ? 75 : 60,
        width / height,
        0.1,
        200
      );

      camera.position.set(0, 0, isMobile ? 20 : 24);

      // ─── Simple Lighting (cheap + effective) ───────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.9));

      const directional = new THREE.DirectionalLight(0xffffff, 1.2);
      directional.position.set(5, 8, 5);
      scene.add(directional);

      // ─── Sphere Config ─────────────────────────────────
      const baseConfigs = [
        { r: 2.2, color: 0xff6b6b, x: -18, y: 6, z: 0 },
        { r: 1.8, color: 0xa78bfa, x: -14, y: -3, z: 0 },
        { r: 1.5, color: 0x60a5fa, x: -10, y: 3, z: 0 },
        { r: 2.4, color: 0x6bceff, x: 18, y: -4, z: 0 },
        { r: 1.6, color: 0xfbbf24, x: 14, y: 5, z: 0 },
        { r: 1.4, color: 0x6bffb8, x: 10, y: -2, z: 0 },
      ];

      const configs = isMobile ? baseConfigs.slice(0, 4) : baseConfigs;

      // ─── Create Spheres (lower poly) ───────────────────
      const spheres: Sphere[] = configs.map((cfg) => {
        const geo = new THREE.SphereGeometry(cfg.r, 24, 24);
        const mat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          roughness: 0.3,
          metalness: 0.6,
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(cfg.x, cfg.y, cfg.z);
        scene.add(mesh);

        return {
          mesh,
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.004,
            (Math.random() - 0.5) * 0.004,
            0
          ),
          rotationSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.002,
            (Math.random() - 0.5) * 0.002,
            0
          ),
        };
      });

      const BOUNDS = {
        x: isMobile ? 8 : 20,
        y: isMobile ? 16 : 12,
      };

      // ─── Mouse Parallax (lighter math) ─────────────────
      const target = new THREE.Vector2(0, 0);
      const current = new THREE.Vector2(0, 0);

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 1.2;
        const y = (e.clientY / window.innerHeight - 0.5) * 1.2;
        target.set(x, -y);
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // ─── Resize ────────────────────────────────────────
      const resizeObserver = new ResizeObserver((entries) => {
        const { width: w, height: h } = entries[0].contentRect;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });

      resizeObserver.observe(mount);

      // ─── Animation Loop ────────────────────────────────
      const animate = () => {
        animId = requestAnimationFrame(animate);

        spheres.forEach(({ mesh, velocity, rotationSpeed }) => {
          mesh.position.add(velocity);

          if (mesh.position.x > BOUNDS.x || mesh.position.x < -BOUNDS.x)
            velocity.x *= -1;

          if (mesh.position.y > BOUNDS.y || mesh.position.y < -BOUNDS.y)
            velocity.y *= -1;

          mesh.rotation.x += rotationSpeed.x;
          mesh.rotation.y += rotationSpeed.y;
        });

        current.lerp(target, 0.05);
        camera.position.x = current.x;
        camera.position.y = current.y;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      // ─── Cleanup ───────────────────────────────────────
      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", handleMouseMove);
        resizeObserver.disconnect();

        spheres.forEach(({ mesh }) => {
          (mesh.geometry as BufferGeometry).dispose();
          (mesh.material as MeshStandardMaterialType).dispose();
        });

        renderer.dispose();

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
