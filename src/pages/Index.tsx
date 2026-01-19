import { useEffect, useState } from 'react';
import IntroScreen from '@/components/IntroScreen';
import EntryScreen from '@/components/EntryScreen';
import PortfolioContent from '@/components/PortfolioContent';
import SplashCursor from '@/components/SplashCursor';
import heroBackgroundVideo from '@/assets/hero-background.mp4';
import cardBackgroundVideo from '@/assets/card-background.mp4';

type ViewState = 'intro' | 'entry' | 'portfolio';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('intro');

  // Preload the heavy entry videos as early as possible (during intro),
  // and keep the warmup requests alive across view transitions.
  useEffect(() => {
    const urls = [heroBackgroundVideo, cardBackgroundVideo];

    const links: HTMLLinkElement[] = [];
    const warmupVideos: HTMLVideoElement[] = [];

    const start = () => {
      urls.forEach((href) => {
        // Hint the browser early.
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = href;
        link.type = 'video/mp4';
        (link as any).fetchPriority = 'high';
        document.head.appendChild(link);
        links.push(link);

        // Force an actual media request that continues even after we change views.
        const v = document.createElement('video');
        v.src = href;
        v.preload = 'auto';
        v.muted = true;
        v.playsInline = true;
        v.setAttribute('aria-hidden', 'true');
        v.style.position = 'absolute';
        v.style.width = '0px';
        v.style.height = '0px';
        v.style.opacity = '0';
        document.body.appendChild(v);

        const onReady = () => {
          // Once we have enough buffered data, we can remove the element.
          // The browser cache will still help when the real video mounts.
          v.remove();
        };

        v.addEventListener('loadeddata', onReady, { once: true });
        v.load();
        warmupVideos.push(v);
      });
    };

    // Let the intro render first, then warm up the heavier videos.
    const t = window.setTimeout(start, 0);

    return () => {
      window.clearTimeout(t);
      links.forEach((l) => l.remove());
      warmupVideos.forEach((v) => v.remove());
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Fluid cursor effect */}
      <SplashCursor />

      {/* Intro Screen - appears first */}
      {currentView === 'intro' && (
        <IntroScreen onComplete={() => setCurrentView('entry')} />
      )}

      {/* Entry Screen */}
      {currentView === 'entry' && (
        <EntryScreen onEnterPortfolio={() => setCurrentView('portfolio')} />
      )}

      {/* Main Portfolio Content */}
      {currentView === 'portfolio' && <PortfolioContent />}
    </div>
  );
};

export default Index;
