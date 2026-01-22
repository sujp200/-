
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    type: '',
    size: '',
    schedule: '',
    budget: '',
    content: '',
    referral: '',
    agreement: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert('개인정보 수집 및 이용에 동의가 필요합니다.');
      return;
    }

    // Save to LocalStorage for Admin Dashboard
    const inquiries = JSON.parse(localStorage.getItem('bbeoggugi_inquiries') || '[]');
    const newInquiry = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'new'
    };
    localStorage.setItem('bbeoggugi_inquiries', JSON.stringify([newInquiry, ...inquiries]));
    
    // Simulate Email Trigger (Actual email requires backend/service)
    console.log("Email Sent to: info@bbeoggugi.com", newInquiry);
    
    setSubmitted(true);
    alert('문의가 성공적으로 전달되었습니다.');
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

  return (
    <div className="px-8 max-w-[1400px] mx-auto py-10">
      <div className="mb-24 text-center">
        <h2 className="text-4xl font-serif mb-4">Inquiry & Collaboration</h2>
        <p className="text-[10px] tracking-[0.6em] text-gray-400 uppercase font-bold">Connect with BBEOGGUGI Studio</p>
      </div>

      <form className="max-w-4xl mx-auto space-y-16 pb-20" onSubmit={handleSubmit}>
        
        {/* Basic Information */}
        <section className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Name | 성함/업체명 *</label>
              <input 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                type="text" 
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none"
                placeholder="Name / Company"
              />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Contact | 연락처 *</label>
              <input 
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                type="tel" 
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none"
                placeholder="010-0000-0000"
              />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Email | 이메일 *</label>
              <input 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                type="email" 
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none"
                placeholder="example@email.com"
              />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Address | 주소</label>
              <input 
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text" 
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none"
                placeholder="Address"
              />
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Inquiry Type | 문의 유형</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none cursor-pointer"
              >
                <option value="">Select Type</option>
                <option value="Apartment">주거 - 아파트 (Apartment)</option>
                <option value="Villa">주거 - 빌라/단독주택 (Villa/House)</option>
                <option value="Commercial">상업 - 카페/레스토랑 (Commercial)</option>
                <option value="Office">상업 - 오피스 (Office)</option>
                <option value="Collaboration">협업 및 제안 (Collaboration / Business)</option>
                <option value="Press">미디어 취재 (Press / Media)</option>
              </select>
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Size | 평수/면적 (해당 시)</label>
              <input 
                name="size"
                value={formData.size}
                onChange={handleChange}
                type="text" 
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none"
                placeholder="e.g. 34평 / 112m²"
              />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Schedule | 희망 일정</label>
              <input 
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                type="text" 
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none"
                placeholder="e.g. 2024년 하반기 예정"
              />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Budget | 예상 예산 (해당 시)</label>
              <select 
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none cursor-pointer"
              >
                <option value="">Select Budget Range</option>
                <option value="under50">5천만원 미만</option>
                <option value="50to100">5천만원 - 1억원</option>
                <option value="100to200">1억원 - 2억원</option>
                <option value="over200">2억원 이상</option>
                <option value="N/A">해당 없음 (Business Proposal)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Content & Referral */}
        <section className="space-y-10">
          <div className="border-b border-gray-100 focus-within:border-black transition-colors">
            <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Details | 문의 및 제안 내용</label>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={3} 
              className="w-full bg-transparent py-2 text-xs tracking-wider outline-none resize-none"
              placeholder="내용을 입력해주세요."
            ></textarea>
          </div>

          <div className="border-b border-gray-100 focus-within:border-black transition-colors">
            <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Referral Source | 인입 경로</label>
            <select 
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none cursor-pointer"
              >
                <option value="">How did you find us?</option>
                <option value="Instagram">인스타그램 (Instagram)</option>
                <option value="Blog">네이버 블로그 (Blog)</option>
                <option value="Youtube">유튜브 (YouTube)</option>
                <option value="Introduction">지인 소개 (Introduction)</option>
                <option value="Others">기타 (Others)</option>
              </select>
          </div>
        </section>

        {/* Privacy Agreement & Policy Viewer */}
        <section className="space-y-6 pt-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-4 h-4 border border-gray-300 flex items-center justify-center group-hover:border-black transition-colors">
              <input 
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                type="checkbox" 
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {formData.agreement && <div className="w-2 h-2 bg-black"></div>}
            </div>
            <span className="text-[10px] tracking-widest text-gray-500 uppercase font-bold">
              Agree to Privacy Policy (개인정보 수집 및 이용 동의) *
            </span>
          </label>

          {/* Scrollable Privacy Policy Box */}
          <div className="w-full h-32 overflow-y-auto bg-gray-50 border border-gray-100 p-4 rounded-sm custom-scrollbar">
            <div className="text-[10px] leading-relaxed text-gray-500 space-y-4 font-medium">
              <div>
                <p className="text-black font-bold mb-1">▶ 개인정보의 수집 및 이용목적</p>
                <p>- 서비스 이용에 따른 본인식별, 실명확인, 가입의사 확인, 연령제한 서비스 이용</p>
                <p>- 고지사항 전달, 불만처리 의사소통 경로 확보, 물품배송 시 정확한 배송지 정보 확보</p>
                <p>- 신규 서비스 등 최신정보 안내 및 개인맞춤서비스 제공을 위한 자료</p>
                <p>- 기타 원활한 양질의 서비스 제공 등</p>
              </div>

              <div>
                <p className="text-black font-bold mb-1">▶ 수집하는 개인정보의 항목</p>
                <p>- 이름, 이메일, 주소, 연락처, 핸드폰번호, 그 외 선택항목</p>
              </div>

              <div>
                <p className="text-black font-bold mb-1">▶ 개인정보의 보유 및 이용기간</p>
                <p>- 원칙적으로 개인정보의 수집 또는 제공받은 목적 달성 시 지체 없이 파기합니다.</p>
                <p>- 다만, 원활한 서비스의 상담을 위해 상담 완료 후 내용을 3개월간 보유할 수 있으며 전자상거래에서의 소비자보호에 관한 법률 등 타법률에 의해 보존할 필요가 있는 경우에는 일정기간 보존합니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center pt-10">
          <button 
            className="group flex flex-col items-center gap-6 transition-all"
            type="submit"
          >
            <div className="w-16 h-16 border border-gray-200 rounded-full flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500">
              <div className="w-1.5 h-1.5 bg-black group-hover:bg-white rounded-full transition-colors"></div>
            </div>
            <div className="text-center">
              <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-gray-400 group-hover:text-black transition-colors block mb-1">Submit Inquiry</span>
              <span className="text-[8px] tracking-widest text-gray-300 uppercase block italic">Request for Consultation</span>
            </div>
          </button>
        </div>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9f9f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0e0e0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #111;
        }
      `}} />
    </div>
  );
};

export default Contact;
