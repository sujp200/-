
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Fix for custom element type definition in modern React/TypeScript environments.
// This ensures that 'spline-viewer' is recognized as a valid JSX element by the TypeScript compiler.
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { url?: string }, HTMLElement>;
      }
    }
  }
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    // Ensure the 3D loads
    const timer = setTimeout(() => setIsLoaded(true), 1500); 
    return () => {
      document.body.classList.remove('no-scroll');
      clearTimeout(timer);
    };
  }, []);

  const handleEnter = () => {
    navigate('/space');
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#FDFCF8] cursor-pointer" onClick={handleEnter}>
      {/* Loading Placeholder */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <span className="text-[10px] tracking-[0.5em] text-gray-300 animate-pulse uppercase">CUCKOO STUDIO ...</span>
      </div>

      {/* 3D Scene */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <spline-viewer 
          url="https://prod.spline.design/kingfisherinmotion-xvMb0vNdz0QV8nO1J58qr5kz/scene.splinecode"
        ></spline-viewer>
      </div>

      {/* Navigation Hint */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 z-10 pointer-events-none">
        <div className="flex flex-col items-center animate-bounce opacity-40">
            <span className="text-[8px] tracking-[0.8em] text-gray-500 mb-4 uppercase">Click to Explore</span>
            <div className="w-[1px] h-10 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
