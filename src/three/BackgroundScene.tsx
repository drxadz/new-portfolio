import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Background } from './Background';

interface BackgroundSceneProps {
  className?: string;
  accent?: string;
}

export function BackgroundScene({ className = '', accent = '#ff6a00' }: BackgroundSceneProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 60 
        }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'low-power'
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Background accent={accent} />
        </Suspense>
      </Canvas>
    </div>
  );
}
