import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import ElasticSlider from './ElasticSlider';
import { RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri';

interface HeaderMusicPlayerProps {
  audioSrc?: string;
}

const HeaderMusicPlayer = ({ audioSrc }: HeaderMusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowVolumeSlider(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <div ref={containerRef} className="header-music-player">
      <motion.button
        className="music-toggle-btn"
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="music-btn-content"
            >
              <Pause className="music-icon" />
              <span className="music-label">Playing</span>
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="music-btn-content"
            >
              <Play className="music-icon" />
              <span className="music-label">Play Music</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.button
        className="volume-toggle-btn"
        onClick={() => setShowVolumeSlider(!showVolumeSlider)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {volume === 0 ? (
          <VolumeX className="volume-icon" />
        ) : (
          <Volume2 className="volume-icon" />
        )}
      </motion.button>

      <AnimatePresence>
        {showVolumeSlider && (
          <motion.div
            className="volume-slider-popup"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ElasticSlider
              defaultValue={volume}
              onChange={setVolume}
              leftIcon={<RiVolumeDownFill className="slider-icon text-primary" />}
              rightIcon={<RiVolumeUpFill className="slider-icon text-primary" />}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderMusicPlayer;
