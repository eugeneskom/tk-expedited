import React from 'react';
import { useElementOnScreen } from '../hooks/useElementOnScreen';
interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className = '' }) => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;