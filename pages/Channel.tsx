
import React from 'react';
import { channels } from '../data';

const ChannelPage: React.FC = () => {
  return (
    <div className="px-8 max-w-[1920px] mx-auto">
      <div className="mb-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Channels</h2>
        <p className="text-[10px] tracking-[0.5em] text-gray-400 uppercase">Interactive Digital Ecosystem</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 max-w-4xl mx-auto">
        {channels.map((channel) => (
          <a 
            key={channel.id}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative text-center"
          >
            {/* App Icon Container */}
            <div className="relative aspect-square overflow-hidden rounded-[22%] md:rounded-[25%] shadow-md border border-gray-100 transition-all duration-700 ease-out group-hover:shadow-2xl group-hover:scale-[1.05] group-hover:-translate-y-2">
                {/* Platform Specific Subtle Gradient Overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${
                  channel.id === 'insta' ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' :
                  channel.id === 'blog' ? 'bg-green-500' : 'bg-red-600'
                }`}></div>
                
                <img 
                    src={channel.thumbnail} 
                    alt={channel.name} 
                    className="w-full h-full object-cover grayscale-0 opacity-100 transition-all duration-1000 ease-out"
                />
            </div>
            
            {/* Label Underneath (Like Phone Home Screen) */}
            <div className="mt-6 flex flex-col items-center">
                <span className="text-[10px] md:text-xs tracking-[0.3em] font-bold text-gray-800 uppercase mb-2">
                  {channel.name}
                </span>
                <div className={`w-0 h-[2.5px] rounded-full transition-all duration-700 group-hover:w-8 ${
                    channel.id === 'insta' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    channel.id === 'blog' ? 'bg-[#2DB400]' : 'bg-[#FF0000]'
                }`}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
