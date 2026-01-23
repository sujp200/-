
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects as initialProjects } from '../data';
import { Project } from '../types';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activePlanIdx, setActivePlanIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedProjects = localStorage.getItem('bbeoggugi_projects');
    const currentProjects = savedProjects ? JSON.parse(savedProjects) : initialProjects;
    const found = currentProjects.find((p: Project) => p.id === id);
    setProject(found || null);
  }, [id]);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="eng-text-secondary text-xs font-bold">PROJECT NOT FOUND</span>
      </div>
    );
  }

  const metaKeys = [
    { key: 'design', label: 'Design' },
    { key: 'construction', label: 'Construction' },
    { key: 'photograph', label: 'Photograph' },
    { key: 'year', label: 'Year' },
    { key: 'site', label: 'Site' },
    { key: 'usage', label: 'Usage' },
    { key: 'area', label: 'Area' },
    { key: 'scope', label: 'Scope' }
  ];

  return (
    <div className="px-6 md:px-12 max-w-[2800px] mx-auto pb-40">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start relative">
        
        <aside className="lg:w-[320px] xl:w-[440px] lg:shrink-0 lg:sticky lg:top-6">
          <div className="space-y-6">
            
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl kor-bold tracking-tight leading-tight text-[#111111]">
                {project.title}
              </h1>
              <p className="eng-text-secondary text-[10px] uppercase font-bold tracking-[0.3em] opacity-30">
                {project.titleEn}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-gray-100 pt-5">
              {metaKeys.map(({ key, label }) => (
                <div key={key} className="space-y-0.5">
                  <span className="eng-text-secondary text-[8px] uppercase font-bold block opacity-40 tracking-widest leading-none mb-1">
                    {label}
                  </span>
                  <span className="kor-bold text-[11px] md:text-[12px] leading-tight block text-[#111111] opacity-90">
                    {(project.info as any)[key]}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
              <p className="font-serif-kr text-[14px] leading-[1.8] text-[#333] tracking-tight whitespace-pre-line break-keep">
                {project.descriptionKr}
              </p>
              <p className="eng-text text-[10px] text-gray-400 font-light leading-relaxed tracking-wide whitespace-pre-line">
                {project.descriptionEn}
              </p>
            </div>

            {project.floorPlans && project.floorPlans.length > 0 && (
              <div className="pt-6 border-t border-gray-50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="eng-text text-[8px] font-black uppercase tracking-[0.4em] opacity-30">SKETCHUP 2D PLAN</span>
                  {project.floorPlans.length > 1 && (
                    <div className="flex gap-2">
                      {project.floorPlans.map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => setActivePlanIdx(i)}
                          className={`eng-text text-[9px] font-black w-7 h-7 flex items-center justify-center transition-all ${
                            activePlanIdx === i 
                              ? 'bg-black text-white' 
                              : 'bg-gray-50 text-gray-300 hover:text-black'
                          }`}
                        >
                          {i + 1}F
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div 
                  className="bg-white border border-gray-100 p-3 rounded-sm cursor-zoom-in hover:border-gray-300 transition-all group relative overflow-hidden"
                  onClick={() => setSelectedImage(project.floorPlans[activePlanIdx])}
                >
                  <img 
                    key={activePlanIdx}
                    src={project.floorPlans[activePlanIdx]} 
                    alt={`Floor Plan ${activePlanIdx + 1}`} 
                    className="w-full h-auto opacity-80 group-hover:opacity-100 transition-all duration-700 mix-blend-multiply filter contrast-[1.1] brightness-[1.02]" 
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x600?text=Drawing+Loading..."; }}
                  />
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-gray-50">
              <button 
                onClick={() => navigate('/space')}
                className="group flex items-center gap-4 eng-text text-[10px] uppercase transition-all font-black tracking-[0.3em] hover:text-[#9A9A9A]"
              >
                <div className="relative w-6 h-[1.5px] bg-black group-hover:bg-[#9A9A9A] transition-all overflow-hidden">
                   <div className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </div>
                ARCHIVE
              </button>
            </div>
          </div>
        </aside>

        <section className="flex-grow w-full">
          <div className="columns-1 sm:columns-2 gap-4 space-y-4">
            {project.images.map((img, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden bg-gray-50 cursor-zoom-in group transition-all duration-1000 break-inside-avoid shadow-sm mb-4"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/1200x1600?text=Architecture+Detail')}
                  alt={`${project.title} detail ${idx}`} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out grayscale-[0.05] group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

      </div>

      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4 md:p-12 cursor-zoom-out animate-in fade-in duration-500"
            onClick={() => setSelectedImage(null)}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                <img 
                    src={selectedImage} 
                    alt="Fullscreen view" 
                    className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-500 mix-blend-multiply"
                />
            </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
