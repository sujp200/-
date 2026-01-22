
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects as initialProjects } from '../data';
import { Project } from '../types';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    <div className="px-6 md:px-12 max-w-[2800px] mx-auto pb-60">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        {/* Project Info Sidebar - Sticky */}
        <aside className="lg:w-[380px] xl:w-[480px] lg:shrink-0">
          <div className="lg:sticky lg:top-40 space-y-16">
            
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-serif font-light tracking-tighter leading-tight text-[#111111]">
                {project.title}
              </h1>
              <p className="eng-text-secondary text-[10px] uppercase font-bold tracking-[0.3em] opacity-30">
                {project.titleEn}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-8 border-t border-gray-100 pt-12">
              {metaKeys.map(({ key, label }) => (
                <div key={key} className="space-y-1.5">
                  <span className="eng-text-secondary text-[8px] uppercase font-bold block opacity-40 tracking-widest">
                    {label}
                  </span>
                  <span className="kor-bold text-[13px] leading-tight block text-[#111111] opacity-90">
                    {(project.info as any)[key]}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-10 pt-4">
              <p className="font-serif-kr text-[16px] leading-[2] text-[#333] tracking-tight whitespace-pre-line break-keep">
                {project.descriptionKr}
              </p>
              <div className="w-12 h-[1px] bg-gray-100"></div>
              <p className="eng-text text-[12px] text-gray-400 font-light leading-relaxed tracking-wide whitespace-pre-line">
                {project.descriptionEn}
              </p>
            </div>

            <div className="pt-12 border-t border-gray-50">
              <button 
                onClick={() => navigate('/space')}
                className="group flex items-center gap-6 eng-text text-[10px] uppercase transition-all font-black tracking-[0.3em] hover:text-[#9A9A9A]"
              >
                <div className="relative w-8 h-[1px] bg-black group-hover:bg-[#9A9A9A] transition-all overflow-hidden">
                   <div className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </div>
                ARCHIVE
              </button>
            </div>
          </div>
        </aside>

        {/* Dynamic 2-Column Masonry Section */}
        <section className="flex-grow">
          {/* Changed columns to 2 on most screens, 1 on small mobile, and reduced gap for close proximity */}
          <div className="columns-1 sm:columns-2 gap-2 space-y-2">
            {project.images.map((img, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden bg-gray-50 cursor-zoom-in group transition-all duration-1000 break-inside-avoid shadow-sm mb-2"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/1200x1600?text=Architecture+Detail')}
                  alt={`${project.title} detail ${idx}`} 
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-[4000ms] ease-out grayscale-[0.05] group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Archive Style Overlay - Integrated Title Overlay */}
                <div className="absolute inset-0 bg-white/85 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[4px] z-10">
                   <span className="kor-bold text-base md:text-xl lg:text-2xl whitespace-nowrap translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-out px-4 text-[#111111]">
                     {project.title}
                   </span>
                   <div className="w-0 h-[1.5px] bg-[#111111]/40 mt-6 group-hover:w-16 transition-all duration-700 delay-200"></div>
                   <span className="eng-text-secondary text-[10px] uppercase mt-6 translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-300 font-black tracking-[0.3em] whitespace-nowrap">
                      {project.info.usage}
                   </span>
                </div>

                {/* Subtle Visual Cues */}
                <div className="absolute top-6 left-6 opacity-40 group-hover:opacity-100 transition-opacity duration-1000 z-20">
                    <span className="eng-text text-[8px] font-black text-black/50 tracking-widest">
                      ARCHIVE / {String(idx + 1).padStart(2, '0')}
                    </span>
                </div>
              </div>
            ))}
          </div>
          
          {project.images.length === 0 && (
             <div className="py-40 border border-dashed border-gray-100 text-center">
                <span className="eng-text-secondary text-[11px] opacity-20 uppercase tracking-[0.5em] font-black">Archive Gallery Unavailable</span>
             </div>
          )}
        </section>

      </div>

      {/* High-Resolution Fullscreen View Modal */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out animate-in fade-in duration-700"
            onClick={() => setSelectedImage(null)}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                <img 
                    src={selectedImage} 
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/1920x1080?text=Preview+Unavailable')}
                    alt="Fullscreen view" 
                    className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
                />
            </div>
            <button 
                className="absolute top-8 right-8 md:top-16 md:right-16 eng-text text-black text-[11px] font-black uppercase hover:opacity-40 transition-opacity tracking-[0.4em]"
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
                [ CLOSE ]
            </button>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
                <span className="eng-text text-[8px] uppercase tracking-[0.6em]">BBEOGGUGI ARCHIVE PREVIEW</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
