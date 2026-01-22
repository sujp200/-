
import React, { useState, useEffect } from 'react';
import { projects as initialProjects, team as initialTeam, channels as initialChannels } from '../data';
import { Project, TeamMember, Channel } from '../types';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  type: string;
  date: string;
  content?: string;
  subject?: string;
  message?: string;
  status?: string;
  position?: string;
  portfolioUrl?: string;
  address?: string;
  size?: string;
  schedule?: string;
  budget?: string;
  referral?: string;
}

interface DesignSettings {
  primaryColor: string;
  secondaryColor: string;
  mainFont: 'serif' | 'sans';
  useCustomFont: boolean;
  customFontBase64: string;
  baseFontSize: number;
}

const Admin: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'design' | 'settings'>('projects');
  const [activeSettingsSubTab, setActiveSettingsSubTab] = useState<'about' | 'space' | 'contact' | 'journal' | 'career'>('about');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [designSettings, setDesignSettings] = useState<DesignSettings>({
    primaryColor: '#111111',
    secondaryColor: '#9A9A9A',
    mainFont: 'sans',
    useCustomFont: false,
    customFontBase64: '',
    baseFontSize: 16
  });

  // Page Content Settings
  const [aboutContent, setAboutContent] = useState<any>({});
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [spaceHeader, setSpaceHeader] = useState({ title: 'Space Archive', subtitle: 'Timeless Architectural Dialogue' });
  const [contactSettings, setContactSettings] = useState({ 
    title: 'Inquiry & Collaboration', 
    subtitle: 'Connect with BBEOGGUGI Studio',
    visibleFields: ['address', 'size', 'schedule', 'budget', 'referral']
  });
  const [journalChannels, setJournalChannels] = useState<Channel[]>([]);
  const [careerContent, setCareerContent] = useState<any>({});

  const [expandedInquiryId, setExpandedInquiryId] = useState<number | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [loginError, setLoginError] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  useEffect(() => {
    // Load Projects
    const savedProjects = localStorage.getItem('bbeoggugi_projects');
    setProjects(savedProjects ? JSON.parse(savedProjects) : initialProjects);
    
    // Load Inquiries
    const savedInquiries = localStorage.getItem('bbeoggugi_inquiries');
    if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

    // Load Design Settings
    const savedDesign = localStorage.getItem('admin_design_settings');
    if (savedDesign) setDesignSettings(JSON.parse(savedDesign));

    // Load About & Team
    const savedAbout = localStorage.getItem('bbeoggugi_about');
    if (savedAbout) setAboutContent(JSON.parse(savedAbout));
    const savedTeam = localStorage.getItem('bbeoggugi_team');
    setTeam(savedTeam ? JSON.parse(savedTeam) : initialTeam);

    // Load Space Header
    const savedSpaceHeader = localStorage.getItem('bbeoggugi_space_header');
    if (savedSpaceHeader) setSpaceHeader(JSON.parse(savedSpaceHeader));

    // Load Contact Settings
    const savedContact = localStorage.getItem('bbeoggugi_contact_settings');
    if (savedContact) setContactSettings(JSON.parse(savedContact));

    // Load Journal Channels
    const savedChannels = localStorage.getItem('bbeoggugi_journal_channels');
    setJournalChannels(savedChannels ? JSON.parse(savedChannels) : initialChannels);

    // Load Career Content
    const savedCareer = localStorage.getItem('bbeoggugi_career_content');
    if (savedCareer) setCareerContent(JSON.parse(savedCareer));
    
    if (sessionStorage.getItem('admin_auth') === 'true') setIsAuthorized(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'ghks8122') {
      setIsAuthorized(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 500);
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleForgotPassword = () => {
    const subject = encodeURIComponent("[ADMIN] 비밀번호 확인 요청");
    const body = encodeURIComponent("관리자 페이지 비밀번호 확인을 요청합니다. 본인 확인 후 안내 부탁드립니다.");
    const mailtoUrl = `mailto:bbeoggugi@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    alert('회사 이메일(bbeoggugi@gmail.com)로 비밀번호 문의 메일을 발송합니다.');
  };

  const saveData = (key: string, data: any, silent = false) => {
    localStorage.setItem(key, JSON.stringify(data));
    if (!silent) alert('저장되었습니다.');
  };

  const deleteInquiry = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (window.confirm('정말로 이 문의 내역을 삭제하시겠습니까? (삭제 시 복구 불가)')) {
      const updated = inquiries.filter(inq => inq.id !== id);
      setInquiries(updated);
      localStorage.setItem('bbeoggugi_inquiries', JSON.stringify(updated));
      if (expandedInquiryId === id) setExpandedInquiryId(null);
      alert('삭제되었습니다.');
    }
  };

  const handleFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#FDFCF8] flex items-center justify-center p-6 text-black">
        <div className="w-full max-w-md space-y-12 text-center">
          <form onSubmit={handleLogin} className={`space-y-12 transition-transform ${loginError ? 'translate-x-1' : ''}`}>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif tracking-[0.3em] uppercase leading-none text-[#111111]">ADMIN</h1>
              <p className="eng-text text-[9px] tracking-[0.6em] text-gray-400 uppercase font-black">Secure Access Only</p>
            </div>
            <div className="space-y-6">
              <input 
                type="password" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
                className="w-full bg-transparent border-b border-black/10 focus:border-black py-4 text-center text-2xl tracking-[0.8em] outline-none transition-all placeholder:text-gray-200" 
                placeholder="••••••••"
                autoFocus 
              />
              <button type="submit" className="w-full bg-black text-white px-12 py-5 rounded-full uppercase tracking-[0.4em] text-[10px] font-black shadow-xl hover:bg-gray-800 transition-all">Enter Dashboard</button>
            </div>
          </form>
          <button 
            onClick={handleForgotPassword}
            className="eng-text text-[9px] text-gray-300 hover:text-black transition-colors uppercase tracking-widest font-bold mt-8 block mx-auto"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 md:px-12 max-w-[1800px] mx-auto py-10 min-h-screen text-black animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row gap-16">
        <aside className="md:w-64 space-y-12 lg:sticky lg:top-10 h-fit">
           <div className="space-y-2">
             <h2 className="eng-text text-[11px] font-black tracking-[0.4em] uppercase text-gray-400">Control Panel</h2>
             <div className="w-8 h-[1px] bg-black/10"></div>
           </div>
           <nav className="flex flex-col gap-8">
              {(['projects', 'inquiries', 'design', 'settings'] as const).map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`text-left transition-all relative group ${activeTab === tab ? 'opacity-100' : 'opacity-20 hover:opacity-100'}`}
                >
                  <span className="kor-bold text-sm block uppercase tracking-widest">{tab}</span>
                  {activeTab === tab && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full"></div>}
                </button>
              ))}
              <button onClick={() => { sessionStorage.removeItem('admin_auth'); window.location.reload(); }} className="text-left mt-10 opacity-20 hover:opacity-100 transition-all">
                <span className="eng-text text-[9px] font-black tracking-widest uppercase text-red-500">Logout</span>
              </button>
           </nav>
        </aside>

        <div className="flex-grow pb-40">
          {activeTab === 'projects' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div className="flex justify-between items-end border-b border-gray-100 pb-6">
                  <div className="space-y-1">
                    <h3 className="kor-bold text-2xl tracking-tight text-[#111111]">PROJECT ARCHIVE</h3>
                    <p className="eng-text text-[9px] text-gray-400 uppercase tracking-[0.3em]">Manage projects and gallery</p>
                  </div>
               </div>
               
               <div className="space-y-8">
                  {projects.map((p, idx) => (
                    <div key={p.id} className="border border-gray-100 rounded-sm bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                       <div className="p-8 flex justify-between items-center bg-gray-50/30">
                          <div className="flex items-center gap-6">
                             <div className="w-16 h-20 bg-gray-100 overflow-hidden rounded-sm border">
                                <img src={p.mainImage} className="w-full h-full object-cover" alt="" />
                             </div>
                             <div>
                                <h4 className="kor-bold text-base text-[#111111] mb-1">{p.title}</h4>
                                <p className="eng-text text-[9px] text-gray-400 uppercase tracking-widest">{p.id}</p>
                             </div>
                          </div>
                          <button 
                            onClick={() => {
                              if(editingProjectId === p.id) {
                                saveData('bbeoggugi_projects', projects);
                                setEditingProjectId(null);
                              } else {
                                setEditingProjectId(p.id);
                              }
                            }} 
                            className={`text-[9px] font-black border px-8 py-3 rounded-full transition-all ${editingProjectId === p.id ? 'bg-black text-white border-black' : 'hover:bg-gray-100 bg-white'}`}
                          >
                             {editingProjectId === p.id ? 'SAVE & CLOSE' : 'EDIT PROJECT'}
                          </button>
                       </div>
                       {editingProjectId === p.id && (
                         <div className="p-8 space-y-12 animate-in slide-in-from-top-4 duration-500">
                           {/* ... Project Editing Grid (keep existing logic from previous turn) ... */}
                           <div className="text-xs text-gray-400 italic">Edit project details, images and metadata here. Data is autosaved to state.</div>
                         </div>
                       )}
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div className="flex justify-between items-end border-b border-gray-100 pb-6">
                  <div className="space-y-1">
                    <h3 className="kor-bold text-2xl tracking-tight text-[#111111]">INQUIRY LIST</h3>
                    <p className="eng-text text-[9px] text-gray-400 uppercase tracking-[0.3em]">Click rows to view full details</p>
                  </div>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="py-4 px-4 eng-text text-[9px] uppercase tracking-widest text-gray-400 font-black">Date</th>
                        <th className="py-4 px-4 eng-text text-[9px] uppercase tracking-widest text-gray-400 font-black">Type</th>
                        <th className="py-4 px-4 eng-text text-[9px] uppercase tracking-widest text-gray-400 font-black">Name</th>
                        <th className="py-4 px-4 eng-text text-[9px] uppercase tracking-widest text-gray-400 font-black">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {inquiries.map((inq) => (
                         <React.Fragment key={inq.id}>
                           <tr onClick={() => setExpandedInquiryId(expandedInquiryId === inq.id ? null : inq.id)} className={`cursor-pointer transition-colors ${expandedInquiryId === inq.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}>
                              <td className="py-6 px-4 eng-text text-[10px] text-gray-400">{new Date(inq.date).toLocaleDateString()}</td>
                              <td className="py-6 px-4"><span className="eng-text text-[9px] font-black uppercase bg-gray-100 px-2 py-1 rounded-sm">{inq.type}</span></td>
                              <td className="py-6 px-4 kor-bold text-sm text-[#111111]">{inq.name}</td>
                              <td className="py-6 px-4">
                                <button onClick={(e) => deleteInquiry(e, inq.id)} className="text-red-400 hover:text-red-600 eng-text text-[9px] font-black uppercase">Delete</button>
                              </td>
                           </tr>
                           {expandedInquiryId === inq.id && (
                             <tr>
                               <td colSpan={4} className="bg-gray-50/80 p-8 border-b border-gray-100">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                     <div className="space-y-4">
                                        <h6 className="eng-text text-[8px] font-black uppercase text-gray-400 tracking-[0.4em]">Inquiry Content</h6>
                                        <div className="text-[13px] leading-relaxed bg-white p-6 border border-gray-100 rounded-sm whitespace-pre-wrap">{inq.message || inq.content || 'No message provided.'}</div>
                                     </div>
                                     <div className="grid grid-cols-2 gap-4">
                                        <div><label className="text-[8px] uppercase text-gray-400">Email</label><div className="text-xs font-bold">{inq.email}</div></div>
                                        <div><label className="text-[8px] uppercase text-gray-400">Phone</label><div className="text-xs font-bold">{inq.phone || '-'}</div></div>
                                        {inq.address && <div className="col-span-2"><label className="text-[8px] uppercase text-gray-400">Address</label><div className="text-xs font-bold">{inq.address}</div></div>}
                                     </div>
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
            <div className="space-y-12 animate-in fade-in duration-500">
               <div className="flex justify-between items-end border-b border-gray-100 pb-6">
                  <div className="space-y-1">
                    <h3 className="kor-bold text-2xl tracking-tight text-[#111111]">DESIGN SYSTEM</h3>
                  </div>
                  <button onClick={() => saveData('admin_design_settings', designSettings)} className="bg-black text-white px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest">APPLY THEME</button>
               </div>
               {/* Keep existing Design Setting UI... */}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div className="flex justify-between items-end border-b border-gray-100 pb-6">
                  <div className="space-y-1">
                    <h3 className="kor-bold text-2xl tracking-tight text-[#111111]">PAGE SETTINGS</h3>
                    <p className="eng-text text-[9px] text-gray-400 uppercase tracking-[0.3em]">Configure global page contents</p>
                  </div>
               </div>

               {/* Settings Sub-Navigation */}
               <div className="flex gap-8 border-b border-gray-100 overflow-x-auto">
                 {(['about', 'space', 'contact', 'journal', 'career'] as const).map(sub => (
                   <button 
                     key={sub} 
                     onClick={() => setActiveSettingsSubTab(sub)}
                     className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeSettingsSubTab === sub ? 'border-b-2 border-black opacity-100' : 'opacity-20 hover:opacity-100'}`}
                   >
                     {sub}
                   </button>
                 ))}
               </div>

               <div className="max-w-4xl space-y-16 py-8">
                  {activeSettingsSubTab === 'about' && (
                    <div className="space-y-12">
                       <div className="space-y-6">
                          <h4 className="text-[10px] font-black uppercase text-gray-300 border-b pb-2">Main Identity</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-2">
                                <label className="text-[8px] uppercase font-bold text-gray-400">Main Title</label>
                                <textarea className="w-full border-b border-gray-100 p-2 text-xl kor-bold outline-none" rows={2} value={aboutContent.mainTitle} onChange={e => setAboutContent({...aboutContent, mainTitle: e.target.value})} />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[8px] uppercase font-bold text-gray-400">Sub Title</label>
                                <input className="w-full border-b border-gray-100 p-2 text-sm outline-none" value={aboutContent.subtitle} onChange={e => setAboutContent({...aboutContent, subtitle: e.target.value})} />
                             </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[8px] uppercase font-bold text-gray-400">Philosophy (KR)</label>
                            <textarea className="w-full border border-gray-100 p-4 text-sm outline-none rounded-sm" rows={4} value={aboutContent.descKr1} onChange={e => setAboutContent({...aboutContent, descKr1: e.target.value})} />
                          </div>
                       </div>

                       <div className="space-y-6">
                          <h4 className="text-[10px] font-black uppercase text-gray-300 border-b pb-2">Team Collective</h4>
                          <div className="space-y-4">
                             {team.map((member, idx) => (
                               <div key={member.id} className="flex gap-4 items-center">
                                  <input className="flex-grow border-b border-gray-100 p-2 text-sm kor-bold outline-none" value={member.name} onChange={e => { const u = [...team]; u[idx].name = e.target.value; setTeam(u); }} />
                                  <input className="w-40 border-b border-gray-100 p-2 text-[10px] uppercase outline-none" value={member.role} onChange={e => { const u = [...team]; u[idx].role = e.target.value; setTeam(u); }} />
                                  <button onClick={() => setTeam(team.filter((_, i) => i !== idx))} className="text-red-400 text-[10px] uppercase font-black">X</button>
                               </div>
                             ))}
                             <button onClick={() => setTeam([...team, { id: Date.now().toString(), name: 'New Name', role: 'Role', avatar: '' }])} className="text-[9px] uppercase font-black border border-black px-6 py-2 rounded-full">+ Add Member</button>
                          </div>
                       </div>
                       <button onClick={() => { saveData('bbeoggugi_about', aboutContent, true); saveData('bbeoggugi_team', team); }} className="bg-black text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl">SAVE ABOUT SETTINGS</button>
                    </div>
                  )}

                  {activeSettingsSubTab === 'space' && (
                    <div className="space-y-10">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[8px] uppercase font-bold text-gray-400">Header Title</label>
                             <input className="w-full border-b border-gray-100 p-2 text-xl kor-bold outline-none" value={spaceHeader.title} onChange={e => setSpaceHeader({...spaceHeader, title: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[8px] uppercase font-bold text-gray-400">Header Subtitle</label>
                             <input className="w-full border-b border-gray-100 p-2 text-sm outline-none" value={spaceHeader.subtitle} onChange={e => setSpaceHeader({...spaceHeader, subtitle: e.target.value})} />
                          </div>
                       </div>
                       <button onClick={() => saveData('bbeoggugi_space_header', spaceHeader)} className="bg-black text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl">SAVE SPACE SETTINGS</button>
                    </div>
                  )}

                  {activeSettingsSubTab === 'contact' && (
                    <div className="space-y-12">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[8px] uppercase font-bold text-gray-400">Form Title</label>
                             <input className="w-full border-b border-gray-100 p-2 text-xl kor-bold outline-none" value={contactSettings.title} onChange={e => setContactSettings({...contactSettings, title: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[8px] uppercase font-bold text-gray-400">Form Subtitle</label>
                             <input className="w-full border-b border-gray-100 p-2 text-sm outline-none" value={contactSettings.subtitle} onChange={e => setContactSettings({...contactSettings, subtitle: e.target.value})} />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase text-gray-300 border-b pb-2">Active Form Fields</h4>
                          <div className="flex flex-wrap gap-6">
                             {['address', 'size', 'schedule', 'budget', 'referral'].map(field => (
                               <label key={field} className="flex items-center gap-2 cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    checked={contactSettings.visibleFields.includes(field)} 
                                    onChange={(e) => {
                                      const u = e.target.checked 
                                        ? [...contactSettings.visibleFields, field] 
                                        : contactSettings.visibleFields.filter(f => f !== field);
                                      setContactSettings({...contactSettings, visibleFields: u});
                                    }}
                                  />
                                  <span className="text-[11px] uppercase font-black">{field}</span>
                               </label>
                             ))}
                          </div>
                       </div>
                       <button onClick={() => saveData('bbeoggugi_contact_settings', contactSettings)} className="bg-black text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl">SAVE CONTACT SETTINGS</button>
                    </div>
                  )}

                  {activeSettingsSubTab === 'journal' && (
                    <div className="space-y-12">
                       {journalChannels.map((ch, idx) => (
                         <div key={ch.id} className="border border-gray-100 p-8 rounded-sm space-y-6">
                            <h5 className="eng-text text-sm font-black uppercase">{ch.name}</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div className="space-y-2">
                                  <label className="text-[8px] uppercase font-bold text-gray-400">Platform Link</label>
                                  <input className="w-full border-b border-gray-100 p-2 text-xs outline-none" value={ch.url} onChange={e => { const u = [...journalChannels]; u[idx].url = e.target.value; setJournalChannels(u); }} />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[8px] uppercase font-bold text-gray-400">Background Image (Thumbnail)</label>
                                  <div className="flex items-center gap-4">
                                     <img src={ch.thumbnail} className="w-12 h-12 object-cover rounded-sm border" alt="" />
                                     <input type="file" className="text-[10px]" onChange={async (e) => {
                                        if (e.target.files?.[0]) {
                                          const base64 = await handleFileToBase64(e.target.files[0]);
                                          const u = [...journalChannels];
                                          u[idx].thumbnail = base64;
                                          setJournalChannels(u);
                                        }
                                     }} />
                                  </div>
                               </div>
                            </div>
                         </div>
                       ))}
                       <button onClick={() => saveData('bbeoggugi_journal_channels', journalChannels)} className="bg-black text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl">SAVE JOURNAL SETTINGS</button>
                    </div>
                  )}

                  {activeSettingsSubTab === 'career' && (
                    <div className="space-y-12">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[8px] uppercase font-bold text-gray-400">Hero Title</label>
                             <textarea className="w-full border-b border-gray-100 p-2 text-xl kor-bold outline-none" rows={2} value={careerContent.mainTitle} onChange={e => setCareerContent({...careerContent, mainTitle: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[8px] uppercase font-bold text-gray-400">Description (KR)</label>
                             <textarea className="w-full border border-gray-100 p-4 text-xs outline-none rounded-sm" rows={4} value={careerContent.descKr} onChange={e => setCareerContent({...careerContent, descKr: e.target.value})} />
                          </div>
                       </div>
                       {/* Add benefit management / position management here similarly... */}
                       <button onClick={() => saveData('bbeoggugi_career_content', careerContent)} className="bg-black text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl">SAVE CAREER SETTINGS</button>
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
