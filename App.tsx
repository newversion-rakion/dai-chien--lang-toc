import React, { useState, useEffect, useCallback, useRef } from 'react';
import { WolfData } from './types';
import { fetchSheetData } from './services/googleSheet';
import { BG_IMAGE, REFRESH_INTERVAL, LANE_TOP_POSITIONS } from './constants';
import WolfRaceItem from './components/WolfRaceItem';
import InfoPanel from './components/InfoPanel';
import Leaderboard from './components/Leaderboard';
import { RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [wolves, setWolves] = useState<WolfData[]>([]);
  const [selectedWolf, setSelectedWolf] = useState<WolfData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [fireworks, setFireworks] = useState<{ id: number; left: string; top: string; color: string }[]>([]);
  const fireworkIdCounter = useRef(0);

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    const data = await fetchSheetData(wolves);
    setWolves(data);
    setLastUpdate(new Date());
    setTimeout(() => setIsRefreshing(false), 800);
  }, [wolves]);

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, [loadData]);

  const handleMilestone = useCallback((percent: number) => {
    const colors = ['#f97316', '#eab308', '#ef4444', '#ffffff'];
    const idBase = ++fireworkIdCounter.current * 10;
    const newFireworks = Array.from({ length: 8 }).map((_, i) => ({
      id: idBase + i,
      left: `${20 + Math.random() * 60}%`,
      top: `${15 + Math.random() * 40}%`,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setFireworks(prev => [...prev, ...newFireworks]);
    setTimeout(() => {
      setFireworks(prev => prev.filter(f => !newFireworks.some(nf => nf.id === f.id)));
    }, 2000);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      
      {/* Container 16:9 với Container Query để tự động scale mọi thứ bên trong */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-2 sm:p-4">
        <div className="race-container relative aspect-video w-full h-auto max-h-full max-w-[177.78vh] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden bg-zinc-950 rounded-lg">
            {/* Ảnh Nền */}
            <img 
              src={BG_IMAGE} 
              alt="Race Track" 
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Dashboard Mini - Sử dụng cqw để scale chữ */}
            <div className="absolute top-[4%] right-[4%] z-30 flex flex-col items-end opacity-90">
              <div className="bg-black/70 backdrop-blur-md px-[1.5cqw] py-[0.8cqw] rounded-[1cqw] border border-white/10 flex flex-col items-end shadow-xl">
                <span className="text-[0.8cqw] text-zinc-400 uppercase font-bold tabular-nums">
                  {lastUpdate.toLocaleTimeString()}
                </span>
                <div className="flex items-center space-x-[0.5cqw] mt-[0.2cqw]">
                  <RefreshCcw size="1.2cqw" className={`text-orange-500 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="text-[1cqw] text-zinc-200 uppercase font-black tracking-widest italic">
                    LIVE DATA
                  </span>
                </div>
              </div>
            </div>

            {/* Bảng Xếp Hạng */}
            <Leaderboard 
              wolves={wolves} 
              isOpen={isLeaderboardOpen} 
              onToggle={() => setIsLeaderboardOpen(!isLeaderboardOpen)}
              onSelect={setSelectedWolf}
            />
            
            {/* Làn đua & Icon Sói */}
            {wolves.map((wolf, idx) => (
              <WolfRaceItem 
                key={wolf.id}
                data={wolf} 
                topPos={LANE_TOP_POSITIONS[idx]} 
                onClick={setSelectedWolf}
                onMilestone={handleMilestone}
              />
            ))}

            {/* Pháo hoa Milestones */}
            <div className="absolute inset-0 z-50 pointer-events-none">
              {fireworks.map(fw => (
                <div 
                  key={fw.id}
                  className="absolute"
                  style={{ left: fw.left, top: fw.top }}
                >
                  <div 
                    className="w-[1cqw] h-[1cqw] rounded-full animate-ping"
                    style={{ backgroundColor: fw.color, boxShadow: `0 0 1.5cqw ${fw.color}` }}
                  />
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Info Panel Overlay */}
      <InfoPanel 
        wolf={selectedWolf} 
        onClose={() => setSelectedWolf(null)} 
      />
    </div>
  );
};

export default App;