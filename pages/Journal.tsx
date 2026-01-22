
import React, { useEffect, useState } from 'react';
import { channels as initialChannels } from '../data';
import { Channel } from '../types';

const JournalPage: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);

  useEffect(() => {
    const saved = localStorage.getItem('bbeoggugi_journal_channels');
    if (saved) setChannels(JSON.parse(saved));
  }, []);

  return (
    <div className="px-8 max-w-[1920px] mx-auto">
      <div className="mb-48 text-center">
        <h2 className="text-7xl md:text-[10rem] font-serif font-light mb-12 tracking-tighter opacity-[0.03] select-none text-[#111111] uppercase">JOURNAL</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-32 max-w-6xl mx-auto pb-80">
        {channels.map((channel) => (
          <a 
            key={channel.id}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative text-center"
          >
            <div className="relative aspect-square overflow-hidden rounded-[26%] shadow-2xl border border-gray-50 transition-all duration-1000 ease-out group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] group-hover:scale-[1.08] group-hover:-translate-y-10">
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    {channel.id === 'blog' && (
                        <div className="w-full h-full bg-[#2DB400] flex items-center justify-center rounded-[22%]">
                             <span className="text-white text-[6.5rem] md:text-[8rem] font-black font-sans select-none leading-none drop-shadow-xl scale-95 group-hover:scale-100 transition-transform duration-700" style={{ fontWeight: 900 }}>N</span>
                        </div>
                    )}
                    {channel.id === 'yt' && (
                        <div className="w-full h-full bg-[#FF0000] flex items-center justify-center rounded-[22%]">
                            <div className="w-0 h-0 border-y-[22px] md:border-y-[28px] border-y-transparent border-l-[40px] md:border-l-[50px] border-l-white ml-4 drop-shadow-lg scale-90 group-hover:scale-100 transition-transform duration-700"></div>
                        </div>
                    )}
                    {channel.id === 'insta' && (
                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                            <img 
                                src={channel.thumbnail} 
                                alt={channel.name} 
                                className="w-full h-full object-cover grayscale brightness-110 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-110"
                            />
                        </div>
                    )}
                </div>
                {channel.id !== 'insta' && (
                  <div className={`absolute inset-0 z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 bg-black`}></div>
                )}
            </div>
            <div className="mt-16 flex flex-col items-center">
                <span className="eng-text text-base font-bold uppercase mb-6 tracking-[0.2em]">
                  {channel.name}
                </span>
                <div className={`w-1 h-1 rounded-full transition-all duration-1000 group-hover:w-20 group-hover:h-[1.5px] ${
                    channel.id === 'insta' ? 'bg-[#111111]' :
                    channel.id === 'blog' ? 'bg-[#2DB400]' : 'bg-[#FF0000]'
                }`}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
