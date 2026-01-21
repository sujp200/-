
import React from 'react';
import { team, partners } from '../data';

const About: React.FC = () => {
  return (
    <div className="px-8 max-w-[1920px] mx-auto overflow-hidden">
      {/* Studio Philosophy Section */}
      <section className="flex flex-col lg:flex-row gap-20 mb-40 items-center lg:items-start">
        <div className="lg:w-1/2">
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80" 
              alt="Studio Atmosphere" 
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900" style={{ fontFamily: '"Pretendard", "OmniGothic", "Noto Sans KR", sans-serif' }}>
              뻐꾸기인테리어
            </h2>
            <span className="text-sm font-sans tracking-[0.3em] text-gray-400 italic uppercase">BBEOGGUGI INTERIOR STUDIO</span>
          </div>
          
          <div className="space-y-12 max-w-lg text-sm md:text-base leading-relaxed">
            <div className="space-y-4">
              <p className="font-medium text-gray-900">
                우리는 공간이 단순히 머무는 장소를 넘어, 그 안에서 살아가는 이들의 가치관과 삶의 철학을 담아내는 그릇이어야 한다고 믿습니다.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We believe that a space should be more than just a place to stay; it should be a vessel that contains the values and philosophy of life of those who live in it.
              </p>
            </div>
            
            <div className="w-12 h-[1px] bg-black opacity-20"></div>

            <div className="space-y-4">
              <p className="font-medium text-gray-900">
                뻐꾸기인테리어는 미니멀한 건축적 접근을 통해 군더더기를 덜어내고, 본질에 집중하는 하이엔드 공간을 설계합니다.
              </p>
              <p className="text-gray-500 leading-relaxed">
                BBEOGGUGI Interior designs high-end spaces that focus on the essence by removing unnecessary elements through a minimalist architectural approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-40">
        <div className="flex flex-col items-center mb-24">
            <h3 className="text-[12px] tracking-[0.6em] mb-4 uppercase font-bold text-black">TEAM</h3>
            <div className="w-10 h-[1px] bg-gray-200"></div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 text-center max-w-6xl mx-auto">
          {team.map((member) => (
            <div key={member.id} className="flex flex-col items-center group">
              <div className="w-32 h-40 bg-gray-50 overflow-hidden mb-6 relative">
                <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
              </div>
              <h4 className="text-sm tracking-[0.2em] mb-1 font-bold text-gray-900">{member.name}</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Section (Scrolling Ticker) */}
      <section className="pb-40">
        <div className="flex flex-col items-center mb-16">
            <h3 className="text-[10px] tracking-[0.6em] mb-4 uppercase font-bold text-gray-400">PARTNERS</h3>
            <div className="w-10 h-[1px] bg-gray-100"></div>
        </div>
        
        <div className="relative w-full overflow-hidden py-10">
          <div className="animate-ticker flex">
            {/* Repeat the list multiple times for infinite scroll feel */}
            {[...partners, ...partners, ...partners, ...partners].map((partner, idx) => (
              <div key={idx} className="flex-shrink-0 px-12 md:px-20">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-10 md:h-12 w-auto object-contain grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
