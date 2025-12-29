import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

interface HolographicCardProps {
  onSlashComplete: () => void;
}

const HolographicCard = ({ onSlashComplete }: HolographicCardProps) => {
  const [showSlash, setShowSlash] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundjay.com/ambient/sounds/rain-03.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    // Ignore clicks on the music button
    if ((e.target as HTMLElement).closest('.music-btn')) return;
    
    setShowSlash(true);
    setTimeout(() => {
      onSlashComplete();
    }, 180);
  };

  const toggleMusic = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.log('Audio playback failed:', error);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div 
        onClick={handleCardClick}
        className="relative cursor-pointer pc-card-wrapper"
        style={{ 
          perspective: '500px',
          animation: showSlash ? 'none' : 'float 6s ease-in-out infinite'
        }}
      >
        <div className="pc-behind" />
        
        <ElectricBorder 
          color="#7c3aed" 
          speed={1.2} 
          chaos={0.8} 
          thickness={2}
          style={{ borderRadius: '30px' }}
        >
          <div className="pc-card-shell">
            <section className="pc-card">
              <div className="pc-inside">
                <div className="pc-shine" />
                <div className="pc-glare" />
                
                <div className="pc-content pc-avatar-content">
                  <img 
                    className="avatar" 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" 
                    alt="Kaito Yamamoto" 
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
                
                <div className="pc-content" style={{ pointerEvents: 'none' }}>
                  <div className="pc-details">
                    <h3>VAIBHAV SINGH KUSHWAHA</h3>
                    <p>Creative Engineer</p>
                  </div>
                </div>

                {/* Music Button at Bottom */}
                <div 
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
                  style={{ pointerEvents: 'auto' }}
                >
                  <button
                    onClick={toggleMusic}
                    className="music-btn w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white/80 group-hover:text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white/80 group-hover:text-white ml-0.5" />
                    )}
                  </button>
                </div>
              </div>

              {showSlash && (
                <>
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div 
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-foreground to-transparent opacity-90"
                      style={{
                        width: '2px',
                        height: '200%',
                        transform: 'rotate(-25deg) translateX(-100%)',
                        animation: 'slash 180ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
                        boxShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)'
                      }}
                    />
                  </div>
                  
                  <div 
                    className="absolute inset-0 bg-background/90"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)',
                      animation: 'split-left 400ms cubic-bezier(0.4, 0, 0.2, 1) 180ms forwards',
                      borderRadius: '30px'
                    }}
                  />
                  <div 
                    className="absolute inset-0 bg-background/90"
                    style={{
                      clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 0 100%)',
                      animation: 'split-right 400ms cubic-bezier(0.4, 0, 0.2, 1) 180ms forwards',
                      borderRadius: '30px'
                    }}
                  />
                </>
              )}
            </section>
          </div>
        </ElectricBorder>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-background/60 blur-3xl rounded-full" />
      </div>

      <style>{`
        .pc-card-wrapper {
          perspective: 500px;
          transform: translate3d(0, 0, 0.1px);
          position: relative;
          touch-action: none;
          --card-opacity: 1;
          --pointer-x: 50%;
          --pointer-y: 50%;
          --pointer-from-center: 0;
          --pointer-from-top: 0.5;
          --pointer-from-left: 0.5;
          --rotate-x: 0deg;
          --rotate-y: 0deg;
          --background-x: 50%;
          --background-y: 50%;
          --card-radius: 30px;
        }
        
        .pc-behind {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(
            circle at var(--pointer-x) var(--pointer-y),
            rgba(125, 190, 255, 0.67) 0%,
            transparent 25%
          );
          filter: blur(50px) saturate(1.1);
          opacity: calc(0.8 * var(--card-opacity));
          transition: opacity 200ms ease;
        }
        
        .pc-card {
          height: 80svh;
          max-height: 540px;
          display: grid;
          aspect-ratio: 0.718;
          border-radius: var(--card-radius);
          position: relative;
          background-blend-mode: color-dodge, normal, normal, normal;
          box-shadow: rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left) * 10px) - 3px)
            calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px;
          transition: transform 1s ease;
          transform: translateZ(0) rotateX(0deg) rotateY(0deg);
          background: hsl(var(--background) / 0.9);
          backface-visibility: hidden;
          overflow: hidden;
        }
        
        .pc-card-shell {
          position: relative;
          z-index: 1;
        }
        
        .pc-card * {
          display: grid;
          grid-area: 1/-1;
          border-radius: var(--card-radius);
          pointer-events: none;
        }
        
        .pc-inside {
          inset: 0;
          position: absolute;
          background-image: linear-gradient(145deg, #60496e8c 0%, #71C4FF44 100%);
          background-color: hsl(var(--background) / 0.9);
          transform: none;
        }
        
        .pc-shine {
          transform: translate3d(0, 0, 1px);
          overflow: hidden;
          z-index: 3;
          background: transparent;
          background-size: cover;
          background-position: center;
          background-image:
            repeating-linear-gradient(
              0deg,
              #ff9393 calc(5% * 1),
              #ffe45e calc(5% * 2),
              #b3ff5e calc(5% * 3),
              #5effef calc(5% * 4),
              #5e9bff calc(5% * 5),
              #c55eff calc(5% * 6),
              #ff9393 calc(5% * 7)
            ),
            repeating-linear-gradient(
              -45deg,
              #0e152e 0%,
              hsl(180, 10%, 60%) 3.8%,
              hsl(180, 29%, 66%) 4.5%,
              hsl(180, 10%, 60%) 5.2%,
              #0e152e 10%,
              #0e152e 12%
            ),
            radial-gradient(
              farthest-corner circle at var(--pointer-x) var(--pointer-y),
              hsla(0, 0%, 0%, 0.1) 12%,
              hsla(0, 0%, 0%, 0.15) 20%,
              hsla(0, 0%, 0%, 0.25) 120%
            );
          background-position:
            0 var(--background-y),
            var(--background-x) var(--background-y),
            center;
          background-blend-mode: color, hard-light;
          background-size:
            500% 500%,
            300% 300%,
            200% 200%;
          background-repeat: repeat;
          filter: brightness(0.85) contrast(1.5) saturate(0.5);
        }
        
        .pc-glare {
          transform: translate3d(0, 0, 1.1px);
          overflow: hidden;
          background-image: radial-gradient(
            farthest-corner circle at var(--pointer-x) var(--pointer-y),
            hsl(248, 25%, 80%) 12%,
            hsla(207, 40%, 30%, 0.8) 90%
          );
          mix-blend-mode: overlay;
          filter: brightness(0.8) contrast(1.2);
          z-index: 4;
        }
        
        .pc-avatar-content {
          mix-blend-mode: luminosity;
          overflow: visible;
          transform: translateZ(2px);
          backface-visibility: hidden;
        }
        
        .pc-avatar-content .avatar {
          width: 100%;
          position: absolute;
          left: 50%;
          transform-origin: 50% 100%;
          transform: translateX(-50%) translateZ(0);
          bottom: -1px;
          backface-visibility: hidden;
          will-change: transform;
        }
        
        .pc-content:not(.pc-avatar-content) {
          max-height: 100%;
          overflow: hidden;
          text-align: center;
          position: relative;
          transform: translate3d(0, 0, 0.1px);
          z-index: 5;
          mix-blend-mode: luminosity;
        }
        
        .pc-details {
          width: 100%;
          position: absolute;
          top: 3em;
          display: flex;
          flex-direction: column;
        }
        
        .pc-details h3 {
          font-family: 'Cinzel', serif;
          font-weight: 600;
          margin: 0;
          font-size: min(5svh, 3em);
          background-image: linear-gradient(to bottom, #fff, #6f6fbe);
          background-size: 1em 1.5em;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }
        
        .pc-details p {
          font-weight: 600;
          position: relative;
          top: -12px;
          white-space: nowrap;
          font-size: 16px;
          margin: 0 auto;
          width: min-content;
          background-image: linear-gradient(to bottom, #fff, #4a4ac0);
          background-size: 1em 1.5em;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slash {
          0% { transform: rotate(-25deg) translateX(-100%); }
          100% { transform: rotate(-25deg) translateX(200%); }
        }
        
        @keyframes split-left {
          0% { 
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% { 
            transform: translateX(-30%) translateY(20%) rotate(-8deg);
            opacity: 0;
          }
        }
        
        @keyframes split-right {
          0% { 
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% { 
            transform: translateX(30%) translateY(-20%) rotate(8deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HolographicCard;
