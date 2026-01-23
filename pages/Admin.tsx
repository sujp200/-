
import React, { useState, useEffect } from 'react';
import { projects as initialProjects } from '../data';
import { Project } from '../types';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  type: string;
  date: string;
  message?: string;
  content?: string;
  address?: string;
  size?: string;
  budget?: string;
  schedule?: string;
  referral?: string;
  portfolioUrl?: string;
  customFields?: { [key: string]: string };
}

const Admin: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'design' | 'settings'>('projects');
  const [settingsSubTab, setSettingsSubTab] = useState<'about' | 'space' | 'contact' | 'career'>('about');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [expandedInquiryId, setExpandedInquiryId] = useState<number | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  
  const [designSettings, setDesignSettings] = useState<any>({ 
    primaryColor: '#111111', 
    secondaryColor: '#9A9A9A', 
    baseFontSize: 16, 
    mainFont: 'sans', 
    useCustomFont: false, 
    customFontBase64: '',
    fontName: '' 
  });
  
  const [aboutContent, setAboutContent] = useState<any>({ mainTitle: '', subtitle: '', descKr1: '', descKr2: '', descEn: '', mainImage: '', addressKr: '', addressEn: '' });
  const [spaceHeader, setSpaceHeader] = useState<any>({ title: '', subtitle: '' });
  const [contactSettings, setContactSettings] = useState<any>({ title: '', subtitle: '', visibleFields: [] });
  const [careerContent, setCareerContent] = useState<any>({ mainTitle: '', mainImage: '', descKr: '', descEn: '', coreValues: [], benefits: [], positions: [] });

  useEffect(() => {
    loadAllData();
    if (sessionStorage.getItem('admin_auth') === 'true') setIsAuthorized(true);
  }, []);

  const loadAllData = () => {
    try {
      const savedProjects = localStorage.getItem('bbeoggugi_projects');
      setProjects(savedProjects ? JSON.parse(savedProjects) : initialProjects);
      
      const savedInquiries = localStorage.getItem('bbeoggugi_inquiries');
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

      setDesignSettings(JSON.parse(localStorage.getItem('admin_design_settings') || '{"primaryColor":"#111111","secondaryColor":"#9A9A9A","baseFontSize":16,"mainFont":"sans"}'));
      setAboutContent(JSON.parse(localStorage.getItem('bbeoggugi_about') || '{"mainTitle":"Art, Made\\nLivable","subtitle":"BBEOGGUGI Studio","descKr1":"","descKr2":"","descEn":"","mainImage":"","addressKr":"","addressEn":""}'));
      setSpaceHeader(JSON.parse(localStorage.getItem('bbeoggugi_space_header') || '{"title":"Space Archive","subtitle":"Timeless Architectural Dialogue"}'));
      setContactSettings(JSON.parse(localStorage.getItem('bbeoggugi_contact_settings') || '{"title":"Inquiry & Collaboration","subtitle":"Connect with BBEOGGUGI Studio","visibleFields":["address","size","schedule","budget","referral"]}'));
      
      const defaultCareer = { 
        mainTitle: '', mainImage: '', descKr: '', descEn: '', coreValues: [], benefits: [], 
        positions: [
          { title: 'Designer', subTitle: '경력 3년 이상', type: 'Full-time / Senior', desc: '하이엔드 주거 및 상업 공간 경험자.' },
          { title: 'Project Director', subTitle: '영상/마케팅', type: 'Full-time / Director', desc: '영상 제작 및 브랜드 마케팅 가능자. 브랜드의 가치를 영상으로 담아내고 소통할 수 있는 분을 찾습니다.' }
        ] 
      };
      setCareerContent(JSON.parse(localStorage.getItem('bbeoggugi_career_content') || JSON.stringify(defaultCareer)));
    } catch (e) { console.error("Load error:", e); }
  };

  const persistData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'ghks8122') {
      setIsAuthorized(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else { alert('비밀번호가 일치하지 않습니다.'); }
  };

  // --- Project Management ---
  const handleAddProject = () => {
    const newId = `project-${Date.now()}`;
    const newProj: Project = { 
      id: newId, title: '새 프로젝트', titleEn: 'NEW PROJECT', 
      mainImage: 'https://via.placeholder.com/800x1000?text=Upload+Image', 
      images: [], floorPlans: [], 
      info: { design: '', construction: '', photograph: '', year: '2024', site: 'Seoul', usage: 'Residential', area: '-', scope: 'Interior' }, 
      descriptionKr: '', descriptionEn: '', logos: [] 
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    persistData('bbeoggugi_projects', updated);
    setEditingProjectId(newId);
  };

  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      persistData('bbeoggugi_projects', updated);
      if (editingProjectId === id) setEditingProjectId(null);
    }
  };

  const handleProjectFileUpload = (e: React.ChangeEvent<HTMLInputElement>, projectId: string, type: 'main' | 'gallery' | 'floorPlan') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setProjects(prev => {
        const next = prev.map(p => {
          if (p.id !== projectId) return p;
          if (type === 'main') return { ...p, mainImage: base64 };
          if (type === 'gallery') return { ...p, images: [...p.images, base64] };
          if (type === 'floorPlan') return { ...p, floorPlans: [...p.floorPlans, base64] };
          return p;
        });
        persistData('bbeoggugi_projects', next);
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const updateProjectField = (projectId: string, field: string, value: any, infoKey?: string) => {
    setProjects(prev => {
      const next = prev.map(p => {
        if (p.id !== projectId) return p;
        if (field === 'info_nested' && infoKey) return { ...p, info: { ...p.info, [infoKey]: value } };
        return { ...p, [field]: value };
      });
      persistData('bbeoggugi_projects', next);
      return next;
    });
  };

  const removeProjectImage = (projectId: string, imgIdx: number, type: 'gallery' | 'floorPlan') => {
    setProjects(prev => {
      const next = prev.map(p => {
        if (p.id !== projectId) return p;
        if (type === 'gallery') return { ...p, images: p.images.filter((_, i) => i !== imgIdx) };
        return { ...p, floorPlans: p.floorPlans.filter((_, i) => i !== imgIdx) };
      });
      persistData('bbeoggugi_projects', next);
      return next;
    });
  };

  const reorderImage = (projectId: string, imgIdx: number, direction: 'left' | 'right') => {
    setProjects(prev => {
      const next = prev.map(p => {
        if (p.id !== projectId) return p;
        const newImages = [...p.images];
        const targetIdx = direction === 'left' ? imgIdx - 1 : imgIdx + 1;
        if (targetIdx < 0 || targetIdx >= newImages.length) return p;
        [newImages[imgIdx], newImages[targetIdx]] = [newImages[targetIdx], newImages[imgIdx]];
        return { ...p, images: newImages };
      });
      persistData('bbeoggugi_projects', next);
      return next;
    });
  };

  const setAsMainImage = (projectId: string, imageUrl: string) => {
    setProjects(prev => {
      const next = prev.map(p => p.id === projectId ? { ...p, mainImage: imageUrl } : p);
      persistData('bbeoggugi_projects', next);
      return next;
    });
  };

  // --- Career Nested Item Handlers ---
  const updateCareerItem = (type: 'coreValues' | 'benefits' | 'positions', index: number, field: string, value: any) => {
    const nextList = [...careerContent[type]];
    nextList[index] = { ...nextList[index], [field]: value };
    setCareerContent({ ...careerContent, [type]: nextList });
  };
  const addCareerItem = (type: 'coreValues' | 'benefits' | 'positions', defaultObj: any) => {
    setCareerContent({ ...careerContent, [type]: [...(careerContent[type] || []), defaultObj] });
  };
  const removeCareerItem = (type: 'coreValues' | 'benefits' | 'positions', index: number) => {
    setCareerContent({ ...careerContent, [type]: careerContent[type].filter((_:any, i:number) => i !== index) });
  };

  // --- Design & Settings Handlers ---
  const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesignSettings({ ...designSettings, customFontBase64: reader.result as string, useCustomFont: true, fontName: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const applyDesign = () => {
    persistData('admin_design_settings', designSettings);
    alert('디자인 설정이 적용되었습니다.');
    window.location.reload();
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#FDFCF8] flex items-center justify-center p-6 text-black">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-12 text-center">
          <h1 className="text-4xl font-serif tracking-widest uppercase">ADMIN</h1>
          <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-transparent border-b border-black/10 focus:border-black py-4 text-center text-2xl outline-none" placeholder="••••••••" />
          <button type="submit" className="w-full bg-black text-white py-5 rounded-full uppercase tracking-widest text-[10px] font-black">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="px-8 md:px-12 max-w-[1800px] mx-auto py-10 min-h-screen text-black">
      <div className="flex flex-col md:flex-row gap-16">
        <aside className="md:w-64 space-y-8 sticky top-10 h-fit">
           <nav className="flex flex-col gap-6">
              {(['projects', 'inquiries', 'design', 'settings'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left uppercase tracking-widest text-sm kor-bold transition-all ${activeTab === tab ? 'opacity-100 pl-4 border-l-2 border-black' : 'opacity-20 hover:opacity-100'}`}>{tab}</button>
              ))}
              <button onClick={() => { sessionStorage.removeItem('admin_auth'); window.location.reload(); }} className="text-left mt-10 opacity-20 hover:opacity-100 text-red-500 text-[10px] font-black uppercase tracking-widest">Logout</button>
           </nav>
        </aside>

        <div className="flex-grow pb-40">
          {activeTab === 'projects' && (
            <div className="space-y-8">
               <div className="flex justify-between items-end border-b pb-6">
                 <h3 className="kor-bold text-2xl">Project Archive</h3>
                 <button onClick={handleAddProject} className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">+ New Project</button>
               </div>
               <div className="grid grid-cols-1 gap-4">
                 {projects.map((p) => (
                   <div key={p.id} className={`border bg-white rounded-sm overflow-hidden shadow-sm transition-all ${editingProjectId === p.id ? 'ring-2 ring-black' : ''}`}>
                      <div className="p-4 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setEditingProjectId(editingProjectId === p.id ? null : p.id)}>
                           <img src={p.mainImage} className="w-10 h-14 object-cover border bg-gray-100" alt="" />
                           <span className="kor-bold text-sm">{p.title || 'Untitled'}</span>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => setEditingProjectId(editingProjectId === p.id ? null : p.id)} className="text-[10px] font-bold border px-6 py-2 rounded-full uppercase tracking-widest">{editingProjectId === p.id ? 'Close' : 'Edit'}</button>
                           <button onClick={(e) => handleDeleteProject(e, p.id)} className="text-[10px] font-bold border border-red-100 text-red-400 px-4 py-2 rounded-full uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors">Del</button>
                        </div>
                      </div>
                      {editingProjectId === p.id && (
                        <div className="p-8 space-y-12 animate-in slide-in-from-top-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                             <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase text-gray-400 border-b pb-1 block">Basic Information</label>
                                <div className="space-y-4">
                                  <div><label className="text-[8px] uppercase font-bold text-gray-300">Title (KR)</label><input className="w-full border-b p-2 kor-bold" value={p.title} onChange={e => updateProjectField(p.id, 'title', e.target.value)} /></div>
                                  <div><label className="text-[8px] uppercase font-bold text-gray-300">Title (EN)</label><input className="w-full border-b p-2 text-sm" value={p.titleEn} onChange={e => updateProjectField(p.id, 'titleEn', e.target.value)} /></div>
                                  <div>
                                    <label className="text-[8px] uppercase font-bold text-gray-300 block mb-2">Main Image</label>
                                    <div className="flex items-center gap-4">
                                       <img src={p.mainImage} className="w-16 h-20 object-cover border" alt="" />
                                       <div className="flex-grow">
                                          <input type="file" id={`main-img-input-${p.id}`} className="hidden" accept="image/*" onChange={e => handleProjectFileUpload(e, p.id, 'main')} />
                                          <label htmlFor={`main-img-input-${p.id}`} className="block w-full border border-black/10 p-3 text-center cursor-pointer hover:bg-gray-50 text-[10px] font-black uppercase tracking-widest">Change Main Image</label>
                                       </div>
                                    </div>
                                  </div>
                                  <div><label className="text-[8px] uppercase font-bold text-gray-300">Description (KR)</label><textarea className="w-full border p-2 text-xs" rows={4} value={p.descriptionKr} onChange={e => updateProjectField(p.id, 'descriptionKr', e.target.value)} /></div>
                                </div>
                             </div>
                             <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-gray-400 border-b pb-1 block">Detailed Specs</label>
                                <div className="grid grid-cols-2 gap-4">
                                   {Object.keys(p.info).map((key) => (
                                     <div key={key}>
                                       <label className="text-[8px] uppercase font-bold text-gray-300">{key}</label>
                                       <input className="w-full border-b py-1 text-xs" value={(p.info as any)[key]} onChange={e => updateProjectField(p.id, 'info_nested', e.target.value, key)} />
                                     </div>
                                   ))}
                                </div>
                             </div>
                          </div>

                          <div className="space-y-6">
                             <label className="text-[10px] font-black uppercase text-gray-400 border-b pb-1 block">Gallery Images (Sortable)</label>
                             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {p.images.map((img, imgIdx) => (
                                  <div key={imgIdx} className="relative group border rounded-sm overflow-hidden bg-gray-50">
                                     <img src={img} className="w-full aspect-[3/4] object-cover" alt="" />
                                     <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity p-2 text-center">
                                        <div className="flex gap-1 mb-2">
                                          <button onClick={() => reorderImage(p.id, imgIdx, 'left')} className="bg-white/20 text-white w-8 h-8 rounded-full hover:bg-white hover:text-black">←</button>
                                          <button onClick={() => reorderImage(p.id, imgIdx, 'right')} className="bg-white/20 text-white w-8 h-8 rounded-full hover:bg-white hover:text-black">→</button>
                                        </div>
                                        <button onClick={() => setAsMainImage(p.id, img)} className="bg-white text-black px-3 py-1 text-[8px] font-black rounded-full uppercase mb-1">Set Main</button>
                                        <button onClick={() => removeProjectImage(p.id, imgIdx, 'gallery')} className="bg-red-500 text-white px-3 py-1 text-[8px] font-black rounded-full uppercase">Remove</button>
                                     </div>
                                  </div>
                                ))}
                                <input type="file" id={`gallery-up-input-${p.id}`} className="hidden" accept="image/*" onChange={e => handleProjectFileUpload(e, p.id, 'gallery')} />
                                <label htmlFor={`gallery-up-input-${p.id}`} className="border-2 border-dashed flex flex-col items-center justify-center text-[10px] text-gray-300 hover:text-black transition-colors aspect-[3/4] font-black uppercase cursor-pointer">+ Add Image</label>
                             </div>
                          </div>
                          <button onClick={() => alert('프로젝트 내용이 저장되었습니다.')} className="w-full bg-black text-white py-4 font-black uppercase text-[10px]">Save Project Details</button>
                        </div>
                      )}
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-8">
               <h3 className="kor-bold text-2xl mb-8">Client Inquiries</h3>
               <div className="border rounded-sm overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left text-xs">
                     <thead className="bg-gray-50 uppercase text-gray-400 font-black border-b">
                       <tr><th className="p-4">Date</th><th className="p-4">Name</th><th className="p-4">Type</th><th className="p-4 text-right">Action</th></tr>
                     </thead>
                     <tbody className="divide-y">
                       {inquiries.map(inq => (
                         <React.Fragment key={inq.id}>
                          <tr onClick={() => setExpandedInquiryId(expandedInquiryId === inq.id ? null : inq.id)} className={`cursor-pointer transition-colors ${expandedInquiryId === inq.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}>
                            <td className="p-4 text-gray-400 italic">{new Date(inq.date).toLocaleDateString()}</td>
                            <td className="p-4 kor-bold">{inq.name}</td>
                            <td className="p-4 uppercase"><span className="border px-2 py-0.5 rounded-sm bg-white text-[9px]">{inq.type}</span></td>
                            <td className="p-4 text-right">
                                <button onClick={(e) => { e.stopPropagation(); if(confirm('삭제하시겠습니까?')) { const next = inquiries.filter(i => i.id !== inq.id); setInquiries(next); persistData('bbeoggugi_inquiries', next); } }} className="text-red-400 font-bold hover:underline px-4">Delete</button>
                            </td>
                          </tr>
                          {expandedInquiryId === inq.id && (
                            <tr>
                              <td colSpan={4} className="p-8 bg-gray-50 border-b">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                  <div><label className="text-[9px] uppercase font-black text-gray-400">Phone</label><p className="text-sm kor-bold">{inq.phone || '-'}</p></div>
                                  <div><label className="text-[9px] uppercase font-black text-gray-400">Email</label><p className="text-sm kor-bold">{inq.email || '-'}</p></div>
                                  <div><label className="text-[9px] uppercase font-black text-gray-400">Project Type</label><p className="text-sm kor-bold">{inq.type || '-'}</p></div>
                                  <div><label className="text-[9px] uppercase font-black text-gray-400">Address</label><p className="text-sm kor-bold">{inq.address || '-'}</p></div>
                                  <div><label className="text-[9px] uppercase font-black text-gray-400">Size</label><p className="text-sm kor-bold">{inq.size || '-'}</p></div>
                                  <div><label className="text-[9px] uppercase font-black text-gray-400">Budget</label><p className="text-sm kor-bold">{inq.budget || '-'}</p></div>
                                  <div className="col-span-full"><label className="text-[9px] uppercase font-black text-gray-400">Message</label><p className="text-sm kor-bold whitespace-pre-wrap mt-2 p-4 bg-white border">{inq.content || inq.message || 'No message provided.'}</p></div>
                                </div>
                              </td>
                            </tr>
                          )}
                         </React.Fragment>
                       ))}
                     </tbody>
                  </table>
               </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-12">
               <h3 className="kor-bold text-2xl border-b pb-6">Design Identity</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-10">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase text-gray-400 block">Colors</label>
                       <div className="flex items-center justify-between border-b pb-4">
                         <span className="text-xs kor-bold">Primary Color</span>
                         <input type="color" value={designSettings.primaryColor} onChange={e => setDesignSettings({...designSettings, primaryColor: e.target.value})} className="w-10 h-10 border-none cursor-pointer" />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase text-gray-400 block">System Font</label>
                       <div className="flex gap-4">
                          <button onClick={() => setDesignSettings({...designSettings, mainFont: 'sans', useCustomFont: false})} className={`flex-1 py-4 text-[10px] font-black uppercase border ${!designSettings.useCustomFont && designSettings.mainFont === 'sans' ? 'bg-black text-white' : 'bg-white'}`}>Sans (Gothic)</button>
                          <button onClick={() => setDesignSettings({...designSettings, mainFont: 'serif', useCustomFont: false})} className={`flex-1 py-4 text-[10px] font-black uppercase border ${!designSettings.useCustomFont && designSettings.mainFont === 'serif' ? 'bg-black text-white' : 'bg-white'}`}>Serif (Myeongjo)</button>
                       </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase text-gray-400 block">Custom Font Upload (.ttf, .woff)</label>
                    <div className="border-2 border-dashed p-10 text-center rounded-sm">
                       <input type="file" id="font-upload" className="hidden" accept=".ttf,.woff,.woff2" onChange={handleFontUpload} />
                       <label htmlFor="font-upload" className="block cursor-pointer font-black uppercase text-[10px] tracking-widest">{designSettings.fontName || 'Upload Font File'}</label>
                    </div>
                    {designSettings.useCustomFont && <button onClick={() => setDesignSettings({...designSettings, useCustomFont: false, fontName: ''})} className="text-red-400 text-[9px] uppercase font-bold underline">Reset Font</button>}
                  </div>
               </div>
               <button onClick={applyDesign} className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.5em] shadow-2xl">Apply Global Design</button>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-12">
               <div className="flex gap-8 border-b pb-6 overflow-x-auto">
                  {(['about', 'space', 'contact', 'career'] as const).map(sub => (
                    <button key={sub} onClick={() => setSettingsSubTab(sub)} className={`text-[10px] font-black uppercase tracking-widest ${settingsSubTab === sub ? 'text-black underline underline-offset-8' : 'text-gray-300'}`}>{sub}</button>
                  ))}
               </div>

               <div className="animate-in fade-in duration-500">
                  {settingsSubTab === 'about' && (
                    <div className="space-y-12">
                       <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-2 col-span-2 md:col-span-1"><label className="text-[9px] font-black text-gray-400 uppercase">Main Title</label><textarea value={aboutContent.mainTitle} onChange={e => setAboutContent({...aboutContent, mainTitle: e.target.value})} className="w-full border-b p-2 text-xl kor-bold" rows={2} /></div>
                          <div className="space-y-2 col-span-2 md:col-span-1"><label className="text-[9px] font-black text-gray-400 uppercase">Subtitle</label><input value={aboutContent.subtitle} onChange={e => setAboutContent({...aboutContent, subtitle: e.target.value})} className="w-full border-b p-2 text-sm" /></div>
                          <div className="space-y-2 col-span-2"><label className="text-[9px] font-black text-gray-400 uppercase">Address KR</label><input value={aboutContent.addressKr} onChange={e => setAboutContent({...aboutContent, addressKr: e.target.value})} className="w-full border-b p-2 text-sm" /></div>
                          <div className="space-y-2 col-span-2"><label className="text-[9px] font-black text-gray-400 uppercase">Philosophy KR 1</label><textarea value={aboutContent.descKr1} onChange={e => setAboutContent({...aboutContent, descKr1: e.target.value})} className="w-full border p-2 text-sm" rows={3} /></div>
                       </div>
                       <button onClick={() => { persistData('bbeoggugi_about', aboutContent); alert('About 설정 저장됨'); }} className="w-full bg-black text-white py-4 font-black uppercase text-[10px]">Save About Settings</button>
                    </div>
                  )}

                  {settingsSubTab === 'career' && (
                    <div className="space-y-16">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-12">
                          <div className="space-y-4">
                             <label className="text-[10px] font-black text-gray-400 uppercase">Hero Section</label>
                             <div className="space-y-2"><label className="text-[8px] uppercase">Title</label><textarea value={careerContent.mainTitle} onChange={e => setCareerContent({...careerContent, mainTitle: e.target.value})} className="w-full border-b p-2 text-xl kor-bold" rows={2} /></div>
                             <div className="space-y-2"><label className="text-[8px] uppercase">Desc KR</label><textarea value={careerContent.descKr} onChange={e => setCareerContent({...careerContent, descKr: e.target.value})} className="w-full border p-2 text-sm" rows={3} /></div>
                          </div>
                       </div>

                       <div className="space-y-8">
                          <h4 className="text-xs font-black uppercase tracking-widest border-l-4 border-black pl-3">Core Values (인재상)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {careerContent.coreValues?.map((v:any, i:number) => (
                               <div key={i} className="border p-4 space-y-3 bg-white relative group">
                                  <button onClick={() => removeCareerItem('coreValues', i)} className="absolute top-2 right-2 text-red-400 text-[8px] uppercase font-bold opacity-0 group-hover:opacity-100">Remove</button>
                                  <input className="w-full border-b text-sm font-bold" value={v.kr} onChange={e => updateCareerItem('coreValues', i, 'kr', e.target.value)} placeholder="Value Title" />
                                  <textarea className="w-full border p-2 text-[11px]" value={v.desc} onChange={e => updateCareerItem('coreValues', i, 'desc', e.target.value)} rows={2} placeholder="Description" />
                               </div>
                             ))}
                             <button onClick={() => addCareerItem('coreValues', {kr:'', desc:''})} className="border-2 border-dashed py-10 text-[10px] font-black uppercase text-gray-300 hover:text-black transition-all">+ Add Value</button>
                          </div>
                       </div>

                       <div className="space-y-8">
                          <h4 className="text-xs font-black uppercase tracking-widest border-l-4 border-black pl-3">Benefits (복지 혜택)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             {careerContent.benefits?.map((b:any, i:number) => (
                               <div key={i} className="border p-4 space-y-3 bg-white relative group">
                                  <button onClick={() => removeCareerItem('benefits', i)} className="absolute top-2 right-2 text-red-400 text-[8px] uppercase font-bold opacity-0 group-hover:opacity-100">Remove</button>
                                  <input className="w-full border-b text-sm font-bold" value={b.kr} onChange={e => updateCareerItem('benefits', i, 'kr', e.target.value)} placeholder="Benefit Title" />
                                  <input className="w-full border-b text-[11px]" value={b.desc} onChange={e => updateCareerItem('benefits', i, 'desc', e.target.value)} placeholder="Description" />
                               </div>
                             ))}
                             <button onClick={() => addCareerItem('benefits', {kr:'', desc:''})} className="border-2 border-dashed py-6 text-[10px] font-black uppercase text-gray-300 hover:text-black transition-all">+ Add Benefit</button>
                          </div>
                       </div>

                       <div className="space-y-8">
                          <h4 className="text-xs font-black uppercase tracking-widest border-l-4 border-black pl-3">Open Positions (채용 공고)</h4>
                          <div className="space-y-6">
                             {careerContent.positions?.map((pos:any, i:number) => (
                               <div key={i} className="border p-8 space-y-6 bg-white relative group">
                                  <button onClick={() => removeCareerItem('positions', i)} className="absolute top-4 right-4 text-red-500 font-black text-[9px] uppercase">Remove</button>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                     <input className="w-full border-b text-lg font-bold" value={pos.title} onChange={e => updateCareerItem('positions', i, 'title', e.target.value)} placeholder="Title" />
                                     <input className="w-full border-b text-sm" value={pos.subTitle} onChange={e => updateCareerItem('positions', i, 'subTitle', e.target.value)} placeholder="Subtitle" />
                                     <input className="w-full border-b text-sm" value={pos.type} onChange={e => updateCareerItem('positions', i, 'type', e.target.value)} placeholder="Type" />
                                  </div>
                                  <textarea className="w-full border p-4 text-[13px]" value={pos.desc} onChange={e => updateCareerItem('positions', i, 'desc', e.target.value)} rows={4} placeholder="Description..." />
                               </div>
                             ))}
                             <button onClick={() => addCareerItem('positions', {title:'', subTitle:'', type:'', desc:''})} className="w-full border-2 border-dashed py-16 text-[11px] font-black uppercase text-gray-300 hover:text-black transition-all">+ Add New Position</button>
                          </div>
                       </div>
                       <button onClick={() => { persistData('bbeoggugi_career_content', careerContent); alert('Career 전체 설정 저장됨'); }} className="w-full bg-black text-white py-6 font-black uppercase text-[12px] tracking-[0.5em] sticky bottom-4 shadow-2xl">Final Save All Career Content</button>
                    </div>
                  )}

                  {settingsSubTab === 'contact' && (
                    <div className="space-y-8">
                       <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase">Page Title</label><input value={contactSettings.title} onChange={e => setContactSettings({...contactSettings, title: e.target.value})} className="w-full border-b p-2 text-xl" /></div>
                          <div className="space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase">Page Subtitle</label><input value={contactSettings.subtitle} onChange={e => setContactSettings({...contactSettings, subtitle: e.target.value})} className="w-full border-b p-2 text-sm" /></div>
                       </div>
                       <button onClick={() => { persistData('bbeoggugi_contact_settings', contactSettings); alert('Contact 설정 저장됨'); }} className="w-full bg-black text-white py-4 font-black uppercase text-[10px]">Save Contact Settings</button>
                    </div>
                  )}

                  {settingsSubTab === 'space' && (
                    <div className="space-y-8">
                       <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase">Archive Title</label><input value={spaceHeader.title} onChange={e => setSpaceHeader({...spaceHeader, title: e.target.value})} className="w-full border-b p-2 text-xl kor-bold" /></div>
                          <div className="space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase">Archive Subtitle</label><input value={spaceHeader.subtitle} onChange={e => setSpaceHeader({...spaceHeader, subtitle: e.target.value})} className="w-full border-b p-2 text-sm" /></div>
                       </div>
                       <button onClick={() => { persistData('bbeoggugi_space_header', spaceHeader); alert('Archive 헤더 저장됨'); }} className="w-full bg-black text-white py-4 font-black uppercase text-[10px]">Save Space Header</button>
                    </div>
                  )}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
