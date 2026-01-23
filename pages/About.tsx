
import React, { useState, useEffect } from 'react';
import { team as initialTeam, channels as initialChannels } from '../data';
import { TeamMember, Channel } from '../types';

const About: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [content, setContent] = useState({
    mainTitle: 'Art, Made\nLivable',
    subtitle: 'BBEOGGUGI Studio',
    descKr1: '뻐꾸기 스튜디오는 삶의 방식과 취향을 섬세하게 해석해 예술적 감각과 건축적 사고가 어우러진 공간을 설계합니다.',
    descKr2: '맥락을 존중한 구성과 절제된 선, 시간이 흐를수록 깊어지는 소재 선택을 통해 살아가며 자연스럽게 완성되는 공간을 만듭니다.',
    descEn: 'BBEOGGUGI Studio interprets the way you live to design spaces where artistic sensibility and architectural clarity meet. Through thoughtful composition, restrained lines, and materials chosen to age beautifully, we create spaces that evolve with everyday life.',
    mainImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    addressKr: '서울 중구 장충단로8길 18 4층',
    addressEn: '4F, 18, Jangchungdan-ro 8-gil, Jung-gu, Seoul, Republic of Korea'
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('bbeoggugi_about');
    if (savedContent) setContent(JSON.parse(savedContent));
    
    const savedTeam = localStorage.getItem('bbeoggugi_team');
    if (savedTeam) setTeam(JSON.parse(savedTeam));

    const savedChannels = localStorage.getItem('bbeoggugi_journal_channels');
    if (savedChannels) setChannels(JSON.parse(savedChannels));
  }, []);

  const subwayStations = [
    { name: '동대문역사문화공원역 (2·4·5호선)', exit: '4번 출구', dist: '도보 7분' },
    { name: '동대입구역 (3호선)', exit: '3번 출구', dist: '도보 6분' },
    { name: '청구역 (5·6호선)', exit: '1번 출구', dist: '도보 11분' }
  ];

  return (
    <div className="px-8 max-w-[1600px] mx-auto overflow-hidden">
      
      <section className="flex flex-col lg:flex-row gap-24 mb-60 items-center lg:items-start pt-20">
        <div className="lg:w-1/2">
          <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative shadow-2xl border border-gray-100 rounded-sm">
            <img 
              src={content.mainImage} 
              alt="Minimalist Design Object" 
              className="w-full h-full object-cover grayscale-[20%] brightness-[0.95]"
              loading="eager"
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="mb-24">
            <h2 className="text-7xl md:text-[8rem] font-serif font-light mb-10 tracking-tighter leading-[0.85] text-[#111111] whitespace-pre-line">
              {content.mainTitle}
            </h2>
            <div className="flex items-center gap-6">
                <div className="w-16 h-[1.5px] bg-[#111111]"></div>
                <span className="eng-text-secondary text-[11px] uppercase font-bold tracking-[0.3em]">{content.subtitle}</span>
            </div>
          </div>
          
          <div className="space-y-20 max-w-xl text-base md:text-lg leading-relaxed font-light">
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="kor-bold text-xl md:text-2xl leading-snug break-keep">
                  {content.descKr1}
                </p>
                <p className="font-serif-kr text-lg leading-loose text-[#333] break-keep">
                  {content.descKr2}
                </p>
              </div>
              
              <div className="pt-10 border-t border-gray-100">
                <p className="eng-text-secondary text-[13px] leading-relaxed uppercase tracking-wider mb-4 font-bold text-[#111111]">
                  Philosophy
                </p>
                <p className="eng-text text-[13px] text-gray-400 font-light leading-relaxed tracking-wide">
                  {content.descEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-60 max-w-lg">
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-3">
              <h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">OUR COLLECTIVE</h3>
              <div className="flex-grow h-[1px] bg-gray-100"></div>
          </div>
          <p className="kor-bold text-[13px] text-gray-400 tracking-tight ml-[1px]">공간을 함께 만들어가는 사람들</p>
        </div>
        
        <div className="space-y-10">
          {team.map((member, idx) => (
            <div key={member.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-10">
                <span className="eng-text text-[9px] text-gray-300 font-bold group-hover:text-black transition-colors">0{idx + 1}</span>
                <h4 className="kor-bold text-base md:text-lg text-[#111111]">{member.name}</h4>
              </div>
              <p className="eng-text-secondary text-[9px] uppercase font-bold text-gray-400 group-hover:text-black transition-colors">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-60">
        <div className="flex items-center gap-6 mb-16">
            <h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">LOCATION</h3>
            <div className="flex-grow h-[1px] bg-gray-100"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-24">
            <div className="lg:w-1/3 space-y-12">
                <div>
                    <span className="eng-text-secondary text-[9px] uppercase font-bold mb-4 block opacity-40 tracking-[0.3em]">Office Address</span>
                    <p className="kor-bold text-3xl leading-snug mb-3 text-[#111111]">{content.addressKr}</p>
                    <p className="eng-text-secondary text-[12px] uppercase font-medium text-gray-400 leading-relaxed tracking-wider">
                      {content.addressEn}
                    </p>
                </div>

                <div className="space-y-4">
                  <span className="eng-text-secondary text-[9px] uppercase font-bold mb-4 block opacity-40 tracking-[0.3em]">Public Transport</span>
                  <div className="space-y-3">
                    {subwayStations.map((station, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
                        <div className="flex flex-col">
                          <span className="kor-bold text-[13px] text-[#111111]">{station.name}</span>
                          <span className="text-[11px] text-gray-400">{station.exit} — {station.dist}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6">
                  <a 
                      href={`https://map.naver.com/v5/search/${encodeURIComponent(content.addressKr)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-6 group"
                  >
                      <div className="flex flex-col gap-1">
                        <span className="kor-bold text-[11px] tracking-[0.1em] text-[#111111]">네이버 지도로 보기</span>
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
                  <svg width="100%" height="100%" viewBox="0 0 1000 800">
                    <g stroke="black" strokeWidth="18" fill="none" opacity="0.06" strokeLinecap="round">
                        <path d="M500,50 L500,750" />
                        <path d="M100,400 L900,400" />
                    </g>
                    <g transform="translate(500, 100)">
                       <circle cx="0" cy="0" r="10" stroke="black" strokeWidth="1" fill="white" />
                       <circle cx="0" cy="0" r="3" fill="#2ECC71" />
                       <text x="0" y="30" textAnchor="middle" className="eng-text text-[10px] font-bold fill-gray-400">DDP (N)</text>
                    </g>
                    <g transform="translate(500, 700)">
                       <circle cx="0" cy="0" r="10" stroke="black" strokeWidth="1" fill="white" />
                       <circle cx="0" cy="0" r="3" fill="#FF8C00" />
                       <text x="0" y="30" textAnchor="middle" className="eng-text text-[10px] font-bold fill-gray-400">Dongguk Univ. (S)</text>
                    </g>
                    <g transform="translate(900, 400)">
                       <circle cx="0" cy="0" r="10" stroke="black" strokeWidth="1" fill="white" />
                       <circle cx="0" cy="0" r="3" fill="#A0522D" />
                       <text x="-15" y="5" textAnchor="end" className="eng-text text-[10px] font-bold fill-gray-400">Cheonggu (E)</text>
                    </g>
                  </svg>
                </div>
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="relative w-5 h-5 flex items-center justify-center">
                        <div className="absolute w-24 h-24 border border-black/[0.06] rounded-full animate-ping pointer-events-none"></div>
                        <div className="w-5 h-5 bg-black rounded-full relative z-50 border-[3.5px] border-white shadow-2xl"></div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                           <span className="eng-text text-[10px] font-black uppercase tracking-[0.6em] text-black bg-white/90 px-4 py-1.5 backdrop-blur-md shadow-sm whitespace-nowrap border border-black/[0.03]">
                             BBEOGGUGI HQ
                           </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Social Network Service Section with Large Icons below the Map */}
      <section className="mb-40 pt-20 border-t border-gray-100">
        <div className="flex flex-col items-center text-center mb-24">
           <h3 className="eng-text text-[10px] font-black uppercase tracking-[0.6em] text-gray-300 mb-6">SOCIAL NETWORK SERVICE</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {channels.map((ch) => (
            <a 
              key={ch.id} 
              href={ch.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group block relative"
            >
              <div className="aspect-square bg-white border border-gray-100 shadow-sm overflow-hidden rounded-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-4">
                  <div className="w-full h-full flex items-center justify-center relative">
                      {/* Grayscale Base Image */}
                      <img 
                        src={ch.thumbnail} 
                        className={`w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110`}
                        alt={ch.name}
                      />
                      
                      {/* Overlays for each channel to give color feedback on hover */}
                      {ch.id === 'blog' && (
                        <div className="absolute inset-0 bg-[#2DB400] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-10 text-white p-10">
                          <span className="text-7xl font-black mb-4">N</span>
                          <span className="eng-text text-[10px] font-bold uppercase tracking-widest">Naver Blog</span>
                        </div>
                      )}
                      {ch.id === 'yt' && (
                        <div className="absolute inset-0 bg-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-10 text-white p-10">
                          <div className="w-0 h-0 border-y-[20px] border-y-transparent border-l-[32px] border-l-white ml-2 mb-6"></div>
                          <span className="eng-text text-[10px] font-bold uppercase tracking-widest">YouTube Channel</span>
                        </div>
                      )}
                      {ch.id === 'insta' && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] opacity-0 group-hover:opacity-80 transition-opacity flex flex-col items-center justify-center z-10 text-white p-10">
                          <svg className="w-16 h-16 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                          <span className="eng-text text-[10px] font-bold uppercase tracking-widest">Instagram Official</span>
                        </div>
                      )}
                  </div>
              </div>
              <div className="mt-8 text-center">
                 <span className="eng-text text-[11px] font-black uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 transition-opacity">
                   {ch.name}
                 </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
