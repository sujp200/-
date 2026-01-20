
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    // We'll set loaded to true after a short delay to allow the iframe to start rendering
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => {
      document.body.classList.remove('no-scroll');
      clearTimeout(timer);
    };
  }, []);

  const handleEnter = () => {
    navigate('/space');
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#FDFCF8]">
      {/* Loading Placeholder */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 z-10 pointer-events-none ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <span className="text-[10px] tracking-[0.5em] text-gray-300 animate-pulse uppercase">CUCKOO STUDIO ...</span>
      </div>

      {/* 3D Scene using Iframe for stability */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <iframe 
          src='https://my.spline.design/kingfisherinmotion-xvMb0vNdz0QV8nO1J58qr5kz/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="Cuckoo 3D Object"
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Click Overlay to capture the "Enter" action since iframe captures mouse events */}
      <div 
        className="absolute inset-0 z-20 cursor-pointer" 
        onClick={handleEnter}
      ></div>

      {/* Navigation Hint */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 z-30 pointer-events-none">
        <div className="flex flex-col items-center animate-bounce opacity-40">
            <span className="text-[8px] tracking-[0.8em] text-gray-500 mb-4 uppercase">Click to Explore</span>
            <div className="w-[1px] h-10 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
