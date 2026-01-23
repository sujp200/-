
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
  
  // Selection States for Manage Mode
  const [isProjectManageMode, setIsProjectManageMode] = useState(false);
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [isInquiryManageMode, setIsInquiryManageMode] = useState(false);
  const [selectedInquiryIds, setSelectedInquiryIds] = useState<number[]>([]);

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

      const savedDesign = localStorage.getItem('admin_design_settings');
      if (savedDesign) setDesignSettings(JSON.parse(savedDesign));

      const savedAbout = localStorage.getItem('bbeoggugi_about');
      if (savedAbout) setAboutContent(JSON.parse(savedAbout));

      const savedSpace = localStorage.getItem('bbeoggugi_space_header');
      if (savedSpace) setSpaceHeader(JSON.parse(savedSpace));

      const savedContact = localStorage.getItem('bbeoggugi_contact_settings');
      if (savedContact) setContactSettings(JSON.parse(savedContact));

      const savedCareer = localStorage.getItem('bbeoggugi_career_content');
      if (savedCareer) setCareerContent(JSON.parse(savedCareer));
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

  // --- Deletion Logic ---
  const handleDeleteSelectedProjects = () => {
    if (selectedProjectIds.length === 0) return;
    if (window.confirm(`${selectedProjectIds.length}개의 프로젝트를 정말 삭제하시겠습니까?`)) {
      const next = projects.filter(p => !selectedProjectIds.includes(p.id));
      setProjects(next);
      persistData('bbeoggugi_projects', next);
      setSelectedProjectIds([]);
      setIsProjectManageMode(false);
    }
  };

  const handleDeleteSelectedInquiries = () => {
    if (selectedInquiryIds.length === 0) return;
    if (window.confirm(`${selectedInquiryIds.length}개의 문의를 정말 삭제하시겠습니까?`)) {
      const next = inquiries.filter(inq => !selectedInquiryIds.includes(inq.id));
      setInquiries(next);
      persistData('bbeoggugi_inquiries', next);
      setSelectedInquiryIds([]);
      setIsInquiryManageMode(false);
    }
  };

  // --- Selection Logic ---
  const toggleProjectSelection = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedProjectIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleInquirySelection = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSelectedInquiryIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // --- Project Add/Edit ---
  const handleAddProject = () => {
    const newId = `project-${Date.now()}`;
    const newProj: Project = { 
      id: newId, title: '새 프로젝트', titleEn: 'NEW PROJECT', 
      mainImage: 'https://via.placeholder.com/800x1000?text=Upload+Image', 
      images: [], floorPlans: [], 
      info: { design: '', construction: '', photograph: '', year: '2024', site: 'Seoul', usage: 'Residential', area: '-', scope: 'Interior' }, 
      descriptionKr: '', descriptionEn: '', logos: [] 
    };
    const next = [newProj, ...projects];
    setProjects(next);
    persistData('bbeoggugi_projects', next);
    setEditingProjectId(newId);
  };

  const updateProjectField = (projectId: string, field: string, value: any, infoKey?: string) => {
    const next = projects.map(p => {
      if (p.id !== projectId) return p;
      if (field === 'info_nested' && infoKey) return { ...p, info: { ...p.info, [infoKey]: value } };
      return { ...p, [field]: value };
    });
    setProjects(next);
    persistData('bbeoggugi_projects', next);
  };

  const handleProjectFileUpload = (e: React.ChangeEvent<HTMLInputElement>, projectId: string, type: 'main' | 'gallery') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const processFile = (file: File) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    };

    Promise.all(Array.from(files).map(processFile)).then(base64s => {
      const next = projects.map(p => {
        if (p.id !== projectId) return p;
        if (type === 'main') return { ...p, mainImage: base64s[0] };
        return { ...p, images: [...p.images, ...base64s] };
      });
      setProjects(next);
      persistData('bbeoggugi_projects', next);
    });
  };

  const removeProjectImage = (projectId: string, imgIdx: number) => {
    const next = projects.map(p => {
      if (p.id !== projectId) return p;
      return { ...p, images: p.images.filter((_, i) => i !== imgIdx) };
    });
    setProjects(next);
    persistData('bbeoggugi_projects', next);
  };

  const reorderImage = (e: React.MouseEvent, projectId: string, imgIdx: number, direction: 'left' | 'right') => {
    e.stopPropagation();
    const next = projects.map(p => {
      if (p.id !== projectId) return p;
      const newImages = [...p.images];
      const targetIdx = direction === 'left' ? imgIdx - 1 : imgIdx + 1;
      if (targetIdx < 0 || targetIdx >= newImages.length) return p;
      [newImages[imgIdx], newImages[targetIdx]] = [newImages[targetIdx], newImages[imgIdx]];
      return { ...p, images: newImages };
    });
    setProjects(next);
    persistData('bbeoggugi_projects', next);
  };

  const setAsMainImage = (e: React.MouseEvent, projectId: string, imageUrl: string) => {
    e.stopPropagation();
    const next = projects.map(p => p.id === projectId ? { ...p, mainImage: imageUrl } : p);
    setProjects(next);
    persistData('bbeoggugi_projects', next);
    alert('이 이미지가 프로젝트의 대표 이미지(Poster)로 설정되었습니다.');
  };

  // --- Design Settings ---
  const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setDesignSettings({ ...designSettings, useCustomFont: true, customFontBase64: reader.result, fontName: file.name });
    };
    reader.readAsDataURL(file);
  };

  // --- Career Logic ---
  const addCareerItem = (key: string, newItem: any) => {
    const next = { ...careerContent, [key]: [...(careerContent[key] || []), newItem] };
    setCareerContent(next);
    persistData('bbeoggugi_career_content', next);
  };

  const updateCareerItem = (key: string, index: number, field: string, value: any) => {
    const newList = [...(careerContent[key] || [])];
    newList[index] = { ...newList[index], [field]: value };
    const next = { ...careerContent, [key]: newList };
    setCareerContent(next);
    persistData('bbeoggugi_career_content', next);
  };

  const removeCareerItem = (key: string, index: number) => {
    const next = { ...careerContent, [key]: careerContent[key].filter((_: any, i: number) => i !== index) };
    setCareerContent(next);
    persistData('bbeoggugi_career_content', next);
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
                <button key={tab} onClick={() => { setActiveTab(tab); setEditingProjectId(null); setIsProjectManageMode(false); setIsInquiryManageMode(false); }} className={`text-left uppercase tracking-widest text-sm kor-bold transition-all ${activeTab === tab ? 'opacity-100 pl-4 border-l-2 border-black' : 'opacity-20 hover:opacity-100'}`}>{tab}</button>
              ))}
              <button onClick={() => { sessionStorage.removeItem('admin_auth'); window.location.reload(); }} className="text-left mt-10 opacity-20 hover:opacity-100 text-red-500 text-[10px] font-black uppercase tracking-widest">Logout</button>
           </nav>
        </aside>

        <div className="flex-grow pb-40">
          {activeTab === 'projects' && (
            <div className="space-y-8">
               <div className="flex justify-between items-center border-b pb-6">
                 <h3 className="kor-bold text-2xl uppercase tracking-tighter">Project Archive</h3>
                 <div className="flex gap-4">
                    {isProjectManageMode ? (
                      <>
                        <button onClick={() => { setIsProjectManageMode(false); setSelectedProjectIds([]); }} className="text-[10px] font-black uppercase border px-5 py-2 rounded-full tracking-widest hover:bg-gray-100 transition-colors">Cancel</button>
                        <button onClick={handleDeleteSelectedProjects} disabled={selectedProjectIds.length === 0} className={`text-[10px] font-black uppercase border px-5 py-2 rounded-full tracking-widest transition-all ${selectedProjectIds.length > 0 ? 'bg-red-500 border-red-500 text-white shadow-lg' : 'opacity-20 bg-gray-100 cursor-not-allowed'}`}>Delete Selected ({selectedProjectIds.length})</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setIsProjectManageMode(true)} className="text-[10px] font-black uppercase border border-black px-5 py-2 rounded-full tracking-widest hover:bg-black hover:text-white transition-all">Manage List</button>
                        <button onClick={handleAddProject} className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-transform hover:scale-105">+ New Project</button>
                      </>
                    )}
                 </div>
               </div>
               
               <div className="grid grid-cols-1 gap-4">
                 {projects.map((p) => (
                   <div key={p.id} className={`border bg-white rounded-sm overflow-hidden shadow-sm transition-all ${editingProjectId === p.id ? 'ring-1 ring-black shadow-lg' : ''}`}>
                      <div className={`p-4 flex justify-between items-center bg-gray-50/30 transition-colors ${isProjectManageMode ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'}`} onClick={() => !isProjectManageMode && setEditingProjectId(editingProjectId === p.id ? null : p.id)}>
                        <div className="flex items-center gap-6">
                           {isProjectManageMode && (
                              <div onClick={(e) => toggleProjectSelection(e, p.id)} className={`w-5 h-5 border flex items-center justify-center transition-all cursor-pointer ${selectedProjectIds.includes(p.id) ? 'bg-black border-black' : 'bg-white border-gray-200'}`}>
                                 {selectedProjectIds.includes(p.id) && <div className="w-1.5 h-1.5 bg-white"></div>}
                              </div>
                           )}
                           <img src={p.mainImage} className="w-10 h-14 object-cover border bg-gray-100" alt="" />
                           <div className="flex flex-col">
                             <span className="kor-bold text-sm">{p.title || 'Untitled Project'}</span>
                             <span className="text-[9px] uppercase text-gray-400 tracking-widest">{p.titleEn}</span>
                           </div>
                        </div>
                        {!isProjectManageMode && (
                           <button onClick={(e) => { e.stopPropagation(); setEditingProjectId(editingProjectId === p.id ? null : p.id); }} className="text-[10px] font-bold border px-4 py-2 rounded-full uppercase tracking-widest hover:bg-black hover:text-white transition-colors">{editingProjectId === p.id ? 'Close' : 'Edit'}</button>
                        )}
                      </div>
                      
                      {editingProjectId === p.id && !isProjectManageMode && (
                        <div className="p-8 space-y-12 animate-in slide-in-from-top-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                             <div className="space-y-8">
                                <label className="text-[10px] font-black uppercase text-gray-400 border-b pb-1 block tracking-[0.2em]">Basic Information</label>
                                <div className="space-y-6">
                                  <div><label className="text-[8px] uppercase font-bold text-gray-300 block mb-1">Title (KR)</label><input className="w-full border-b p-2 kor-bold outline-none focus:border-black bg-transparent" value={p.title} onChange={e => updateProjectField(p.id, 'title', e.target.value)} /></div>
                                  <div><label className="text-[8px] uppercase font-bold text-gray-300 block mb-1">Title (EN)</label><input className="w-full border-b p-2 text-sm outline-none focus:border-black bg-transparent" value={p.titleEn} onChange={e => updateProjectField(p.id, 'titleEn', e.target.value)} /></div>
                                  <div>
                                    <label className="text-[8px] uppercase font-bold text-gray-300 block mb-3">Main Poster Image</label>
                                    <div className="flex items-center gap-6">
                                       <img src={p.mainImage} className="w-20 h-28 object-cover border shadow-sm" alt="" />
                                       <div className="flex-grow">
                                          <input type="file" id={`main-img-up-${p.id}`} className="hidden" accept="image/*" onChange={e => handleProjectFileUpload(e, p.id, 'main')} />
                                          <label htmlFor={`main-img-up-${p.id}`} className="block w-full border border-black/10 py-4 text-center cursor-pointer hover:bg-gray-50 text-[10px] font-black uppercase tracking-widest">Replace Poster</label>
                                       </div>
                                    </div>
                                  </div>
                                  <div><label className="text-[8px] uppercase font-bold text-gray-300 block mb-1">Description (KR)</label><textarea className="w-full border p-4 text-xs outline-none focus:border-black bg-transparent" rows={4} value={p.descriptionKr} onChange={e => updateProjectField(p.id, 'descriptionKr', e.target.value)} /></div>
                                </div>
                             </div>
                             <div className="space-y-8">
                                <label className="text-[10px] font-black uppercase text-gray-400 border-b pb-1 block tracking-[0.2em]">Technical Details</label>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                   {Object.keys(p.info).map((key) => (
                                     <div key={key}>
                                       <label className="text-[8px] uppercase font-bold text-gray-300 block mb-1">{key}</label>
                                       <input className="w-full border-b py-2 text-xs outline-none focus:border-black bg-transparent" value={(p.info as any)[key]} onChange={e => updateProjectField(p.id, 'info_nested', e.target.value, key)} />
                                     </div>
                                   ))}
                                </div>
                             </div>
                          </div>

                          <div className="space-y-8 pt-8 border-t">
                             <label className="text-[10px] font-black uppercase text-gray-400 block tracking-[0.2em]">Gallery (Sortable Images)</label>
                             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {p.images.map((img, imgIdx) => (
                                  <div key={imgIdx} className="relative group border bg-gray-50 aspect-[3/4] overflow-hidden">
                                     <img src={img} className="w-full h-full object-cover" alt="" />
                                     <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity p-2 text-center">
                                        <div className="flex gap-2">
                                           <button onClick={(e) => reorderImage(e, p.id, imgIdx, 'left')} className="bg-white/10 text-white w-6 h-6 border rounded-full hover:bg-white hover:text-black">←</button>
                                           <button onClick={(e) => reorderImage(e, p.id, imgIdx, 'right')} className="bg-white/10 text-white w-6 h-6 border rounded-full hover:bg-white hover:text-black">→</button>
                                        </div>
                                        <button onClick={(e) => setAsMainImage(e, p.id, img)} className="text-[7px] font-black uppercase bg-white px-2 py-1 rounded-full mt-1">Set as Poster</button>
                                        <button onClick={() => removeProjectImage(p.id, imgIdx)} className="text-red-400 text-[8px] font-black uppercase mt-1">Delete</button>
                                     </div>
                                  </div>
                                ))}
                                <input type="file" id={`gallery-up-${p.id}`} className="hidden" multiple accept="image/*" onChange={e => handleProjectFileUpload(e, p.id, 'gallery')} />
                                <label htmlFor={`gallery-up-${p.id}`} className="border-2 border-dashed flex flex-col items-center justify-center text-[10px] text-gray-300 hover:text-black hover:border-black transition-all aspect-[3/4] font-black uppercase cursor-pointer">+ Add Images</label>
                             </div>
                          </div>
                          <button onClick={() => { setEditingProjectId(null); alert('프로젝트 내용이 저장되었습니다.'); }} className="w-full bg-black text-white py-6 font-black uppercase text-[11px] tracking-[0.5em] shadow-xl">Close Editor</button>
                        </div>
                      )}
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-8">
               <div className="flex justify-between items-center border-b pb-6">
                 <h3 className="kor-bold text-2xl uppercase tracking-tighter">Inquiries</h3>
                 <div className="flex gap-4">
                    {isInquiryManageMode ? (
                      <>
                        <button onClick={() => { setIsInquiryManageMode(false); setSelectedInquiryIds([]); }} className="text-[10px] font-black uppercase border px-5 py-2 rounded-full tracking-widest hover:bg-gray-100 transition-colors">Cancel</button>
                        <button onClick={handleDeleteSelectedInquiries} disabled={selectedInquiryIds.length === 0} className={`text-[10px] font-black uppercase border px-5 py-2 rounded-full tracking-widest transition-all ${selectedInquiryIds.length > 0 ? 'bg-red-500 border-red-500 text-white shadow-lg' : 'opacity-20 bg-gray-100 cursor-not-allowed'}`}>Delete Selected ({selectedInquiryIds.length})</button>
                      </>
                    ) : (
                      <button onClick={() => setIsInquiryManageMode(true)} className="text-[10px] font-black uppercase border border-black px-5 py-2 rounded-full tracking-widest hover:bg-black hover:text-white transition-all">Manage List</button>
                    )}
                 </div>
               </div>
               
               <div className="border rounded-sm overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left text-xs">
                     <thead className="bg-gray-50 uppercase text-gray-400 font-black border-b">
                       <tr>
                         {isInquiryManageMode && <th className="p-4 w-12 text-center">Sel</th>}
                         <th className="p-4">Date</th><th className="p-4">Client</th><th className="p-4">Type</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y">
                       {inquiries.map(inq => (
                         <React.Fragment key={inq.id}>
                            <tr onClick={() => !isInquiryManageMode && setExpandedInquiryId(expandedInquiryId === inq.id ? null : inq.id)} className={`transition-colors ${isInquiryManageMode ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'}`}>
                              {isInquiryManageMode && (
                                <td className="p-4 text-center">
                                  <div onClick={(e) => toggleInquirySelection(e, inq.id)} className={`w-5 h-5 border mx-auto flex items-center justify-center transition-all cursor-pointer ${selectedInquiryIds.includes(inq.id) ? 'bg-black border-black' : 'bg-white border-gray-200'}`}>
                                     {selectedInquiryIds.includes(inq.id) && <div className="w-1.5 h-1.5 bg-white"></div>}
                                  </div>
                                </td>
                              )}
                              <td className="p-4 text-gray-400 font-mono">{new Date(inq.date).toLocaleDateString()}</td>
                              <td className="p-4 kor-bold text-sm">{inq.name}</td>
                              <td className="p-4 uppercase"><span className="text-[9px] border px-2 py-1 rounded-full bg-gray-50">{inq.type}</span></td>
                            </tr>
                            {expandedInquiryId === inq.id && !isInquiryManageMode && (
                              <tr className="bg-gray-50/50">
                                <td colSpan={isInquiryManageMode ? 4 : 3} className="p-8">
                                  <div className="bg-white p-8 border shadow-sm rounded-sm space-y-6">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                      <div className="space-y-1"><label className="text-[8px] uppercase font-black text-gray-300 tracking-widest">Phone</label><p className="text-sm kor-bold border-b pb-2">{inq.phone || '-'}</p></div>
                                      <div className="space-y-1"><label className="text-[8px] uppercase font-black text-gray-300 tracking-widest">Email</label><p className="text-sm kor-bold border-b pb-2">{inq.email || '-'}</p></div>
                                      <div className="space-y-1"><label className="text-[8px] uppercase font-black text-gray-300 tracking-widest">Address</label><p className="text-sm kor-bold border-b pb-2">{inq.address || '-'}</p></div>
                                    </div>
                                    <div className="space-y-2"><label className="text-[8px] uppercase font-black text-gray-300 tracking-widest">Message</label><p className="text-sm leading-relaxed border-l-4 border-black pl-4 py-2 bg-gray-50/50 whitespace-pre-wrap">{inq.content || inq.message || 'None'}</p></div>
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
               <h3 className="kor-bold text-2xl border-b pb-6 uppercase tracking-tighter">Design Identity</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  <div className="space-y-8">
                    <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">Primary Color</label>
                    <div className="flex items-center gap-6">
                       <input type="color" value={designSettings.primaryColor} onChange={e => setDesignSettings({...designSettings, primaryColor: e.target.value})} className="w-16 h-16 border-none cursor-pointer p-0 bg-transparent" />
                       <span className="text-sm font-mono uppercase tracking-widest">{designSettings.primaryColor}</span>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <label className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">Brand Font Upload</label>
                    <input type="file" id="font-up" className="hidden" accept=".ttf,.woff,.woff2" onChange={handleFontUpload} />
                    <label htmlFor="font-up" className="block border-2 border-dashed p-10 text-center cursor-pointer hover:border-black transition-colors bg-gray-50/30">
                        <span className="block text-[11px] font-black uppercase tracking-widest text-gray-400">
                          {designSettings.fontName || 'Select Font File (.ttf/.woff)'}
                        </span>
                    </label>
                  </div>
               </div>
               <button onClick={() => { persistData('admin_design_settings', designSettings); alert('디자인 설정이 저장되었습니다. 새로고침 후 반영됩니다.'); window.location.reload(); }} className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.5em] shadow-2xl hover:bg-gray-800">Apply System Update</button>
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
                          <div className="space-y-2 col-span-2 md:col-span-1"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Brand Subtitle</label><input value={aboutContent.subtitle} onChange={e => setAboutContent({...aboutContent, subtitle: e.target.value})} className="w-full border-b p-3 text-sm outline-none focus:border-black bg-transparent" /></div>
                          <div className="space-y-2 col-span-2"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Office HQ Address (KR)</label><input value={aboutContent.addressKr} onChange={e => setAboutContent({...aboutContent, addressKr: e.target.value})} className="w-full border-b p-3 text-sm outline-none focus:border-black bg-transparent" /></div>
                       </div>
                       <button onClick={() => { persistData('bbeoggugi_about', aboutContent); alert('About 정보가 저장되었습니다.'); }} className="w-full bg-black text-white py-5 font-black uppercase text-[10px] tracking-widest">Save Settings</button>
                    </div>
                  )}

                  {settingsSubTab === 'space' && (
                    <div className="space-y-12">
                       <div className="grid grid-cols-2 gap-12">
                          <div className="space-y-2 col-span-2"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Space Archive Title</label><input value={spaceHeader.title} onChange={e => setSpaceHeader({...spaceHeader, title: e.target.value})} className="w-full border-b p-3 text-2xl kor-bold outline-none focus:border-black bg-transparent" /></div>
                          <div className="space-y-2 col-span-2"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Space Archive Subtitle</label><input value={spaceHeader.subtitle} onChange={e => setSpaceHeader({...spaceHeader, subtitle: e.target.value})} className="w-full border-b p-3 text-sm outline-none focus:border-black bg-transparent" /></div>
                       </div>
                       <button onClick={() => { persistData('bbeoggugi_space_header', spaceHeader); alert('Space 헤더 설정이 저장되었습니다.'); }} className="w-full bg-black text-white py-5 font-black uppercase text-[10px] tracking-widest">Save Settings</button>
                    </div>
                  )}

                  {settingsSubTab === 'career' && (
                    <div className="space-y-16">
                       <div className="space-y-8 border-b pb-12">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Careers Page Title</label>
                          <textarea value={careerContent.mainTitle} onChange={e => setCareerContent({...careerContent, mainTitle: e.target.value})} className="w-full border-b p-3 text-xl kor-bold bg-transparent outline-none focus:border-black" rows={2} />
                       </div>
                       <div className="space-y-10">
                          <h4 className="text-xs font-black uppercase tracking-[0.2em]">Positions List</h4>
                          {careerContent.positions?.map((pos:any, i:number) => (
                             <div key={i} className="border p-8 space-y-6 bg-white relative shadow-sm">
                                <button onClick={() => removeCareerItem('positions', i)} className="absolute top-6 right-6 text-red-500 font-black text-[9px] uppercase">Remove</button>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                   <input className="w-full border-b text-xl font-bold outline-none focus:border-black bg-transparent" placeholder="Job Title" value={pos.title} onChange={e => updateCareerItem('positions', i, 'title', e.target.value)} />
                                   <input className="w-full border-b text-sm outline-none focus:border-black bg-transparent" placeholder="Requirement" value={pos.subTitle} onChange={e => updateCareerItem('positions', i, 'subTitle', e.target.value)} />
                                   <input className="w-full border-b text-sm outline-none focus:border-black bg-transparent" placeholder="Employment Type" value={pos.type} onChange={e => updateCareerItem('positions', i, 'type', e.target.value)} />
                                </div>
                                <textarea className="w-full border p-4 text-[13px] leading-relaxed outline-none focus:border-black bg-transparent" placeholder="Job Description" value={pos.desc} onChange={updateCareerItem.bind(null, 'positions', i, 'desc')} rows={3} />
                             </div>
                          ))}
                          <button onClick={() => addCareerItem('positions', {title:'', subTitle:'', type:'', desc:''})} className="w-full border-2 border-dashed py-8 text-[11px] font-black uppercase text-gray-300 hover:text-black">+ Add New Position</button>
                       </div>
                       <button onClick={() => { persistData('bbeoggugi_career_content', careerContent); alert('채용 정보가 최종 저장되었습니다.'); }} className="w-full bg-black text-white py-6 font-black uppercase text-[11px] tracking-[0.4em]">Final Save Career Data</button>
                    </div>
                  )}

                  {settingsSubTab === 'contact' && (
                    <div className="space-y-12">
                       <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Inquiry Form Title</label>
                       <input value={contactSettings.title} onChange={e => setContactSettings({...contactSettings, title: e.target.value})} className="w-full border-b p-3 text-xl outline-none focus:border-black bg-transparent" />
                       <button onClick={() => { persistData('bbeoggugi_contact_settings', contactSettings); alert('Contact 헤더 정보가 저장되었습니다.'); }} className="w-full bg-black text-white py-5 font-black uppercase text-[10px] tracking-widest">Save Settings</button>
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
