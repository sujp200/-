
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'ABOUT', path: '/about' },
    { name: 'SPACE', path: '/space' },
    { name: 'CONTACT', path: '/contact' },
    { name: 'CHANNEL', path: '/channel' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 md:px-8 py-6 md:py-10 flex justify-between items-start pointer-events-none">
        <Link to="/" className="text-lg md:text-xl font-bold tracking-[0.2em] pointer-events-auto text-white">
          뻐꾸기
        </Link>
        <nav className="flex flex-col gap-1.5 md:gap-2 items-end pointer-events-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[11px] md:text-sm tracking-[0.15em] md:tracking-[0.2em] transition-opacity hover:opacity-100 ${
                location.pathname.startsWith(item.path) ? 'opacity-100 font-bold underline underline-offset-4' : 'opacity-60 text-white'
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

      <footer className="px-8 py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[10px] tracking-widest text-gray-400 text-center md:text-left">
        <div className="mb-4 md:mb-0">
          © 2024 BBEOGGUGI INTERIOR DESIGN STUDIO. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6 uppercase">
          <a href="https://www.instagram.com/bbeoggugi_official/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
          <a href="https://blog.naver.com/lali8122" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Blog</a>
          <a href="https://www.youtube.com/@bbeoggugi_homes" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">YouTube</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
