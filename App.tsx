
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Space from './pages/Space';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import JournalPage from './pages/Journal';
import Careers from './pages/Careers';
import Admin from './pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  // Apply Global Design Settings from LocalStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('admin_design_settings');
      if (!savedSettings) return;

      const settings = JSON.parse(savedSettings);
      
      // 1. Color Theme
      if (settings.primaryColor) document.documentElement.style.setProperty('--color-primary', settings.primaryColor);
      if (settings.secondaryColor) document.documentElement.style.setProperty('--color-secondary', settings.secondaryColor);
      
      // 2. Base Font Size
      if (settings.baseFontSize) document.documentElement.style.fontSize = `${settings.baseFontSize}px`;
      
      // 3. Typography (System or Custom)
      const existingStyle = document.getElementById('global-theme-style');
      if (existingStyle) existingStyle.remove();

      const style = document.createElement('style');
      style.id = 'global-theme-style';
      
      let fontStyles = '';
      if (settings.useCustomFont && settings.customFontBase64) {
        fontStyles = `
          @font-face {
            font-family: 'BbeoggugiCustomFont';
            src: url('${settings.customFontBase64}');
            font-display: swap;
          }
          body, h1, h2, h3, h4, p, span, a, input, select, textarea, .kor-bold, .font-serif-kr {
            font-family: 'BbeoggugiCustomFont', sans-serif !important;
          }
        `;
      } else {
        const family = settings.mainFont === 'serif' ? "'Noto Serif KR', serif" : "'Noto Sans KR', sans-serif";
        fontStyles = `
          body, .kor-bold { font-family: ${family} !important; }
          .font-serif-kr { font-family: 'Noto Serif KR', serif !important; }
        `;
      }

      style.textContent = fontStyles;
      document.head.appendChild(style);

    } catch (e) {
      console.error("Failed to apply design settings:", e);
    }
  }, [location.pathname]); // 경로 이동 시마다 최신 디자인 체크 (Admin에서 변경 후 이동 시 반영)

  return (
    <div className={`min-h-screen ${isHome ? 'bg-[#FDFCF8]' : 'bg-white'} selection:bg-black selection:text-white transition-colors duration-700`}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/space" element={<Space />} />
          <Route path="/space/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
