
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
    e.stopPropagation(); // 부모 클릭 방지
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

  const reorderImage = (e: React.MouseEvent, projectId: string, imgIdx: number, direction: 'left' | 'right') => {
    e.preventDefault();
    e.stopPropagation();
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

  const setAsMainImage = (e: React.MouseEvent, projectId: string, imageUrl: string) => {
    e.preventDefault();
    e.stopPropagation();
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
    <div className="px-8 md:px-12 max-w-[1800px] mx-auto py-10 min-h-screen text-black font-sans">
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
                 <h3 className="kor-bold text-2xl uppercase tracking-tighter">Project Archive</h3>
                 <button onClick={handleAddProject} className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-transform hover:scale-105">+ New Project</button>
               </div>
               <div className="grid grid-cols-1 gap-4">
                 {projects.map((p) => (
                   <div key={p.id} className={`border bg-white rounded-sm overflow-hidden shadow-sm transition-all ${editingProjectId === p.id ? 'ring-1 ring-black' : ''}`}>
                      <div className="p-4 flex justify-between items-center bg-gray-50/30 cursor-pointer" onClick={() => setEditingProjectId(editingProjectId === p.id ? null : p.id)}>
                        <div className="flex items-center gap-4">
                           <img src={p.mainImage} className="w-10 h-14 object-cover border bg-gray-100" alt="" />
                           <div className="flex flex-col">
                             <span className="kor-bold text-sm">{p.title || 'Untitled Project'}</span>
                             <span className="text-[9px] uppercase text-gray-400 tracking-widest">{p.titleEn}</span>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={(e) => { e.stopPropagation(); setEditingProjectId(editingProjectId === p.id ? null : p.id); }} className="text-[10px] font-bold border px-6 py-2 rounded-full uppercase tracking-widest hover:bg-black hover:text-white transition-colors">{editingProjectId === p.id ? 'Close' : 'Edit'}</button>
                           <button onClick={(e) => handleDeleteProject(e, p.id)} className="text-[10px] font-bold border border-red-100 text-red-400 px-6 py-2 rounded-full uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors">Del</button>
                        </div>
                      </div>
                      {editingProjectId === p.id && (
                        <div className="p-8 space-y-12 animate-in slide-in-from-top-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                             <div className="space-y-8">
                                <label className="text-[10px] font-black uppercase text-gray-400 border-b pb-1 block tracking-[0.2em]">Basic Information</label>
                                <div className="space-y-6">
                                  <div><label className="text-[8px] uppercase font-bold text-gray-300 block mb-1">Title (KR)</label><input className="w-full border-b p-2 kor-bold outline-none focus:border-black" value={p.title} onChange={e => updateProjectField(p.id, 'title', e.target.value)} /></div>
                                  <div><label className="text-[8px] uppercase font-bold text-gray-300 block mb-1">Title (EN)</label><input className="w-full border-b p-2 text-sm outline-none focus:border-black" value={p.titleEn} onChange={e => updateProjectField(p.id, 'titleEn', e.target.value)} /></div>
                                  <div>
                                    <label className="text-[8px] uppercase font-bold text-gray-300 block mb-3">Main Poster Image</label>
                                    <div className="flex items-center gap-6">
                                       <img src={p.mainImage} className="w-20 h-28 object-cover border shadow-sm" alt="" />
                                       <div className="flex-grow">
                                          <input type="file" id={`main-img-input-${p.id}`} className="hidden" accept="image/*" onChange={e => handleProjectFileUpload(e, p.id, 'main')} />
                                          <label htmlFor={`main-img-input-${p.id}`} className="block w-full border border-black/10 py-4 text-center cursor-pointer hover:bg-gray-50 text-[10px] font-black uppercase tracking-widest">Replace Main Image</label>
                                       </div>
                                    </div>
                                  </div>
                                  <div><label className="text-[8px] uppercase font-bold text-gray-300 block mb-1">Description (KR)</label><textarea className="w-full border p-4 text-xs leading-relaxed outline-none focus:border-black" rows={4} value={p.descriptionKr} onChange={e => updateProjectField(p.id, 'descriptionKr', e.target.value)} /></div>
                                </div>
                             </div>
                             <div className="space-y-8">
                                <label className="text-[10px] font-black uppercase text-gray-400 border-b pb-1 block tracking-[0.2em]">Technical Details</label>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                   {Object.keys(p.info).map((key) => (
                                     <div key={key}>
                                       <label className="text-[8px] uppercase font-bold text-gray-300 block mb-1">{key}</label>
                                       <input className="w-full border-b py-2 text-xs outline-none focus:border-black" value={(p.info as any)[key]} onChange={e => updateProjectField(p.id, 'info_nested', e.target.value, key)} />
                                     </div>
                                   ))}
                                </div>
                             </div>
                          </div>

                          <div className="space-y-6 pt-6 border-t">
                             <label className="text-[10px] font-black uppercase text-gray-400 block tracking-[0.2em]">Gallery & Portfolio Images (Drag to Sort)</label>
                             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {p.images.map((img, imgIdx) => (
                                  <div key={imgIdx} className="relative group border rounded-sm overflow-hidden bg-gray-50 aspect-[3/4]">
                                     <img src={img} className="w-full h-full object-cover" alt="" />
                                     <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity p-3 text-center">
                                        <div className="flex gap-2 mb-2">
                                          <button onClick={(e) => reorderImage(e, p.id, imgIdx, 'left')} className="bg-white/10 text-white w-8 h-8 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">←</button>
                                          <button onClick={(e) => reorderImage(e, p.id, imgIdx, 'right')} className="bg-white/10 text-white w-8 h-8 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">→</button>
                                        </div>
                                        <button onClick={(e) => setAsMainImage(e, p.id, img)} className="bg-white text-black px-4 py-1.5 text-[8px] font-black rounded-full uppercase tracking-tighter hover:bg-yellow-400 transition-colors">Set as Poster</button>
                                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeProjectImage(p.id, imgIdx, 'gallery'); }} className="text-red-400 text-[8px] uppercase font-bold hover:underline mt-2">Remove</button>
                                     </div>
                                  </div>
                                ))}
                                <input type="file" id={`gallery-up-input-${p.id}`} className="hidden" accept="image/*" onChange={e => handleProjectFileUpload(e, p.id, 'gallery')} />
                                <label htmlFor={`gallery-up-input-${p.id}`} className="border-2 border-dashed flex flex-col items-center justify-center text-[10px] text-gray-300 hover:text-black hover:border-black transition-all aspect-[3/4] font-black uppercase cursor-pointer">+ Add Image</label>
                             </div>
                          </div>
                          <button onClick={() => alert('프로젝트 내용이 저장되었습니다.')} className="w-full bg-black text-white py-6 font-black uppercase text-[11px] tracking-[0.5em] shadow-xl hover:bg-gray-800 transition-colors">Final Save Project Archive</button>
                        </div>
                      )}
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-8">
               <div className="flex justify-between items-end border-b pb-6">
                 <h3 className="kor-bold text-2xl uppercase tracking-tighter">Client Inquiries</h3>
                 <span className="text-[10px] font-black uppercase text-gray-400">Total: {inquiries.length}</span>
               </div>
               <div className="border rounded-sm overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left text-xs">
                     <thead className="bg-gray-50 uppercase text-gray-400 font-black border-b">
                       <tr><th className="p-4 w-32">Date</th><th className="p-4">Client Name</th><th className="p-4">Type</th><th className="p-4 text-right">Action</th></tr>
                     </thead>
                     <tbody className="divide-y">
                       {inquiries.length === 0 ? (
                         <tr><td colSpan={4} className="p-20 text-center text-gray-300 uppercase font-black tracking-widest">No inquiries found</td></tr>
                       ) : (
                         inquiries.map(inq => (
                           <React.Fragment key={inq.id}>
                            <tr onClick={() => setExpandedInquiryId(expandedInquiryId === inq.id ? null : inq.id)} className={`cursor-pointer transition-colors ${expandedInquiryId === inq.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}>
                              <td className="p-4 text-gray-400 font-mono">{new Date(inq.date).toLocaleDateString()}</td>
                              <td className="p-4 kor-bold text-sm">{inq.name}</td>
                              <td className="p-4 uppercase"><span className="border px-3 py-1 rounded-full bg-white text-[9px] font-black tracking-tighter">{inq.type}</span></td>
                              <td className="p-4 text-right">
                                  <button onClick={(e) => { 
                                    e.stopPropagation(); // 이 줄이 핵심입니다: 부모 tr의 onClick(상세보기) 방지
                                    if(confirm('정말 이 문의 내역을 삭제하시겠습니까?')) { 
                                      const next = inquiries.filter(i => i.id !== inq.id); 
                                      setInquiries(next); 
                                      persistData('bbeoggugi_inquiries', next); 
                                    } 
                                  }} className="text-red-400 font-black uppercase text-[10px] hover:underline px-4">Delete</button>
                              </td>
                            </tr>
                            {expandedInquiryId === inq.id && (
                              <tr className="animate-in fade-in slide-in-from-top-2">
                                <td colSpan={4} className="p-10 bg-gray-50/50 border-b">
                                  <div className="bg-white p-10 border shadow-sm rounded-sm space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                      <div className="space-y-1"><label className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Phone</label><p className="text-sm kor-bold border-b pb-2">{inq.phone || '-'}</p></div>
                                      <div className="space-y-1"><label className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Email</label><p className="text-sm kor-bold border-b pb-2">{inq.email || '-'}</p></div>
                                      <div className="space-y-1"><label className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Project Category</label><p className="text-sm kor-bold border-b pb-2">{inq.type || '-'}</p></div>
                                      <div className="space-y-1"><label className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Address</label><p className="text-sm kor-bold border-b pb-2">{inq.address || '-'}</p></div>
                                      <div className="space-y-1"><label className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Size / Area</label><p className="text-sm kor-bold border-b pb-2">{inq.size || '-'}</p></div>
                                      <div className="space-y-1"><label className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Budget Range</label><p className="text-sm kor-bold border-b pb-2">{inq.budget || '-'}</p></div>
                                    </div>
                                    <div className="space-y-3">
                                      <label className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Detailed Message / Requirement</label>
                                      <div className="text-sm kor-bold whitespace-pre-wrap leading-relaxed p-6 bg-gray-50 border-l-4 border-black">
                                        {inq.content || inq.message || 'No additional information provided.'}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                           </React.Fragment>
                         ))
                       )}
                     </tbody>
                  </table>
               </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-12">
               <h3 className="kor-bold text-2xl border-b pb-6 uppercase tracking-tighter">Visual Identity & Theme</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  <div className="space-y-12">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">Global Colors</label>
                       <div className="flex items-center justify-between border-b pb-4">
                         <div className="flex flex-col"><span className="text-xs kor-bold">Primary Theme</span><span className="text-[9px] text-gray-300">Headlines, Buttons, Dark Mode</span></div>
                         <input type="color" value={designSettings.primaryColor} onChange={e => setDesignSettings({...designSettings, primaryColor: e.target.value})} className="w-12 h-12 border-none cursor-pointer p-0 bg-transparent" />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">Typography System</label>
                       <div className="flex gap-4">
                          <button onClick={() => setDesignSettings({...designSettings, mainFont: 'sans', useCustomFont: false})} className={`flex-1 py-5 text-[10px] font-black uppercase border transition-all ${!designSettings.useCustomFont && designSettings.mainFont === 'sans' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}>Sans (Gothic)</button>
                          <button onClick={() => setDesignSettings({...designSettings, mainFont: 'serif', useCustomFont: false})} className={`flex-1 py-5 text-[10px] font-black uppercase border transition-all ${!designSettings.useCustomFont && designSettings.mainFont === 'serif' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}>Serif (Myeongjo)</button>
                       </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">Brand Font Upload (.ttf, .woff)</label>
                    <div className="border-2 border-dashed p-16 text-center rounded-sm bg-gray-50/30 hover:bg-white transition-all">
                       <input type="file" id="font-upload" className="hidden" accept=".ttf,.woff,.woff2" onChange={handleFontUpload} />
                       <label htmlFor="font-upload" className="block cursor-pointer space-y-4">
                          <div className="w-12 h-12 mx-auto border rounded-full flex items-center justify-center opacity-20"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg></div>
                          <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">{designSettings.fontName || 'Choose Font File'}</span>
                       </label>
                    </div>
                    {designSettings.useCustomFont && (
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-green-600 font-black uppercase">Custom Font Active</span>
                        <button onClick={() => setDesignSettings({...designSettings, useCustomFont: false, fontName: ''})} className="text-red-400 text-[9px] uppercase font-bold underline">Reset to System Font</button>
                      </div>
                    )}
                  </div>
               </div>
               <button onClick={applyDesign} className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.5em] shadow-2xl transition-all hover:bg-gray-800">Apply Design Update</button>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-12">
               <div className="flex gap-10 border-b pb-6 overflow-x-auto scrollbar-none">
                  {(['about', 'space', 'contact', 'career'] as const).map(sub => (
                    <button key={sub} onClick={() => setSettingsSubTab(sub)} className={`text-[10px] font-black uppercase tracking-widest transition-all ${settingsSubTab === sub ? 'text-black border-b-2 border-black pb-6 -mb-6.5' : 'text-gray-300 hover:text-gray-500'}`}>{sub}</button>
                  ))}
               </div>

               <div className="animate-in fade-in duration-500 pt-6">
                  {settingsSubTab === 'about' && (
                    <div className="space-y-12">
                       <div className="grid grid-cols-2 gap-12">
                          <div className="space-y-2 col-span-2 md:col-span-1"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Main Philosophy Title</label><textarea value={aboutContent.mainTitle} onChange={e => setAboutContent({...aboutContent, mainTitle: e.target.value})} className="w-full border-b p-3 text-2xl kor-bold outline-none focus:border-black bg-transparent" rows={2} /></div>
                          <div className="space-y-2 col-span-2 md:col-span-1"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Company Slogan</label><input value={aboutContent.subtitle} onChange={e => setAboutContent({...aboutContent, subtitle: e.target.value})} className="w-full border-b p-3 text-sm outline-none focus:border-black bg-transparent" /></div>
                          <div className="space-y-2 col-span-2"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Official Office Address (KR)</label><input value={aboutContent.addressKr} onChange={e => setAboutContent({...aboutContent, addressKr: e.target.value})} className="w-full border-b p-3 text-sm outline-none focus:border-black bg-transparent" /></div>
                          <div className="space-y-2 col-span-2"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Main Description / Philosophy (KR)</label><textarea value={aboutContent.descKr1} onChange={e => setAboutContent({...aboutContent, descKr1: e.target.value})} className="w-full border p-4 text-sm leading-relaxed outline-none focus:border-black" rows={4} /></div>
                       </div>
                       <button onClick={() => { persistData('bbeoggugi_about', aboutContent); alert('About 정보가 성공적으로 저장되었습니다.'); }} className="w-full bg-black text-white py-5 font-black uppercase text-[10px] tracking-widest">Save Settings</button>
                    </div>
                  )}

                  {settingsSubTab === 'career' && (
                    <div className="space-y-16">
                       <div className="space-y-8 border-b pb-12">
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] border-l-4 border-black pl-4">Career Hero Section</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                             <div className="space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase">Main Title</label><textarea value={careerContent.mainTitle} onChange={e => setCareerContent({...careerContent, mainTitle: e.target.value})} className="w-full border-b p-3 text-xl kor-bold bg-transparent outline-none focus:border-black" rows={2} /></div>
                             <div className="space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase">Hero Description (KR)</label><textarea value={careerContent.descKr} onChange={e => setCareerContent({...careerContent, descKr: e.target.value})} className="w-full border p-4 text-sm bg-transparent outline-none focus:border-black" rows={3} /></div>
                          </div>
                       </div>

                       <div className="space-y-10">
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] border-l-4 border-black pl-4">Open Positions (Recruitment)</h4>
                          <div className="space-y-6">
                             {careerContent.positions?.map((pos:any, i:number) => (
                               <div key={i} className="border p-10 space-y-8 bg-white relative group shadow-sm">
                                  <button onClick={() => removeCareerItem('positions', i)} className="absolute top-6 right-6 text-red-400 font-black text-[9px] uppercase hover:underline">Remove</button>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                     <div className="space-y-1"><label className="text-[8px] uppercase font-bold text-gray-300">Job Title</label><input className="w-full border-b text-xl font-bold outline-none focus:border-black" value={pos.title} onChange={e => updateCareerItem('positions', i, 'title', e.target.value)} /></div>
                                     <div className="space-y-1"><label className="text-[8px] uppercase font-bold text-gray-300">Requirements</label><input className="w-full border-b text-sm outline-none focus:border-black" value={pos.subTitle} onChange={e => updateCareerItem('positions', i, 'subTitle', e.target.value)} /></div>
                                     <div className="space-y-1"><label className="text-[8px] uppercase font-bold text-gray-300">Job Type</label><input className="w-full border-b text-sm outline-none focus:border-black" value={pos.type} onChange={e => updateCareerItem('positions', i, 'type', e.target.value)} /></div>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[8px] uppercase font-bold text-gray-300">Description</label>
                                    <textarea className="w-full border p-4 text-[13px] leading-relaxed outline-none focus:border-black" value={pos.desc} onChange={e => updateCareerItem('positions', i, 'desc', e.target.value)} rows={4} />
                                  </div>
                               </div>
                             ))}
                             <button onClick={() => addCareerItem('positions', {title:'', subTitle:'', type:'', desc:''})} className="w-full border-2 border-dashed py-12 text-[11px] font-black uppercase text-gray-300 hover:text-black hover:border-black transition-all">+ Add New Announcement</button>
                          </div>
                       </div>
                       <button onClick={() => { persistData('bbeoggugi_career_content', careerContent); alert('Career 설정이 모두 저장되었습니다.'); }} className="w-full bg-black text-white py-6 font-black uppercase text-[12px] tracking-[0.5em] sticky bottom-4 shadow-2xl transition-transform active:scale-[0.99]">Final Save Career Data</button>
                    </div>
                  )}

                  {settingsSubTab === 'contact' && (
                    <div className="space-y-12">
                       <div className="grid grid-cols-2 gap-10">
                          <div className="space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Page Title</label><input value={contactSettings.title} onChange={e => setContactSettings({...contactSettings, title: e.target.value})} className="w-full border-b p-3 text-xl outline-none focus:border-black bg-transparent" /></div>
                          <div className="space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sub Headline</label><input value={contactSettings.subtitle} onChange={e => setContactSettings({...contactSettings, subtitle: e.target.value})} className="w-full border-b p-3 text-sm outline-none focus:border-black bg-transparent" /></div>
                       </div>
                       <button onClick={() => { persistData('bbeoggugi_contact_settings', contactSettings); alert('Contact 헤더가 저장되었습니다.'); }} className="w-full bg-black text-white py-5 font-black uppercase text-[10px] tracking-widest">Save Settings</button>
                    </div>
                  )}

                  {settingsSubTab === 'space' && (
                    <div className="space-y-12">
                       <div className="grid grid-cols-2 gap-10">
                          <div className="space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Archive Main Title</label><input value={spaceHeader.title} onChange={e => setSpaceHeader({...spaceHeader, title: e.target.value})} className="w-full border-b p-3 text-xl kor-bold outline-none focus:border-black bg-transparent" /></div>
                          <div className="space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Archive Sub Headline</label><input value={spaceHeader.subtitle} onChange={e => setSpaceHeader({...spaceHeader, subtitle: e.target.value})} className="w-full border-b p-3 text-sm outline-none focus:border-black bg-transparent" /></div>
                       </div>
                       <button onClick={() => { persistData('bbeoggugi_space_header', spaceHeader); alert('Archive 헤더 정보가 저장되었습니다.'); }} className="w-full bg-black text-white py-5 font-black uppercase text-[10px] tracking-widest">Save Settings</button>
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
