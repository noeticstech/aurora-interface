import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Play, Pause, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './CardNav.css';

interface NavLink {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

interface CardNavProps {
  logoText?: string;
  items: NavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  onNavigate?: (href: string) => void;
}

const CardNav = ({
  logoText = 'RONIN',
  items,
  className = '',
  ease = 'power3.out',
  menuColor,
  onNavigate
}: CardNavProps) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(50);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundjay.com/ambient/sounds/rain-03.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;
        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        contentEl.offsetHeight;
        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;
        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;
        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current.filter(Boolean), { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });
    tl.to(cardsRef.current.filter(Boolean), { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`}>
        <div className="card-nav-top">
          {/* Music Player Button */}
          <div 
            className="music-player-nav"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <motion.button
              className="music-toggle-btn"
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className="music-icon-wrapper"
                  >
                    <Pause className="music-icon" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className="music-icon-wrapper"
                  >
                    <Play className="music-icon" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            <AnimatePresence>
              {showVolumeSlider && (
                <motion.div
                  className="volume-slider-container"
                  initial={{ opacity: 0, x: -10, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 100 }}
                  exit={{ opacity: 0, x: -10, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Volume2 className="volume-icon" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="volume-slider"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor || 'hsl(var(--foreground))' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>
          <div className="logo-container">
            <span className="logo-text">{logoText}</span>
          </div>
          <button
            type="button"
            className="card-nav-cta-button"
            onClick={() => onNavigate?.('#contact')}
          >
            Get Started
          </button>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={(e) => handleLinkClick(e, lnk.href)}
                  >
                    <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
