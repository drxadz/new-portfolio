import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'large' | 'small' | 'full';
}

export function Container({ 
  children, 
  className = '', 
  size = 'default' 
}: ContainerProps) {
  const sizeClasses = {
    default: 'container-page',
    large: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    small: 'mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8',
    full: 'w-full px-4 sm:px-6 lg:px-8',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
