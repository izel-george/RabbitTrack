import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import loadingAnimation from './loading.json';

export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingAnimation,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm transition-all"
      style={{ background: 'rgba(21, 19, 27, 0.85)' }}
    >
      <div className="w-36 h-36" ref={containerRef} />
      <p 
        className="mt-4 text-sm font-medium tracking-wide animate-pulse"
        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        Loading data...
      </p>
    </div>
  );
}