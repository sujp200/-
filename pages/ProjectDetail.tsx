
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-xs tracking-widest text-gray-400">PROJECT NOT FOUND</span>
      </div>
    );
  }

  return (
    <div className="px-8 max-w-[1920px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-20">
        
        {/* Left Section: Info */}
        <div className="lg:w-1/3 lg:sticky lg:top-40 self-start">
          <h1 className="text-4xl lg:text-5xl font-serif mb-12 leading-tight">
            {project.title}
            <br />
            <span className="text-lg font-sans tracking-[0.2em] text-gray-400 uppercase">
              {project.titleEn}
            </span>
          </h1>

          <div className="space-y-4 mb-20">
            {Object.entries(project.info).map(([key, value]) => (
              <div key={key} className="flex border-b border-gray-100 py-2">
                <span className="w-32 text-[10px] tracking-widest text-gray-400 uppercase font-bold">
                  {key}
                </span>
                <span className="text-xs tracking-wider">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            {project.logos.map((logo, idx) => (
              <img 
                key={idx} 
                src={logo} 
                alt="Partner Logo" 
                className="h-8 grayscale opacity-50 hover:opacity-100 transition-opacity" 
              />
            ))}
          </div>
        </div>

        {/* Right Section: Visuals & Description */}
        <div className="lg:w-2/3 space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((img, idx) => (
              <div key={idx} className={`${idx % 3 === 0 ? 'md:col-span-2' : ''} overflow-hidden bg-gray-50`}>
                <img src={img} alt={`${project.title} visual ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="max-w-2xl">
            <div className="mb-12">
                <h4 className="text-[10px] tracking-[0.3em] text-gray-400 mb-6 uppercase">Design Philosophy</h4>
                <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap mb-8">
                  {project.descriptionKr}
                </p>
                <div className="w-8 h-[1px] bg-gray-200 mb-8"></div>
                <p className="text-sm leading-relaxed text-gray-400 italic">
                  {project.descriptionEn}
                </p>
            </div>
            
            <button 
                onClick={() => navigate('/space')}
                className="text-[10px] tracking-[0.4em] uppercase border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all"
            >
                Back to Space
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
