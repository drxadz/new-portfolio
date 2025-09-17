'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html, useTexture } from '@react-three/drei';
import { Mesh } from 'three';
import { motion } from 'framer-motion';
import { certifications, Certification } from '@/data/certifications';

interface CertCoinProps {
  certification: Certification;
  position: [number, number, number];
  onClick: (cert: Certification) => void;
}

function CertCoin({ certification, position, onClick }: CertCoinProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      if (hovered) {
        meshRef.current.position.y = position[1] + 0.2;
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.position.y = position[1];
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    onClick(certification);
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={clicked ? 0.9 : 1}
      >
        <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
        <meshStandardMaterial
          color={hovered ? "#10B981" : "#06B6D4"}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? "#10B981" : "#06B6D4"}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Certification text on the coin */}
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {certification.name}
      </Text>
      
      {/* Hover tooltip */}
      {hovered && (
        <Html distanceFactor={10} position={[0, 1.2, 0]} center>
          <div className="bg-card/90 backdrop-blur-sm border border-primary/20 rounded-lg px-3 py-2 text-sm text-foreground whitespace-nowrap">
            <div className="font-semibold text-primary">{certification.name}</div>
            <div className="text-text-muted text-xs">{certification.issuer}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

interface CertCoinsProps {
  onCertClick: (cert: Certification) => void;
}

export default function CertCoins({ onCertClick }: CertCoinsProps) {
  const positions: [number, number, number][] = [
    [-2, 0, 0],   // OSCP
    [-1, 0, 0],   // CPTS
    [0, 0, 0],    // CRTP
    [1, 0, 0],    // MCRTA
    [2, 0, 0],    // CNSP
    [0, -1.5, 0], // CAP (centered below)
  ];

  return (
    <div className="w-full h-96">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#10B981" />
        
        {certifications.map((cert, index) => (
          <CertCoin
            key={cert.id}
            certification={cert}
            position={positions[index]}
            onClick={onCertClick}
          />
        ))}
      </Canvas>
    </div>
  );
}
