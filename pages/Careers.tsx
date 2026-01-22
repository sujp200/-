
import React, { useState, useEffect, useRef } from 'react';

const Careers: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState({
    mainTitle: 'Join our\nCreative Collective',
    descKr: '우리는 정형화된 틀을 벗어나, 공간의 본질을 탐구하고 새로운 라이프스타일을 제안합니다.',
    descEn: '뻐꾸기 스튜디오는 개인의 창의성을 존중하며, 최상의 퀄리티를 위해 함께 고민하고 성장하는 문화를 지향합니다. 건축적 사고와 예술적 감성을 공유할 당신을 기다립니다.',
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'
  });

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', position: '', portfolioUrl: '', message: '', agreement: false
  });

  const positions = [
    { id: 'designer', title: 'Interior Designer', type: '경력 3년 이상', desc: '공간의 서사를 이해하고 디테일한 설계가 가능한 디자이너를 찾습니다. 하이엔드 주거 및 상업 공간 경험자를 우대합니다.' },
    { id: 'pd', title: 'Project Director', type: '경력 3년 이상', desc: '현장 관리와 클라이언트 커뮤니케이션을 총괄할 PD를 찾습니다. 높은 시공 퀄리티에 대한 집착과 책임감을 가진 분을 기다립니다.' },
    { id: 'intern', title: 'Design Intern', type: '신입/인턴', desc: '뻐꾸기만의 디자인 철학을 함께 배우고 성장할 인재를 기다립니다. 열정적인 태도와 기초 설계 능력을 중시합니다.' }
  ];

  const benefits = [
    { title: 'Portfolio Value', kr: '독보적인 포트폴리오 가치', desc: '하이엔드 프로젝트의 전 과정에 참여하며, 디자이너로서 자신의 커리어에 자부심이 될 퀄리티 높은 포트폴리오를 완성합니다.' },
    { title: 'Work-Life Balance', kr: '정시 퇴근과 야근 지원', desc: '효율적인 업무로 대부분 정시 퇴근(칼퇴)하는 문화를 지향합니다. 부득이한 야근 시에는 든든한 석식 제공과 야근 수당을 확실히 지원합니다.' },
    { title: 'Team Harmony', kr: '화기애애한 소통 문화', desc: '인성이 좋고 대화가 잘 통하는 사람들이 모여 있습니다. 어떤 난관도 비난이 아닌 대화와 협업으로 함께 해결해나가는 따뜻한 팀입니다.' },
    { title: 'Insight Trip', kr: '디자인 감각 지원', desc: '감각의 확장을 위해 국내외 주요 전시회 관람 및 공간 답사 비용을 전폭적으로 지원합니다. 업무 중에도 영감을 얻는 시간을 존중합니다.' },
    { title: 'Prime Location', kr: '지하철역 5분 역세권', desc: '지하철역과 매우 인접한 접근성 좋은 스튜디오입니다. 쾌적한 출퇴근길과 감각적인 업무 환경을 제공합니다.' },
    { title: 'Full Support', kr: '든든한 생활 및 휴식', desc: '매일 즐거운 점심 식대 지원, 4대 보험, 경조사 지원금은 물론 자유로운 연차 사용을 통해 충분한 리프레시를 보장합니다.' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('bbeoggugi_career_main');
    if (saved) setContent(JSON.parse(saved));
  }, []);

  const handleSelectPosition = (positionTitle: string) => {
    setFormData(prev => ({ ...prev, position: positionTitle }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) { alert('개인정보 수집 및 이용에 동의가 필요합니다.'); return; }
    const inquiries = JSON.parse(localStorage.getItem('bbeoggugi_inquiries') || '[]');
    const newApp = { ...formData, id: Date.now(), type: 'Career', date: new Date().toISOString() };
    localStorage.setItem('bbeoggugi_inquiries', JSON.stringify([newApp, ...inquiries]));
    alert('성공적으로 접수되었습니다. 뻐꾸기의 팀원이 되어주셔서 감사합니다.');
    setFormData({ name: '', phone: '', email: '', position: '', portfolioUrl: '', message: '', agreement: false });
  };

  return (
    <div className="px-8 max-w-[1400px] mx-auto pb-40">
      {/* HERO SECTION */}
      <section className="mb-40 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
           <div className="max-w-2xl">
              <h2 className="text-6xl md:text-8xl font-serif mb-12 tracking-tighter leading-none text-[#111111] whitespace-pre-line">
                {content.mainTitle}
              </h2>
              <div className="space-y-8">
                <p className="kor-bold text-xl md:text-2xl leading-snug">{content.descKr}</p>
                <p className="font-serif-kr text-lg leading-relaxed text-gray-500">{content.descEn}</p>
              </div>
           </div>
           <div className="w-full md:w-1/3 aspect-[3/4] bg-gray-50 overflow-hidden shadow-2xl">
              <img src={content.mainImage} alt="Studio Life" className="w-full h-full object-cover grayscale brightness-90" />
           </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="mb-40">
        <div className="flex items-center gap-6 mb-20">
            <h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">CORE VALUES</h3>
            <div className="flex-grow h-[1px] bg-gray-100"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
                { title: 'Essence', kr: '본질의 탐구', desc: '우리는 화려함 이면에 숨겨진 공간의 본질과 사용자의 삶을 깊이 있게 관찰합니다.' },
                { title: 'Detail', kr: '집요한 감각', desc: '1mm의 오차도 허용하지 않는 정교함이 하이엔드 퀄리티의 시작임을 믿습니다.' },
                { title: 'Dialogue', kr: '유연한 소통', desc: '공간은 혼자가 아닌 협업으로 완성됩니다. 열린 마음으로 대화합니다.' }
            ].map((v, i) => (
                <div key={i} className="space-y-4">
                    <span className="eng-text text-3xl font-serif italic text-gray-200">0{i+1}</span>
                    <h4 className="eng-text text-xl font-bold uppercase">{v.title}</h4>
                    <p className="font-serif-kr text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* BENEFITS & CULTURE */}
      <section className="mb-40">
        <div className="flex items-center gap-6 mb-20">
            <h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">BENEFITS & CULTURE</h3>
            <div className="flex-grow h-[1px] bg-gray-100"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {benefits.map((b, i) => (
                <div key={i} className="space-y-4 group border-l border-transparent hover:border-black pl-0 hover:pl-6 transition-all duration-500">
                    <div className="space-y-1">
                        <span className="eng-text text-[9px] uppercase font-bold text-gray-400 tracking-widest">{b.title}</span>
                        <h4 className="kor-bold text-lg text-[#111111] group-hover:text-gray-500 transition-colors">{b.kr}</h4>
                    </div>
                    <p className="font-serif-kr text-[13px] leading-relaxed text-gray-500">{b.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="mb-40">
        <div className="flex items-center gap-6 mb-20"><h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">OPEN POSITIONS</h3><div className="flex-grow h-[1px] bg-gray-100"></div></div>
        <div className="divide-y divide-gray-100 border-y border-gray-100 mb-20">
           {positions.map(pos => (
             <div key={pos.id} className="group py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-gray-50/5 transition-colors px-4">
                <div className="space-y-2"><h4 className="eng-text text-xl font-bold uppercase tracking-wider">{pos.title}</h4><p className="kor-bold text-xs text-gray-400">{pos.type}</p></div>
                <div className="md:max-w-md"><p className="font-serif-kr text-sm text-gray-600">{pos.desc}</p></div>
                <button onClick={() => handleSelectPosition(pos.title)} className="eng-text text-[10px] font-black uppercase tracking-widest bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all">Apply Now</button>
             </div>
           ))}
        </div>

        {/* APPLICATION FORM */}
        <div ref={formRef} className="max-w-4xl mx-auto bg-gray-50 p-12 md:p-20 rounded-sm shadow-sm border border-gray-100">
           <div className="text-center mb-16">
             <h3 className="eng-text text-[12px] font-black tracking-[0.6em] uppercase text-black mb-2">Direct Application</h3>
             <p className="kor-bold text-[10px] text-gray-400 uppercase tracking-widest">새로운 서사를 함께 써내려갈 당신을 기다립니다</p>
             <div className="w-12 h-[1px] bg-black/10 mx-auto mt-6"></div>
           </div>
           <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-1">
                    <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest ml-1">Name *</label>
                    <input required className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black" placeholder="성함을 입력해주세요" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest ml-1">Contact *</label>
                    <input required className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black" placeholder="010-0000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest ml-1">Email *</label>
                    <input required type="email" className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black" placeholder="example@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest ml-1">Position *</label>
                    <select required className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black cursor-pointer" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})}>
                        <option value="">지원 분야를 선택해주세요</option>
                        {positions.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                    </select>
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest ml-1">Portfolio Link</label>
                 <input className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black" placeholder="포트폴리오 링크 (Google Drive, Notion 등)" value={formData.portfolioUrl} onChange={e => setFormData({...formData, portfolioUrl: e.target.value})} />
              </div>
              <div className="space-y-1">
                 <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest ml-1">Message</label>
                 <textarea className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black resize-none" placeholder="지원 동기 및 본인만의 강점을 들려주세요 (인성 및 소통 철학 등)" rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              </div>
              <div className="flex items-center gap-3 pt-4">
                 <input type="checkbox" required checked={formData.agreement} onChange={e => setFormData({...formData, agreement: e.target.checked})} className="w-4 h-4 accent-black cursor-pointer" />
                 <span className="text-[10px] text-gray-400 uppercase tracking-widest">개인정보 수집 및 이용에 동의합니다 *</span>
              </div>
              <div className="pt-4"><button type="submit" className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-all shadow-xl">Submit Application</button></div>
           </form>
        </div>
      </section>
    </div>
  );
};

export default Careers;
