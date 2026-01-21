
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="px-6 md:px-12 max-w-[2000px] mx-auto pb-40">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Fixed Content */}
        <aside className="lg:w-[380px] xl:w-[450px] lg:shrink-0">
          <div className="lg:sticky lg:top-40 space-y-12">
            
            {/* Header Section */}
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-light mb-4 tracking-tighter leading-tight text-[#111111]">
                {project.title}
              </h1>
              <p className="eng-text-secondary text-[9px] uppercase font-bold tracking-[0.2em] opacity-40">
                {project.titleEn}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-gray-100 pt-10">
              {metaKeys.map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <span className="eng-text-secondary text-[8px] uppercase font-bold block opacity-40">
                    {label}
                  </span>
                  <span className="kor-bold text-[13px] leading-tight block text-[#111111] opacity-80">
                    {(project.info as any)[key]}
                  </span>
                </div>
              ))}
            </div>

            {/* Description Text */}
            <div className="space-y-8 pt-6">
              <p className="font-serif-kr text-[15px] leading-[1.9] text-[#333] tracking-tight">
                {project.descriptionKr}
              </p>
              <div className="w-8 h-[1px] bg-gray-200"></div>
              <p className="eng-text text-[12px] text-gray-400 font-light leading-relaxed tracking-wide">
                {project.descriptionEn}
              </p>
            </div>

            {/* Navigation Button */}
            <div className="pt-10">
              <button 
                onClick={() => navigate('/space')}
                className="group flex items-center gap-4 eng-text text-[10px] uppercase transition-all font-bold tracking-[0.2em] hover:text-[#9A9A9A]"
              >
                <span className="w-10 h-[1px] bg-black group-hover:bg-[#9A9A9A] transition-colors"></span>
                [ BACK TO ARCHIVE ]
              </button>
            </div>
          </div>
        </aside>

        {/* Right Column: Scrollable Gallery */}
        <section className="flex-grow space-y-12 md:space-y-20">
          {project.images.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative overflow-hidden bg-gray-50 cursor-zoom-in group transition-all duration-1000 ${
                idx % 4 === 0 ? 'aspect-[16/10]' : 'aspect-[4/5] max-w-[90%] mx-auto'
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img} 
                alt={`${project.title} detail ${idx}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
                loading="lazy"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700"></div>
            </div>
          ))}
        </section>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-2xl flex items-center justify-center p-8 md:p-20 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
        >
            <img 
                src={selectedImage} 
                alt="Fullscreen view" 
                className="max-w-full max-h-full object-contain animate-in fade-in zoom-in duration-700 shadow-2xl"
            />
            <button 
                className="absolute top-12 right-12 eng-text text-black text-[10px] font-bold uppercase hover:opacity-40 transition-opacity tracking-[0.3em]"
                onClick={() => setSelectedImage(null)}
            >
                [ EXIT VIEW ]
            </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
