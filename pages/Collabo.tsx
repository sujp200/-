
import React, { useState } from 'react';

const Collabo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: '',
    fileBase64: '',
    fileName: '',
    agreement: false
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 10) { // 10MB limit
        alert('File size exceeds 10MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          fileBase64: reader.result as string,
          fileName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert('Agree to the privacy policy to continue.');
      return;
    }

    const inquiries = JSON.parse(localStorage.getItem('bbeoggugi_inquiries') || '[]');
    const newCollabo = {
      ...formData,
      id: Date.now(),
      type: 'Collaboration',
      date: new Date().toISOString(),
    };
    localStorage.setItem('bbeoggugi_inquiries', JSON.stringify([newCollabo, ...inquiries]));
    alert('Thank you. Your proposal has been submitted.');
    setFormData({ name: '', email: '', category: '', subject: '', message: '', fileBase64: '', fileName: '', agreement: false });
  };

  return (
    <div className="px-8 max-w-[1400px] mx-auto pb-40">
      <section className="mb-32 pt-10 text-center">
        <h2 className="text-7xl md:text-[10rem] font-serif italic opacity-[0.05] absolute left-1/2 -translate-x-1/2 top-20 pointer-events-none select-none whitespace-nowrap">
          SUGGESTION
        </h2>
        <div className="relative z-10 pt-20">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight text-[#111111]">
            Artistic Dialogue &<br/>Collaboration
          </h1>
          <p className="eng-text-secondary text-[11px] uppercase tracking-[0.4em] font-bold">
            We are always open to visionary ideas.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2 group">
              <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest ml-1 group-focus-within:text-black transition-colors">Name / Company</label>
              <input 
                required
                className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black transition-colors" 
                placeholder="Name or Brand Name *" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest ml-1 group-focus-within:text-black transition-colors">Email Address</label>
              <input 
                required
                type="email"
                className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black transition-colors" 
                placeholder="example@email.com *" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest ml-1 group-focus-within:text-black transition-colors">Category</label>
            <select 
              required
              className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black transition-colors appearance-none cursor-pointer"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Category *</option>
              <option value="Artist">Artist / Creator</option>
              <option value="Brand">Brand Collaboration</option>
              <option value="Furniture">Furniture / Lighting Supply</option>
              <option value="Media">Media / Press</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="space-y-2 group">
            <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest ml-1 group-focus-within:text-black transition-colors">Subject</label>
            <input 
              required
              className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black transition-colors" 
              placeholder="Title of your proposal *" 
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
            />
          </div>

          <div className="space-y-2 group">
            <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest ml-1 group-focus-within:text-black transition-colors">Proposal Details</label>
            <textarea 
              required
              className="w-full bg-transparent border-b border-gray-200 py-3 text-sm outline-none focus:border-black transition-colors resize-none" 
              placeholder="Please describe your creative idea or business suggestion." 
              rows={5}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            />
          </div>

          {/* File Upload Section */}
          <div className="space-y-4">
             <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest ml-1 block">Attachments (Proposal, PDF, Images)</label>
             <div className="relative">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <div className="w-full border border-dashed border-gray-200 p-10 text-center rounded-sm hover:bg-gray-50 transition-colors">
                   <div className="space-y-2">
                      <span className="eng-text text-[10px] uppercase font-black tracking-widest">
                        {formData.fileName || 'Click to Upload File'}
                      </span>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest">Maximum file size: 10MB</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="pt-10 space-y-8">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative w-4 h-4 border border-gray-300 flex items-center justify-center group-hover:border-black transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.agreement}
                  onChange={e => setFormData({...formData, agreement: e.target.checked})}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
                {formData.agreement && <div className="w-2 h-2 bg-black"></div>}
              </div>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Agree to Privacy Policy *</span>
            </label>
            <button type="submit" className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-all shadow-xl">
              Submit Suggestion
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Collabo;
