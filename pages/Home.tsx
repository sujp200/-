
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);

  const handleEnter = () => {
    setIsOpening(true);
    setTimeout(() => {
      navigate('/space');
    }, 1400);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#0D0B0A] flex items-center justify-center cursor-pointer" onClick={handleEnter}>
      
      {/* Background Reveal (The glowing core) */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#FDFCF8] overflow-hidden">
          <div className={`transition-all duration-1200 delay-200 ${isOpening ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
              <div className="text-center space-y-6">
                  <span className="eng-text text-[10px] tracking-[1.5em] text-gray-400 uppercase">Architecture & Interior</span>
                  <h2 className="text-6xl font-bold tracking-[0.5em] text-[#111111] mr-[-0.5em]">BBEOGGUGI</h2>
              </div>
          </div>
          {/* Central Glow Light Bloom */}
          <div className={`absolute inset-0 bg-yellow-50/20 mix-blend-screen transition-opacity duration-1000 ${isOpening ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      {/* Parting Wood Doors */}
      <div className="absolute inset-0 z-20 flex pointer-events-none">
        {/* Left Wood Door */}
        <div 
          className={`w-1/2 h-full bg-[#1C1815] shadow-[30px_0_60px_rgba(0,0,0,0.6)] transition-transform duration-[1400ms] ease-[cubic-bezier(0.7,0,0.15,1)] flex items-center justify-end relative overflow-hidden ${isOpening ? '-translate-x-full' : 'translate-x-0'}`}
          style={{ 
            backgroundImage: 'linear-gradient(115deg, #1C1815 0%, #2D2621 100%)',
          }}
        >
          {/* Subtle Wood Texture Overlay */}
          <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/black-linen-2.png')]"></div>
          
          <div className="mr-[-2px] md:mr-[-4px] relative z-10">
             <h1 className={`text-3xl md:text-7xl font-bold tracking-[0.2em] transition-all duration-700 uppercase text-[#E5D1BC] ${isOpening ? 'opacity-0 blur-lg' : 'opacity-100'}`}>Bbeog</h1>
          </div>

          {/* Warm Edge Glow - Left Side of Gap */}
          {!isOpening && (
              <div className="absolute top-0 right-0 w-[6px] h-full bg-gradient-to-l from-yellow-200/30 to-transparent blur-md"></div>
          )}
        </div>

        {/* Right Wood Door */}
        <div 
          className={`w-1/2 h-full bg-[#1C1815] shadow-[-30px_0_60px_rgba(0,0,0,0.6)] transition-transform duration-[1400ms] ease-[cubic-bezier(0.7,0,0.15,1)] flex items-center justify-start relative overflow-hidden ${isOpening ? 'translate-x-full' : 'translate-x-0'}`}
          style={{ 
            backgroundImage: 'linear-gradient(245deg, #1C1815 0%, #2D2621 100%)',
          }}
        >
          {/* Subtle Wood Texture Overlay */}
          <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/black-linen-2.png')]"></div>

          <div className="ml-[-2px] md:ml-[-4px] relative z-10">
             <h1 className={`text-3xl md:text-7xl font-bold tracking-[0.2em] transition-all duration-700 uppercase text-[#E5D1BC] ${isOpening ? 'opacity-0 blur-lg' : 'opacity-100'}`}>gugi</h1>
          </div>

          {/* Warm Edge Glow - Right Side of Gap */}
          {!isOpening && (
              <div className="absolute top-0 left-0 w-[6px] h-full bg-gradient-to-r from-yellow-200/30 to-transparent blur-md"></div>
          )}
        </div>
      </div>

      {/* Navigation Hint */}
      <div className={`absolute inset-0 flex flex-col items-center justify-end pb-24 z-30 pointer-events-none transition-opacity duration-500 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center gap-8">
            <span className="text-[10px] tracking-[1.2em] text-[#E5D1BC]/30 uppercase font-light">Explore the Essence</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-yellow-200/20 via-[#E5D1BC]/10 to-transparent"></div>
        </div>
      </div>

      {/* Center Line Shadow */}
      {!isOpening && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="w-[1px] h-full bg-black/40"></div>
          </div>
      )}
    </div>
  );
};

export default Home;
