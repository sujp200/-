
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="px-8 max-w-[1920px] mx-auto min-h-[60vh] flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full">
        <h2 className="text-4xl font-serif mb-2 text-center">Inquiry</h2>
        <p className="text-[10px] tracking-[0.5em] text-gray-400 text-center mb-16 uppercase font-bold">Stay in Touch</p>

        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="YOUR NAME | 성함" 
              className="w-full bg-transparent border-b border-gray-200 py-3 text-xs tracking-widest outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="relative">
            <input 
              type="tel" 
              placeholder="CONTACT | 연락처" 
              className="w-full bg-transparent border-b border-gray-200 py-3 text-xs tracking-widest outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="relative">
            <textarea 
              rows={4} 
              placeholder="MESSAGE | 문의 내용" 
              className="w-full bg-transparent border-b border-gray-200 py-3 text-xs tracking-widest outline-none focus:border-black transition-colors resize-none"
            ></textarea>
          </div>
          
          <div className="flex justify-center pt-8">
            <button 
              className="group flex flex-col items-center gap-4 transition-all"
              type="button"
            >
              <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                <div className="w-1 h-1 bg-black group-hover:bg-white rounded-full"></div>
              </div>
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold group-hover:text-black text-gray-400 transition-colors">Submit</span>
            </button>
          </div>
        </form>

        <div className="mt-24 text-center space-y-2">
            <p className="text-[10px] tracking-widest text-gray-400">INFO@CUCKOOINTERIOR.COM</p>
            <p className="text-[10px] tracking-widest text-gray-400">+82 2 1234 5678</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
