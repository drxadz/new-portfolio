import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useReducedMotion } from 'framer-motion';

interface ModelProps {
  model?: 'knot' | 'cubeStack';
  accent?: string;
}

export function Model({ model = 'knot', accent = '#ff6a00' }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current || isReducedMotion) return;

    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    
    // Subtle floating motion
    groupRef.current.position.y = Math.sin(time * 0.3) * 0.1;
  });

  const materialProps = {
    metalness: 0.1,
    roughness: 0.2,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    toneMapped: true,
  };

  if (model === 'cubeStack') {
    return (
      <group ref={groupRef}>
        {/* Base Cube */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[1.2, 1, 1.2]} />
          <meshPhysicalMaterial 
            color={accent} 
            {...materialProps}
          />
        </mesh>
        
        {/* Middle Cube */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            {...materialProps}
          />
        </mesh>
        
        {/* Top Cube */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshPhysicalMaterial 
            color={accent} 
            {...materialProps}
          />
        </mesh>
      </group>
    );
  }

  // Default: Torus Knot
  return (
    <group ref={groupRef}>
      {/* Main Torus Knot */}
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshPhysicalMaterial 
          color={accent} 
          {...materialProps}
        />
      </mesh>
      
      {/* Inner Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          {...materialProps}
        />
      </mesh>
      
      {/* Floating Orbs */}
      <mesh position={[1.5, 0.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshPhysicalMaterial 
          color={accent} 
          {...materialProps}
        />
      </mesh>
      
      <mesh position={[-1.5, -0.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshPhysicalMaterial 
          color={accent} 
          {...materialProps}
        />
      </mesh>
    </group>
  );
}
