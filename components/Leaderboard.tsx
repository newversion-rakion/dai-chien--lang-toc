import React from 'react';
import { WolfData } from '../types';
import { Trophy, X } from 'lucide-react';

interface LeaderboardProps {
  wolves: WolfData[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (wolf: WolfData) => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ wolves, isOpen, onToggle, onSelect }) => {
  return (
    <div className="absolute top-[38%] left-[4%] z-40 origin-left">
      {/* Toggle Button - Scale theo khung hình */}
      <button 
        onClick={onToggle}
        style={{ padding: '1.2cqw' }}
        className={`rounded-full shadow-[0_0_2cqw_rgba(249,115,22,0.4)] transition-all duration-300 border-[0.2cqw] ${
          isOpen ? 'bg-zinc-900 border-zinc-700 text-zinc-400 rotate-90' : 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-400 text-white hover:scale-110'
        }`}
      >
        {isOpen ? <X size="1.8cqw" /> : <Trophy size="1.8cqw" />}
      </button>

      {/* Panel - Scale toàn bộ chữ và khoảng cách bằng cqw */}
      {isOpen && (
        <div 
          style={{ 
            top: '4.5cqw', 
            width: '25cqw', 
            padding: '1.2cqw',
            borderRadius: '1.5cqw',
            borderWidth: '0.2cqw'
          }}
          className="absolute left-0 bg-zinc-950/90 backdrop-blur-2xl border-orange-500/50 shadow-2xl animate-in slide-in-from-top-4 duration-300"
        >
          <div className="flex items-center justify-between mb-[1cqw] border-b border-white/10 pb-[0.8cqw]">
            <div className="flex items-center">
              <Trophy className="text-yellow-500 mr-[0.5cqw]" size="1.4cqw" />
              <h3 className="text-[1.2cqw] font-oswald font-bold uppercase tracking-widest text-white italic">BẢNG XẾP HẠNG</h3>
            </div>
          </div>
          <div className="space-y-[0.8cqw]">
            {[...wolves].sort((a,b) => b.percent - a.percent).map((w, i) => (
              <div 
                key={w.id} 
                style={{ padding: '0.8cqw', borderRadius: '0.8cqw' }}
                className={`flex items-center justify-between transition-all cursor-pointer group border ${
                  i === 0 ? 'bg-orange-500/20 border-orange-500/40 shadow-[0_0_1.5cqw_rgba(249,115,22,0.1)]' : 'bg-white/5 border-transparent hover:border-white/20'
                }`}
                onClick={() => onSelect(w)}
              >
                <div className="flex items-center">
                  <span 
                    style={{ width: '1.8cqw', height: '1.8cqw', borderRadius: '0.5cqw' }}
                    className={`flex items-center justify-center font-black text-[0.8cqw] mr-[0.8cqw] ${
                    i === 0 ? 'bg-yellow-500 text-black' : 
                    i === 1 ? 'bg-zinc-400 text-black' : 
                    'bg-orange-900 text-white'
                  }`}>
                    {i + 1}
                  </span>
                  <span className="font-oswald text-[1cqw] font-bold uppercase tracking-tight text-zinc-100 group-hover:text-orange-400 transition-colors">
                    {w.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[1cqw] font-black text-orange-500">{w.percent}%</p>
                  <div style={{ width: '5cqw', height: '0.3cqw' }} className="bg-zinc-800 rounded-full mt-[0.2cqw] overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-600 to-yellow-400 transition-all duration-1000" 
                      style={{ width: `${Math.min(w.percent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;