import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { Model } from './Model';
import { Effects } from './Effects';

interface SceneProps {
  className?: string;
  model?: 'knot' | 'cubeStack';
  accent?: string;
}

export function Scene({ className = '', model = 'knot', accent = '#ff6a00' }: SceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ 
          position: [0, 0, 6], 
          fov: 45 
        }}
        dpr={[1, 2]}
        colorManagement
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={0.8}
            color={accent}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight 
            position={[-5, -5, -5]} 
            intensity={0.3}
            color="#ffffff"
          />
          <pointLight 
            position={[0, 0, 5]} 
            intensity={0.5}
            color={accent}
          />

          {/* Environment */}
          <Environment preset="city" intensity={0.2} />

          {/* 3D Model */}
          <Model model={model} accent={accent} />

          {/* Post-processing Effects */}
          <Effects />

          {/* Subtle Orbit Controls for Interaction */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
            dampingFactor={0.05}
            enableDamping={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
