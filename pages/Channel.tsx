
import React from 'react';
import { channels } from '../data';

const ChannelPage: React.FC = () => {
  return (
    <div className="px-8 max-w-[1920px] mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-4xl font-serif mb-4">Channels</h2>
        <p className="text-[10px] tracking-[0.5em] text-gray-400 uppercase">Discover our stories across platforms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {channels.map((channel) => (
          <a 
            key={channel.id}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative overflow-hidden bg-gray-50 aspect-[4/3]"
          >
            <img 
              src={channel.thumbnail} 
              alt={channel.name} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                <span className="text-xs tracking-[0.3em] font-bold border border-white px-6 py-2">
                    {channel.name}
                </span>
            </div>
            
            <div className="absolute bottom-6 left-6 flex items-baseline gap-2 text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] tracking-widest font-serif">VISIT CHANNEL</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
