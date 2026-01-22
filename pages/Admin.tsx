
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

const Admin: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'design' | 'settings'>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [expandedInquiryId, setExpandedInquiryId] = useState<number | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('bbeoggugi_projects');
      setProjects(savedProjects ? JSON.parse(savedProjects) : initialProjects);
      
      const savedInquiries = localStorage.getItem('bbeoggugi_inquiries');
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
    } catch (error) {
      console.error("Data loading error:", error);
      setProjects(initialProjects);
    }

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
    e.stopPropagation();
    const adminEmail = 'bbeoggugi@gmail.com';
    if (window.confirm(`비밀번호 재설정 안내를 받으시려면 관리자 이메일(${adminEmail})로 문의 메일을 보내주세요. 메일 앱을 여시겠습니까?`)) {
      window.location.href = `mailto:${adminEmail}?subject=[Admin] Password Inquiry&body=뻐꾸기 인테리어 관리자 비밀번호 확인을 요청합니다.`;
    }
  };

  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation(); 
    
    if (window.confirm('이 프로젝트를 정말로 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.')) {
      setProjects(prevProjects => {
        const updated = prevProjects.filter(p => p.id !== id);
        localStorage.setItem('bbeoggugi_projects', JSON.stringify(updated));
        return updated;
      });
      alert('프로젝트가 목록에서 삭제되었습니다.');
    }
  };

  const handleDeleteInquiry = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation(); 
    
    if (window.confirm('해당 문의 내역을 정말로 삭제하시겠습니까?')) {
      setInquiries(prevInquiries => {
        const updated = prevInquiries.filter(inq => inq.id !== id);
        localStorage.setItem('bbeoggugi_inquiries', JSON.stringify(updated));
        return updated;
      });
      alert('문의 내역이 삭제되었습니다.');
    }
  };

  const saveData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    alert('변경사항이 안전하게 저장되었습니다.');
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#FDFCF8] flex items-center justify-center p-6 text-black">
        <div className="w-full max-w-md space-y-12 text-center">
          <form onSubmit={handleLogin} className={`space-y-12 transition-transform ${loginError ? 'translate-x-1' : ''}`}>
            <h1 className="text-4xl font-serif tracking-widest uppercase text-[#111111]">ADMIN</h1>
            <div className="space-y-6">
              <input 
                type="password" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
                className="w-full bg-transparent border-b border-black/10 focus:border-black py-4 text-center text-2xl tracking-[0.8em] outline-none" 
                placeholder="••••••••" 
                autoFocus 
              />
              <button type="submit" className="w-full bg-black text-white px-12 py-5 rounded-full uppercase tracking-[0.4em] text-[10px] font-black shadow-xl hover:bg-gray-800 transition-colors">Login</button>
            </div>
          </form>
          <button 
            type="button" 
            onClick={handleForgotPassword} 
            className="text-[9px] text-gray-300 hover:text-black uppercase tracking-widest font-bold mt-8 block mx-auto underline transition-colors"
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
        <aside className="md:w-64 space-y-12 sticky top-10 h-fit">
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
              <button 
                onClick={() => { sessionStorage.removeItem('admin_auth'); window.location.reload(); }} 
                className="text-left mt-10 opacity-20 hover:opacity-100 text-red-500 font-black text-[9px] uppercase tracking-widest"
              >
                Logout
              </button>
           </nav>
        </aside>

        <div className="flex-grow pb-40">
          {activeTab === 'projects' && (
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b pb-6">
                <h3 className="kor-bold text-2xl">Project Archive</h3>
                <button 
                  onClick={() => {
                    const newProj: Project = { 
                      id: `project-${Date.now()}`, 
                      title: '새 프로젝트', 
                      titleEn: 'NEW PROJECT', 
                      mainImage: '', 
                      images: [], 
                      floorPlans: [], 
                      info: { design: '', construction: '', photograph: '', year: '', site: '', usage: '', area: '', scope: '' }, 
                      descriptionKr: '', 
                      descriptionEn: '', 
                      logos: [] 
                    };
                    setProjects(prev => [newProj, ...prev]);
                  }} 
                  className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  + New Project
                </button>
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
                          <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditingProjectId(editingProjectId === p.id ? null : p.id); }} 
                            className="text-[10px] font-bold border px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all uppercase"
                          >
                            {editingProjectId === p.id ? 'Close' : 'Edit'}
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => handleDeleteProject(e, p.id)} 
                            className="text-[10px] font-bold border border-red-100 text-red-400 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 transition-all uppercase"
                          >
                            Del
                          </button>
                       </div>
                    </div>
                    {editingProjectId === p.id && (
                      <div className="p-8 space-y-12 animate-in slide-in-from-top-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           <div className="space-y-6">
                              <label className="text-[10px] uppercase font-black text-gray-400 block border-b pb-1">Basic Information</label>
                              <div className="space-y-4">
                                <input className="w-full border-b p-2 kor-bold outline-none focus:border-black" value={p.title} onChange={e => { const u = [...projects]; u[idx].title = e.target.value; setProjects(u); }} placeholder="Project Title (KR)" />
                                <input className="w-full border-b p-2 eng-text text-sm outline-none focus:border-black" value={p.titleEn} onChange={e => { const u = [...projects]; u[idx].titleEn = e.target.value; setProjects(u); }} placeholder="PROJECT TITLE (EN)" />
                                <textarea className="w-full border p-3 text-xs leading-relaxed outline-none focus:border-black" rows={4} value={p.descriptionKr} onChange={e => { const u = [...projects]; u[idx].descriptionKr = e.target.value; setProjects(u); }} placeholder="Description (KR)" />
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
                        <button onClick={() => saveData('bbeoggugi_projects', projects)} className="w-full bg-black text-white py-4 font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-colors">Save Changes</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-8">
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
                           <tr 
                             className={`cursor-pointer transition-colors ${expandedInquiryId === inq.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`} 
                             onClick={(e) => { e.preventDefault(); setExpandedInquiryId(expandedInquiryId === inq.id ? null : inq.id); }}
                           >
                              <td className="py-6 px-6 text-xs italic text-gray-400">{new Date(inq.date).toLocaleDateString()}</td>
                              <td className="py-6 px-6"><span className="text-[10px] font-black uppercase border px-2 py-1 rounded-sm bg-white">{inq.type}</span></td>
                              <td className="py-6 px-6 kor-bold text-sm">{inq.name}</td>
                              <td className="py-6 px-6">
                                <button 
                                  type="button"
                                  onClick={(e) => handleDeleteInquiry(e, inq.id)} 
                                  className="text-red-400 text-[10px] font-black uppercase hover:text-red-600 hover:underline transition-colors py-2 px-4 border border-transparent hover:border-red-100 rounded-full"
                                >
                                  Delete
                                </button>
                              </td>
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

          {(activeTab === 'design' || activeTab === 'settings') && (
            <div className="h-60 flex items-center justify-center border-2 border-dashed border-gray-100">
               <span className="text-gray-300 uppercase tracking-widest text-[10px] font-black">{activeTab.toUpperCase()} Settings Module Loaded</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
