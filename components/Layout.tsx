
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'ABOUT', path: '/about' },
    { name: 'SPACE', path: '/space' },
    { name: 'CONTACT', path: '/contact' },
    { name: 'CAREER', path: '/career' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 md:px-8 py-6 md:py-10 flex justify-between items-start pointer-events-none">
        <Link to="/" className="text-lg md:text-xl font-bold tracking-[0.2em] pointer-events-auto text-white uppercase">
          BBEOGGUGI
        </Link>
        <nav className="flex flex-col gap-1.5 md:gap-2 items-end pointer-events-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[11px] md:text-sm tracking-[0.15em] md:tracking-[0.2em] transition-opacity hover:opacity-100 ${
                location.pathname.startsWith(item.path) ? 'opacity-100 font-bold underline underline-offset-4 text-white' : 'opacity-60 text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-grow pt-32 md:pt-40 pb-20">
        <Outlet />
      </main>

      <footer className="px-8 py-20 border-t border-gray-100 flex flex-col items-center text-center">
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-[10px] md:text-[11px] tracking-[0.2em] text-[#111111] font-bold uppercase">
             <a href="mailto:bbeoggugi@gmail.com" className="hover:opacity-50 transition-opacity">bbeoggugi@gmail.com</a>
             <span className="hidden md:block w-[1px] h-3 bg-gray-200"></span>
             <a href="tel:010-4555-6764" className="hover:opacity-50 transition-opacity">010-4555-6764</a>
             <span className="hidden md:block w-[1px] h-3 bg-gray-200"></span>
             <span className="kor-bold">김성환 대표</span>
             <span className="hidden md:block w-[1px] h-3 bg-gray-200"></span>
             <span className="eng-text text-[9px] tracking-widest text-gray-400">사업자번호 : 243-50-00179</span>
          </div>
        </div>

        <div className="mb-8 flex gap-8 uppercase items-center text-[9px] tracking-widest text-gray-400">
          <a href="https://www.instagram.com/bbeoggugi_official/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
          <a href="https://blog.naver.com/lali8122" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Blog</a>
          <a href="https://www.youtube.com/@bbeoggugi_homes" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">YouTube</a>
        </div>

        <div className="text-[9px] md:text-[10px] tracking-[0.3em] text-gray-300 uppercase font-medium">
          © 2024 BBEOGGUGI INTERIOR DESIGN STUDIO. ALL RIGHTS RESERVED.
        </div>
        
        <Link to="/admin" className={`mt-8 text-[8px] tracking-widest text-gray-200 hover:text-black transition-colors uppercase font-bold ${location.pathname === '/admin' ? 'text-black' : ''}`}>
          Admin Access
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
