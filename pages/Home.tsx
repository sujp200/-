
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLit, setIsLit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLightSwitch = () => {
    if (isLit) return;
    setIsLit(true);
    
    // Sequence: Light turns on -> Pole moves up -> Navigate
    setTimeout(() => {
      navigate('/space');
    }, 3200);
  };

  return (
    <div 
      className={`relative w-full h-[100dvh] overflow-hidden flex items-center justify-center select-none transition-colors duration-[1500ms] ease-in-out ${
        isLit ? 'bg-[#FDFCF8]' : 'bg-[#EAE7E0]'
      }`}
      onClick={handleLightSwitch}
    >
      {/* 1. Background Logo (Centered & Foremost) */}
      <div className={`absolute inset-0 flex items-center justify-center z-[100] transition-all duration-[2500ms] cubic-bezier(0.2, 0, 0.2, 1) ${
        isLit ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-xl'
      }`}>
        <div className="text-center space-y-6">
          <span className="eng-text text-[10px] tracking-[1.8em] text-gray-400 uppercase block ml-[1.8em]">Architecture & Space</span>
          <h2 className="text-6xl md:text-8xl font-bold tracking-[0.4em] text-[#111111] mr-[-0.4em]">BBEOGGUGI</h2>
        </div>
      </div>

      {/* 2. Ambient Shadow Overlay */}
      <div className={`absolute inset-0 bg-black/5 pointer-events-none transition-opacity duration-[1500ms] ${
        isLit ? 'opacity-0' : 'opacity-100'
      }`}></div>

      {/* 3. High-End Gold Stand Light */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center h-[70vh] z-20">
        
        {/* Lamp Head (FIXED - Stay in position) */}
        <div className={`relative z-30 transition-all duration-[2000ms] ${isLit ? 'scale-110' : 'scale-100'}`}>
          {/* Light Bloom */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-yellow-100/10 blur-[150px] transition-all duration-[2000ms] ${
            isLit ? 'opacity-100 scale-120' : 'opacity-0 scale-50'
          }`}></div>

          {/* Lamp Head Silhouette */}
          <div className="relative flex flex-col items-center">
             <div className="w-[1px] h-12 bg-gradient-to-b from-[#8E795E] to-[#C5A059]"></div>
             <div className="w-10 h-5 md:w-14 md:h-7 bg-gradient-to-br from-[#D4AF37] via-[#C5A059] to-[#8E795E] rounded-t-full relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-white/50 transition-opacity duration-300 ${isLit ? 'opacity-100' : 'opacity-0'}`}></div>
             </div>
          </div>

          {/* Cone of Light */}
          <div 
            className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] h-[800px] bg-gradient-to-b from-yellow-100/30 via-yellow-50/2 to-transparent transition-all duration-[1500ms] origin-top ${
                isLit ? 'opacity-100 scale-100' : 'opacity-0 scale-y-0'
            }`}
            style={{ 
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              transform: 'translateX(-50%)'
            }}
          ></div>
        </div>

        {/* Lamp Pole & Base (MOVING - Slides upwards) */}
        <div className={`flex flex-col items-center h-full transition-all duration-[2500ms] ease-in-out ${
            isLit ? '-translate-y-[150%] opacity-0 scale-y-0' : 'translate-y-0 opacity-100 scale-y-100'
        }`}>
            {/* Lamp Pole */}
            <div className="w-[1.2px] h-full bg-gradient-to-b from-[#C5A059] via-[#D4AF37] to-[#A68948]"></div>
            {/* Lamp Base */}
            <div className="w-14 h-[1px] bg-[#8E795E]"></div>
        </div>

        {/* Click Trigger Area */}
        {!isLit && (
          <div 
            className="absolute inset-x-[-100px] inset-y-0 cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Interaction Cue */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-[#C5A059]/40 rounded-full flex items-center justify-center transition-all duration-700 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}>
               <div className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Floor Reflection */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-yellow-100/5 blur-[70px] rounded-full transition-opacity duration-[2000ms] ${
        isLit ? 'opacity-100' : 'opacity-0'
      }`}></div>

      {/* 5. Instruction Text */}
      <div className={`absolute bottom-16 left-0 w-full text-center z-[100] transition-all duration-1000 ${
        isLit ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <div className="flex flex-col items-center gap-5">
          <span className="eng-text text-[9px] tracking-[1.5em] text-[#111111]/40 uppercase ml-[1.5em]">Click light to reveal space</span>
          <div className="w-14 h-[1px] bg-[#111111]/10"></div>
        </div>
      </div>

      {/* 6. Activation Flash */}
      <div className={`absolute inset-0 bg-white z-[200] pointer-events-none transition-opacity duration-300 ${
        isLit ? 'opacity-0' : 'hidden'
      }`}></div>
    </div>
  );
};

export default Home;
