
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
        <span className="text-xs tracking-widest text-gray-400">PROJECT NOT FOUND</span>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 max-w-[2400px] mx-auto pb-40">
      {/* 1. Header & Text Info (At the Top) */}
      <section className="mb-20 max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end mb-16">
          <div className="lg:w-2/3">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {project.title}
            </h1>
            <p className="text-sm md:text-lg tracking-[0.2em] text-gray-400 uppercase font-light">
              {project.titleEn}
            </p>
          </div>
          <div className="lg:w-1/3 flex lg:justify-end">
             <button 
                onClick={() => navigate('/space')}
                className="text-[10px] tracking-[0.4em] uppercase border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all"
            >
                Back to Projects
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-gray-100 pt-12">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(project.info).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <span className="text-[9px] tracking-widest text-gray-400 uppercase font-bold block">
                  {key}
                </span>
                <span className="text-xs tracking-wider font-medium text-gray-800">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Philosophy Text */}
          <div className="space-y-8">
             <p className="text-sm md:text-base leading-relaxed text-gray-800 whitespace-pre-wrap">
              {project.descriptionKr}
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-gray-400 italic">
              {project.descriptionEn}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Compact Image Grid (Dense 10 columns to fit ~30 images in 3 rows) */}
      <section className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1 md:gap-2">
        {project.images.map((img, idx) => (
          <div 
            key={idx} 
            className="aspect-square overflow-hidden bg-gray-50 cursor-zoom-in group"
            onClick={() => setSelectedImage(img)}
          >
            <img 
                src={img} 
                alt={`${project.title} gallery ${idx}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                loading="lazy"
            />
          </div>
        ))}
      </section>

      {/* 3. Lightbox Modal */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
        >
            <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain shadow-2xl animate-in fade-in zoom-in duration-300"
            />
            <button 
                className="absolute top-8 right-8 text-black text-xs tracking-[0.3em] font-bold"
                onClick={() => setSelectedImage(null)}
            >
                CLOSE
            </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
