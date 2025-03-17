import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface ThreeDModelProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  rotationSpeed?: number;
  animate?: boolean;
}

const ThreeDModel = ({
  className,
  primaryColor = '#0e89e2',
  secondaryColor = '#7928ca',
  accentColor = '#ff4d4d',
  rotationSpeed = 0.003,
  animate = true,
}: ThreeDModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.035);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 8;
    camera.position.y = 1;
    cameraRef.current = camera;

    // Renderer with HDRI
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create a group to hold all meshes
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Advanced Lighting
    setupLighting(scene, primaryColor, secondaryColor);

    // Create complex geometry structure
    createComplexGeometry(group, primaryColor, secondaryColor, accentColor);

    // Particle system for background
    createParticleSystem(scene, width, height);

    // Mouse move event
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animateScene = () => {
      if (!groupRef.current) return;
      
      if (animate) {
        // Base rotation
        groupRef.current.rotation.y += rotationSpeed;
        groupRef.current.rotation.x += rotationSpeed * 0.3;
        
        // Mouse-based interaction
        groupRef.current.rotation.y += mousePosition.x * 0.001;
        groupRef.current.rotation.x += mousePosition.y * 0.001;
        
        // Subtle pulsing effect on the entire group
        const pulseFactor = Math.sin(Date.now() * 0.001) * 0.05 + 1;
        groupRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
      }
      
      // Update animated materials if any
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.material instanceof THREE.MeshPhysicalMaterial) {
          if (object.userData.isAnimated) {
            object.rotation.x += object.userData.rotationSpeed.x;
            object.rotation.y += object.userData.rotationSpeed.y;
            object.rotation.z += object.userData.rotationSpeed.z;
          }
        }
      });
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      frameIdRef.current = requestAnimationFrame(animateScene);
    };

    frameIdRef.current = requestAnimationFrame(animateScene);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      // Dispose of geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [primaryColor, secondaryColor, accentColor, rotationSpeed, animate]);

  // Helper function to set up advanced lighting
  const setupLighting = (scene: THREE.Scene, primaryColor: string, secondaryColor: string) => {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Main directional light with shadows
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(10, 10, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);

    // Colored rim lights for dramatic effect
    const rimLight1 = new THREE.PointLight(primaryColor, 2);
    rimLight1.position.set(-10, 5, -10);
    scene.add(rimLight1);

    const rimLight2 = new THREE.PointLight(secondaryColor, 2);
    rimLight2.position.set(10, -5, -10);
    scene.add(rimLight2);

    // Soft fill light
    const fillLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    scene.add(fillLight);
  };

  // Helper function to create particle system
  const createParticleSystem = (scene: THREE.Scene, width: number, height: number) => {
    const particleCount = 2000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color(0xffffff);
    const color2 = new THREE.Color(0x88ccff);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position particles in a sphere
      const radius = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
      
      // Mix colors based on position
      const colorMix = Math.random();
      const particleColor = new THREE.Color().lerpColors(color1, color2, colorMix);
      
      colors[i] = particleColor.r;
      colors[i + 1] = particleColor.g;
      colors[i + 2] = particleColor.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    
    // Animate particles
    const animateParticles = () => {
      const time = Date.now() * 0.0001;
      particleSystem.rotation.y = time * 0.1;
    };
    
    // Add to animation loop
    const originalAnimate = sceneRef.current?.userData.animate;
    sceneRef.current!.userData.animate = () => {
      if (originalAnimate) originalAnimate();
      animateParticles();
    };
  };

  // Helper function to create complex geometry
  const createComplexGeometry = (group: THREE.Group, primaryColor: string, secondaryColor: string, accentColor: string) => {
    // Central icosahedron (main shape)
     const mainGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(primaryColor),
      metalness: 0.7,
      roughness: 0.2,
      envMapIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const mainMesh = new THREE.Mesh(mainGeometry, mainMaterial);
    mainMesh.castShadow = true;
    mainMesh.receiveShadow = true;
    group.add(mainMesh);

    // Add inner solid core with different material
    const coreGeometry = new THREE.OctahedronGeometry(0.9, 0);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(secondaryColor),
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.2,
      thickness: 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreMesh.castShadow = true;
    coreMesh.userData.isAnimated = true;
    coreMesh.userData.rotationSpeed = { 
      x: -rotationSpeed * 0.3, 
      y: rotationSpeed * 0.7, 
      z: rotationSpeed * 0.2 
    };
    group.add(coreMesh);

    // Add orbiting rings
    createOrbitingRings(group, primaryColor, secondaryColor, accentColor, rotationSpeed);

    // Add smaller satellites
    createSatellites(group, accentColor, rotationSpeed);

    return group;
  };

  // Helper function to create orbiting rings
  const createOrbitingRings = (group: THREE.Group, primaryColor: string, secondaryColor: string, accentColor: string, rotationSpeed: number) => {
    // Create 3 rings at different angles
    const ringGeometry = new THREE.TorusGeometry(2.8, 0.05, 16, 100);
    
    // First ring
    const ringMaterial1 = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(primaryColor),
      metalness: 0.9,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial1);
    ring1.rotation.x = Math.PI / 2;
    ring1.userData.isAnimated = true;
    ring1.userData.rotationSpeed = { 
      x: 0, 
      y: rotationSpeed * 0.5, 
      z: 0 
    };
    group.add(ring1);
    
    // Second ring
    const ringMaterial2 = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(secondaryColor),
      metalness: 0.9,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial2);
    ring2.rotation.x = Math.PI / 4;
    ring2.userData.isAnimated = true;
    ring2.userData.rotationSpeed = { 
      x: rotationSpeed * 0.3, 
      y: 0, 
      z: 0 
    };
    group.add(ring2);
    
    // Third ring
    const ringMaterial3 = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(accentColor),
      metalness: 0.9,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const ring3 = new THREE.Mesh(ringGeometry, ringMaterial3);
    ring3.rotation.y = Math.PI / 3;
    ring3.userData.isAnimated = true;
    ring3.userData.rotationSpeed = { 
      x: 0, 
      y: 0, 
      z: rotationSpeed * 0.4 
    };
    group.add(ring3);
  };

  // Helper function to create satellites
  // Helper function to create satellites
  const createSatellites = (group: THREE.Group, accentColor: string, rotationSpeed: number) => {
    // Create satellite subgroups that will rotate around the main object
    const satelliteCount = 5;
    const baseRadius = 3.2;
    
    for (let i = 0; i < satelliteCount; i++) {
      const angle = (i / satelliteCount) * Math.PI * 2;
      const satelliteGroup = new THREE.Group();
      
      // Position the satellite group
      satelliteGroup.position.x = Math.cos(angle) * baseRadius;
      satelliteGroup.position.z = Math.sin(angle) * baseRadius;
      satelliteGroup.position.y = (Math.random() - 0.5) * 2;
      
      // Create the actual satellite
      const size = 0.1 + Math.random() * 0.2;
      
      // Create satellite with custom geometry
      const satelliteGeometries = [
        new THREE.TetrahedronGeometry(size, 0),
        new THREE.OctahedronGeometry(size, 0),
        new THREE.DodecahedronGeometry(size, 0)
      ];
      
      const satelliteGeometry = satelliteGeometries[Math.floor(Math.random() * satelliteGeometries.length)];
      
      // Create a glowing material for the satellite
      const satelliteMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(accentColor),
        emissive: new THREE.Color(accentColor),
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
      });
      
      const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
      satellite.castShadow = true;
      satellite.receiveShadow = true;
      
      // Add small trail effect behind each satellite
      const trailGeometry = new THREE.ConeGeometry(size * 0.5, size * 3, 8);
      const trailMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(accentColor),
        transparent: true,
        opacity: 0.3,
      });
      
      const trail = new THREE.Mesh(trailGeometry, trailMaterial);
      trail.position.z = -size * 1.5;
      trail.rotation.x = Math.PI / 2;
      satellite.add(trail);
      
      // Add the satellite to its group
      satelliteGroup.add(satellite);
      
      // Each satellite will have its own rotation speed
      satelliteGroup.userData.rotationAxis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      
      satelliteGroup.userData.rotationSpeed = rotationSpeed * (0.5 + Math.random() * 1.5);
      satelliteGroup.userData.isAnimated = true;
      
      // Add the satellite group to the main group
      group.add(satelliteGroup);
      
      // Setup custom animation for satellite orbits
      const originalAnimate = sceneRef.current?.userData.animate;
      sceneRef.current!.userData.animate = () => {
        if (originalAnimate) originalAnimate();
        
        // Animate each satellite group
        group.children.forEach((child) => {
          if (child.userData.isAnimated && child.userData.rotationAxis) {
            // Rotate the satellite around its custom axis
            child.position.applyAxisAngle(
              child.userData.rotationAxis,
              child.userData.rotationSpeed
            );
            
            // Make satellites always face the center
            if (child instanceof THREE.Group && child.children.length > 0) {
              child.lookAt(0, 0, 0);
            }
          }
        });
      };
    }
  };

  // Add floating text labels
  const addFloatingLabels = (group: THREE.Group) => {
    // This would typically be done with HTML overlay or sprites
    // For this example, we'll use simple geometries as placeholders
    
    const labelPositions = [
      { x: 2.5, y: 1.5, z: 0, text: "Core System" },
      { x: -2, y: -1, z: 1, text: "Orbit Path" },
      { x: 1, y: -2, z: -1, text: "Data Node" }
    ];
    
    labelPositions.forEach((pos) => {
      // Create a small indicator sphere at each label position
      const indicatorGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const indicatorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 1.0
      });
      
      const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
      indicator.position.set(pos.x, pos.y, pos.z);
      group.add(indicator);
      
      // Draw connecting line from indicator to the center
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
      });
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(pos.x, pos.y, pos.z),
        new THREE.Vector3(0, 0, 0)
      ]);
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      group.add(line);
    });
  };

  // Add energy beams between core and satellites
  const addEnergyBeams = (group: THREE.Group, primaryColor: string) => {
    // Find all satellites (groups containing a mesh)
    const satellites = group.children.filter(child => 
      child instanceof THREE.Group && 
      child.children.length > 0 && 
      child.children[0] instanceof THREE.Mesh
    );
    
    // Create beams from center to satellites
    satellites.forEach((satellite) => {
      if (!(satellite instanceof THREE.Group)) return;
      
      const target = satellite.position;
      const beamGeometry = new THREE.CylinderGeometry(0.02, 0.02, target.length(), 8, 1);
      beamGeometry.translate(0, target.length() / 2, 0);
      beamGeometry.rotateX(Math.PI / 2);
      
      const beamMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(primaryColor),
        transparent: true,
        opacity: 0.3,
      });
      
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.set(0, 0, 0);
      beam.lookAt(target);
      
      group.add(beam);
      
      // Pulse animation for beams
      const pulseAnimation = () => {
        if (!beam) return;
        
        const time = Date.now() * 0.001;
        const pulse = Math.sin(time * 3) * 0.4 + 0.6;
        beamMaterial.opacity = 0.3 * pulse;
      };
      
      // Add to animation loop
      const originalAnimate = sceneRef.current?.userData.animate;
      sceneRef.current!.userData.animate = () => {
        if (originalAnimate) originalAnimate();
        pulseAnimation();
      };
    });
  };

  return <div ref={containerRef} className={cn('w-full h-full', className)} />;
};

export default ThreeDModel;