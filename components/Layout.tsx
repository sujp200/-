
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
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-8 py-10 flex justify-between items-start pointer-events-none">
        <Link to="/" className="text-xl font-serif tracking-widest pointer-events-auto text-white">
          CUCKOO
        </Link>
        <nav className="flex flex-col gap-2 items-end pointer-events-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm tracking-[0.2em] transition-opacity hover:opacity-100 ${
                location.pathname.startsWith(item.path) ? 'opacity-100 font-bold' : 'opacity-60 text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-grow pt-40 pb-20">
        <Outlet />
      </main>

      <footer className="px-8 py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-gray-400">
        <div className="mb-4 md:mb-0">
          © 2024 CUCKOO INTERIOR DESIGN STUDIO. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6 uppercase">
          <span>Instagram</span>
          <span>Behance</span>
          <span>LinkedIn</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
