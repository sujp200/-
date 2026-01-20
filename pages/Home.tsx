
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/space');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FDFCF8] cursor-pointer" onClick={handleEnter}>
      {/* 3D Spline Iframe Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <iframe 
          src="https://my.spline.design/kingfisherinmotion-xvMb0vNdz0QV8nO1J58qr5kz/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Transparent overlay to catch clicks */}
      <div className="absolute inset-0 flex items-center justify-center z-10 group">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col items-center">
            <span className="text-[10px] tracking-[0.5em] text-gray-400 mb-4">CLICK TO ENTER</span>
            <div className="w-[1px] h-10 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
