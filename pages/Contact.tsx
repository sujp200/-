
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="px-8 max-w-[1400px] mx-auto py-10">
      <div className="mb-24 text-center">
        <h2 className="text-4xl font-serif mb-4">Project Inquiry</h2>
        <p className="text-[10px] tracking-[0.6em] text-gray-400 uppercase font-bold">Start Your Journey with BBEOGGUGI</p>
      </div>

      <form className="max-w-4xl mx-auto space-y-16 pb-20" onSubmit={(e) => e.preventDefault()}>
        
        {/* Basic Information */}
        <section className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Name | 성함 *</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none"
                placeholder="Name"
              />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Contact | 연락처 *</label>
              <input 
                name="phone"
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
                value={formData.email}
                onChange={handleChange}
                type="email" 
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none"
                placeholder="example@email.com"
              />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Address | 공사 주소</label>
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
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Property Type | 주거/상업 유형</label>
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
              </select>
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Size | 평수/면적</label>
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
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Schedule | 시공 예정 일정</label>
              <input 
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                type="text" 
                className="w-full bg-transparent py-2 text-xs tracking-wider outline-none"
                placeholder="e.g. 2024년 10월 중순 예정"
              />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Budget | 예상 예산</label>
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
              </select>
            </div>
          </div>
        </section>

        {/* Content & Referral */}
        <section className="space-y-10">
          <div className="border-b border-gray-100 focus-within:border-black transition-colors">
            <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Scope of Work | 공사 내용</label>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={3} 
              className="w-full bg-transparent py-2 text-xs tracking-wider outline-none resize-none"
              placeholder="상세 내용을 입력해주세요."
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

        {/* Privacy Agreement */}
        <section className="pt-4">
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
            <span className="text-[10px] tracking-widest text-gray-500 uppercase">
              Agree to Privacy Policy (개인정보 수집 및 이용 동의) *
            </span>
          </label>
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
      
      <div className="mt-20 pt-10 border-t border-gray-50 text-center space-y-2 opacity-50">
          <p className="text-[9px] tracking-[0.3em] text-gray-400">INFO@BBEOGGUGIINTERIOR.COM</p>
          <p className="text-[9px] tracking-[0.3em] text-gray-400">+82 2 1234 5678</p>
          <p className="text-[9px] tracking-[0.3em] text-gray-400">SEOUL, KOREA</p>
      </div>
    </div>
  );
};

export default Contact;
