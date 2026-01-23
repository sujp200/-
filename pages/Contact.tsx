
import React, { useState, useEffect } from 'react';

const Contact: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    title: 'Inquiry & Collaboration',
    subtitle: 'Connect with BBEOGGUGI Studio',
    visibleFields: ['address', 'size', 'schedule', 'budget', 'referral']
  });

  const [formData, setFormData] = useState<any>({
    name: '', phone: '', email: '', address: '', type: '', size: '', schedule: '', budget: '', content: '', referral: '', agreement: false,
    customFields: {}
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bbeoggugi_contact_settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    if (name.startsWith('custom_')) {
      const fieldName = name.replace('custom_', '');
      setFormData((prev: any) => ({
        ...prev,
        customFields: { ...prev.customFields, [fieldName]: value }
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert('개인정보 수집 및 이용에 동의가 필요합니다.');
      return;
    }
    const inquiries = JSON.parse(localStorage.getItem('bbeoggugi_inquiries') || '[]');
    const newInquiry = { ...formData, id: Date.now(), date: new Date().toISOString(), type: 'Consultation' };
    localStorage.setItem('bbeoggugi_inquiries', JSON.stringify([newInquiry, ...inquiries]));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-1000">
         <div className="w-16 h-16 border border-black rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 6L9 17l-5-5"/></svg>
         </div>
         <div className="text-center">
            <h2 className="kor-bold text-2xl mb-2">감사합니다.</h2>
            <p className="eng-text-secondary text-[11px] uppercase tracking-widest">Your inquiry has been received.</p>
         </div>
         <button onClick={() => window.location.reload()} className="eng-text text-[10px] underline underline-offset-8 uppercase opacity-40 hover:opacity-100 transition-opacity">Back to Contact</button>
      </div>
    );
  }

  const isVisible = (field: string) => settings.visibleFields.includes(field);

  return (
    <div className="px-8 max-w-[1400px] mx-auto py-10">
      <div className="mb-24 text-center">
        <h2 className="text-4xl font-serif mb-4">{settings.title || 'Inquiry & Collaboration'}</h2>
        <p className="text-[10px] tracking-[0.6em] text-gray-400 uppercase font-bold">{settings.subtitle || 'Connect with BBEOGGUGI Studio'}</p>
      </div>

      <form className="max-w-4xl mx-auto space-y-16 pb-20" onSubmit={handleSubmit}>
        <section className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Name 성함 *</label>
              <input name="name" required value={formData.name} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="Name / Company" />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Contact 연락처 *</label>
              <input name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="010-0000-0000" />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Email 이메일 *</label>
              <input name="email" required value={formData.email} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="example@email.com" />
            </div>
            {isVisible('address') && (
              <div className="border-b border-gray-100 focus-within:border-black transition-colors">
                <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Address 현장 주소</label>
                <input name="address" value={formData.address} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="Project Location" />
              </div>
            )}
          </div>
        </section>

        <section className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Inquiry Type 상담 유형</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none">
                <option value="">Select Type</option>
                <option value="Apartment">주거 - 아파트</option>
                <option value="Villa">주거 - 빌라/단독주택</option>
                <option value="Commercial">상업 - 카페/레스토랑</option>
                <option value="Office">상업 - 오피스</option>
              </select>
            </div>
            {isVisible('size') && (
              <div className="border-b border-gray-100 focus-within:border-black transition-colors">
                <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Size 면적</label>
                <input name="size" value={formData.size} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="e.g. 34평 / 112㎡" />
              </div>
            )}
            {isVisible('schedule') && (
              <div className="border-b border-gray-100 focus-within:border-black transition-colors">
                <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Schedule 공사 시기</label>
                <input name="schedule" value={formData.schedule} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="Desired Start Date" />
              </div>
            )}
            {isVisible('budget') && (
              <div className="border-b border-gray-100 focus-within:border-black transition-colors">
                <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Budget 예산 범위</label>
                <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none">
                  <option value="">Budget Range</option>
                  <option value="under50">5천만원 미만</option>
                  <option value="50to100">5천만원 - 1억원</option>
                  <option value="over100">1억원 이상</option>
                </select>
              </div>
            )}
            
            {/* Dynamic Custom Fields Rendering */}
            {settings.visibleFields?.map((field: string) => {
              if (['address', 'size', 'schedule', 'budget', 'referral'].includes(field)) return null;
              return (
                <div key={field} className="border-b border-gray-100 focus-within:border-black transition-colors">
                  <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">{field}</label>
                  <input 
                    name={`custom_${field}`} 
                    value={formData.customFields[field] || ''} 
                    onChange={handleChange} 
                    className="w-full bg-transparent py-2 text-xs outline-none" 
                    placeholder="Please specify" 
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-10">
          <div className="border-b border-gray-100 focus-within:border-black transition-colors">
            <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Details 상세 내용</label>
            <textarea name="content" value={formData.content} onChange={handleChange} rows={3} className="w-full bg-transparent py-2 text-xs outline-none resize-none" placeholder="Inquiry Message" />
          </div>
        </section>

        <section className="space-y-8 pt-4">
          <div className="bg-gray-50 p-6 text-[11px] text-gray-500 leading-relaxed border border-gray-100 h-32 overflow-y-auto scrollbar-thin">
             <div className="space-y-4">
               <div>
                 <p className="font-bold mb-1">▶ 개인정보의 수집 및 이용목적</p>
                 <p>- 서비스 이용에 따른 본인식별, 실명확인, 가입의사 확인, 연령제한 서비스 이용</p>
                 <p>- 고지사항 전달, 불만처리 의사소통 경로 확보, 물품배송 시 정확한 배송지 정보 확보</p>
                 <p>- 기타 원활한 양질의 서비스 제공 등</p>
               </div>
               <div>
                 <p className="font-bold mb-1">▶ 수집하는 개인정보의 항목</p>
                 <p>- 이름, 이메일, 주소, 연락처, 핸드폰번호, 그 외 선택항목</p>
               </div>
             </div>
          </div>
          <label className="flex items-center gap-4 cursor-pointer group">
            <div className={`w-5 h-5 border border-gray-300 flex items-center justify-center transition-all ${formData.agreement ? 'bg-black border-black' : 'bg-white'}`}>
              <input 
                name="agreement" 
                type="checkbox" 
                checked={formData.agreement} 
                onChange={handleChange} 
                className="hidden" 
              />
              {formData.agreement && <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth="2"><path d="M1 4l3 3 5-6"/></svg>}
            </div>
            <span className="text-[11px] tracking-widest text-gray-500 uppercase font-bold">Agree to Privacy Policy 개인정보 수집 및 이용 동의 *</span>
          </label>
        </section>

        <div className="flex justify-center pt-10">
          <button className="group flex flex-col items-center gap-6" type="submit">
            <div className="w-16 h-16 border border-gray-200 rounded-full flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
              <div className="w-1.5 h-1.5 bg-black group-hover:bg-white rounded-full"></div>
            </div>
            <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-gray-400 group-hover:text-black">Submit Inquiry 상담 신청</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
