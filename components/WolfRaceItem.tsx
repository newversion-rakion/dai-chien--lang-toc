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
  
  const positionPercent = Math.min(Math.max(0, data.percent), 100);
  const leftPosition = TRACK_START_PERCENT + (positionPercent / 100) * trackRange;

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
      {/* Icon Sói - Kích thước tính theo cqw */}
      <div className="relative">
        {isAdvancing && (
            <div className="absolute inset-0 bg-orange-500/40 blur-[2cqw] rounded-full animate-pulse" />
        )}
        
        <div className="relative animate-[wolf-run_0.8s_infinite_alternate]">
          <img 
            src={WOLF_ICONS[data.id - 1]} 
            alt={data.name}
            style={{ width: '4.5cqw', height: '4.5cqw' }}
            className="object-contain drop-shadow-[0_0_1cqw_rgba(255,140,0,0.8)] group-hover:scale-110 transition-transform"
          />
        </div>
      </div>

      {/* Nhãn thông tin - Tỉ lệ chữ chuẩn desktop */}
      <div 
        className="ml-[0.5cqw] whitespace-nowrap bg-black/80 backdrop-blur-md border border-orange-500/50 px-[1cqw] py-[0.3cqw] rounded-[0.4cqw] shadow-xl pointer-events-none"
      >
        <span className="text-white font-oswald text-[1.1cqw] font-bold tracking-tight italic">
          {data.name} - {data.percent}%
        </span>
      </div>
    </div>
  );
};

export default WolfRaceItem;