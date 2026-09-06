import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.min.js';

const mount = document.querySelector('[data-hero-lab]');

if (mount) {
  const stage = document.querySelector('[data-hero-lab-stage]');
  const buttons = [...document.querySelectorAll('[data-hero-mode]')];
  const label = document.querySelector('[data-hero-mode-label]');
  const description = document.querySelector('[data-hero-description]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const concepts = {
    wave: {
      label: 'Current wave',
      description: 'The existing wire surface: restrained, abstract, and broad enough to represent all three subjects.',
    },
    signal: {
      label: 'Signal flow',
      description: 'Parallel signals loosen into a field of flowing waves, with small pulses moving through the system.',
    },
    circuit: {
      label: 'Circuit to signal',
      description: 'Orthogonal circuit traces branch, turn, and converge at a processor core before emerging as a fluid learned signal.',
    },
    mesh: {
      label: 'Mesh to latent',
      description: 'A production-style polygon surface slowly separates into clustered model activations, connecting technical art with machine learning.',
    },
    constellation: {
      label: 'Constellations',
      description: 'The more literal experiment: three local point clusters with sparse signals passing between the emerging representations.',
    },
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 20);
  camera.position.set(0, 0.12, 4.9);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  mount.appendChild(renderer.domElement);

  const pointer = new THREE.Vector2();
  let activeConcept;
  let frame = 0;
  let running = true;

  const disposeObject = (object) => {
    object.traverse((child) => {
      child.geometry?.dispose();
      if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose());
      else child.material?.dispose();
    });
    scene.remove(object);
  };

  const smoothstep = (value) => {
    const clamped = Math.max(0, Math.min(1, value));
    return clamped * clamped * (3 - (2 * clamped));
  };

  const createWave = () => {
    const group = new THREE.Group();
    const geometry = new THREE.PlaneGeometry(4.2, 2.7, 30, 20);
    const basePositions = Float32Array.from(geometry.attributes.position.array);
    const wire = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: 0x6ea8ff,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
    );
    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: 0xf3f0e8,
        size: 0.024,
        transparent: true,
        opacity: 0.62,
        sizeAttenuation: true,
      }),
    );

    wire.rotation.x = -0.92;
    wire.rotation.z = -0.12;
    wire.scale.x = 1.35;
    points.rotation.copy(wire.rotation);
    points.scale.copy(wire.scale);
    group.add(wire, points);
    scene.add(group);

    return {
      object: group,
      update(time) {
        const positions = geometry.attributes.position;
        const phase = time * 0.00034;

        for (let index = 0; index < positions.count; index += 1) {
          const offset = index * 3;
          const x = basePositions[offset];
          const y = basePositions[offset + 1];
          const distance = Math.sqrt((x * x) + (y * y));
          positions.setZ(
            index,
            (Math.sin((x * 2.25) + phase) * Math.cos((y * 2.7) - phase) * 0.12)
              + (Math.cos((distance * 4.2) - (phase * 0.7)) * 0.075),
          );
        }

        positions.needsUpdate = true;
        wire.rotation.x += ((-0.92 + (pointer.y * 0.08)) - wire.rotation.x) * 0.035;
        wire.rotation.z += ((-0.12 - (pointer.x * 0.08)) - wire.rotation.z) * 0.035;
        points.rotation.copy(wire.rotation);
      },
    };
  };

  const createSignalFlow = () => {
    const group = new THREE.Group();
    const traces = [];
    const laneCount = 9;
    const sampleCount = 84;

    for (let lane = 0; lane < laneCount; lane += 1) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(sampleCount * 3), 3));
      const material = new THREE.LineBasicMaterial({
        color: lane % 3 === 1 ? 0x83b9f4 : 0x5799e5,
        transparent: true,
        opacity: 0.18 + ((lane % 3) * 0.045),
      });
      const trace = new THREE.Line(geometry, material);
      group.add(trace);
      traces.push({ geometry, lane });
    }

    const nodePositions = [];
    for (let lane = 0; lane < laneCount; lane += 1) {
      nodePositions.push(-2.46, (lane - 4) * 0.23, 0);
    }
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
    group.add(new THREE.Points(
      nodeGeometry,
      new THREE.PointsMaterial({ color: 0x83b9f4, size: 0.055, transparent: true, opacity: 0.78 }),
    ));

    const pulseGeometry = new THREE.BufferGeometry();
    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3));
    const pulses = new THREE.Points(
      pulseGeometry,
      new THREE.PointsMaterial({ color: 0xe4a65a, size: 0.075, transparent: true, opacity: 0.92 }),
    );
    group.add(pulses);
    group.rotation.z = -0.08;
    group.scale.set(1.18, 1.18, 1.18);
    scene.add(group);

    const positionAt = (lane, progress, phase) => {
      const x = -2.46 + (progress * 5.05);
      const influence = smoothstep((progress - 0.08) / 0.58);
      const baseY = (lane - 4) * 0.23;
      const y = baseY
        + (Math.sin((progress * 7.2) + phase + (lane * 0.48)) * 0.16 * influence)
        + (Math.sin((progress * 2.3) - (phase * 0.45) + lane) * 0.11 * influence);
      const z = Math.cos((progress * 5.4) + phase + (lane * 0.31)) * 0.11 * influence;
      return [x, y, z];
    };

    return {
      object: group,
      update(time) {
        const phase = time * 0.00042;
        traces.forEach(({ geometry, lane }) => {
          const positions = geometry.attributes.position;
          for (let sample = 0; sample < sampleCount; sample += 1) {
            const progress = sample / (sampleCount - 1);
            positions.setXYZ(sample, ...positionAt(lane, progress, phase));
          }
          positions.needsUpdate = true;
        });

        const pulsePositions = pulseGeometry.attributes.position;
        [1, 4, 7, 3].forEach((lane, index) => {
          const progress = (time * 0.00011 + (index * 0.24)) % 1;
          pulsePositions.setXYZ(index, ...positionAt(lane, progress, phase));
        });
        pulsePositions.needsUpdate = true;
        group.rotation.y += ((pointer.x * 0.1) - group.rotation.y) * 0.03;
        group.rotation.x += ((pointer.y * 0.06) - group.rotation.x) * 0.03;
      },
    };
  };

  const createCircuit = () => {
    const group = new THREE.Group();
    const traceColour = 0x5799e5;
    const signalColour = 0x83b9f4;
    const pulseColour = 0xe4a65a;
    const tracePaths = [
      [[-2.55, 1.02, 0], [-2.05, 1.02, 0], [-2.05, 0.72, 0], [-1.46, 0.72, 0], [-1.46, 0.34, 0], [-0.44, 0.34, 0]],
      [[-2.55, 0.72, 0], [-2.26, 0.72, 0], [-2.26, 0.48, 0], [-1.12, 0.48, 0], [-1.12, 0.23, 0], [-0.44, 0.23, 0]],
      [[-2.55, 0.38, 0], [-1.82, 0.38, 0], [-1.82, 0.12, 0], [-0.44, 0.12, 0]],
      [[-2.55, 0.08, 0], [-2.14, 0.08, 0], [-2.14, -0.01, 0], [-0.44, -0.01, 0]],
      [[-2.55, -0.25, 0], [-1.66, -0.25, 0], [-1.66, -0.13, 0], [-0.44, -0.13, 0]],
      [[-2.55, -0.58, 0], [-2.28, -0.58, 0], [-2.28, -0.84, 0], [-1.42, -0.84, 0], [-1.42, -0.24, 0], [-0.44, -0.24, 0]],
      [[-2.55, -0.94, 0], [-1.96, -0.94, 0], [-1.96, -0.64, 0], [-1.08, -0.64, 0], [-1.08, -0.35, 0], [-0.44, -0.35, 0]],
    ];

    const pathRecords = tracePaths.map((path, index) => {
      const points = path.map(([x, y, z]) => new THREE.Vector3(x, y, z));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: index % 3 === 1 ? signalColour : traceColour,
        transparent: true,
        opacity: 0.34,
      });
      group.add(new THREE.Line(geometry, material));

      const lengths = [0];
      for (let point = 1; point < points.length; point += 1) {
        lengths.push(lengths[point - 1] + points[point].distanceTo(points[point - 1]));
      }

      return { points, lengths, total: lengths[lengths.length - 1] };
    });

    const nodePositions = [];
    tracePaths.forEach((path) => path.slice(0, -1).forEach((point) => nodePositions.push(...point)));
    const nodesGeometry = new THREE.BufferGeometry();
    nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
    group.add(new THREE.Points(
      nodesGeometry,
      new THREE.PointsMaterial({ color: signalColour, size: 0.045, transparent: true, opacity: 0.74 }),
    ));

    const coreGeometry = new THREE.BoxGeometry(0.56, 0.92, 0.08);
    const coreEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(coreGeometry),
      new THREE.LineBasicMaterial({ color: signalColour, transparent: true, opacity: 0.72 }),
    );
    coreEdges.position.x = -0.16;
    group.add(coreEdges);

    const coreGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.43, 0.78),
      new THREE.MeshBasicMaterial({
        color: traceColour,
        transparent: true,
        opacity: 0.075,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    coreGlow.position.set(-0.16, 0, -0.02);
    group.add(coreGlow);

    const signalCount = 7;
    const sampleCount = 58;
    const signalGeometries = [];
    for (let lane = 0; lane < signalCount; lane += 1) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(sampleCount * 3), 3));
      signalGeometries.push(geometry);
      group.add(new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: lane === 3 ? pulseColour : signalColour,
          transparent: true,
          opacity: lane === 3 ? 0.34 : 0.22,
        }),
      ));
    }

    const pulseCount = 8;
    const pulseGeometry = new THREE.BufferGeometry();
    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pulseCount * 3), 3));
    group.add(new THREE.Points(
      pulseGeometry,
      new THREE.PointsMaterial({
        color: pulseColour,
        size: 0.072,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      }),
    ));

    const samplePath = (record, progress) => {
      const distance = progress * record.total;
      let segment = 1;
      while (segment < record.lengths.length - 1 && record.lengths[segment] < distance) segment += 1;
      const startDistance = record.lengths[segment - 1];
      const segmentLength = record.lengths[segment] - startDistance;
      const local = segmentLength ? (distance - startDistance) / segmentLength : 0;
      return record.points[segment - 1].clone().lerp(record.points[segment], local);
    };

    const signalPosition = (lane, progress, phase) => {
      const outletY = (3 - lane) * 0.115;
      const release = smoothstep(progress);
      return new THREE.Vector3(
        0.13 + (progress * 2.52),
        outletY
          + (Math.sin((progress * 8.4) + phase + (lane * 0.6)) * 0.095 * release)
          + (Math.sin((progress * 2.3) - (phase * 0.45) + lane) * 0.07 * release),
        Math.cos((progress * 5.1) + phase + lane) * 0.1 * release,
      );
    };

    group.rotation.z = -0.045;
    group.scale.set(1.13, 1.13, 1.13);
    scene.add(group);

    return {
      object: group,
      update(time) {
        const phase = time * 0.0005;

        signalGeometries.forEach((geometry, lane) => {
          const positions = geometry.attributes.position;
          for (let sample = 0; sample < sampleCount; sample += 1) {
            const position = signalPosition(lane, sample / (sampleCount - 1), phase);
            positions.setXYZ(sample, position.x, position.y, position.z);
          }
          positions.needsUpdate = true;
        });

        const pulsePositions = pulseGeometry.attributes.position;
        for (let index = 0; index < pulseCount; index += 1) {
          const progress = (time * 0.0001 + (index / pulseCount)) % 1;
          const lane = index % signalCount;
          let position;

          if (progress < 0.58) {
            position = samplePath(pathRecords[lane], progress / 0.58);
          } else {
            position = signalPosition(lane, (progress - 0.58) / 0.42, phase);
          }
          pulsePositions.setXYZ(index, position.x, position.y, position.z);
        }
        pulsePositions.needsUpdate = true;

        coreGlow.material.opacity = 0.06 + ((Math.sin(time * 0.0025) + 1) * 0.035);
        group.rotation.y += ((pointer.x * 0.08) - group.rotation.y) * 0.03;
        group.rotation.x += ((pointer.y * 0.045) - group.rotation.x) * 0.03;
      },
    };
  };

  const createMesh = () => {
    const group = new THREE.Group();
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
    group.add(mesh, points);
    group.rotation.x = -0.34;
    group.rotation.z = -0.12;
    group.scale.set(1.22, 1.22, 1.22);
    scene.add(group);

    return {
      object: group,
      update(time) {
        const rawMorph = (Math.sin((time * 0.00034) - 1.2) + 1) * 0.5;
        const morph = smoothstep(rawMorph);
        const positions = geometry.attributes.position;

        for (let index = 0; index < positions.count; index += 1) {
          const offset = index * 3;
          const x = THREE.MathUtils.lerp(basePositions[offset], targets[offset], morph);
          const y = THREE.MathUtils.lerp(basePositions[offset + 1], targets[offset + 1], morph);
          const wave = Math.sin((basePositions[offset] * 2.2) + (time * 0.00045)) * 0.09 * (1 - morph);
          const z = THREE.MathUtils.lerp(wave, targets[offset + 2], morph);
          positions.setXYZ(index, x, y, z);
        }

        positions.needsUpdate = true;
        meshMaterial.opacity = THREE.MathUtils.lerp(0.23, 0.035, morph);
        pointMaterial.opacity = THREE.MathUtils.lerp(0.48, 0.78, morph);
        pointMaterial.color.setHex(morph > 0.55 ? 0x83b9f4 : 0xf3f0e8);
        group.rotation.y += ((pointer.x * 0.12) - group.rotation.y) * 0.025;
        group.rotation.x += ((-0.34 + (pointer.y * 0.08)) - group.rotation.x) * 0.025;
      },
    };
  };

  const createConstellation = () => {
    const group = new THREE.Group();
    const geometry = new THREE.PlaneGeometry(4.5, 2.75, 31, 20);
    const basePositions = Float32Array.from(geometry.attributes.position.array);
    const targets = new Float32Array(basePositions.length);
    const centres = [
      [-1.35, 0.55, 0.08],
      [0, -0.6, -0.1],
      [1.38, 0.48, 0.16],
    ];
    const clusterIndices = centres.map(() => []);

    for (let index = 0; index < geometry.attributes.position.count; index += 1) {
      const offset = index * 3;
      const cluster = index % centres.length;
      clusterIndices[cluster].push(index);
      const seed = Math.sin((index + 1) * 91.913) * 43758.5453;
      const seedB = Math.sin((index + 7) * 47.227) * 23817.131;
      const radius = 0.12 + ((seed - Math.floor(seed)) * 0.54);
      const angle = (seedB - Math.floor(seedB)) * Math.PI * 2;
      targets[offset] = centres[cluster][0] + (Math.cos(angle) * radius);
      targets[offset + 1] = centres[cluster][1] + (Math.sin(angle) * radius * 0.72);
      targets[offset + 2] = centres[cluster][2] + (Math.sin(angle * 1.7) * radius * 0.4);
    }

    const edgePairs = [];
    clusterIndices.forEach((indices) => {
      for (let order = 0; order < indices.length; order += 2) {
        const source = indices[order];
        const sourceOffset = source * 3;
        let nearest = -1;
        let nearestDistance = Infinity;

        indices.forEach((candidate) => {
          if (candidate === source) return;
          const candidateOffset = candidate * 3;
          const dx = targets[sourceOffset] - targets[candidateOffset];
          const dy = targets[sourceOffset + 1] - targets[candidateOffset + 1];
          const dz = targets[sourceOffset + 2] - targets[candidateOffset + 2];
          const distance = (dx * dx) + (dy * dy) + (dz * dz);
          if (distance < nearestDistance) {
            nearest = candidate;
            nearestDistance = distance;
          }
        });

        if (nearest >= 0) edgePairs.push([source, nearest]);
      }
    });

    const meshMaterial = new THREE.MeshBasicMaterial({
      color: 0x5799e5,
      wireframe: true,
      transparent: true,
      opacity: 0.23,
    });
    const pointMaterial = new THREE.PointsMaterial({
      color: 0xf3f0e8,
      size: 0.032,
      transparent: true,
      opacity: 0.52,
      sizeAttenuation: true,
    });
    const mesh = new THREE.Mesh(geometry, meshMaterial);
    const points = new THREE.Points(geometry, pointMaterial);
    const latentGeometry = new THREE.BufferGeometry();
    latentGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgePairs.length * 6), 3));
    const latentMaterial = new THREE.LineBasicMaterial({
      color: 0x83b9f4,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });

    const crossLinks = [[0, 1], [1, 2], [2, 0]];
    const crossGeometry = new THREE.BufferGeometry();
    crossGeometry.setAttribute('position', new THREE.Float32BufferAttribute(
      crossLinks.flatMap(([from, to]) => [...centres[from], ...centres[to]]),
      3,
    ));
    const crossMaterial = new THREE.LineBasicMaterial({
      color: 0xe4a65a,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const crossPulseGeometry = new THREE.BufferGeometry();
    crossPulseGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(crossLinks.length * 3), 3));
    const crossPulseMaterial = new THREE.PointsMaterial({
      color: 0xe4a65a,
      size: 0.09,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const clusterGlows = centres.map((centre) => {
      const glowGeometry = new THREE.BufferGeometry();
      glowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(centre, 3));
      const material = new THREE.PointsMaterial({
        color: 0x83b9f4,
        size: 0.14,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      return { object: new THREE.Points(glowGeometry, material), material };
    });

    group.add(
      mesh,
      new THREE.LineSegments(latentGeometry, latentMaterial),
      new THREE.LineSegments(crossGeometry, crossMaterial),
      points,
      ...clusterGlows.map(({ object }) => object),
      new THREE.Points(crossPulseGeometry, crossPulseMaterial),
    );
    group.rotation.x = -0.34;
    group.rotation.z = -0.12;
    group.scale.set(1.22, 1.22, 1.22);
    scene.add(group);

    return {
      object: group,
      update(time) {
        const motionTime = reducedMotion.matches ? 0 : time;
        const cycle = reducedMotion.matches ? 0.52 : ((motionTime * 0.000055) + 0.34) % 1;
        let morph = 0;
        if (cycle >= 0.18 && cycle < 0.4) morph = smoothstep((cycle - 0.18) / 0.22);
        else if (cycle >= 0.4 && cycle < 0.78) morph = 1;
        else if (cycle >= 0.78) morph = smoothstep(1 - ((cycle - 0.78) / 0.22));
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
        const latentVisibility = smoothstep((morph - 0.38) / 0.62);
        const crossVisibility = smoothstep((morph - 0.7) / 0.3);
        const latentPositions = latentGeometry.attributes.position;
        edgePairs.forEach(([from, to], edgeIndex) => {
          latentPositions.setXYZ(
            edgeIndex * 2,
            positions.getX(from),
            positions.getY(from),
            positions.getZ(from),
          );
          latentPositions.setXYZ(
            (edgeIndex * 2) + 1,
            positions.getX(to),
            positions.getY(to),
            positions.getZ(to),
          );
        });
        latentPositions.needsUpdate = true;

        const pulsePositions = crossPulseGeometry.attributes.position;
        crossLinks.forEach(([from, to], linkIndex) => {
          const progress = (motionTime * 0.00016 + (linkIndex / crossLinks.length)) % 1;
          pulsePositions.setXYZ(
            linkIndex,
            THREE.MathUtils.lerp(centres[from][0], centres[to][0], progress),
            THREE.MathUtils.lerp(centres[from][1], centres[to][1], progress),
            THREE.MathUtils.lerp(centres[from][2], centres[to][2], progress),
          );
        });
        pulsePositions.needsUpdate = true;

        meshMaterial.opacity = THREE.MathUtils.lerp(0.23, 0.006, morph);
        pointMaterial.opacity = THREE.MathUtils.lerp(0.48, 0.92, morph);
        pointMaterial.size = THREE.MathUtils.lerp(0.032, 0.046, morph);
        pointMaterial.color.setHex(morph > 0.55 ? 0x83b9f4 : 0xf3f0e8);
        latentMaterial.opacity = 0.2 * latentVisibility;
        crossMaterial.opacity = 0.16 * crossVisibility;
        crossPulseMaterial.opacity = 0.9 * crossVisibility;
        clusterGlows.forEach(({ material }, index) => {
          const pulse = Math.max(0, Math.sin((motionTime * 0.0018) - (index * 2.1)));
          material.opacity = crossVisibility * (0.35 + (pulse * 0.45));
        });
        group.rotation.y += ((pointer.x * 0.12) - group.rotation.y) * 0.025;
        group.rotation.x += ((-0.34 + (pointer.y * 0.08)) - group.rotation.x) * 0.025;
      },
    };
  };

  const factories = {
    wave: createWave,
    signal: createSignalFlow,
    circuit: createCircuit,
    mesh: createMesh,
    constellation: createConstellation,
  };

  const selectConcept = (mode) => {
    if (!factories[mode]) return;
    if (activeConcept) disposeObject(activeConcept.object);
    activeConcept = factories[mode]();
    stage.dataset.heroMode = mode;
    label.textContent = concepts[mode].label;
    description.textContent = concepts[mode].description;
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.heroMode === mode)));
    if (reducedMotion.matches) render(2800);
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
    activeConcept?.update(reducedMotion.matches ? 2800 : time);
    renderer.render(scene, camera);
    if (running && !reducedMotion.matches) frame = requestAnimationFrame(render);
  };

  buttons.forEach((button) => button.addEventListener('click', () => selectConcept(button.dataset.heroMode)));

  stage.addEventListener('pointermove', (event) => {
    const bounds = stage.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  }, { passive: true });
  stage.addEventListener('pointerleave', () => pointer.set(0, 0), { passive: true });

  new ResizeObserver(() => {
    resize();
    if (reducedMotion.matches) render(2800);
  }).observe(mount);

  new IntersectionObserver(([entry]) => {
    running = entry.isIntersecting;
    cancelAnimationFrame(frame);
    if (running && !reducedMotion.matches) frame = requestAnimationFrame(render);
  }).observe(stage);

  reducedMotion.addEventListener('change', () => {
    cancelAnimationFrame(frame);
    running = true;
    render(2800);
  });

  selectConcept('wave');
  resize();
  render();
}
