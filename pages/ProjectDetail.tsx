
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
    <div className="px-6 md:px-12 max-w-[1800px] mx-auto pb-60">
      {/* 1. Header & Text Info */}
      <section className="mb-40 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end mb-24">
          <div className="lg:w-3/4">
            <h1 className="text-5xl md:text-8xl font-serif font-light mb-8 tracking-tighter leading-[0.9] text-[#111111]">
              {project.title}
            </h1>
            <p className="eng-text-secondary text-[10px] md:text-xs uppercase font-bold">
              {project.titleEn}
            </p>
          </div>
          <div className="lg:w-1/4 flex lg:justify-end">
             <button 
                onClick={() => navigate('/space')}
                className="eng-text text-[10px] uppercase border-b border-[#111111] pb-1 hover:text-[#9A9A9A] hover:border-[#9A9A9A] transition-all font-bold"
            >
                [ ALL SPACE ]
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 border-t border-gray-100 pt-16">
          {/* Metadata Grid (Left) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-x-12 gap-y-12">
            {metaKeys.map(({ key, label }) => (
              <div key={key} className="space-y-3">
                <span className="eng-text-secondary text-[9px] uppercase font-bold block">
                  {label}
                </span>
                <span className="kor-bold text-sm leading-tight block">
                  {(project.info as any)[key]}
                </span>
              </div>
            ))}
          </div>

          {/* Philosophy Text (Right - Soft Serif Style) */}
          <div className="lg:col-span-7 space-y-12">
             <p className="font-serif-kr text-xl md:text-2xl">
              {project.descriptionKr}
            </p>
            <div className="w-12 h-[1px] bg-gray-100"></div>
            <p className="eng-text text-sm md:text-base text-[#9A9A9A] font-light italic">
              {project.descriptionEn}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Image Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {project.images.map((img, idx) => (
          <div 
            key={idx} 
            className={`overflow-hidden bg-gray-50 cursor-zoom-in group ${
                idx % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <img 
                src={img} 
                alt={`${project.title} gallery ${idx}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
                loading="lazy"
            />
          </div>
        ))}
      </section>

      {/* 3. Lightbox Modal */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
        >
            <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain animate-in fade-in zoom-in duration-500"
            />
            <button 
                className="absolute top-10 right-10 eng-text text-black text-[10px] font-bold uppercase hover:opacity-50 transition-opacity"
                onClick={() => setSelectedImage(null)}
            >
                [ ESC ]
            </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
