
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
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop" 
              alt="Minimalist Design Object" 
              className="w-full h-full object-cover grayscale-[20%] brightness-[0.95]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="mb-24">
            <h2 className="text-7xl md:text-[8rem] font-serif font-light mb-10 tracking-tighter leading-[0.85] text-[#111111]">
              Art, Made<br/>Livable
            </h2>
            <div className="flex items-center gap-6">
                <div className="w-16 h-[1.5px] bg-[#111111]"></div>
                <span className="eng-text-secondary text-[11px] uppercase font-bold tracking-[0.3em]">BBEOGGUGI Studio</span>
            </div>
          </div>
          
          <div className="space-y-20 max-w-xl text-base md:text-lg leading-relaxed font-light">
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="kor-bold text-xl md:text-2xl leading-snug break-keep">
                  뻐꾸기 스튜디오는 삶의 방식과 취향을 섬세하게 해석해 예술적 감각과 건축적 사고가 어우러진 공간을 설계합니다.
                </p>
                <p className="font-serif-kr text-lg leading-loose text-[#333] break-keep">
                  맥락을 존중한 구성과 절제된 선, 시간이 흐를수록 깊어지는 소재 선택을 통해 살아가며 자연스럽게 완성되는 공간을 만듭니다.
                </p>
              </div>
              
              <div className="pt-10 border-t border-gray-100">
                <p className="eng-text-secondary text-[13px] leading-relaxed uppercase tracking-wider mb-4 font-bold text-[#111111]">
                  Philosophy
                </p>
                <p className="eng-text text-[13px] text-gray-500 leading-relaxed font-light">
                  BBEOGGUGI Studio interprets the way you live to design spaces where artistic sensibility and architectural clarity meet.
                  Through thoughtful composition, restrained lines, and materials chosen to age beautifully, we create spaces that evolve with everyday life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-60 max-w-lg">
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-3">
              <h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">OUR COLLECTIVE</h3>
              <div className="flex-grow h-[1px] bg-gray-100"></div>
          </div>
          <p className="kor-bold text-[13px] text-gray-400 tracking-tight ml-[1px]">공간을 함께 만들어가는 사람들</p>
        </div>
        
        <div className="space-y-10">
          {team.map((member) => (
            <div key={member.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-10">
                <span className="eng-text text-[9px] text-gray-300 font-bold group-hover:text-black transition-colors">0{member.id}</span>
                <h4 className="kor-bold text-base md:text-lg text-[#111111]">{member.name}</h4>
              </div>
              <p className="eng-text-secondary text-[9px] uppercase font-bold text-gray-400 group-hover:text-black transition-colors">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location Section */}
      <section className="mb-80">
        <div className="flex items-center gap-6 mb-16">
            <h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">LOCATION</h3>
            <div className="flex-grow h-[1px] bg-gray-100"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-24">
            <div className="lg:w-1/3 space-y-12">
                <div>
                    <span className="eng-text-secondary text-[9px] uppercase font-bold mb-4 block opacity-40 tracking-[0.3em]">Office Address</span>
                    <p className="kor-bold text-3xl leading-snug mb-3 text-[#111111]">서울 중구 장충단로8길 18 4층</p>
                    <p className="eng-text-secondary text-[12px] uppercase font-medium text-gray-400 leading-relaxed tracking-wider">
                      4F, 18, Jangchungdan-ro 8-gil, Jung-gu, Seoul, Republic of Korea
                    </p>
                </div>
                
                <div className="pt-6">
                  <a 
                      href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%20%EC%A4%91%EA%B5%AC%20%EC%9E%A5%EC%B6%A9%EB%8B%A8%EB%A1%9C8%EA%B8%B8%2018" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-6 group"
                  >
                      <div className="flex flex-col gap-1">
                        <span className="kor-bold text-[11px] tracking-[0.1em] text-[#111111]">
                          찾아오시는 길
                        </span>
                        <div className="w-full h-[1px] bg-black/10 relative overflow-hidden">
                           <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        </div>
                      </div>
                      <div className="w-10 h-10 border border-black/5 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                  </a>
                </div>
            </div>
            
            <div className="lg:w-2/3 h-[600px] bg-[#fcfcfc] border border-gray-100 relative overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
                <div className="absolute inset-0 z-10 p-12">
                  <svg width="100%" height="100%" viewBox="0 0 1000 800" className="transition-all duration-[15000ms] group-hover:scale-[1.01]">
                    <g stroke="black" strokeWidth="18" fill="none" opacity="0.06" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M450,-100 L420,150 L380,320 L300,500 L180,900" /> 
                        <path d="M-100,140 L420,150 L800,160 L920,450 L1100,480" />
                        <path d="M920,-100 L920,450 L910,900" strokeWidth="12" />
                        <path d="M380,320 L650,300 L920,450" strokeWidth="4" />
                    </g>
                    <g transform="translate(420, 150)" className="station-node">
                       <circle cx="0" cy="0" r="16" stroke="black" strokeWidth="1" fill="white" />
                       <circle cx="0" cy="0" r="4.5" fill="black" />
                       <text x="30" y="5" className="eng-text text-[13px] font-black uppercase tracking-widest fill-black/60">DDP EXIT 3, 4, 5</text>
                    </g>
                    <g transform="translate(300, 500)" className="station-node">
                       <circle cx="0" cy="0" r="16" stroke="black" strokeWidth="1" fill="white" />
                       <circle cx="0" cy="0" r="4.5" fill="black" />
                       <text x="-240" y="5" className="eng-text text-[13px] font-black uppercase tracking-widest fill-black/60 text-right">DONGGUK UNIV EXIT 3, 4</text>
                    </g>
                    <g transform="translate(920, 450)" className="station-node">
                       <circle cx="0" cy="0" r="16" stroke="black" strokeWidth="1" fill="white" />
                       <circle cx="0" cy="0" r="4.5" fill="black" />
                       <text x="30" y="5" className="eng-text text-[13px] font-black uppercase tracking-widest fill-black/60">CHEONGGU EXIT 1</text>
                    </g>
                  </svg>
                </div>
                <div className="absolute top-[38%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="relative flex flex-col items-center">
                        <div className="w-24 h-24 border border-black/[0.04] rounded-full animate-ping absolute -inset-0 m-auto"></div>
                        <div className="w-5 h-5 bg-black rounded-full relative z-50 border-[3.5px] border-white shadow-2xl scale-100 group-hover:scale-125 transition-transform duration-500"></div>
                        <div className="absolute top-8 text-center pointer-events-none">
                           <span className="eng-text text-[10px] font-black uppercase tracking-[0.6em] text-black bg-white/90 px-4 py-1.5 backdrop-blur-md shadow-sm whitespace-nowrap border border-black/[0.03]">
                             BBEOGGUGI HQ
                           </span>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-12 right-12 z-20 opacity-20 text-right space-y-1">
                   <div className="eng-text text-[9px] font-bold tracking-[0.5em] uppercase">Contextual Flow v3.0</div>
                   <div className="w-full h-[1.5px] bg-black mt-2"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.003] to-transparent h-44 w-full animate-[scan_22s_linear_infinite] pointer-events-none z-10"></div>
                <div className="absolute inset-0 border-[50px] border-white z-40 pointer-events-none shadow-inner"></div>
            </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          from { transform: translateY(-160%); }
          to { transform: translateY(750px); }
        }
      `}} />
    </div>
  );
};

export default About;
