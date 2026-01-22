
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Space from './pages/Space';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import ChannelPage from './pages/Channel';
import Careers from './pages/Careers';
import Suggest from './pages/Suggest';
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
      const settings = savedSettings ? JSON.parse(savedSettings) : {};
      
      if (settings.primaryColor) document.documentElement.style.setProperty('--color-primary', settings.primaryColor);
      if (settings.secondaryColor) document.documentElement.style.setProperty('--color-secondary', settings.secondaryColor);
      if (settings.baseFontSize) document.documentElement.style.fontSize = `${settings.baseFontSize}px`;
      
      const existingStyle = document.getElementById('custom-uploaded-font');
      if (existingStyle) existingStyle.remove();

      if (settings.useCustomFont && settings.customFontBase64) {
        const style = document.createElement('style');
        style.id = 'custom-uploaded-font';
        style.textContent = `
          @font-face {
            font-family: 'BbeoggugiCustomFont';
            src: url('${settings.customFontBase64}');
            font-display: swap;
          }
          body, .font-serif-kr, h1, h2, h3, h4, p, span, a {
            font-family: 'BbeoggugiCustomFont', sans-serif !important;
          }
        `;
        document.head.appendChild(style);
      } else {
        if (settings.mainFont) {
           document.body.style.fontFamily = settings.mainFont === 'serif' 
            ? "'Noto Serif KR', serif" 
            : "'Noto Sans KR', sans-serif";
        }
      }
    } catch (e) {
      console.error("Failed to parse design settings:", e);
    }
  }, []);

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
          <Route path="/suggest" element={<Suggest />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/channel" element={<ChannelPage />} />
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
