
import React from 'react';
import { team } from '../data';

const About: React.FC = () => {
  return (
    <div className="px-8 max-w-[1920px] mx-auto">
      {/* CEO Section */}
      <section className="flex flex-col lg:flex-row gap-20 mb-40 items-center lg:items-start">
        <div className="lg:w-1/2">
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            <img 
              src="https://picsum.photos/id/447/1000/1200" 
              alt="CEO Representative" 
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-serif mb-12">
            뻐꾸기인테리어
            <br />
            <span className="text-sm font-sans tracking-[0.2em] text-gray-400 italic">CUCKOO INTERIOR STUDIO</span>
          </h2>
          
          <div className="space-y-8 max-w-lg text-sm leading-relaxed">
            <div>
              <p className="mb-4">
                우리는 공간이 단순히 머무는 장소를 넘어, 그 안에서 살아가는 이들의 가치관과 삶의 철학을 담아내는 그릇이어야 한다고 믿습니다.
              </p>
              <p className="text-gray-400">
                We believe that a space should be more than just a place to stay; it should be a vessel that contains the values and philosophy of life of those who live in it.
              </p>
            </div>
            
            <div className="w-12 h-[1px] bg-black"></div>

            <div>
              <p className="mb-4">
                뻐꾸기인테리어는 미니멀한 건축적 접근을 통해 군더더기를 덜어내고, 본질에 집중하는 하이엔드 공간을 설계합니다.
              </p>
              <p className="text-gray-400">
                Cuckoo Interior designs high-end spaces that focus on the essence by removing unnecessary elements through a minimalist architectural approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h3 className="text-[10px] tracking-[0.5em] text-center mb-20 uppercase font-bold">The Team</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center max-w-5xl mx-auto">
          {team.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-6 border border-gray-100">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <h4 className="text-xs tracking-widest mb-1 font-bold">{member.name}</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
