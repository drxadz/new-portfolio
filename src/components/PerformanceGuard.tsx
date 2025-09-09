import { useState, useEffect, ReactNode } from 'react';
import { Scene } from '../three/Scene';

interface PerformanceGuardProps {
  children: ReactNode;
  fallback: ReactNode;
  model?: 'knot' | 'cubeStack';
  accent?: string;
  autoFallbackOnMobile?: boolean;
}

export function PerformanceGuard({ 
  children, 
  fallback, 
  model = 'knot', 
  accent = '#ff6a00',
  autoFallbackOnMobile = true 
}: PerformanceGuardProps) {
  const [shouldUseFallback, setShouldUseFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPerformance = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 4;
      
      // Check if mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Check screen size
      const isSmallScreen = window.innerWidth < 768;
      
      // Check WebGL support
      let webglSupported = false;
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        webglSupported = !!gl;
      } catch (e) {
        webglSupported = false;
      }

      // Determine if we should use fallback
      const shouldFallback = 
        prefersReducedMotion ||
        !webglSupported ||
        (autoFallbackOnMobile && (isMobile || isSmallScreen)) ||
        cores < 4;

      setShouldUseFallback(shouldFallback);
      setIsLoading(false);
    };

    checkPerformance();

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => checkPerformance();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [autoFallbackOnMobile]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-fg/[0.02] rounded-2xl border border-line">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (shouldUseFallback) {
    return <>{fallback}</>;
  }

  return (
    <Scene 
      model={model} 
      accent={accent}
      className="w-full h-full"
    />
  );
}

// Fallback component for when 3D is not supported
export function FallbackVisual({ accent = '#ff6a00' }: { accent?: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-fg/[0.04] to-fg/[0.02] rounded-2xl border border-line flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${accent}20 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${accent}10 0%, transparent 50%)`
        }}
      />
      
      {/* Static geometric shapes */}
      <div className="relative z-10">
        <div className="w-24 h-24 mx-auto mb-4 relative">
          {/* Main shape */}
          <div 
            className="w-16 h-16 rounded-2xl mx-auto"
            style={{ backgroundColor: accent }}
          />
          
          {/* Floating elements */}
          <div 
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <div 
            className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </div>
        
        {/* Subtle animation */}
        <div className="text-center">
          <div className="w-2 h-2 bg-accent rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
