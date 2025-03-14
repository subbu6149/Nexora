
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface ThreeDModelProps {
  className?: string;
  color?: string;
  rotationSpeed?: number;
  animate?: boolean;
}

const ThreeDModel = ({
  className,
  color = '#0e89e2',
  rotationSpeed = 0.005,
  animate = true,
}: ThreeDModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create abstract shape
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      metalness: 0.2,
      roughness: 0.4,
      flatShading: true,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Animation
    const animate = () => {
      if (!meshRef.current) return;
      
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.8;
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      requestAnimationFrame(animate);
    };

    animate();

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
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [color, rotationSpeed, animate]);

  return <div ref={containerRef} className={cn('w-full h-full', className)} />;
};

export default ThreeDModel;
