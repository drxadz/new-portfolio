'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '@/data/projects';

interface ProjectCardProps {
  project: typeof projects[0];
  position: [number, number, number];
  onCardClick: (project: typeof projects[0]) => void;
}

function ProjectCard({ project, position, onCardClick }: ProjectCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      
      // Hover tilt effect
      if (hovered) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
        meshRef.current.position.z = position[2] + 0.3;
      } else {
        meshRef.current.rotation.x = 0;
        meshRef.current.rotation.z = 0;
        meshRef.current.position.z = position[2];
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onCardClick(project)}
      >
        <boxGeometry args={[2.5, 3, 0.2]} />
        <meshStandardMaterial
          color={hovered ? "#10B981" : "#1f2937"}
          transparent
          opacity={hovered ? 0.9 : 0.8}
          emissive={hovered ? "#10B981" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      
      {/* Project title */}
      <Text
        position={[0, 0.8, 0.15]}
        fontSize={0.2}
        color={hovered ? "#ffffff" : "#10B981"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {project.title}
      </Text>

      {/* Project description */}
      <Text
        position={[0, 0.2, 0.15]}
        fontSize={0.1}
        color={hovered ? "#e5e7eb" : "#9ca3af"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
      >
        {project.description}
      </Text>

      {/* Technologies */}
      <Text
        position={[0, -0.4, 0.15]}
        fontSize={0.08}
        color={hovered ? "#06B6D4" : "#6b7280"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
      >
        {project.technologies.slice(0, 3).join(', ')}
      </Text>

      {/* Click indicator */}
      {hovered && (
        <Html
          position={[0, -1.2, 0]}
          center
          distanceFactor={8}
          occlude
        >
          <div className="bg-card/90 backdrop-blur-sm border border-primary/50 rounded-lg p-3 text-center">
            <p className="text-sm text-primary font-semibold">Click to view details</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function ProjectCard3D({ project, position, onCardClick }: ProjectCardProps) {
  return (
    <ProjectCard project={project} position={position} onCardClick={onCardClick} />
  );
}
