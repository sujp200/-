
import React, { useState, useEffect } from 'react';

const Contact: React.FC = () => {
  const [settings, setSettings] = useState({
    title: 'Inquiry & Collaboration',
    subtitle: 'Connect with BBEOGGUGI Studio',
    visibleFields: ['address', 'size', 'schedule', 'budget', 'referral']
  });

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', type: '', size: '', schedule: '', budget: '', content: '', referral: '', agreement: false
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bbeoggugi_contact_settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

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
    const inquiries = JSON.parse(localStorage.getItem('bbeoggugi_inquiries') || '[]');
    const newInquiry = { ...formData, id: Date.now(), date: new Date().toISOString(), status: 'new' };
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
        <h2 className="text-4xl font-serif mb-4">{settings.title}</h2>
        <p className="text-[10px] tracking-[0.6em] text-gray-400 uppercase font-bold">{settings.subtitle}</p>
      </div>

      <form className="max-w-4xl mx-auto space-y-16 pb-20" onSubmit={handleSubmit}>
        <section className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Name *</label>
              <input name="name" required value={formData.name} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="Name / Company" />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Contact *</label>
              <input name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="010-0000-0000" />
            </div>
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Email *</label>
              <input name="email" required value={formData.email} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="example@email.com" />
            </div>
            {isVisible('address') && (
              <div className="border-b border-gray-100 focus-within:border-black transition-colors">
                <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Address</label>
                <input name="address" value={formData.address} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="Address" />
              </div>
            )}
          </div>
        </section>

        <section className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Inquiry Type</label>
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
                <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Size</label>
                <input name="size" value={formData.size} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="e.g. 34평" />
              </div>
            )}
            {isVisible('schedule') && (
              <div className="border-b border-gray-100 focus-within:border-black transition-colors">
                <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Schedule</label>
                <input name="schedule" value={formData.schedule} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none" placeholder="Desired Schedule" />
              </div>
            )}
            {isVisible('budget') && (
              <div className="border-b border-gray-100 focus-within:border-black transition-colors">
                <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Budget</label>
                <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none">
                  <option value="">Budget Range</option>
                  <option value="under50">5천만원 미만</option>
                  <option value="50to100">5천만원 - 1억원</option>
                  <option value="over100">1억원 이상</option>
                </select>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-10">
          <div className="border-b border-gray-100 focus-within:border-black transition-colors">
            <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Details</label>
            <textarea name="content" value={formData.content} onChange={handleChange} rows={3} className="w-full bg-transparent py-2 text-xs outline-none resize-none" placeholder="Inquiry Message" />
          </div>
          {isVisible('referral') && (
            <div className="border-b border-gray-100 focus-within:border-black transition-colors">
              <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-2">Referral</label>
              <select name="referral" value={formData.referral} onChange={handleChange} className="w-full bg-transparent py-2 text-xs outline-none">
                <option value="">Find Us</option>
                <option value="Instagram">Instagram</option>
                <option value="Blog">Blog</option>
                <option value="Others">Others</option>
              </select>
            </div>
          )}
        </section>

        <section className="space-y-6 pt-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input name="agreement" checked={formData.agreement} onChange={handleChange} type="checkbox" className="w-4 h-4 accent-black" />
            <span className="text-[10px] tracking-widest text-gray-500 uppercase font-bold">Agree to Privacy Policy *</span>
          </label>
        </section>

        <div className="flex justify-center pt-10">
          <button className="group flex flex-col items-center gap-6" type="submit">
            <div className="w-16 h-16 border border-gray-200 rounded-full flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
              <div className="w-1.5 h-1.5 bg-black group-hover:bg-white rounded-full"></div>
            </div>
            <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-gray-400 group-hover:text-black">Submit Inquiry</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
