
import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data';

const Space: React.FC = () => {
  return (
    <div className="px-6 md:px-12 max-w-[2400px] mx-auto">
      <div className="mb-24">
         <h2 className="text-5xl md:text-7xl font-serif mb-6 tracking-tighter text-[#111111]">Space Archive</h2>
         <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-[#111111]"></div>
            <p className="eng-text-secondary text-[10px] uppercase font-bold">Timeless Architectural Dialogue</p>
         </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-20">
        {projects.map((project) => (
          <Link 
            key={project.id} 
            to={`/space/${project.id}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 shadow-sm">
              <img 
                src={project.mainImage} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Refined Hover Overlay - No Wrapping Text */}
              <div className="absolute inset-0 bg-white/85 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[3px]">
                 <span className="kor-bold text-base md:text-lg lg:text-xl whitespace-nowrap translate-y-6 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-out px-4">
                   {project.title}
                 </span>
                 <div className="w-0 h-[1px] bg-[#111111]/30 mt-6 group-hover:w-12 transition-all duration-700 delay-200"></div>
                 <span className="eng-text-secondary text-[9px] uppercase mt-6 translate-y-6 group-hover:translate-y-0 transition-all duration-700 delay-300 font-bold tracking-[0.2em] whitespace-nowrap">
                    {project.info.usage}
                 </span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <h3 className="eng-text text-[11px] font-bold text-[#111111] line-clamp-1 uppercase tracking-wider">
                {project.titleEn}
              </h3>
              <div className="flex justify-between items-center">
                 <span className="eng-text-secondary text-[9px] uppercase font-bold opacity-60">
                    {project.info.site}
                 </span>
                 <span className="eng-text-secondary text-[10px] italic font-serif opacity-60">
                    {project.info.year}
                 </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Space;
