'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { skills } from '@/data/skills';

interface SkillCardProps {
  skill: typeof skills[0];
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
  onHover: (index: number | null) => void;
  isHovered: boolean;
}

function SkillCard({ skill, position, rotation, index, onHover, isHovered }: SkillCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
      
      // Hover lift effect
      if (hovered || isHovered) {
        meshRef.current.position.z = position[2] + 0.5;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      } else {
        meshRef.current.position.z = position[2];
        meshRef.current.rotation.x = 0;
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          setHovered(true);
          onHover(index);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <boxGeometry args={[2, 1.5, 0.2]} />
        <meshStandardMaterial
          color={hovered || isHovered ? "#10B981" : "#1f2937"}
          transparent
          opacity={hovered || isHovered ? 0.9 : 0.7}
          emissive={hovered || isHovered ? "#10B981" : "#000000"}
          emissiveIntensity={hovered || isHovered ? 0.2 : 0}
        />
      </mesh>
      
      {/* Skill name text */}
      <Text
        position={[0, 0, 0.15]}
        fontSize={0.15}
        color={hovered || isHovered ? "#ffffff" : "#10B981"}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>

      {/* Hover details */}
      {(hovered || isHovered) && (
        <Html
          position={[0, -1.2, 0]}
          center
          distanceFactor={8}
          occlude
        >
          <div className="bg-card/90 backdrop-blur-sm border border-primary/50 rounded-lg p-4 max-w-xs">
            <h4 className="text-primary font-semibold mb-2">{skill.name}</h4>
            <ul className="text-sm text-foreground/80 space-y-1">
              {skill.examples.slice(0, 3).map((example, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </Html>
      )}
    </group>
  );
}

function SkillRing() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const radius = 4;
  const skillPositions = skills.map((_, index) => {
    const angle = (index / skills.length) * Math.PI * 2;
    return [
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ] as [number, number, number];
  });

  const skillRotations = skills.map((_, index) => {
    const angle = (index / skills.length) * Math.PI * 2;
    return [0, -angle, 0] as [number, number, number];
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          position={skillPositions[index]}
          rotation={skillRotations[index]}
          index={index}
          onHover={setHoveredIndex}
          isHovered={hoveredIndex === index}
        />
      ))}
    </group>
  );
}

export default function SkillRing3D() {
  return (
    <div className="w-full h-96">
      <Suspense fallback={<div className="w-full h-96 bg-card/20 rounded-lg flex items-center justify-center"><div className="text-foreground/50">Loading 3D Skills...</div></div>}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#10B981" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06B6D4" />
          <directionalLight position={[0, 10, 5]} intensity={0.4} />
          
          <SkillRing />
        </Canvas>
      </Suspense>
    </div>
  );
}
