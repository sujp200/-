
import React, { useState, useEffect } from 'react';
import { projects as initialProjects, channels as initialChannels } from '../data';
import { Project, Channel } from '../types';

const Admin: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'design' | 'links' | 'inquiries'>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  
  const [designSettings, setDesignSettings] = useState({
    primaryColor: '#111111',
    secondaryColor: '#9A9A9A',
    baseFontSize: 16,
    mainFont: 'sans', // 'sans' or 'serif'
  });

  useEffect(() => {
    const loadData = () => {
      try {
        const savedProjects = localStorage.getItem('bbeoggugi_projects');
        setProjects(savedProjects ? JSON.parse(savedProjects) : initialProjects);

        const savedChannels = localStorage.getItem('bbeoggugi_channels');
        setChannels(savedChannels ? JSON.parse(savedChannels) : initialChannels);

        const savedInquiries = localStorage.getItem('bbeoggugi_inquiries');
        setInquiries(savedInquiries ? JSON.parse(savedInquiries) : []);

        const savedDesign = localStorage.getItem('admin_design_settings');
        if (savedDesign) setDesignSettings(JSON.parse(savedDesign));
      } catch (e) {
        console.error("Data loading error:", e);
      }
    };

    loadData();
    
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'ghks8122') {
      setIsAuthorized(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const saveToStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      alert('변경사항이 성공적으로 저장되었습니다.');
      window.location.reload(); 
    } catch (e) {
      alert('저장 용량이 초과되었습니다. 이미지 파일 크기를 줄여주세요 (권장: 장당 500KB 이하)');
    }
  };

  const handleProjectUpdate = (id: string, field: string, value: any) => {
    const updated = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    setProjects(updated);
  };

  const handleInfoUpdate = (id: string, infoField: string, value: string) => {
    const updated = projects.map(p => {
      if (p.id === id) {
        return { ...p, info: { ...p.info, [infoField]: value } };
      }
      return p;
    });
    setProjects(updated);
  };

  const handleGalleryUpdate = (id: string, index: number, value: string) => {
    const updated = projects.map(p => {
      if (p.id === id) {
        const newImages = [...p.images];
        newImages[index] = value;
        return { ...p, images: newImages };
      }
      return p;
    });
    setProjects(updated);
  };

  const addGalleryImage = (id: string) => {
    const updated = projects.map(p => {
      if (p.id === id) {
        return { ...p, images: [...p.images, ''] };
      }
      return p;
    });
    setProjects(updated);
  };

  const removeGalleryImage = (id: string, index: number) => {
    const updated = projects.map(p => {
      if (p.id === id) {
        const newImages = p.images.filter((_, i) => i !== index);
        return { ...p, images: newImages };
      }
      return p;
    });
    setProjects(updated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) { 
        alert('이미지 파일이 너무 큽니다. 2MB 이하의 파일을 선택해주세요.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteInquiry = (id: number) => {
    if (!confirm('해당 문의를 삭제하시겠습니까?')) return;
    const updated = inquiries.filter(iq => iq.id !== id);
    setInquiries(updated);
    localStorage.setItem('bbeoggugi_inquiries', JSON.stringify(updated));
    if (selectedInquiry?.id === id) setSelectedInquiry(null);
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#FDFCF8] flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-12 text-center animate-in fade-in duration-1000">
           <div className="space-y-4">
              <h2 className="eng-text text-[11px] font-black tracking-[0.6em] uppercase text-gray-400">Restricted Area</h2>
              <h1 className="text-4xl font-serif">BBEOGGUGI ADMIN</h1>
           </div>
           <form onSubmit={handleLogin} className="space-y-6">
              <div className="border-b border-black py-4">
                 <input 
                   type="password" 
                   value={passwordInput}
                   onChange={(e) => setPasswordInput(e.target.value)}
                   placeholder="Enter Password"
                   className="w-full bg-transparent text-center text-xl tracking-[0.5em] outline-none placeholder:tracking-normal placeholder:text-gray-200"
                   autoFocus
                 />
              </div>
              <button type="submit" className="eng-text text-[10px] font-black uppercase tracking-widest bg-black text-white px-12 py-4 rounded-full hover:opacity-80 transition-opacity">
                Unlock
              </button>
           </form>
        </div>
      </div>
    );
  }

  const renderProjectManager = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <h3 className="kor-bold text-xl">프로젝트 관리 (SPACE)</h3>
        <button onClick={() => saveToStorage('bbeoggugi_projects', projects)} className="bg-black text-white text-[10px] px-6 py-2 rounded-full uppercase tracking-widest hover:bg-gray-800 transition-colors font-bold">Save All Changes</button>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {projects.map(p => (
          <div key={p.id} className="border p-8 rounded-lg bg-gray-50/50 space-y-8">
             <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex items-center gap-6">
                   <div className="w-20 h-24 overflow-hidden border bg-white flex items-center justify-center">
                      <img 
                        src={p.mainImage} 
                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x400?text=Invalid+Image')} 
                        alt="thumb" 
                        className="w-full h-full object-cover" 
                      />
                   </div>
                   <div>
                      <h4 className="kor-bold text-lg">{p.title}</h4>
                      <p className="eng-text text-[10px] text-gray-400 uppercase tracking-widest">{p.titleEn}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <button 
                     onClick={() => setEditingProjectId(editingProjectId === p.id ? null : p.id)}
                     className={`text-[10px] font-black px-6 py-2 rounded-full border transition-all ${editingProjectId === p.id ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200'}`}
                   >
                     {editingProjectId === p.id ? '[ CLOSE EDITOR ]' : '[ EDIT DETAILS ]'}
                   </button>
                </div>
             </div>

             {editingProjectId === p.id && (
               <div className="space-y-12 pt-8 border-t border-gray-200 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <p className="eng-text text-[9px] font-black uppercase tracking-widest opacity-30">Titles & Main Image</p>
                        <div className="space-y-4">
                           <div>
                              <label className="text-[8px] uppercase font-bold text-gray-400 mb-1 block">Main Thumbnail (3:4 Ratio, Recommended: 1200x1600)</label>
                              <div className="flex gap-2">
                                 <input className="flex-grow bg-white border border-gray-100 p-3 text-xs outline-none" placeholder="Image URL" value={p.mainImage} onChange={(e) => handleProjectUpdate(p.id, 'mainImage', e.target.value)} />
                                 <label className="bg-gray-200 px-4 py-2 text-[9px] font-black uppercase tracking-widest flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors">
                                    Upload
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (b64) => handleProjectUpdate(p.id, 'mainImage', b64))} />
                                 </label>
                              </div>
                           </div>
                           <input className="w-full bg-white border border-gray-100 p-4 text-sm font-bold outline-none" placeholder="Title (KR)" value={p.title} onChange={(e) => handleProjectUpdate(p.id, 'title', e.target.value)} />
                           <input className="w-full bg-white border border-gray-100 p-4 text-sm font-bold outline-none uppercase" placeholder="Title (EN)" value={p.titleEn} onChange={(e) => handleProjectUpdate(p.id, 'titleEn', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           {['design', 'construction', 'photograph', 'year', 'site', 'usage', 'area', 'scope'].map((key) => (
                             <div key={key}>
                                <label className="text-[8px] uppercase font-bold text-gray-400 mb-1 block">{key}</label>
                                <input className="w-full bg-white border border-gray-100 p-3 text-xs outline-none" value={(p.info as any)[key]} onChange={(e) => handleInfoUpdate(p.id, key, e.target.value)} />
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-6">
                        <p className="eng-text text-[9px] font-black uppercase tracking-widest opacity-30">Description Content</p>
                        <div className="space-y-4">
                           <label className="text-[8px] uppercase font-bold text-gray-400 block">Korean Description</label>
                           <textarea rows={6} className="w-full bg-white border border-gray-100 p-4 text-sm leading-relaxed outline-none resize-none" value={p.descriptionKr} onChange={(e) => handleProjectUpdate(p.id, 'descriptionKr', e.target.value)} />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[8px] uppercase font-bold text-gray-400 block">English Description</label>
                           <textarea rows={6} className="w-full bg-white border border-gray-100 p-4 text-xs leading-relaxed outline-none resize-none text-gray-500" value={p.descriptionEn} onChange={(e) => handleProjectUpdate(p.id, 'descriptionEn', e.target.value)} />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex justify-between items-center">
                        <p className="eng-text text-[9px] font-black uppercase tracking-widest opacity-30">Gallery Images (Detailed Page - Rec. 16:9 or 4:5)</p>
                        <button onClick={() => addGalleryImage(p.id)} className="text-[9px] font-black uppercase tracking-widest bg-gray-200 px-4 py-1.5 rounded-full hover:bg-black hover:text-white transition-colors">+ Add Image Slot</button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {p.images.map((img, idx) => (
                          <div key={idx} className="space-y-3 p-4 bg-white border border-gray-100 group shadow-sm">
                             <div className="aspect-video bg-gray-50 border border-gray-100 overflow-hidden relative flex items-center justify-center">
                                <img 
                                  src={img} 
                                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Invalid+Image+URL')}
                                  className="w-full h-full object-cover" 
                                  alt="preview" 
                                />
                                <button 
                                  onClick={() => removeGalleryImage(p.id, idx)}
                                  className="absolute top-2 right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[12px] shadow-xl"
                                >✕</button>
                             </div>
                             <div className="space-y-2">
                               <input className="w-full bg-gray-50 border border-gray-200 p-2 text-[10px] outline-none" value={img} onChange={(e) => handleGalleryUpdate(p.id, idx, e.target.value)} placeholder="Paste URL here" />
                               <label className="w-full bg-gray-100 py-2 text-[9px] font-bold uppercase tracking-[0.2em] flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all">
                                  Upload File
                                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (b64) => handleGalleryUpdate(p.id, idx, b64))} />
                               </label>
                             </div>
                             <p className="text-[8px] text-gray-300 font-bold uppercase tracking-widest text-center mt-2">Recommended: 1920x1080 or 1200x1500</p>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
             )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDesignSystem = () => (
    <div className="max-w-xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <h3 className="kor-bold text-xl">디자인 시스템 설정</h3>
        <button onClick={() => saveToStorage('admin_design_settings', designSettings)} className="bg-black text-white text-[10px] px-6 py-2 rounded-full uppercase tracking-widest hover:bg-gray-800 transition-colors font-bold">Apply Styles</button>
      </div>
      
      <div className="space-y-10">
        <div className="grid grid-cols-2 gap-8">
           <div className="space-y-4">
              <label className="eng-text text-[10px] font-black uppercase tracking-widest">Primary Color</label>
              <div className="flex items-center gap-4">
                 <input type="color" value={designSettings.primaryColor} onChange={(e) => setDesignSettings({...designSettings, primaryColor: e.target.value})} className="w-10 h-10 border-none cursor-pointer" />
                 <span className="eng-text text-xs uppercase font-bold">{designSettings.primaryColor}</span>
              </div>
           </div>
           <div className="space-y-4">
              <label className="eng-text text-[10px] font-black uppercase tracking-widest">Secondary Color</label>
              <div className="flex items-center gap-4">
                 <input type="color" value={designSettings.secondaryColor} onChange={(e) => setDesignSettings({...designSettings, secondaryColor: e.target.value})} className="w-10 h-10 border-none cursor-pointer" />
                 <span className="eng-text text-xs uppercase font-bold">{designSettings.secondaryColor}</span>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <label className="eng-text text-[10px] font-black uppercase tracking-widest block">Main Font Family</label>
           <div className="flex gap-4">
              <button 
                onClick={() => setDesignSettings({...designSettings, mainFont: 'sans'})}
                className={`flex-grow py-3 border text-xs font-bold uppercase tracking-widest transition-all ${designSettings.mainFont === 'sans' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}`}
              >
                Noto Sans (Modern)
              </button>
              <button 
                onClick={() => setDesignSettings({...designSettings, mainFont: 'serif'})}
                className={`flex-grow py-3 border text-xs font-bold uppercase tracking-widest transition-all ${designSettings.mainFont === 'serif' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}`}
              >
                Noto Serif (Elegant)
              </button>
           </div>
        </div>

        <div className="space-y-4">
           <label className="eng-text text-[10px] font-black uppercase tracking-widest">Global Base Font Size ({designSettings.baseFontSize}px)</label>
           <input type="range" min="12" max="24" value={designSettings.baseFontSize} onChange={(e) => setDesignSettings({...designSettings, baseFontSize: parseInt(e.target.value)})} className="w-full accent-black h-1 bg-gray-100 appearance-none rounded-lg cursor-pointer" />
        </div>
        
        <div className="p-8 border border-gray-100 bg-gray-50/30" style={{ fontFamily: designSettings.mainFont === 'serif' ? "'Noto Serif KR', serif" : "'Noto Sans KR', sans-serif" }}>
           <p className="eng-text text-[10px] text-gray-400 uppercase tracking-widest mb-6 font-black">Live Preview</p>
           <h4 className="text-4xl mb-4 font-serif italic" style={{ color: designSettings.primaryColor }}>Architectural Vision</h4>
           <p className="kor-bold text-lg mb-4" style={{ color: designSettings.primaryColor }}>우리는 공간의 본질을 설계합니다.</p>
           <p className="eng-text-secondary text-xs" style={{ color: designSettings.secondaryColor }}>Timeless Dialogue between space and human.</p>
        </div>
      </div>
    </div>
  );

  const renderInquiries = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <h3 className="kor-bold text-xl">프로젝트 문의 내역 ({inquiries.length})</h3>
        <button onClick={() => { if(confirm('전체 삭제하시겠습니까?')) { localStorage.removeItem('bbeoggugi_inquiries'); setInquiries([]); } }} className="text-red-500 text-[10px] font-bold uppercase tracking-widest hover:underline">Clear All</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow overflow-x-auto border border-gray-100 rounded-lg bg-white">
          <table className="w-full text-left text-[11px] tracking-tight">
            <thead className="bg-gray-50 eng-text text-[9px] uppercase font-black tracking-[0.2em] border-y border-gray-100">
              <tr>
                <th className="py-5 px-6">Date</th>
                <th className="py-5 px-6">Name</th>
                <th className="py-5 px-6">Type</th>
                <th className="py-5 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {inquiries.map(iq => (
                <tr 
                  key={iq.id} 
                  onClick={() => setSelectedInquiry(iq)}
                  className={`cursor-pointer transition-colors group ${selectedInquiry?.id === iq.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
                >
                  <td className="py-6 px-6 font-medium text-gray-400">
                    {new Date(iq.date).toLocaleDateString()}
                  </td>
                  <td className="py-6 px-6 font-bold text-black">{iq.name}</td>
                  <td className="py-6 px-6 uppercase text-gray-500">{iq.type}</td>
                  <td className="py-6 px-6">
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteInquiry(iq.id); }}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 font-bold uppercase tracking-widest text-[9px]"
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {inquiries.length === 0 && (
            <div className="py-20 text-center text-gray-300">
              <p className="eng-text text-[10px] uppercase tracking-widest font-black mb-2">No Inquiries Yet</p>
            </div>
          )}
        </div>

        <aside className={`lg:w-96 border border-gray-100 p-8 rounded-lg bg-gray-50/50 space-y-8 animate-in fade-in duration-500 ${!selectedInquiry ? 'hidden lg:block opacity-20 pointer-events-none' : ''}`}>
           <div className="border-b border-gray-200 pb-6">
              <h4 className="eng-text text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Inquiry Detail</h4>
              <p className="kor-bold text-xl">{selectedInquiry?.name || 'Please select'}</p>
           </div>
           
           <div className="space-y-6">
              {[
                { label: 'Contact', value: selectedInquiry?.phone },
                { label: 'Email', value: selectedInquiry?.email },
                { label: 'Address', value: selectedInquiry?.address },
                { label: 'Type', value: selectedInquiry?.type },
                { label: 'Size', value: selectedInquiry?.size },
                { label: 'Schedule', value: selectedInquiry?.schedule },
                { label: 'Budget', value: selectedInquiry?.budget },
                { label: 'Referral', value: selectedInquiry?.referral },
              ].map(item => (
                <div key={item.label} className="space-y-1">
                   <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest">{item.label}</label>
                   <p className="text-xs font-medium text-black">{item.value || '-'}</p>
                </div>
              ))}
              
              <div className="space-y-1 pt-4 border-t border-gray-100">
                 <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest">Content</label>
                 <p className="text-xs leading-relaxed whitespace-pre-line text-gray-700">{selectedInquiry?.content || 'No content provided.'}</p>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );

  const renderLinkManager = () => (
    <div className="max-w-xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
       <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <h3 className="kor-bold text-xl">SNS 및 링크 설정</h3>
        <button onClick={() => saveToStorage('bbeoggugi_channels', channels)} className="bg-black text-white text-[10px] px-6 py-2 rounded-full uppercase tracking-widest hover:bg-gray-800 transition-colors font-bold">Update Links</button>
      </div>
      <div className="space-y-8">
        {channels.map((ch, idx) => (
          <div key={ch.id} className="space-y-3">
             <label className="eng-text text-[9px] font-black uppercase text-gray-400 tracking-widest">{ch.name} URL</label>
             <input 
               className="w-full bg-white border border-gray-100 p-4 text-xs font-medium outline-none focus:border-black transition-colors" 
               value={ch.url} 
               onChange={(e) => {
                  const updated = [...channels];
                  updated[idx].url = e.target.value;
                  setChannels(updated);
               }} 
             />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="px-8 md:px-12 max-w-[1400px] mx-auto py-10 min-h-[80vh]">
      <div className="flex flex-col md:flex-row gap-20">
        <aside className="md:w-64 space-y-12 md:sticky md:top-40">
           <div>
              <h2 className="eng-text text-[11px] font-black tracking-[0.4em] uppercase mb-4 text-black">Control Panel</h2>
              <div className="w-8 h-[1px] bg-black"></div>
           </div>
           
           <nav className="flex flex-col gap-8">
              {[
                { id: 'projects', name: 'SPACE 관리', en: 'Projects' },
                { id: 'design', name: '디자인 설정', en: 'Design System' },
                { id: 'links', name: '링크 관리', en: 'Links' },
                { id: 'inquiries', name: '문의 확인', en: 'Inquiries' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-left transition-all group ${activeTab === tab.id ? 'opacity-100 translate-x-2' : 'opacity-40 hover:opacity-100'}`}
                >
                  <span className="kor-bold text-base block mb-1">{tab.name}</span>
                  <span className="eng-text text-[9px] font-bold uppercase tracking-widest">{tab.en}</span>
                </button>
              ))}
           </nav>

           <div className="pt-20">
              <button 
                onClick={() => { if(confirm('모든 설정을 초기화하시겠습니까?')) { localStorage.clear(); window.location.reload(); } }}
                className="text-[9px] eng-text uppercase font-black tracking-widest text-red-400 hover:text-red-600 underline"
              >
                Factory Reset
              </button>
           </div>
        </aside>

        <div className="flex-grow">
          {activeTab === 'projects' && renderProjectManager()}
          {activeTab === 'design' && renderDesignSystem()}
          {activeTab === 'links' && renderLinkManager()}
          {activeTab === 'inquiries' && renderInquiries()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
