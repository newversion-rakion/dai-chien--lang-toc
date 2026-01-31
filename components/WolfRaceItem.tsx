import React from 'react';
import { WolfData } from '../types';
import { WOLF_ICONS, TRACK_START_PERCENT, TRACK_END_PERCENT } from '../constants';

interface WolfRaceItemProps {
  data: WolfData;
  topPos: string;
  onClick: (data: WolfData) => void;
  onMilestone: (percent: number) => void;
}

const WolfRaceItem: React.FC<WolfRaceItemProps> = ({ data, topPos, onClick }) => {
  const trackRange = TRACK_END_PERCENT - TRACK_START_PERCENT;
  
  // Vị trí hiển thị trên đường đua (tối đa 100% để không chạy khỏi vạch đích)
  const positionPercent = Math.min(Math.max(0, data.percent), 100);
  const leftPosition = TRACK_START_PERCENT + (positionPercent / 100) * trackRange;

  // Hiệu ứng "đang chạy" khi phần trăm tăng lên
  const isAdvancing = data.percent > data.prevPercent;

  return (
    <div 
      className="absolute transition-all duration-[3000ms] ease-out z-10 flex items-center group cursor-pointer"
      style={{ 
        top: topPos, 
        left: `${leftPosition}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={() => onClick(data)}
    >
      {/* Icon Sói */}
      <div className="relative">
        {isAdvancing && (
            <div className="absolute inset-0 bg-orange-500/40 blur-xl rounded-full animate-pulse" />
        )}
        
        <div className="relative animate-[wolf-run_0.8s_infinite_alternate]">
          <img 
            src={WOLF_ICONS[data.id - 1]} 
            alt={data.name}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain drop-shadow-[0_0_10px_rgba(255,140,0,0.8)] group-hover:scale-110 transition-transform"
          />
        </div>
      </div>

      {/* Nhãn thông tin */}
      <div className="ml-1 sm:ml-1.5 whitespace-nowrap bg-black/80 backdrop-blur-md border border-orange-500/50 px-1.5 sm:px-2 py-0.5 rounded shadow-xl pointer-events-none scale-75 sm:scale-90 md:scale-100 origin-left">
        <span className="text-white font-oswald text-[9px] sm:text-[10px] md:text-[11px] lg:text-[13px] font-bold tracking-tight italic">
          {data.name} - {data.percent}%
        </span>
      </div>

      <style>{`
        @keyframes wolf-run {
          0% { transform: translateY(0) scaleX(1); }
          100% { transform: translateY(-3px) scaleX(1.02); }
        }
      `}</style>
    </div>
  );
};

export default WolfRaceItem;