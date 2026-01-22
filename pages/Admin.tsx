
import React, { useState, useEffect } from 'react';
import { projects as initialProjects, team as initialTeam } from '../data';
import { Project, TeamMember } from '../types';

const Admin: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'pages' | 'inquiries' | 'design'>('projects');
  const [activePageSubTab, setActivePageSubTab] = useState<'about' | 'careers' | 'team'>('about');
  
  // Fixed Recovery Email
  const OFFICIAL_RECOVERY_EMAIL = 'bbeoggugi@gmail.com';

  // Data States
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [inquiryFilter, setInquiryFilter] = useState<'All' | 'Project' | 'Career' | 'Suggestion'>('All');
  const [team, setTeam] = useState<TeamMember[]>([]);
  
  // Design Settings State
  const [designSettings, setDesignSettings] = useState({
    primaryColor: '#111111',
    secondaryColor: '#9A9A9A',
    baseFontSize: 16,
    mainFont: 'sans',
    customFontBase64: '',
    useCustomFont: false
  });

  // Page Content States (About, Career)
  const [aboutData, setAboutData] = useState({
    mainTitle: 'Art, Made Livable',
    subtitle: 'BBEOGGUGI Studio',
    descKr1: '뻐꾸기 스튜디오는 삶의 방식과 취향을 섬세하게 해석해 예술적 감각과 건축적 사고가 어우러진 공간을 설계합니다.',
    descKr2: '맥락을 존중한 구성과 절제된 선, 시간이 흐를수록 깊어지는 소재 선택을 통해 살아가며 자연스럽게 완성되는 공간을 만듭니다.',
    descEn: 'BBEOGGUGI Studio interprets the way you live to design spaces where artistic sensibility and architectural clarity meet.',
    mainImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    addressKr: '서울 중구 장충단로8길 18 4층',
    addressEn: '4F, 18, Jangchungdan-ro 8-gil, Jung-gu, Seoul, Republic of Korea'
  });

  const [careerData, setCareerData] = useState({
    mainTitle: 'Join our Creative Collective',
    descKr: '우리는 정형화된 틀을 벗어나, 공간의 본질을 탐구하고 새로운 라이프스타일을 제안합니다.',
    descEn: '뻐꾸기 스튜디오는 개인의 창의성을 존중하며, 최상의 퀄리티를 위해 함께 고민하고 성장하는 문화를 지향합니다.',
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'
  });

  useEffect(() => {
    const loadData = () => {
      setProjects(JSON.parse(localStorage.getItem('bbeoggugi_projects') || JSON.stringify(initialProjects)));
      setInquiries(JSON.parse(localStorage.getItem('bbeoggugi_inquiries') || '[]'));
      setTeam(JSON.parse(localStorage.getItem('bbeoggugi_team') || JSON.stringify(initialTeam)));
      
      const savedAbout = localStorage.getItem('bbeoggugi_about');
      if (savedAbout) setAboutData(JSON.parse(savedAbout));
      
      const savedCareer = localStorage.getItem('bbeoggugi_career_main');
      if (savedCareer) setCareerData(JSON.parse(savedCareer));

      const savedDesign = localStorage.getItem('admin_design_settings');
      if (savedDesign) setDesignSettings(JSON.parse(savedDesign));
    };
    loadData();
    if (sessionStorage.getItem('admin_auth') === 'true') setIsAuthorized(true);
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

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`공식 관리자 메일(${OFFICIAL_RECOVERY_EMAIL})로 비밀번호 재설정 링크를 발송했습니다. 보안을 위해 다른 계정으로는 발송이 불가능합니다.`);
    setIsRecoveryMode(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const saveData = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      alert('변경사항이 안전하게 저장되었습니다.');
      if (key === 'admin_design_settings') window.location.reload();
    } catch (e) {
      alert('이미지 데이터가 너무 커서 저장에 실패했습니다. 이미지 용량을 줄여주세요.');
    }
  };

  const filteredInquiries = inquiries.filter(iq => {
    if (inquiryFilter === 'All') return true;
    if (inquiryFilter === 'Project') return iq.type !== 'Career' && iq.type !== 'Suggestion' && iq.type !== 'Collaboration';
    if (inquiryFilter === 'Suggestion') return iq.type === 'Suggestion' || iq.type === 'Collaboration';
    return iq.type === inquiryFilter;
  });

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#FDFCF8] flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-12 text-center">
           <h1 className="text-4xl font-serif tracking-widest uppercase">BBEOGGUGI ADMIN</h1>
           
           {!isRecoveryMode ? (
             <form onSubmit={handleLogin} className="space-y-10 animate-in fade-in duration-500">
                <input 
                  type="password" 
                  value={passwordInput} 
                  onChange={(e) => setPasswordInput(e.target.value)} 
                  className="w-full bg-transparent border-b border-black text-center text-xl tracking-[0.5em] outline-none" 
                  placeholder="Password" 
                  autoFocus 
                />
                <div className="flex flex-col gap-4 items-center">
                  <button type="submit" className="bg-black text-white px-12 py-4 rounded-full uppercase tracking-widest text-[10px] font-black hover:bg-gray-800 transition-colors">Login</button>
                  <button type="button" onClick={() => setIsRecoveryMode(true)} className="text-[10px] text-gray-400 underline uppercase tracking-widest">비밀번호 찾기</button>
                </div>
             </form>
           ) : (
             <form onSubmit={handleRecovery} className="space-y-10 animate-in slide-in-from-bottom-2">
                <div className="space-y-4">
                   <p className="text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
                     보안을 위해 비밀번호 재설정 링크는<br/>공식 계정으로만 전송됩니다.
                   </p>
                   <div className="bg-gray-100 p-4 rounded text-sm font-bold tracking-wider">
                      {OFFICIAL_RECOVERY_EMAIL}
                   </div>
                </div>
                <div className="flex flex-col gap-4 items-center">
                  <button type="submit" className="bg-black text-white px-12 py-4 rounded-full uppercase tracking-widest text-[10px] font-black">링크 발송</button>
                  <button type="button" onClick={() => setIsRecoveryMode(false)} className="text-[10px] text-gray-400 underline uppercase tracking-widest">돌아가기</button>
                </div>
             </form>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 md:px-12 max-w-[1600px] mx-auto py-10 min-h-screen">
      <div className="flex flex-col md:flex-row gap-16">
        {/* Navigation Sidebar */}
        <aside className="md:w-64 space-y-8">
           <div className="flex justify-between items-center md:block md:space-y-2">
             <h2 className="eng-text text-[11px] font-black tracking-[0.4em] uppercase text-black">Control Panel</h2>
             <button onClick={() => { sessionStorage.removeItem('admin_auth'); window.location.reload(); }} className="text-[9px] font-bold text-red-400 uppercase md:mt-2 hover:opacity-50 transition-opacity">Logout</button>
           </div>
           <nav className="flex flex-col gap-6">
              {[
                { id: 'projects', name: 'SPACE (프로젝트 상세)', en: 'Archive' },
                { id: 'pages', name: 'CONTENTS (기타 페이지)', en: 'Page CMS' },
                { id: 'inquiries', name: 'INQUIRIES (문의/지원)', en: 'Message Hub' },
                { id: 'design', name: 'DESIGN (전체 스타일)', en: 'Styles' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-left transition-all ${activeTab === tab.id ? 'opacity-100 translate-x-2' : 'opacity-30 hover:opacity-100'}`}
                >
                  <span className="kor-bold text-sm block">{tab.name}</span>
                  <span className="eng-text text-[8px] font-bold uppercase tracking-widest">{tab.en}</span>
                </button>
              ))}
           </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-grow">
          
          {/* 1. PROJECTS TAB - Exhaustive Detail & Gallery Editor */}
          {activeTab === 'projects' && (
            <div className="space-y-10 animate-in fade-in duration-700">
               <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                  <h3 className="kor-bold text-xl uppercase">Space Archive Manager</h3>
                  <button onClick={() => saveData('bbeoggugi_projects', projects)} className="bg-black text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-800">SAVE ALL PROJECTS</button>
               </div>
               
               <div className="space-y-6">
                  {projects.map((p, idx) => (
                    <div key={p.id} className="border p-6 rounded-lg bg-white shadow-sm overflow-hidden">
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-6">
                             <div className="w-12 h-16 bg-gray-100 border overflow-hidden rounded-sm shadow-inner">
                                <img src={p.mainImage} className="w-full h-full object-cover" alt="" />
                             </div>
                             <div>
                                <h4 className="kor-bold text-sm">{p.title}</h4>
                                <p className="eng-text text-[9px] text-gray-400 uppercase tracking-widest">{p.info.usage} | {p.info.year}</p>
                             </div>
                          </div>
                          <button onClick={() => setEditingProjectId(editingProjectId === p.id ? null : p.id)} className={`text-[10px] font-black border px-5 py-2 rounded-full transition-all ${editingProjectId === p.id ? 'bg-black text-white border-black' : 'bg-white text-black hover:bg-gray-50'}`}>
                             {editingProjectId === p.id ? 'SAVE & CLOSE' : 'EDIT DETAIL'}
                          </button>
                       </div>

                       {editingProjectId === p.id && (
                         <div className="mt-8 pt-8 border-t border-gray-50 space-y-12 animate-in slide-in-from-top-4 duration-500">
                            
                            {/* Detailed Information (Info Section in ProjectDetail.tsx) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                               <div className="space-y-6">
                                  <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                                     <span className="w-4 h-[1px] bg-gray-300"></span> Primary Info
                                  </h5>
                                  <div className="space-y-4">
                                     <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                           <label className="text-[8px] font-bold text-gray-400 uppercase">Title KR</label>
                                           <input className="w-full border p-3 text-xs focus:border-black outline-none" value={p.title} onChange={e => { const u = [...projects]; u[idx].title = e.target.value; setProjects(u); }} />
                                        </div>
                                        <div className="space-y-1">
                                           <label className="text-[8px] font-bold text-gray-400 uppercase">Title EN</label>
                                           <input className="w-full border p-3 text-xs focus:border-black outline-none" value={p.titleEn} onChange={e => { const u = [...projects]; u[idx].titleEn = e.target.value; setProjects(u); }} />
                                        </div>
                                     </div>
                                     <div className="space-y-1">
                                        <label className="text-[8px] font-bold text-gray-400 uppercase">Description (Korean)</label>
                                        <textarea className="w-full border p-3 text-xs h-32 resize-none focus:border-black outline-none" value={p.descriptionKr} onChange={e => { const u = [...projects]; u[idx].descriptionKr = e.target.value; setProjects(u); }} />
                                     </div>
                                     <div className="space-y-1">
                                        <label className="text-[8px] font-bold text-gray-400 uppercase">Main Cover Image</label>
                                        <div className="flex gap-4">
                                          <input className="flex-grow border p-3 text-xs focus:border-black outline-none" placeholder="Image URL or Upload" value={p.mainImage} onChange={e => { const u = [...projects]; u[idx].mainImage = e.target.value; setProjects(u); }} />
                                          <div className="relative shrink-0">
                                             <button className="bg-gray-100 px-4 py-3 text-[9px] font-black uppercase rounded">Upload</button>
                                             <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleImageUpload(e, (b) => { const u = [...projects]; u[idx].mainImage = b; setProjects(u); })} />
                                          </div>
                                        </div>
                                     </div>
                                  </div>
                               </div>

                               <div className="space-y-6">
                                  <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                                     <span className="w-4 h-[1px] bg-gray-300"></span> Metadata (Info Area)
                                  </h5>
                                  <div className="grid grid-cols-2 gap-4">
                                     {['design', 'construction', 'photograph', 'year', 'site', 'usage', 'area', 'scope'].map(field => (
                                       <div key={field} className="space-y-1">
                                          <label className="text-[8px] uppercase font-bold text-gray-400 block">{field}</label>
                                          <input 
                                            className="w-full border p-2.5 text-[11px] focus:border-black outline-none" 
                                            value={(p.info as any)[field]} 
                                            onChange={e => {
                                              const u = [...projects];
                                              (u[idx].info as any)[field] = e.target.value;
                                              setProjects(u);
                                            }} 
                                          />
                                       </div>
                                     ))}
                                  </div>
                               </div>
                            </div>

                            {/* Gallery Images Manager */}
                            <div className="space-y-6">
                               <div className="flex justify-between items-center border-b pb-2">
                                  <h5 className="text-[10px] font-black uppercase tracking-[0.2em]">Project Gallery ({p.images.length})</h5>
                                  <div className="relative">
                                     <button className="text-[9px] bg-black text-white px-5 py-2 rounded-full font-black uppercase hover:opacity-80">+ ADD GALLERY PHOTO</button>
                                     <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                        const files = Array.from(e.target.files || []);
                                        files.forEach(file => {
                                          const reader = new FileReader();
                                          reader.onloadend = () => {
                                            const u = [...projects];
                                            u[idx].images = [...u[idx].images, reader.result as string];
                                            setProjects([...u]);
                                          };
                                          reader.readAsDataURL(file);
                                        });
                                     }} />
                                  </div>
                               </div>
                               <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                                  {p.images.map((img, imgIdx) => (
                                    <div key={imgIdx} className="relative aspect-[4/5] bg-gray-50 border group rounded-sm overflow-hidden">
                                       <img src={img} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" alt="" />
                                       <button 
                                          onClick={() => {
                                            const u = [...projects];
                                            u[idx].images = u[idx].images.filter((_, i) => i !== imgIdx);
                                            setProjects(u);
                                          }}
                                          className="absolute top-2 right-2 bg-red-500/90 text-white w-6 h-6 rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl backdrop-blur-sm"
                                       >✕</button>
                                       <div className="absolute bottom-0 left-0 w-full bg-black/40 py-1 text-center text-[8px] text-white opacity-0 group-hover:opacity-100">Pos: {imgIdx + 1}</div>
                                    </div>
                                  ))}
                                  {p.images.length === 0 && (
                                    <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-100 rounded text-gray-300 text-[10px] uppercase font-black tracking-widest">Gallery Empty</div>
                                  )}
                               </div>
                            </div>
                         </div>
                       )}
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* 2. PAGES (CMS) TAB */}
          {activeTab === 'pages' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="flex gap-4 border-b border-gray-100 pb-4">
                  {['about', 'careers', 'team'].map(sub => (
                    <button 
                      key={sub}
                      onClick={() => setActivePageSubTab(sub as any)}
                      className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activePageSubTab === sub ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                    >
                      {sub}
                    </button>
                  ))}
               </div>

               {activePageSubTab === 'about' && (
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Philosophy Main Photo</label>
                          <div className="aspect-video bg-gray-100 border relative overflow-hidden group rounded shadow-inner">
                             <img src={aboutData.mainImage} className="w-full h-full object-cover" alt="" />
                             <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleImageUpload(e, (b) => setAboutData({...aboutData, mainImage: b}))} />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold tracking-[0.2em] pointer-events-none transition-opacity">CHANGE PHOTO</div>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <input className="w-full border p-3 text-sm focus:border-black outline-none" placeholder="Main Header" value={aboutData.mainTitle} onChange={e => setAboutData({...aboutData, mainTitle: e.target.value})} />
                          <textarea className="w-full border p-3 text-xs h-24 focus:border-black outline-none" placeholder="Korean Intro Line 1" value={aboutData.descKr1} onChange={e => setAboutData({...aboutData, descKr1: e.target.value})} />
                          <textarea className="w-full border p-3 text-xs h-24 focus:border-black outline-none" placeholder="Korean Intro Line 2" value={aboutData.descKr2} onChange={e => setAboutData({...aboutData, descKr2: e.target.value})} />
                          <textarea className="w-full border p-3 text-xs h-28 focus:border-black outline-none" placeholder="English Philosophy" value={aboutData.descEn} onChange={e => setAboutData({...aboutData, descEn: e.target.value})} />
                          <button onClick={() => saveData('bbeoggugi_about', aboutData)} className="w-full bg-black text-white py-4 text-[10px] font-black uppercase tracking-widest shadow-lg">Save Philosophy Changes</button>
                       </div>
                    </div>
                    <div className="space-y-8">
                       <h4 className="text-[11px] font-black uppercase tracking-[0.3em] border-b pb-2">HQ Location Management</h4>
                       <div className="space-y-4">
                          <div className="space-y-1">
                             <label className="text-[8px] font-bold text-gray-400 uppercase">Address KR</label>
                             <input className="w-full border p-3 text-xs focus:border-black outline-none" value={aboutData.addressKr} onChange={e => setAboutData({...aboutData, addressKr: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                             <label className="text-[8px] font-bold text-gray-400 uppercase">Address EN</label>
                             <input className="w-full border p-3 text-xs focus:border-black outline-none" value={aboutData.addressEn} onChange={e => setAboutData({...aboutData, addressEn: e.target.value})} />
                          </div>
                       </div>
                    </div>
                 </div>
               )}

               {activePageSubTab === 'careers' && (
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                       <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Career Hero Image</label>
                       <div className="aspect-[3/4] max-w-[300px] bg-gray-100 border relative overflow-hidden rounded group">
                          <img src={careerData.mainImage} className="w-full h-full object-cover" alt="" />
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleImageUpload(e, (b) => setCareerData({...careerData, mainImage: b}))} />
                       </div>
                    </div>
                    <div className="space-y-6">
                       <textarea className="w-full border p-4 text-xl font-serif h-32 focus:border-black outline-none" placeholder="Main Catchphrase" value={careerData.mainTitle} onChange={e => setCareerData({...careerData, mainTitle: e.target.value})} />
                       <textarea className="w-full border p-3 text-xs h-24 focus:border-black outline-none" placeholder="Intro (KR)" value={careerData.descKr} onChange={e => setCareerData({...careerData, descKr: e.target.value})} />
                       <textarea className="w-full border p-3 text-xs h-24 focus:border-black outline-none" placeholder="Intro (EN)" value={careerData.descEn} onChange={e => setCareerData({...careerData, descEn: e.target.value})} />
                       <button onClick={() => saveData('bbeoggugi_career_main', careerData)} className="w-full bg-black text-white py-4 text-[10px] font-black uppercase tracking-widest shadow-lg">Save Career Hero Changes</button>
                    </div>
                 </div>
               )}

               {activePageSubTab === 'team' && (
                 <div className="space-y-8">
                    <div className="flex justify-between items-center">
                       <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Studio Collective List</h4>
                       <button onClick={() => setTeam([...team, { id: Date.now().toString(), name: 'New Staff', role: 'Staff Designer', avatar: '' }])} className="text-[10px] bg-white border-2 border-black px-6 py-2 rounded-full font-black uppercase hover:bg-black hover:text-white transition-all">+ ADD MEMBER</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {team.map((member, idx) => (
                         <div key={member.id} className="border p-6 rounded bg-white shadow-sm flex items-center justify-between group">
                            <div className="space-y-3 flex-grow pr-4">
                               <input className="border-b bg-transparent font-bold text-base w-full outline-none focus:border-black" placeholder="Name" value={member.name} onChange={e => { const u = [...team]; u[idx].name = e.target.value; setTeam(u); }} />
                               <input className="border-b bg-transparent text-[10px] uppercase tracking-widest w-full outline-none focus:border-black text-gray-400" placeholder="Role" value={member.role} onChange={e => { const u = [...team]; u[idx].role = e.target.value; setTeam(u); }} />
                            </div>
                            <button onClick={() => setTeam(team.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600 font-black text-xs">✕</button>
                         </div>
                       ))}
                    </div>
                    <button onClick={() => saveData('bbeoggugi_team', team)} className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-widest shadow-xl">Confirm Team Update</button>
                 </div>
               )}
            </div>
          )}

          {/* 3. INQUIRIES TAB */}
          {activeTab === 'inquiries' && (
            <div className="animate-in fade-in duration-700 space-y-8">
               <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-100 pb-4">
                  <h3 className="kor-bold text-xl uppercase tracking-wider">Inquiry Dashboard</h3>
                  <div className="flex gap-2">
                    {['All', 'Project', 'Career', 'Suggestion'].map(f => (
                      <button 
                        key={f}
                        onClick={() => setInquiryFilter(f as any)}
                        className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${inquiryFilter === f ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-grow border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm">
                    <table className="w-full text-left text-[11px]">
                       <thead className="bg-gray-50 border-b border-gray-100">
                          <tr className="eng-text text-[9px] uppercase font-black tracking-widest text-gray-400">
                             <th className="p-5">Date</th>
                             <th className="p-5">Client Name</th>
                             <th className="p-5">Category</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                          {filteredInquiries.length === 0 ? (
                            <tr><td colSpan={3} className="p-20 text-center text-gray-300 uppercase font-black tracking-[0.4em]">Empty Inbox</td></tr>
                          ) : filteredInquiries.map(iq => (
                            <tr 
                              key={iq.id} 
                              onClick={() => setSelectedInquiry(iq)}
                              className={`cursor-pointer transition-all ${selectedInquiry?.id === iq.id ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                            >
                               <td className="p-5 opacity-60 font-medium">{new Date(iq.date).toLocaleDateString()}</td>
                               <td className="p-5 font-black uppercase">{iq.name}</td>
                               <td className="p-5"><span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${selectedInquiry?.id === iq.id ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>{iq.type || 'Project'}</span></td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                  </div>

                  <aside className={`lg:w-[480px] border border-gray-100 p-10 rounded-lg bg-gray-50/50 min-h-[600px] shadow-inner transition-all ${!selectedInquiry ? 'opacity-30 blur-[2px]' : ''}`}>
                     {selectedInquiry ? (
                       <div className="space-y-8 animate-in fade-in duration-500">
                          <div className="border-b border-gray-200 pb-6">
                             <h4 className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">{selectedInquiry.type || 'Project'} Request</h4>
                             <p className="kor-bold text-3xl text-black">{selectedInquiry.name}</p>
                             <p className="text-[10px] text-gray-400 mt-2">{new Date(selectedInquiry.date).toLocaleString()}</p>
                          </div>
                          <div className="space-y-6 text-xs">
                             <div className="grid grid-cols-2 gap-6">
                                <div><label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Contact</label><p className="font-bold text-sm">{selectedInquiry.phone || 'N/A'}</p></div>
                                <div><label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Email</label><p className="font-bold text-sm underline">{selectedInquiry.email || 'N/A'}</p></div>
                             </div>
                             {selectedInquiry.type === 'Career' && (
                                <div><label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Position</label><p className="font-bold text-sm">{selectedInquiry.position}</p></div>
                             )}
                             <div className="space-y-2">
                                <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Message Detail</label>
                                <div className="bg-white p-6 border rounded-sm leading-loose text-gray-700 whitespace-pre-line text-sm shadow-sm">{selectedInquiry.content || selectedInquiry.message || 'No additional content provided.'}</div>
                             </div>
                             {selectedInquiry.fileBase64 && (
                               <div className="pt-4"><a href={selectedInquiry.fileBase64} download={selectedInquiry.fileName} className="inline-block bg-black text-white px-8 py-3 rounded text-[9px] font-black uppercase tracking-widest shadow-xl hover:bg-gray-800">Download Attachment: {selectedInquiry.fileName}</a></div>
                             )}
                          </div>
                          <div className="pt-10 flex justify-end">
                             <button onClick={() => {
                               const u = inquiries.filter(i => i.id !== selectedInquiry.id);
                               setInquiries(u);
                               localStorage.setItem('bbeoggugi_inquiries', JSON.stringify(u));
                               setSelectedInquiry(null);
                             }} className="text-red-500 text-[10px] font-black uppercase border-b border-red-200 hover:border-red-500 pb-1">Archive / Delete Inquiry</button>
                          </div>
                       </div>
                     ) : (
                       <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9l3.8-1.4-1.4 3.8Z"/></svg>
                          <p className="text-[10px] uppercase tracking-[0.4em] font-black">Select an Inquiry</p>
                       </div>
                     )}
                  </aside>
               </div>
            </div>
          )}

          {/* 4. DESIGN TAB */}
          {activeTab === 'design' && (
            <div className="animate-in fade-in duration-700 space-y-12 max-w-2xl">
               <h3 className="kor-bold text-xl border-b border-gray-100 pb-4">Global Identity & Styles</h3>
               <div className="space-y-10">
                  <div className="grid grid-cols-2 gap-10">
                     <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest">Brand Primary</label>
                       <div className="flex items-center gap-4">
                         <input type="color" value={designSettings.primaryColor} onChange={e => setDesignSettings({...designSettings, primaryColor: e.target.value})} className="w-16 h-16 rounded-full cursor-pointer shadow-lg border-2 border-white" />
                         <span className="text-[11px] font-mono font-bold">{designSettings.primaryColor}</span>
                       </div>
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest">Brand Secondary</label>
                       <div className="flex items-center gap-4">
                         <input type="color" value={designSettings.secondaryColor} onChange={e => setDesignSettings({...designSettings, secondaryColor: e.target.value})} className="w-16 h-16 rounded-full cursor-pointer shadow-lg border-2 border-white" />
                         <span className="text-[11px] font-mono font-bold">{designSettings.secondaryColor}</span>
                       </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-widest">Base Font Size ({designSettings.baseFontSize}px)</label>
                     <input type="range" min="14" max="22" step="1" value={designSettings.baseFontSize} onChange={e => setDesignSettings({...designSettings, baseFontSize: parseInt(e.target.value)})} className="w-full h-1 bg-gray-200 accent-black rounded-lg appearance-none cursor-pointer" />
                     <p className="text-[9px] text-gray-400 uppercase tracking-widest italic">This scales all UI elements across the platform.</p>
                  </div>
                  <div className="space-y-6 pt-10 border-t">
                     <label className="text-[11px] font-black uppercase tracking-[0.2em]">Custom Typographic Assets</label>
                     <div className="flex items-center gap-6">
                        <div className="flex-grow border-2 border-dashed border-gray-100 p-6 text-[10px] text-gray-400 bg-gray-50/50 italic text-center rounded">
                          {designSettings.customFontBase64 ? '✔ Custom Brand Font Loaded' : 'No custom font provided. Using system defaults.'}
                        </div>
                        <div className="relative"><button className="bg-black text-white px-8 py-4 text-[10px] font-black rounded-sm shadow-xl hover:bg-gray-800">UPLOAD OTF/TTF</button><input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleImageUpload(e, (b) => setDesignSettings({...designSettings, customFontBase64: b}))} /></div>
                     </div>
                     <label className="flex items-center gap-4 cursor-pointer p-4 bg-gray-50 rounded select-none">
                       <input type="checkbox" checked={designSettings.useCustomFont} onChange={e => setDesignSettings({...designSettings, useCustomFont: e.target.checked})} className="w-5 h-5 accent-black" />
                       <span className="text-[11px] font-black uppercase tracking-widest">Apply Brand Font Globally</span>
                     </label>
                  </div>
                  <button onClick={() => saveData('admin_design_settings', designSettings)} className="w-full bg-black text-white py-6 text-[12px] font-black uppercase tracking-[0.5em] shadow-2xl hover:bg-gray-900 transition-all rounded-sm">DEPLOY CHANGES & REFRESH</button>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Admin;
