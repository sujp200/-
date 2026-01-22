
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLit, setIsLit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLightSwitch = () => {
    if (isLit) return;
    setIsLit(true);
    // Dramatic delay before entering the archive, allowing the logo to stay visible
    setTimeout(() => {
      navigate('/space');
    }, 3200);
  };

  return (
    <div 
      className={`relative w-full h-[100dvh] overflow-hidden flex items-center justify-center select-none transition-colors duration-[2500ms] ease-in-out ${
        isLit ? 'bg-[#FCFAF2]' : 'bg-[#E5E2DA]'
      }`}
      onClick={handleLightSwitch}
    >
      {/* 1. Background Logo: Emerges instantly with the light speed */}
      <div className={`absolute inset-0 flex items-center justify-center z-[10] transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) ${
        isLit ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[0.99] blur-[40px]'
      }`}>
        <div className="text-center space-y-8 md:space-y-10">
          <span className="eng-text text-[10px] md:text-[11px] tracking-[2.5em] text-gray-400 uppercase block ml-[2.5em]">Architecture & Space</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.45em] text-[#111111] mr-[-0.45em] leading-none transition-all duration-1000">BBEOGGUGI</h2>
        </div>
      </div>

      {/* 2. Floating Point & Light Assembly */}
      <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
        
        {/* LIGHT CONE: Originates from the top point */}
        <div 
          className={`absolute top-[14.8%] left-1/2 -translate-x-1/2 w-[1800px] h-[2000px] bg-gradient-to-b from-yellow-100/35 via-yellow-50/5 to-transparent transition-all duration-[2200ms] origin-top z-[20] ${
            isLit ? 'opacity-100 scale-100' : 'opacity-0 scale-y-0'
          }`}
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        ></div>

        {/* THE FLOATING OBJECT (The Stand) */}
        <div className={`relative z-[40] w-full h-full flex flex-col items-center justify-start pt-[15vh] transition-all duration-[1200ms] cubic-bezier(0.19, 1, 0.22, 1) ${
            isLit ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          
          {/* THE POINT: Interactive Core */}
          <div className="relative flex items-center justify-center z-50">
            {/* Pulsing Ripple circles (Only when not lit) */}
            {!isLit && (
              <>
                <div className="absolute w-12 h-12 border border-[#D4AF37]/30 rounded-full animate-[ripple_3s_infinite]"></div>
                <div className="absolute w-20 h-20 border border-[#D4AF37]/15 rounded-full animate-[ripple_3s_infinite_1s]"></div>
              </>
            )}

            {/* Solid Core Dot */}
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-1000 ${
                isLit ? 'bg-white shadow-[0_0_40px_10px_white] scale-125' : 'bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
            }`}></div>

            {/* Glowing Aura on Hover */}
            <div className={`absolute w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl transition-opacity duration-700 ${
                isHovered && !isLit ? 'opacity-100' : 'opacity-0'
            }`}></div>
          </div>

          {/* Stand Pole: Thin line fading into infinity */}
          <div className={`w-[0.6px] h-[75vh] bg-gradient-to-b from-[#D4AF37] via-[#C5A059] to-transparent relative origin-top`}>
             {/* Polished edge highlight */}
             <div className="absolute inset-y-0 left-0 w-full bg-white/30 blur-[0.2px]"></div>
          </div>
          
          {/* Ground Ambient Glow */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-[30vh] bg-yellow-100/10 blur-[140px] rounded-full transition-opacity duration-[2800ms] ${
              isLit ? 'opacity-100' : 'opacity-0'
          }`}></div>
        </div>
      </div>

      {/* 3. Invisible Interaction Zone */}
      {!isLit && (
        <div 
          className="absolute top-[10vh] left-1/2 -translate-x-1/2 w-40 h-40 z-[100] cursor-pointer"
          onClick={handleLightSwitch}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
           {/* Hint text appearing near the point */}
           <div className={`absolute top-20 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ${
             isHovered ? 'opacity-100 translate-y-4' : 'opacity-0 translate-y-0'
           }`}>
              <span className="eng-text text-[8px] tracking-[1.2em] text-[#D4AF37] uppercase whitespace-nowrap">Touch to Enlighten</span>
           </div>
        </div>
      )}

      {/* 4. Minimal Branding Navigation */}
      <div className={`absolute bottom-24 left-0 w-full text-center z-[110] transition-all duration-2000 ${
        isLit ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
      }`}>
        <div className="flex flex-col items-center gap-12">
          <div className="flex items-center gap-20">
            <div className="w-8 h-[0.5px] bg-black/5"></div>
            <span className="eng-text text-[10px] tracking-[2.5em] text-[#111111]/30 uppercase ml-[2.5em] font-medium">Beyond the Visible</span>
            <div className="w-8 h-[0.5px] bg-black/5"></div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default Home;
