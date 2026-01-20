
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Fix for spline-viewer TypeScript error: Define custom element in both global JSX and React.JSX namespaces.
// This ensures the element is recognized regardless of the specific TypeScript or React configuration.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'spline-viewer': any;
      }
    }
  }
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add Spline viewer script if not already present. This is essential for the <spline-viewer> web component to function.
    const scriptId = 'spline-viewer-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.0.28/build/spline-viewer.js';
      document.head.appendChild(script);
    }

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
