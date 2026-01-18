import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import introBackgroundVideo from '@/assets/intro-background.mp4';
import './IntroScreen.css';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const fullText = "𝓘𝓷 𝓽𝓱𝓮 𝓢𝓮𝓪𝓻𝓬𝓱 𝓯𝓸𝓻 𝓟𝓮𝓪𝓬𝓮, 𝓘 𝓕𝓸𝓾𝓷𝓭 𝓟𝓻𝓸𝓰𝓻𝓪𝓶𝓶𝓲𝓷𝓰.";
  const typingSpeed = 90;

  // Aggressively start loading/playing the intro video ASAP.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    try {
      v.preload = 'auto';
      v.load();
      // Autoplay should work because it's muted, but we still guard it.
      void v.play();
    } catch {
      // ignore
    }
  }, []);
  
  // Cursor blink animation
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, []);
  
  // Typing animation
  useEffect(() => {
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsComplete(true);
      }
    }, typingSpeed);
    
    return () => clearInterval(typeInterval);
  }, []);
  
  // Auto-transition after typing completes
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: onComplete
          });
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isComplete, onComplete]);
  
  const handleSkip = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: onComplete
      });
    }
  };

  return (
    <div ref={containerRef} className="intro-screen" onClick={handleSkip}>
      {/* Video Background */}
      <div className="intro-video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="intro-video"
          src={introBackgroundVideo}
        />
        <div className="intro-video-overlay" />
      </div>
      
      {/* Typing Text */}
      <div className="intro-text-container">
        <h1 className="intro-text">
          <span className="intro-text-content">{displayedText}</span>
          <span ref={cursorRef} className="intro-cursor">|</span>
        </h1>
      </div>
      
      {/* Skip hint */}
      <div className="intro-skip-hint">
        Click anywhere to skip
      </div>
    </div>
  );
};

export default IntroScreen;
