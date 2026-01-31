import React from 'react';
import { WolfData } from '../types';
import { X, TrendingUp, Trophy, Wallet } from 'lucide-react';

interface InfoPanelProps {
  wolf: WolfData | null;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ wolf, onClose }) => {
  if (!wolf) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-900 border-2 border-orange-500 w-full max-w-md rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.3)] animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Nút Đóng Cố Định */}
        <div className="flex justify-end p-2 border-b border-white/5">
            <button 
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition-colors bg-zinc-800/50 rounded-full p-2"
            >
                <X size={20} />
            </button>
        </div>

        {/* Nội dung có thể cuộn */}
        <div className="relative p-5 md:p-8 overflow-y-auto flex-1 custom-scrollbar scroll-smooth">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-oswald font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 uppercase tracking-tighter text-center">
              {wolf.name}
            </h2>
            <div className="mt-2 px-4 py-1 bg-zinc-800 rounded-full border border-zinc-700">
              <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest">Chi Tiết Lang Tộc</span>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center p-3 md:p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
              <div className="p-2 md:p-3 bg-orange-500/20 rounded-lg text-orange-500 mr-4">
                <Trophy size={18} />
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] uppercase font-bold">Thứ hạng hiện tại</p>
                <p className="text-lg md:text-xl font-oswald text-white font-bold">Hạng {wolf.rank}</p>
              </div>
            </div>

            <div className="flex items-center p-3 md:p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
              <div className="p-2 md:p-3 bg-blue-500/20 rounded-lg text-blue-500 mr-4">
                <Wallet size={18} />
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] uppercase font-bold">Tổng doanh số</p>
                <p className="text-lg md:text-xl font-oswald text-white font-bold">{wolf.revenue.toLocaleString()} VND</p>
              </div>
            </div>

            <div className="flex items-center p-3 md:p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
              <div className="p-2 md:p-3 bg-green-500/20 rounded-lg text-green-500 mr-4">
                <TrendingUp size={18} />
              </div>
              <div className="flex-1">
                <p className="text-zinc-500 text-[10px] uppercase font-bold">Tỷ lệ hoàn thành</p>
                <div className="flex items-end justify-between">
                  <p className="text-lg md:text-xl font-oswald text-white font-bold">{wolf.percent}%</p>
                  <div className="w-20 md:w-24 h-2 bg-zinc-700 rounded-full overflow-hidden mb-1.5">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-1000"
                      style={{ width: `${Math.min(wolf.percent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-6 py-3.5 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all uppercase tracking-widest text-sm"
          >
            Đóng bảng thông tin
          </button>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </div>
  );
};

export default InfoPanel;