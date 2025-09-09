import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useReducedMotion } from 'framer-motion';

export function Effects() {
  const isReducedMotion = useReducedMotion();

  // Skip effects if user prefers reduced motion
  if (isReducedMotion) {
    return null;
  }

  return (
    <EffectComposer>
      <Bloom
        intensity={0.2}
        radius={0.8}
        threshold={0.9}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.025}
      />
    </EffectComposer>
  );
}
