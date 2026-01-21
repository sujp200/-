
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

      {/* Team Section */}
      <section className="mb-60 max-w-lg">
        <div className="flex items-center gap-6 mb-16">
            <h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">OUR COLLECTIVE</h3>
            <div className="flex-grow h-[1px] bg-gray-100"></div>
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

      {/* Location Section - Refined with clearer Map UI */}
      <section className="mb-80">
        <div className="flex items-center gap-6 mb-16">
            <h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">LOCATION</h3>
            <div className="flex-grow h-[1px] bg-gray-100"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-24">
            <div className="lg:w-1/3 space-y-10">
                <div>
                    <span className="eng-text-secondary text-[9px] uppercase font-bold mb-3 block opacity-40 tracking-widest">Office Address</span>
                    <p className="kor-bold text-xl leading-relaxed mb-1">서울 중구 장충단로8길 18 4층</p>
                    <p className="eng-text-secondary text-[11px] uppercase font-medium text-gray-400 leading-snug">
                      4F, 18, Jangchungdan-ro 8-gil, Jung-gu, Seoul, Republic of Korea
                    </p>
                </div>
                <div>
                    <span className="eng-text-secondary text-[9px] uppercase font-bold mb-3 block opacity-40 tracking-widest">Contact Information</span>
                    <p className="kor-bold text-xl mb-1">010-4555-6764</p>
                    <p className="eng-text-secondary text-[11px] uppercase font-medium text-gray-400">info@bbeoggugi.com</p>
                </div>
                <div className="pt-4">
                  <a 
                      href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%20%EC%A4%91%EA%B5%AC%20%EC%9E%A5%EC%B6%A9%EB%8B%A8%EB%A1%9C8%EA%B8%B8%2018/address/14137837.525997277,4516315.656534208,%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%A4%91%EA%B5%AC%20%EC%9E%A5%EC%B6%A9%EB%8F%991%EA%B0%80%2059-3,new_addr?c=14137815.155705359,4516315.656534208,19,0,0,0,dh" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block eng-text text-[10px] uppercase border-b border-black/20 pb-1 hover:border-black transition-all font-bold tracking-[0.2em]"
                  >
                      [ OPEN NAVER MAP ]
                  </a>
                </div>
            </div>
            
            {/* Architectural Stylized Map Image */}
            <div className="lg:w-2/3 h-[500px] bg-[#f8f8f8] border border-gray-100 relative overflow-hidden group shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=1600&q=80" 
                  alt="Seoul Map Top View" 
                  className="w-full h-full object-cover grayscale brightness-[1.05] opacity-60 group-hover:scale-110 transition-transform duration-[8000ms] ease-out"
                />
                
                {/* Visual Map Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent"></div>

                {/* Marker with Precise Location Vibe */}
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="relative">
                        {/* Ripple Effect */}
                        <div className="w-20 h-20 border border-black/10 rounded-full animate-ping absolute -inset-0 m-auto"></div>
                        <div className="w-40 h-40 border border-black/[0.03] rounded-full absolute -inset-0 m-auto"></div>
                        
                        {/* Center Point */}
                        <div className="w-3 h-3 bg-black rounded-full relative z-10 shadow-xl border-2 border-white"></div>
                        
                        {/* Location Label Box */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-6 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-50 min-w-[200px] animate-in fade-in slide-in-from-bottom-2 duration-1000">
                           <span className="eng-text text-[9px] font-black uppercase tracking-[0.3em] block mb-2 text-black">BBEOGGUGI HQ</span>
                           <span className="kor-bold text-[11px] block leading-tight text-gray-400">서울 중구 장충단로8길 18 4층</span>
                        </div>
                    </div>
                </div>

                {/* Coordinates */}
                <div className="absolute bottom-10 left-10 opacity-20">
                    <div className="flex flex-col gap-1">
                      <span className="eng-text text-[8px] uppercase tracking-[0.5em] text-black">37°33'31.3"N</span>
                      <span className="eng-text text-[8px] uppercase tracking-[0.5em] text-black">127°00'19.8"E</span>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
