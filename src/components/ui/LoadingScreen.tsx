import Lottie from 'lottie-react'; 
import loadingAnimation from './loading.json';

export function LoadingScreen() {
  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm transition-all"
      style={{ background: 'rgba(21, 19, 27, 0.85)' }}
    >
      <div className="w-36 h-36">
        <Lottie
          animationData={loadingAnimation} 
          loop={true} 
          autoplay={true} 
        />
      </div>

      <p 
        className="mt-4 text-sm font-medium tracking-wide animate-pulse"
        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        Loading data...
      </p>
    </div>
  );
}