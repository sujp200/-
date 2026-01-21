
import React from 'react';
import { channels } from '../data';

const ChannelPage: React.FC = () => {
  return (
    <div className="px-8 max-w-[1920px] mx-auto">
      <div className="mb-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Channels</h2>
        <p className="text-[10px] tracking-[0.5em] text-gray-400 uppercase">Discover our stories across platforms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 max-w-7xl mx-auto">
        {channels.map((channel) => (
          <a 
            key={channel.id}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative overflow-hidden bg-white aspect-[3/4]"
          >
            <div className="w-full h-full overflow-hidden">
                <img 
                    src={channel.thumbnail} 
                    alt={channel.name} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                />
            </div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                {/* Platform Indicator */}
                <div className={`mb-6 p-4 rounded-full border border-black/10 group-hover:scale-110 transition-transform duration-500 bg-white/80 backdrop-blur-sm shadow-xl`}>
                    {channel.id === 'insta' && <span className="text-xs font-bold text-pink-600">IG</span>}
                    {channel.id === 'blog' && <span className="text-xs font-bold text-green-600">N</span>}
                    {channel.id === 'yt' && <span className="text-xs font-bold text-red-600">YT</span>}
                </div>
                
                <h3 className="text-xl font-bold tracking-[0.1em] mb-2 text-black opacity-80 group-hover:opacity-100 transition-opacity">
                    {channel.name}
                </h3>
                <span className="text-[9px] tracking-[0.4em] text-gray-400 uppercase">View Official Channel</span>
            </div>

            {/* Hover Accent Bar */}
            <div className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${
                channel.id === 'insta' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                channel.id === 'blog' ? 'bg-green-500' : 'bg-red-600'
            }`}></div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
