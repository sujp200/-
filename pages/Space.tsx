
import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data';

const Space: React.FC = () => {
  return (
    <div className="px-6 md:px-8 max-w-[2400px] mx-auto">
      {/* 
          Grid Responsiveness:
          - Mobile: 1 column
          - Small Tablet: 2 columns
          - Desktop: 3 columns
          - Large Desktop: 4 columns
          - Extra Large Desktop: 5 columns
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-10 md:gap-y-16">
        {projects.map((project) => (
          <Link 
            key={project.id} 
            to={`/space/${project.id}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
              <img 
                src={project.mainImage} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay on Hover for a more sophisticated look in dense grids */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
            </div>
            
            <div className="mt-4 space-y-1">
              <h3 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-900 line-clamp-1">
                {project.titleEn}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-[9px] tracking-widest text-gray-400 uppercase">
                  {project.info.usage}
                </span>
                <span className="text-[9px] text-gray-300 font-serif italic">
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
