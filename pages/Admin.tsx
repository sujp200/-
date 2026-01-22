
import React, { useState, useEffect } from 'react';
import { projects as initialProjects, channels as initialChannels } from '../data';
import { Project, Channel } from '../types';

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

  const [aboutContent, setAboutContent] = useState<any>({});
  const [spaceHeader, setSpaceHeader] = useState({ title: 'Space Archive', subtitle: 'Timeless Architectural Dialogue' });
  const [contactSettings, setContactSettings] = useState({ title: 'Inquiry & Collaboration', subtitle: 'Connect with BBEOGGUGI Studio', visibleFields: ['address', 'size', 'schedule', 'budget', 'referral'] });
  const [journalChannels, setJournalChannels] = useState<Channel[]>([]);
  const [careerContent, setCareerContent] = useState<any>({
    mainTitle: 'Join our\nCreative Collective',
    descKr: '우리는 정형화된 틀을 벗어나, 공간의 본질을 탐구하고 새로운 라이프스타일을 제안합니다.',
    coreValues: [
      { kr: 'Essential (본질)', desc: '공간의 본질을 탐구합니다.' },
      { kr: 'Detail (디테일)', desc: '집요한 감각이 퀄리티를 결정합니다.' },
      { kr: 'Collaboration (협업)', desc: '다 같이 만드는 프로젝트, 팀워크를 중시합니다.' }
    ],
    benefits: [
      { kr: '점심 지원', desc: '팀원들의 든든한 점심 식사를 지원합니다.' },
      { kr: '야근 석식 및 수당', desc: '야근 시 석식 지원 및 수당을 지급합니다.' },
      { kr: '4대 보험', desc: '안정적인 근무 환경을 보장합니다.' },
      { kr: '자유로운 연차', desc: '눈치 보지 않고 자유롭게 연차를 사용합니다.' },
      { kr: '좋은 팀 분위기', desc: '존중하는 팀원들과 함께 즐겁게 협업합니다.' },
      { kr: '고퀄리티 포트폴리오', desc: '최고 수준의 프로젝트 경험을 쌓을 수 있습니다.' },
      { kr: '스튜디오 보유', desc: '촬영과 스타일링이 가능한 자체 스튜디오가 있습니다.' },
      { kr: '역세권 위치', desc: '동대문역/동대입구역에서 도보로 가깝습니다.' },
      { kr: '전시회 관람 지원', desc: '감각을 키우기 위해 정기적으로 전시회를 다닙니다.' }
    ],
    positions: [
      { id: '1', title: 'Designer', subTitle: '경력 3년 이상', type: 'Full-time', desc: '하이엔드 주거 및 상업 공간 경험자' },
      { id: '2', title: 'Project Director', subTitle: '경력 3년 이상', type: 'Full-time', desc: '현장 감리 및 프로젝트 총괄 가능자' },
      { id: '3', title: '신입 인턴', subTitle: 'New Intern', type: 'Internship', desc: '공간에 대한 열정이 넘치는 예비 디자이너' }
    ]
  });

  const [expandedInquiryId, setExpandedInquiryId] = useState<number | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const savedProjects = localStorage.getItem('bbeoggugi_projects');
    setProjects(savedProjects ? JSON.parse(savedProjects) : initialProjects);
    
    const savedInquiries = localStorage.getItem('bbeoggugi_inquiries');
    if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

    const savedDesign = localStorage.getItem('admin_design_settings');
    if (savedDesign) setDesignSettings(JSON.parse(savedDesign));

    const savedAbout = localStorage.getItem('bbeoggugi_about');
    if (savedAbout) setAboutContent(JSON.parse(savedAbout));

    const savedSpaceHeader = localStorage.getItem('bbeoggugi_space_header');
    if (savedSpaceHeader) setSpaceHeader(JSON.parse(savedSpaceHeader));

    const savedContact = localStorage.getItem('bbeoggugi_contact_settings');
    if (savedContact) setContactSettings(JSON.parse(savedContact));

    const savedChannels = localStorage.getItem('bbeoggugi_journal_channels');
    setJournalChannels(savedChannels ? JSON.parse(savedChannels) : initialChannels);

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

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = 'bbeoggugi@gmail.com';
    // 윈도우 컨펌으로 사용자가 보낼지 결정하게 함
    if (window.confirm(`비밀번호를 분실하셨습니까? 관리자 이메일(${email})로 문의 메일을 작성하시겠습니까?`)) {
      window.location.href = `mailto:${email}?subject=[ADMIN] 비밀번호 문의&body=관리자 비밀번호 확인 요청드립니다.`;
    }
  };

  const saveData = (key: string, data: any, silent = false) => {
    localStorage.setItem(key, JSON.stringify(data));
    if (!silent) alert('변경사항이 저장되었습니다.');
  };

  const handleDeleteInquiry = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // 행 확장 방지
    if (window.confirm('이 문의 내역을 정말로 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.')) {
      const updated = inquiries.filter(inq => inq.id !== id);
      setInquiries(updated);
      localStorage.setItem('bbeoggugi_inquiries', JSON.stringify(updated));
      alert('문의 내역이 성공적으로 삭제되었습니다.');
    }
  };

  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('이 프로젝트를 정말로 삭제하시겠습니까? 프로젝트 정보와 이미지가 모두 삭제되며 복구할 수 없습니다.')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem('bbeoggugi_projects', JSON.stringify(updated));
      alert('프로젝트가 성공적으로 삭제되었습니다.');
    }
  };

  const handleFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const moveItem = (list: string[], idx: number, direction: 'up' | 'down') => {
    const newList = [...list];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newList.length) return list;
    [newList[idx], newList[targetIdx]] = [newList[targetIdx], newList[idx]];
    return newList;
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#FDFCF8] flex items-center justify-center p-6 text-black">
        <div className="w-full max-w-md space-y-12 text-center">
          <form onSubmit={handleLogin} className={`space-y-12 transition-transform ${loginError ? 'translate-x-1' : ''}`}>
            <h1 className="text-4xl font-serif tracking-widest uppercase text-[#111111]">ADMIN</h1>
            <div className="space-y-6">
              <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-transparent border-b border-black/10 focus:border-black py-4 text-center text-2xl tracking-[0.8em] outline-none" placeholder="••••••••" autoFocus />
              <button type="submit" className="w-full bg-black text-white px-12 py-5 rounded-full uppercase tracking-[0.4em] text-[10px] font-black shadow-xl hover:bg-gray-800 transition-colors">Login</button>
            </div>
          </form>
          <button type="button" onClick={handleForgotPassword} className="text-[9px] text-gray-300 hover:text-black uppercase tracking-widest font-bold mt-8 block mx-auto underline transition-colors">Forgot Password?</button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 md:px-12 max-w-[1800px] mx-auto py-10 min-h-screen text-black">
      <div className="flex flex-col md:flex-row gap-16">
        <aside className="md:w-64 space-y-12 sticky top-10 h-fit">
           <nav className="flex flex-col gap-8">
              {(['projects', 'inquiries', 'design', 'settings'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left transition-all relative group ${activeTab === tab ? 'opacity-100' : 'opacity-20 hover:opacity-100'}`}>
                  <span className="kor-bold text-sm block uppercase tracking-widest">{tab}</span>
                  {activeTab === tab && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full"></div>}
                </button>
              ))}
              <button onClick={() => { sessionStorage.removeItem('admin_auth'); window.location.reload(); }} className="text-left mt-10 opacity-20 hover:opacity-100 text-red-500 font-black text-[9px] uppercase tracking-widest">Logout</button>
           </nav>
        </aside>

        <div className="flex-grow pb-40">
          {activeTab === 'projects' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-end border-b pb-6">
                <h3 className="kor-bold text-2xl">Project Archive</h3>
                <button onClick={() => {
                  const newProj: Project = { id: `project-${Date.now()}`, title: '새 프로젝트', titleEn: 'NEW PROJECT', mainImage: '', images: [], floorPlans: [], info: { design: '', construction: '', photograph: '', year: '', site: '', usage: '', area: '', scope: '' }, descriptionKr: '', descriptionEn: '', logos: [] };
                  setProjects([newProj, ...projects]);
                }} className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-800">+ New Project</button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {projects.map((p, idx) => (
                  <div key={p.id} className="border bg-white rounded-sm overflow-hidden transition-all shadow-sm">
                    <div className="p-5 flex justify-between items-center bg-gray-50/50">
                       <div className="flex items-center gap-6">
                          <img src={p.mainImage || 'https://via.placeholder.com/40x56'} className="w-10 h-14 object-cover border bg-gray-100" alt="" />
                          <div>
                            <span className="kor-bold block text-sm">{p.title}</span>
                            <span className="eng-text text-[9px] text-gray-400 uppercase tracking-widest">{p.info.year} — {p.info.usage}</span>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <button onClick={() => setEditingProjectId(editingProjectId === p.id ? null : p.id)} className="text-[10px] font-bold border px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all uppercase">Edit</button>
                          <button onClick={(e) => handleDeleteProject(e, p.id)} className="text-[10px] font-bold border border-red-50 text-red-400 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 transition-all uppercase">Del</button>
                       </div>
                    </div>
                    {editingProjectId === p.id && (
                      <div className="p-8 space-y-12 animate-in slide-in-from-top-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           <div className="space-y-6">
                              <label className="text-[10px] uppercase font-black text-gray-400 block border-b pb-1">Basic Information</label>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-[8px] font-bold text-gray-300 uppercase block mb-1">Title (KR)</label>
                                  <input className="w-full border-b p-2 kor-bold outline-none focus:border-black" value={p.title} onChange={e => { const u = [...projects]; u[idx].title = e.target.value; setProjects(u); }} placeholder="Project Title (KR)" />
                                </div>
                                <div>
                                  <label className="text-[8px] font-bold text-gray-300 uppercase block mb-1">Title (EN)</label>
                                  <input className="w-full border-b p-2 eng-text text-sm outline-none focus:border-black" value={p.titleEn} onChange={e => { const u = [...projects]; u[idx].titleEn = e.target.value; setProjects(u); }} placeholder="PROJECT TITLE (EN)" />
                                </div>
                                <div>
                                  <label className="text-[8px] font-bold text-gray-300 uppercase block mb-1">Description (KR)</label>
                                  <textarea className="w-full border p-3 text-xs leading-relaxed outline-none focus:border-black" rows={4} value={p.descriptionKr} onChange={e => { const u = [...projects]; u[idx].descriptionKr = e.target.value; setProjects(u); }} placeholder="Description (KR)" />
                                </div>
                              </div>
                           </div>
                           <div className="space-y-6">
                              <label className="text-[10px] uppercase font-black text-gray-400 block border-b pb-1">Detail Specifications</label>
                              <div className="grid grid-cols-2 gap-4">
                                 {Object.keys(p.info).map((key) => (
                                   <div key={key}>
                                     <label className="text-[8px] uppercase font-bold text-gray-300 block mb-1">{key}</label>
                                     <input className="w-full border-b py-1 text-xs outline-none focus:border-black" value={(p.info as any)[key]} onChange={e => { const u = [...projects]; (u[idx].info as any)[key] = e.target.value; setProjects(u); }} />
                                   </div>
                                 ))}
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <label className="text-[10px] uppercase font-black text-gray-400 block border-b pb-1">Gallery Images (Order Control)</label>
                           <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
                              {p.images.map((img, iidx) => (
                                <div key={iidx} className="relative aspect-[3/4] border overflow-hidden group shadow-sm">
                                   <img src={img} className="w-full h-full object-cover" alt="" />
                                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                      <div className="flex justify-between">
                                         <button onClick={() => { const u = [...projects]; u[idx].images = moveItem(u[idx].images, iidx, 'up'); setProjects(u); }} className="bg-white text-black p-1 text-[8px] font-bold">←</button>
                                         <button onClick={() => { if(window.confirm('이미지를 삭제하시겠습니까?')) { const u = [...projects]; u[idx].images = u[idx].images.filter((_, i) => i !== iidx); setProjects(u); } }} className="bg-red-500 text-white p-1 text-[8px]">DEL</button>
                                         <button onClick={() => { const u = [...projects]; u[idx].images = moveItem(u[idx].images, iidx, 'down'); setProjects(u); }} className="bg-white text-black p-1 text-[8px] font-bold">→</button>
                                      </div>
                                      <button onClick={() => { const u = [...projects]; u[idx].mainImage = img; setProjects(u); }} className="text-[8px] font-black text-white bg-black/40 py-1 uppercase tracking-tighter hover:bg-black transition-colors">Set as Main</button>
                                   </div>
                                </div>
                              ))}
                              <label className="aspect-[3/4] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer text-gray-300 hover:text-black hover:border-black transition-all">
                                 <span className="text-2xl">+</span>
                                 <span className="text-[8px] font-black uppercase">Add Photo</span>
                                 <input type="file" multiple className="hidden" onChange={async (e) => {
                                   if (e.target.files) {
                                     const u = [...projects];
                                     const files = Array.from(e.target.files) as File[];
                                     for(let f of files) {
                                       u[idx].images.push(await handleFileToBase64(f));
                                     }
                                     setProjects(u);
                                   }
                                 }} />
                              </label>
                           </div>
                        </div>
                        <button onClick={() => saveData('bbeoggugi_projects', projects)} className="w-full bg-black text-white py-4 font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-colors">Save Changes</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <h3 className="kor-bold text-2xl mb-8">Customer Inquiries</h3>
               <div className="overflow-x-auto shadow-sm border rounded-sm">
                 <table className="w-full text-left">
                    <thead className="border-b text-[10px] uppercase text-gray-400 font-black bg-gray-50/50">
                       <tr>
                          <th className="py-4 px-6">Date</th>
                          <th className="py-4 px-6">Type</th>
                          <th className="py-4 px-6">Name</th>
                          <th className="py-4 px-6">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {inquiries.length > 0 ? inquiries.map(inq => (
                         <React.Fragment key={inq.id}>
                           <tr className={`cursor-pointer transition-colors ${expandedInquiryId === inq.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`} onClick={() => setExpandedInquiryId(expandedInquiryId === inq.id ? null : inq.id)}>
                              <td className="py-6 px-6 text-xs italic text-gray-400">{new Date(inq.date).toLocaleDateString()}</td>
                              <td className="py-6 px-6"><span className="text-[10px] font-black uppercase border px-2 py-1 rounded-sm bg-white">{inq.type}</span></td>
                              <td className="py-6 px-6 kor-bold text-sm">{inq.name}</td>
                              <td className="py-6 px-6"><button onClick={(e) => handleDeleteInquiry(e, inq.id)} className="text-red-400 text-[10px] font-black uppercase hover:text-red-600 hover:underline transition-colors">Delete</button></td>
                           </tr>
                           {expandedInquiryId === inq.id && (
                             <tr className="bg-gray-50/50 animate-in slide-in-from-top-2">
                                <td colSpan={4} className="p-8">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                      <div className="space-y-4">
                                         <label className="text-[9px] font-black uppercase text-gray-300 tracking-widest block">Message Body</label>
                                         <div className="bg-white p-6 border rounded-sm text-sm leading-relaxed whitespace-pre-wrap shadow-inner">{inq.message || inq.content || 'No text provided.'}</div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-y-6">
                                         <div><label className="text-[8px] uppercase text-gray-300 font-black">Email</label><div className="text-xs font-bold">{inq.email}</div></div>
                                         <div><label className="text-[8px] uppercase text-gray-300 font-black">Phone</label><div className="text-xs font-bold">{inq.phone}</div></div>
                                         <div className="col-span-2"><label className="text-[8px] uppercase text-gray-300 font-black">Address</label><div className="text-xs font-bold">{inq.address || '-'}</div></div>
                                         {inq.size && <div><label className="text-[8px] uppercase text-gray-300 font-black">Size</label><div className="text-xs font-bold">{inq.size}</div></div>}
                                         {inq.budget && <div><label className="text-[8px] uppercase text-gray-300 font-black">Budget</label><div className="text-xs font-bold">{inq.budget}</div></div>}
                                      </div>
                                   </div>
                                </td>
                             </tr>
                           )}
                         </React.Fragment>
                       )) : (
                         <tr><td colSpan={4} className="py-20 text-center text-gray-300 text-xs">No inquiries found.</td></tr>
                       )}
                    </tbody>
                 </table>
               </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div className="flex gap-8 border-b mb-10 overflow-x-auto scrollbar-hide">
                 {(['about', 'space', 'contact', 'journal', 'career'] as const).map(sub => (
                   <button key={sub} onClick={() => setActiveSettingsSubTab(sub)} className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap ${activeSettingsSubTab === sub ? 'border-b-2 border-black opacity-100' : 'opacity-20 hover:opacity-100'}`}>
                     {sub}
                   </button>
                 ))}
               </div>

               <div className="max-w-4xl space-y-12">
                  {activeSettingsSubTab === 'career' && (
                    <div className="space-y-12 animate-in slide-in-from-top-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-4">
                             <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest border-b pb-1 block">Hero Content</label>
                             <textarea className="w-full border-b p-2 kor-bold text-xl h-20 outline-none focus:border-black" value={careerContent.mainTitle} onChange={e => setCareerContent({...careerContent, mainTitle: e.target.value})} placeholder="Title" />
                             <textarea className="w-full border p-3 text-xs h-32 outline-none focus:border-black" value={careerContent.descKr} onChange={e => setCareerContent({...careerContent, descKr: e.target.value})} placeholder="Description" />
                          </div>
                          <div className="space-y-4">
                             <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest border-b pb-1 block">Hero Photo</label>
                             <div className="aspect-[3/4] bg-gray-50 border overflow-hidden relative group shadow-sm">
                                <img src={careerContent.mainImage} className="w-full h-full object-cover" alt="" />
                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[9px] font-black transition-opacity">UPLOAD<input type="file" className="hidden" onChange={async (e) => { if(e.target.files?.[0]) { const b64 = await handleFileToBase64(e.target.files[0]); setCareerContent({...careerContent, mainImage: b64}); } }} /></label>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <label className="text-[10px] uppercase font-black tracking-widest border-b pb-2 block">Core Values (인재상)</label>
                          <div className="space-y-4">
                            {careerContent.coreValues?.map((v:any, i:number) => (
                              <div key={i} className="flex gap-4 border p-4 items-start relative group bg-white shadow-sm">
                                 <input className="text-sm kor-bold w-1/3 outline-none border-b focus:border-black" value={v.kr} onChange={e => { const u = [...careerContent.coreValues]; u[i].kr = e.target.value; setCareerContent({...careerContent, coreValues: u}) }} />
                                 <textarea className="text-xs flex-grow outline-none border p-2 h-16 focus:border-black" value={v.desc} onChange={e => { const u = [...careerContent.coreValues]; u[i].desc = e.target.value; setCareerContent({...careerContent, coreValues: u}) }} />
                                 <button onClick={() => { if(window.confirm('삭제하시겠습니까?')) { const u = careerContent.coreValues.filter((_:any,idx:number)=>idx!==i); setCareerContent({...careerContent, coreValues: u}) } }} className="text-red-400 opacity-0 group-hover:opacity-100 text-[9px] font-black uppercase hover:text-red-600 transition-all">Del</button>
                              </div>
                            ))}
                            <button onClick={() => setCareerContent({...careerContent, coreValues: [...(careerContent.coreValues || []), {kr: 'New Value', desc: 'Description'}]})} className="text-[9px] font-black border border-dashed p-4 w-full text-gray-300 hover:text-black hover:border-black transition-all">+ Add Value</button>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <label className="text-[10px] uppercase font-black tracking-widest border-b pb-2 block">Benefits (복지 혜택)</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {careerContent.benefits?.map((b:any, i:number) => (
                              <div key={i} className="flex gap-4 border p-4 items-start relative group bg-white shadow-sm">
                                 <input className="text-sm kor-bold w-1/3 outline-none border-b focus:border-black" value={b.kr} onChange={e => { const u = [...careerContent.benefits]; u[i].kr = e.target.value; setCareerContent({...careerContent, benefits: u}) }} />
                                 <input className="text-[10px] flex-grow outline-none border-b focus:border-black" value={b.desc} onChange={e => { const u = [...careerContent.benefits]; u[i].desc = e.target.value; setCareerContent({...careerContent, benefits: u}) }} />
                                 <button onClick={() => { if(window.confirm('삭제하시겠습니까?')) { const u = careerContent.benefits.filter((_:any,idx:number)=>idx!==i); setCareerContent({...careerContent, benefits: u}) } }} className="text-red-400 opacity-0 group-hover:opacity-100 text-[9px] font-black uppercase hover:text-red-600 transition-all">Del</button>
                              </div>
                            ))}
                            <button onClick={() => setCareerContent({...careerContent, benefits: [...(careerContent.benefits || []), {kr: 'New Benefit', desc: 'Description'}]})} className="text-[9px] font-black border border-dashed p-4 w-full text-gray-300 hover:text-black hover:border-black transition-all">+ Add Benefit</button>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <label className="text-[10px] uppercase font-black tracking-widest border-b pb-2 block">Open Positions (채용 공고)</label>
                          <div className="space-y-4">
                            {careerContent.positions?.map((p:any, i:number) => (
                              <div key={i} className="border p-6 space-y-4 relative group bg-white shadow-sm">
                                 <input className="w-full kor-bold text-lg outline-none border-b focus:border-black" value={p.title} onChange={e => { const u = [...careerContent.positions]; u[i].title = e.target.value; setCareerContent({...careerContent, positions: u}) }} placeholder="Job Title" />
                                 <input className="w-full text-xs text-gray-400 outline-none border-b focus:border-black" value={p.subTitle} onChange={e => { const u = [...careerContent.positions]; u[i].subTitle = e.target.value; setCareerContent({...careerContent, positions: u}) }} placeholder="Sub Title (e.g. 경력 3년 이상)" />
                                 <input className="w-full text-xs text-gray-300 outline-none border-b focus:border-black" value={p.type} onChange={e => { const u = [...careerContent.positions]; u[i].type = e.target.value; setCareerContent({...careerContent, positions: u}) }} placeholder="Job Type" />
                                 <textarea className="w-full text-xs border p-2 h-20 outline-none focus:border-black" value={p.desc} onChange={e => { const u = [...careerContent.positions]; u[i].desc = e.target.value; setCareerContent({...careerContent, positions: u}) }} placeholder="Job Details" />
                                 <button onClick={() => { if(window.confirm('채용 공고를 삭제하시겠습니까?')) { const u = careerContent.positions.filter((_:any,idx:number)=>idx!==i); setCareerContent({...careerContent, positions: u}) } }} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 text-[9px] font-black hover:text-red-600 transition-all">DELETE</button>
                              </div>
                            ))}
                            <button onClick={() => setCareerContent({...careerContent, positions: [...(careerContent.positions || []), {id: Date.now().toString(), title: 'Position Title', subTitle: 'Sub Title', type: 'Full-time', desc: 'Details...'}]})} className="text-[9px] font-black border border-black p-4 w-full hover:bg-black hover:text-white transition-all">+ Add Position</button>
                          </div>
                       </div>
                       <button onClick={() => saveData('bbeoggugi_career_content', careerContent)} className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-[0.3em] shadow-xl hover:bg-gray-800 transition-colors">Apply All Career Changes</button>
                    </div>
                  )}

                  {activeSettingsSubTab === 'about' && (
                    <div className="space-y-10 animate-in fade-in">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-4">
                             <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest border-b pb-1 block">Studio Bio</label>
                             <textarea className="w-full border-b p-2 kor-bold text-2xl h-24 outline-none focus:border-black" value={aboutContent.mainTitle} onChange={e => setAboutContent({...aboutContent, mainTitle: e.target.value})} />
                             <textarea className="w-full border p-3 text-xs h-32 outline-none focus:border-black" value={aboutContent.descKr1} onChange={e => setAboutContent({...aboutContent, descKr1: e.target.value})} />
                          </div>
                          <div className="space-y-4">
                             <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest border-b pb-1 block">Bio Photo</label>
                             <div className="aspect-[4/3] border overflow-hidden relative group shadow-sm">
                                <img src={aboutContent.mainImage} className="w-full h-full object-cover" alt="" />
                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[9px] font-black transition-opacity">UPLOAD<input type="file" className="hidden" onChange={async (e) => { if(e.target.files?.[0]) { const b64 = await handleFileToBase64(e.target.files[0]); setAboutContent({...aboutContent, mainImage: b64}); } }} /></label>
                             </div>
                          </div>
                       </div>
                       <button onClick={() => saveData('bbeoggugi_about', aboutContent)} className="w-full bg-black text-white py-4 font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-colors">Save About Page</button>
                    </div>
                  )}

                  {activeSettingsSubTab === 'space' && (
                    <div className="space-y-8 animate-in fade-in">
                       <label className="text-[10px] uppercase font-black tracking-widest border-b pb-2 block">Space Archive Header</label>
                       <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[8px] uppercase font-bold text-gray-300">Archive Title</label>
                            <input className="w-full border-b p-2 kor-bold text-xl outline-none focus:border-black" value={spaceHeader.title} onChange={e => setSpaceHeader({...spaceHeader, title: e.target.value})} placeholder="Title" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[8px] uppercase font-bold text-gray-300">Archive Subtitle</label>
                            <input className="w-full border-b p-2 eng-text text-sm outline-none focus:border-black" value={spaceHeader.subtitle} onChange={e => setSpaceHeader({...spaceHeader, subtitle: e.target.value})} placeholder="Subtitle" />
                          </div>
                       </div>
                       <button onClick={() => saveData('bbeoggugi_space_header', spaceHeader)} className="w-full bg-black text-white py-4 font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-colors">Save Space Header</button>
                    </div>
                  )}

                  {activeSettingsSubTab === 'contact' && (
                    <div className="space-y-8 animate-in fade-in">
                       <label className="text-[10px] uppercase font-black tracking-widest border-b pb-2 block">Contact Form Fields</label>
                       <div className="space-y-6">
                          <div className="space-y-4">
                             <input className="w-full border-b p-2 kor-bold text-xl outline-none focus:border-black" value={contactSettings.title} onChange={e => setContactSettings({...contactSettings, title: e.target.value})} placeholder="Form Title" />
                             <input className="w-full border-b p-2 eng-text text-sm outline-none focus:border-black" value={contactSettings.subtitle} onChange={e => setContactSettings({...contactSettings, subtitle: e.target.value})} placeholder="Form Subtitle" />
                          </div>
                          <div className="space-y-4 pt-4">
                             <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Optional Fields Toggle</label>
                             <div className="grid grid-cols-2 gap-4">
                                {['address', 'size', 'schedule', 'budget', 'referral'].map(field => (
                                  <label key={field} className="flex items-center gap-3 cursor-pointer group">
                                     <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${contactSettings.visibleFields.includes(field) ? 'bg-black border-black' : 'bg-white border-gray-200'}`}>
                                        <input type="checkbox" className="hidden" checked={contactSettings.visibleFields.includes(field)} onChange={e => {
                                          const u = e.target.checked 
                                            ? [...contactSettings.visibleFields, field]
                                            : contactSettings.visibleFields.filter(f => f !== field);
                                          setContactSettings({...contactSettings, visibleFields: u});
                                        }} />
                                        {contactSettings.visibleFields.includes(field) && <div className="w-2 h-2 bg-white"></div>}
                                     </div>
                                     <span className="text-[10px] font-bold uppercase text-gray-500 group-hover:text-black transition-colors">{field}</span>
                                  </label>
                                ))}
                             </div>
                          </div>
                       </div>
                       <button onClick={() => saveData('bbeoggugi_contact_settings', contactSettings)} className="w-full bg-black text-white py-4 font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-colors">Save Contact Fields</button>
                    </div>
                  )}

                  {activeSettingsSubTab === 'journal' && (
                    <div className="space-y-8 animate-in fade-in">
                       <label className="text-[10px] uppercase font-black tracking-widest border-b pb-2 block">Journal Channels (Social)</label>
                       <div className="space-y-6">
                          {journalChannels.map((ch, i) => (
                            <div key={ch.id} className="p-6 border bg-white space-y-4 shadow-sm">
                               <div className="flex justify-between items-center border-b pb-2">
                                  <span className="kor-bold text-sm">{ch.name}</span>
                                  <span className="eng-text text-[9px] text-gray-300 uppercase tracking-widest">{ch.id}</span>
                               </div>
                               <div className="space-y-3">
                                  <div className="space-y-1">
                                     <label className="text-[8px] uppercase font-bold text-gray-300">Link URL</label>
                                     <input className="w-full border-b py-2 text-xs outline-none focus:border-black" value={ch.url} onChange={e => {
                                       const u = [...journalChannels]; u[i].url = e.target.value; setJournalChannels(u);
                                     }} />
                                  </div>
                                  <div className="space-y-1">
                                     <label className="text-[8px] uppercase font-bold text-gray-300">Thumbnail Image URL</label>
                                     <div className="flex gap-4 items-center">
                                        <input className="flex-grow border-b py-2 text-xs outline-none focus:border-black" value={ch.thumbnail} onChange={e => {
                                          const u = [...journalChannels]; u[i].thumbnail = e.target.value; setJournalChannels(u);
                                        }} />
                                        <label className="shrink-0 bg-gray-50 border px-3 py-1.5 text-[9px] font-black cursor-pointer hover:bg-black hover:text-white transition-colors">
                                          UPLOAD
                                          <input type="file" className="hidden" onChange={async e => {
                                            if(e.target.files?.[0]) {
                                              const b64 = await handleFileToBase64(e.target.files[0]);
                                              const u = [...journalChannels]; u[i].thumbnail = b64; setJournalChannels(u);
                                            }
                                          }} />
                                        </label>
                                     </div>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                       <button onClick={() => saveData('bbeoggugi_journal_channels', journalChannels)} className="w-full bg-black text-white py-4 font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-colors">Save Journal Links</button>
                    </div>
                  )}
               </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <h3 className="kor-bold text-2xl mb-8">Visual Identity</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  <div className="space-y-8">
                     <label className="text-[11px] font-black uppercase tracking-[0.3em] border-b pb-2 block">Theme Colors</label>
                     <div className="flex justify-between items-center bg-gray-50 p-6 rounded-sm border shadow-sm">
                        <span className="text-xs font-bold uppercase tracking-widest">Primary Color</span>
                        <input type="color" value={designSettings.primaryColor} onChange={e => setDesignSettings({...designSettings, primaryColor: e.target.value})} className="w-10 h-10 cursor-pointer border-none bg-transparent" />
                     </div>
                  </div>
                  <div className="space-y-8">
                     <label className="text-[11px] font-black uppercase tracking-[0.3em] border-b pb-2 block">Typography</label>
                     <div className="flex gap-4">
                        <button onClick={() => setDesignSettings({...designSettings, mainFont: 'serif'})} className={`flex-grow py-4 text-[10px] font-black border transition-all rounded-sm uppercase tracking-widest ${designSettings.mainFont === 'serif' ? 'bg-black text-white border-black' : 'bg-white border-gray-200'}`}>Serif (명조)</button>
                        <button onClick={() => setDesignSettings({...designSettings, mainFont: 'sans'})} className={`flex-grow py-4 text-[10px] font-black border transition-all rounded-sm uppercase tracking-widest ${designSettings.mainFont === 'sans' ? 'bg-black text-white border-black' : 'bg-white border-gray-200'}`}>Sans (고딕)</button>
                     </div>
                  </div>
               </div>
               <button onClick={() => saveData('admin_design_settings', designSettings)} className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.4em] shadow-xl hover:bg-gray-800 transition-colors">Apply Brand Style</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
