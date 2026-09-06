import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.min.js';

const mount = document.querySelector('[data-home-signal]');

if (mount) {
  const interactionSurface = mount.parentElement.querySelector('.studio-intro__title');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 20);
  camera.position.set(0, 0.12, 4.9);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  mount.appendChild(renderer.domElement);

  const geometry = new THREE.PlaneGeometry(4.5, 2.75, 31, 20);
  const basePositions = Float32Array.from(geometry.attributes.position.array);
  const targets = new Float32Array(basePositions.length);
  const centres = [
    [-1.2, 0.42, 0.1],
    [0.12, -0.48, -0.12],
    [1.24, 0.38, 0.18],
  ];

  for (let index = 0; index < geometry.attributes.position.count; index += 1) {
    const offset = index * 3;
    const cluster = index % centres.length;
    const seed = Math.sin((index + 1) * 91.913) * 43758.5453;
    const seedB = Math.sin((index + 7) * 47.227) * 23817.131;
    const radius = 0.16 + ((seed - Math.floor(seed)) * 0.78);
    const angle = (seedB - Math.floor(seedB)) * Math.PI * 2;
    targets[offset] = centres[cluster][0] + (Math.cos(angle) * radius);
    targets[offset + 1] = centres[cluster][1] + (Math.sin(angle) * radius * 0.7);
    targets[offset + 2] = centres[cluster][2] + (Math.sin(angle * 1.7) * radius * 0.48);
  }

  const meshMaterial = new THREE.MeshBasicMaterial({
    color: 0x5799e5,
    wireframe: true,
    transparent: true,
    opacity: 0.23,
  });
  const pointMaterial = new THREE.PointsMaterial({
    color: 0xf3f0e8,
    size: 0.03,
    transparent: true,
    opacity: 0.52,
    sizeAttenuation: true,
  });
  const mesh = new THREE.Mesh(geometry, meshMaterial);
  const points = new THREE.Points(geometry, pointMaterial);
  const group = new THREE.Group();
  group.add(mesh, points);
  group.rotation.x = -0.34;
  group.rotation.z = -0.12;
  group.scale.set(1.22, 1.22, 1.22);
  scene.add(group);

  const pointer = new THREE.Vector2();
  let active = true;
  let frame = 0;

  const smoothstep = (value) => {
    const clamped = Math.max(0, Math.min(1, value));
    return clamped * clamped * (3 - (2 * clamped));
  };

  const updateSurface = (time) => {
    const motionTime = reducedMotion.matches ? 4800 : time;
    const rawMorph = (Math.sin((motionTime * 0.00034) - 1.2) + 1) * 0.5;
    const morph = smoothstep(rawMorph);
    const positions = geometry.attributes.position;

    for (let index = 0; index < positions.count; index += 1) {
      const offset = index * 3;
      const x = THREE.MathUtils.lerp(basePositions[offset], targets[offset], morph);
      const y = THREE.MathUtils.lerp(basePositions[offset + 1], targets[offset + 1], morph);
      const wave = Math.sin((basePositions[offset] * 2.2) + (motionTime * 0.00045)) * 0.09 * (1 - morph);
      const z = THREE.MathUtils.lerp(wave, targets[offset + 2], morph);
      positions.setXYZ(index, x, y, z);
    }

    positions.needsUpdate = true;
    meshMaterial.opacity = THREE.MathUtils.lerp(0.23, 0.035, morph);
    pointMaterial.opacity = THREE.MathUtils.lerp(0.48, 0.78, morph);
    pointMaterial.color.setHex(morph > 0.55 ? 0x83b9f4 : 0xf3f0e8);
  };

  const resize = () => {
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const render = (time = 0) => {
    updateSurface(time);
    const targetX = reducedMotion.matches ? -0.34 : -0.34 + (pointer.y * 0.08);
    const targetY = reducedMotion.matches ? 0 : pointer.x * 0.12;
    group.rotation.x += (targetX - group.rotation.x) * 0.025;
    group.rotation.y += (targetY - group.rotation.y) * 0.025;
    renderer.render(scene, camera);

    if (active && !reducedMotion.matches) frame = requestAnimationFrame(render);
  };

  const stop = () => {
    active = false;
    cancelAnimationFrame(frame);
  };

  const start = () => {
    if (active || reducedMotion.matches) return;
    active = true;
    frame = requestAnimationFrame(render);
  };

  interactionSurface.addEventListener('pointermove', (event) => {
    const bounds = interactionSurface.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  }, { passive: true });

  interactionSurface.addEventListener('pointerleave', () => pointer.set(0, 0), { passive: true });

  new ResizeObserver(() => {
    resize();
    if (reducedMotion.matches) render();
  }).observe(mount);

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) start();
    else stop();
  }).observe(mount);

  reducedMotion.addEventListener('change', () => {
    stop();
    render();
    if (!reducedMotion.matches) start();
  });

  resize();
  render();
}
