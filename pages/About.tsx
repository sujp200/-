
import React from 'react';
import { team } from '../data';

const About: React.FC = () => {
  return (
    <div className="px-8 max-w-[1600px] mx-auto overflow-hidden">
      {/* Studio Philosophy Section */}
      <section className="flex flex-col lg:flex-row gap-24 mb-60 items-center lg:items-start pt-20">
        <div className="lg:w-1/2">
          <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative shadow-2xl border border-gray-100 rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" 
              alt="High-end Architectural Space" 
              className="w-full h-full object-cover grayscale-[20%] brightness-[0.95]"
            />
            {/* Overlay for premium look */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="mb-24">
            <h2 className="text-7xl md:text-9xl font-serif font-light mb-10 tracking-tighter leading-[0.85] text-[#111111]">
              Essence of<br/>Silent Space
            </h2>
            <div className="flex items-center gap-6">
                <div className="w-16 h-[1.5px] bg-[#111111]"></div>
                <span className="eng-text-secondary text-[11px] uppercase font-bold">BBEOGGUGI Studio</span>
            </div>
          </div>
          
          <div className="space-y-20 max-w-xl text-base md:text-lg leading-relaxed font-light">
            <div className="space-y-8">
              <p className="kor-bold text-2xl leading-snug">
                우리는 공간이 사용자의 고유한 가치를 담아내는 예술적 그릇이라 믿습니다.
              </p>
              <p className="kor-bold text-lg leading-loose text-[#111111]">
                뻐꾸기인테리어는 단순한 시공을 넘어, 건축적 미학을 바탕으로 한 하이엔드 공간을 제안합니다. 우리는 각 프로젝트의 본질을 탐구하며, 최소한의 선과 고급스러운 소재로 시대를 초월한 가치를 창조합니다. 
              </p>
              <div className="pt-8 border-t border-gray-100">
                <p className="eng-text-secondary text-xs leading-relaxed uppercase">
                  BBEOGGUGI Studio proposes high-end spaces based on architectural aesthetics beyond simple construction. We explore the essence of each project and create timeless values with minimal lines and luxurious materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Dotted Illustrations */}
      <section className="mb-80">
        <div className="flex flex-col items-center mb-40">
            <h3 className="eng-text-secondary text-[12px] uppercase font-bold text-[#111111]">OUR COLLECTIVE</h3>
            <div className="w-12 h-[2px] bg-[#111111] mt-6"></div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 md:gap-32 text-center max-w-6xl mx-auto">
          {team.map((member) => (
            <div key={member.id} className="flex flex-col items-center group">
              <div className="w-36 h-36 md:w-52 md:h-52 mb-12 relative flex items-center justify-center p-10 transition-all duration-700">
                <div className="absolute inset-0 border-[1px] border-dashed border-gray-200 rounded-full group-hover:border-[#111111] group-hover:rotate-180 transition-all duration-1000 ease-in-out"></div>
                <img 
                    src={member.avatar} 
                    alt={member.role} 
                    className="w-full h-full object-contain grayscale opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                />
              </div>
              <h4 className="kor-bold text-xl mb-2">{member.name}</h4>
              <p className="eng-text-secondary text-[10px] uppercase font-bold">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
