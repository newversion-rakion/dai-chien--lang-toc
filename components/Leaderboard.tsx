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
    <div className="absolute top-[38%] left-[4%] z-40 scale-90 md:scale-100 origin-left">
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className={`p-3 md:p-4 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 border-2 ${
          isOpen ? 'bg-zinc-900 border-zinc-700 text-zinc-400 rotate-90' : 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-400 text-white hover:scale-110'
        }`}
      >
        {isOpen ? <X size={24} /> : <Trophy size={24} />}
      </button>

      {/* Panel - Mở xuống phía dưới (top-16) để không bị tràn màn hình phía trên */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-64 md:w-80 bg-zinc-950/90 backdrop-blur-2xl border-2 border-orange-500/50 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <div className="flex items-center">
              <Trophy className="text-yellow-500 mr-2" size={18} />
              <h3 className="text-lg font-oswald font-bold uppercase tracking-widest text-white italic">BẢNG XẾP HẠNG</h3>
            </div>
          </div>
          <div className="space-y-2">
            {[...wolves].sort((a,b) => b.percent - a.percent).map((w, i) => (
              <div 
                key={w.id} 
                className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer group border ${
                  i === 0 ? 'bg-orange-500/20 border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.1)]' : 'bg-white/5 border-transparent hover:border-white/20'
                }`}
                onClick={() => onSelect(w)}
              >
                <div className="flex items-center">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs mr-2.5 ${
                    i === 0 ? 'bg-yellow-500 text-black' : 
                    i === 1 ? 'bg-zinc-400 text-black' : 
                    'bg-orange-900 text-white'
                  }`}>
                    {i + 1}
                  </span>
                  <span className="font-oswald text-xs font-bold uppercase tracking-tight text-zinc-100 group-hover:text-orange-400 transition-colors">
                    {w.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-orange-500">{w.percent}%</p>
                  <div className="w-14 h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
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