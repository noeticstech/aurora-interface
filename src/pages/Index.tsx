import { useState } from 'react';
import IntroScreen from '@/components/IntroScreen';
import EntryScreen from '@/components/EntryScreen';
import PortfolioContent from '@/components/PortfolioContent';
import SplashCursor from '@/components/SplashCursor';

type ViewState = 'intro' | 'entry' | 'portfolio';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('intro');

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
