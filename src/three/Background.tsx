import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useReducedMotion } from 'framer-motion';

interface BackgroundProps {
  accent?: string;
}

export function Background({ accent = '#ff6a00' }: BackgroundProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current || isReducedMotion) return;

    const time = state.clock.getElapsedTime();
    
    // Slow rotation for the entire group
    groupRef.current.rotation.y = time * 0.05;
    groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
  });

  if (isReducedMotion) {
    return null;
  }

  return (
    <group ref={groupRef}>
      {/* Floating Cube */}
      <mesh position={[2, 1, -2]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial 
          color={accent} 
          transparent 
          opacity={0.1}
        />
      </mesh>
      
      {/* Floating Sphere */}
      <mesh position={[-2, -1, -1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial 
          color={accent} 
          transparent 
          opacity={0.08}
        />
      </mesh>
      
      {/* Floating Torus */}
      <mesh position={[1, -1.5, -3]}>
        <torusGeometry args={[0.15, 0.05, 8, 16]} />
        <meshBasicMaterial 
          color={accent} 
          transparent 
          opacity={0.06}
        />
      </mesh>
      
      {/* Additional floating elements */}
      <mesh position={[-1, 1.5, -2]}>
        <octahedronGeometry args={[0.15]} />
        <meshBasicMaterial 
          color={accent} 
          transparent 
          opacity={0.05}
        />
      </mesh>
      
      <mesh position={[0, 0, -4]}>
        <tetrahedronGeometry args={[0.2]} />
        <meshBasicMaterial 
          color={accent} 
          transparent 
          opacity={0.04}
        />
      </mesh>
    </group>
  );
}
