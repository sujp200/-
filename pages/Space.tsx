
import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data';

const Space: React.FC = () => {
  return (
    <div className="px-8 max-w-[1920px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
        {projects.map((project) => (
          <Link 
            key={project.id} 
            to={`/space/${project.id}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img 
                src={project.mainImage} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            {/* Minimalist info revealed on hover or kept underneath for accessibility */}
            <div className="mt-4 flex justify-between items-baseline opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-xs tracking-widest uppercase font-medium">{project.titleEn}</h3>
              <span className="text-[10px] text-gray-400 font-serif italic">{project.info.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Space;
