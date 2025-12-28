import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';
import ElasticSlider from './ElasticSlider';

interface MusicPlayerProps {
  audioSrc?: string;
}

const MusicPlayer = ({ audioSrc }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a placeholder ambient track
    // You can replace this with your own audio URL
    audioRef.current = new Audio(audioSrc || 'https://www.soundjay.com/ambient/sounds/rain-03.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = async () => {
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
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.div
        className="bg-background/80 backdrop-blur-lg border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
        animate={{ 
          width: isExpanded ? 280 : 56,
          height: isExpanded ? 120 : 56
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="p-3 flex items-center gap-3">
          {/* Play/Pause Button */}
          <motion.button
            onClick={togglePlay}
            onMouseEnter={() => setIsExpanded(true)}
            className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                >
                  <Pause className="w-4 h-4 text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                >
                  <Play className="w-4 h-4 text-primary ml-0.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground tracking-wider">
                    AMBIENT
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Volume Slider */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-3 pb-3"
              onMouseLeave={() => setIsExpanded(false)}
            >
              <ElasticSlider
                defaultValue={volume}
                onChange={setVolume}
                className="w-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MusicPlayer;
