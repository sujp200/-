
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Fix for spline-viewer TypeScript error: Define custom element in global JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        url?: string;
        onLoad?: () => void;
      }, HTMLElement>;
    }
  }
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  const handleEnter = () => {
    navigate('/space');
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#FDFCF8] cursor-pointer" onClick={handleEnter}>
      {/* Loading state for 3D */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <span className="text-[10px] tracking-[0.4em] text-gray-300 animate-pulse uppercase">Initializing 3D Space...</span>
        </div>
      )}

      {/* Spline Viewer: Much faster than iframe */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <spline-viewer 
          url="https://prod.spline.design/kingfisherinmotion-xvMb0vNdz0QV8nO1J58qr5kz/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
        ></spline-viewer>
      </div>

      {/* Overlay controls */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 z-10 pointer-events-none">
        <div className="flex flex-col items-center animate-bounce">
            <span className="text-[9px] tracking-[0.5em] text-gray-400 mb-4 opacity-60">ENTER</span>
            <div className="w-[1px] h-8 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
