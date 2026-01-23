
import React, { useState, useEffect, useRef } from 'react';

const Careers: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<any>({
    mainTitle: 'Join our\nCreative Collective',
    descKr: '우리는 정형화된 틀을 벗어나, 공간의 본질을 탐구하고 새로운 라이프스타일을 제안합니다.',
    descEn: 'BBEOGGUGI Studio prioritizes creativity and high-end quality. We wait for someone who shares architectural clarity and artistic sense.',
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    coreValues: [
      { kr: 'Essential (본질)', desc: '공간의 본질을 탐구하며, 유행에 휘둘리지 않는 타임리스한 가치를 설계합니다.' },
      { kr: 'Detail (디테일)', desc: '집요한 감각이 공간의 한 끗을 결정합니다. 완벽한 마감과 디테일에 집착합니다.' },
      { kr: 'Collaboration (협업)', desc: '다 같이 만드는 프로젝트를 지향하며, 팀워크를 통해 영감을 주고받는 문화를 중시합니다.' }
    ],
    benefits: [
      { kr: '점심 지원', desc: '팀원들의 든든한 점심 식사를 지원합니다.' },
      { kr: '야근 석식 및 수당', desc: '야근 시 석식 지원 및 야근 수당을 지급합니다.' },
      { kr: '4대 보험 보장', desc: '안정적인 근무 환경을 위한 기본적인 보장입니다.' },
      { kr: '자유로운 연차', desc: '눈치 보지 않고 자유롭게 연차를 사용합니다.' },
      { kr: '좋은 팀 분위기', desc: '존중하는 태도의 팀원들과 협업이 원활한 문화입니다.' },
      { kr: '고퀄리티 포트폴리오', desc: '국내 최고 수준의 프로젝트 경험을 제공합니다.' },
      { kr: '전용 스튜디오 보유', desc: '직접 촬영과 스타일링이 가능한 공간을 보유하고 있습니다.' },
      { kr: '역세권 위치', desc: '동대문역/동대입구역에서 도보 10분 내외로 접근성이 좋습니다.' },
      { kr: '전시 관람 지원', desc: '감각 유지를 위한 다양한 전시회 방문을 지원합니다.' }
    ],
    positions: [
      { id: '1', title: 'Designer', subTitle: '경력 3년 이상', type: 'Full-time / Senior', desc: '하이엔드 주거 및 상업 공간 경험자. 설계부터 디자인 제안까지 전 과정을 주도할 수 있는 분을 찾습니다.' },
      { id: '2', title: 'Project Director', subTitle: '영상/브랜드 마케팅', type: 'Full-time / Director', desc: '영상 제작 및 브랜드 마케팅 가능자. 뻐꾸기의 브랜드 가치를 영상으로 담아내고 소통할 수 있는 분을 찾습니다.' },
      { id: '3', title: '신입 인턴', subTitle: 'New Intern', type: 'Internship', desc: '열정적이고 감각적인 신입 디자이너. 뻐꾸기의 철학을 함께 배우고 성장할 예비 디자이너를 환영합니다.' }
    ]
  });

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', position: '', portfolioUrl: '', message: '', agreement: false
  });

  useEffect(() => {
    const saved = localStorage.getItem('bbeoggugi_career_content');
    if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure default fallback if saved data is old
        if (!parsed.benefits) parsed.benefits = content.benefits;
        if (!parsed.positions) parsed.positions = content.positions;
        if (!parsed.coreValues) parsed.coreValues = content.coreValues;
        setContent(parsed);
    }
  }, []);

  const handleSelectPosition = (positionTitle: string) => {
    setFormData(prev => ({ ...prev, position: positionTitle }));
    setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) { alert('개인정보 수집 및 이용에 동의가 필요합니다.'); return; }
    const inquiries = JSON.parse(localStorage.getItem('bbeoggugi_inquiries') || '[]');
    const newApp = { ...formData, id: Date.now(), type: 'Career', date: new Date().toISOString() };
    localStorage.setItem('bbeoggugi_inquiries', JSON.stringify([newApp, ...inquiries]));
    alert('접수되었습니다. 뻐꾸기의 팀원이 되어주셔서 감사합니다.');
    setFormData({ name: '', phone: '', email: '', position: '', portfolioUrl: '', message: '', agreement: false });
  };

  return (
    <div className="px-8 max-w-[1400px] mx-auto pb-40">
      <section className="mb-40 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
           <div className="max-w-2xl">
              <h2 className="text-6xl md:text-8xl font-serif mb-12 tracking-tighter leading-none text-[#111111] whitespace-pre-line">
                {content.mainTitle}
              </h2>
              <div className="space-y-8">
                <p className="kor-bold text-xl md:text-2xl leading-snug">{content.descKr}</p>
                <p className="font-serif-kr text-lg leading-relaxed text-gray-400">{content.descEn}</p>
              </div>
           </div>
           <div className="w-full md:w-1/3 aspect-[3/4] bg-gray-50 overflow-hidden shadow-2xl">
              <img src={content.mainImage} alt="Studio Life" className="w-full h-full object-cover grayscale brightness-90" />
           </div>
        </div>
      </section>

      {content.coreValues?.length > 0 && (
        <section className="mb-40">
          <div className="flex items-center gap-6 mb-20">
              <h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">CORE VALUES (인재상)</h3>
              <div className="flex-grow h-[1px] bg-gray-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
              {content.coreValues.map((v:any, i:number) => (
                  <div key={i} className="space-y-6 group">
                      <div className="flex items-baseline gap-4">
                        <span className="eng-text text-3xl font-serif italic text-gray-200 group-hover:text-black transition-colors duration-500">0{i+1}</span>
                        <h4 className="eng-text text-xl font-bold uppercase tracking-tight">{v.kr}</h4>
                      </div>
                      <p className="font-serif-kr text-sm text-gray-500 leading-relaxed break-keep border-l border-gray-100 pl-6 group-hover:border-black transition-colors duration-500">{v.desc}</p>
                  </div>
              ))}
          </div>
        </section>
      )}

      {content.benefits?.length > 0 && (
        <section className="mb-40">
          <div className="flex items-center gap-6 mb-20">
              <h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">BENEFITS (복지 혜택)</h3>
              <div className="flex-grow h-[1px] bg-gray-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.benefits.map((b:any, i:number) => (
                  <div key={i} className="p-8 bg-gray-50 rounded-sm border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                      <h4 className="kor-bold text-base mb-3 text-black group-hover:text-[#111111]">{b.kr}</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed group-hover:text-gray-600">{b.desc}</p>
                  </div>
              ))}
          </div>
        </section>
      )}

      <section className="mb-40">
        <div className="flex items-center gap-6 mb-20">
          <h3 className="eng-text-secondary text-[10px] uppercase font-bold text-[#111111] tracking-[0.4em]">OPEN POSITIONS (채용 공고)</h3>
          <div className="flex-grow h-[1px] bg-gray-100"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
           {content.positions?.map((pos:any, idx:number) => (
             <div key={idx} className="group p-10 border border-gray-100 bg-white hover:bg-[#111111] transition-all duration-700 flex flex-col justify-between shadow-sm">
                <div>
                   <div className="mb-1">
                      <span className="text-[9px] font-black uppercase text-gray-400 group-hover:text-gray-500 transition-colors">{pos.type}</span>
                   </div>
                   <h4 className="eng-text text-2xl font-bold uppercase tracking-wider group-hover:text-white transition-colors">{pos.title}</h4>
                   <p className="kor-bold text-[11px] text-gray-300 uppercase tracking-widest mt-2 group-hover:text-gray-500 transition-colors">{pos.subTitle}</p>
                </div>
                <div className="mt-12 space-y-6">
                   <p className="font-serif-kr text-[13px] leading-[1.8] text-gray-500 group-hover:text-gray-400 transition-colors line-clamp-3 break-keep">{pos.desc}</p>
                   <button onClick={() => handleSelectPosition(pos.title)} className="w-full eng-text text-[10px] font-black uppercase tracking-widest border border-black text-black group-hover:border-white group-hover:text-white py-4 transition-all hover:bg-white hover:text-black">Apply Now</button>
                </div>
             </div>
           ))}
        </div>

        <div ref={formRef} className="max-w-4xl mx-auto bg-gray-50 p-12 md:p-20 rounded-sm shadow-sm border border-gray-100 animate-in fade-in duration-1000">
           <div className="mb-12">
             <h3 className="eng-text text-xs font-black uppercase tracking-[0.4em] text-gray-300 mb-2">Application Form</h3>
             <h4 className="kor-bold text-2xl">입사 지원서</h4>
           </div>
           <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-1">
                    <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest">Name 성함 *</label>
                    <input required className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black" placeholder="성함" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest">Contact 연락처 *</label>
                    <input required className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black" placeholder="연락처" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest">Position 지원 포지션 *</label>
                 <input required className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black font-bold" placeholder="위에서 공고를 선택하거나 직접 입력하세요" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} />
              </div>
              <div className="space-y-1">
                 <label className="text-[8px] uppercase font-bold text-gray-400 tracking-widest">Portfolio Link 포트폴리오 URL</label>
                 <input className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black" placeholder="URL (Google Drive, Notion, etc.)" value={formData.portfolioUrl} onChange={e => setFormData({...formData, portfolioUrl: e.target.value})} />
              </div>
              <div className="flex items-center gap-3 pt-4">
                 <input type="checkbox" id="agree" required checked={formData.agreement} onChange={e => setFormData({...formData, agreement: e.target.checked})} className="w-4 h-4 accent-black" />
                 <label htmlFor="agree" className="text-[10px] text-gray-500 uppercase tracking-widest cursor-pointer">Agree to Privacy Policy 개인정보 수집 및 이용 동의 (필수)</label>
              </div>
              <div className="pt-4"><button type="submit" className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-gray-800 transition-all">Submit Application 지원서 제출</button></div>
           </form>
        </div>
      </section>
    </div>
  );
};

export default Careers;
