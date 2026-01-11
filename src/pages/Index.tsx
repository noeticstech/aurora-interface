import { useState } from 'react';
import EntryScreen from '@/components/EntryScreen';
import PortfolioContent from '@/components/PortfolioContent';
import SplashCursor from '@/components/SplashCursor';

const Index = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-background overflow-x-hidden overflow-y-auto">
      {/* Fluid cursor effect */}
      <SplashCursor />

      {/* Entry Screen */}
      {!showPortfolio && (
        <EntryScreen onEnterPortfolio={() => setShowPortfolio(true)} />
      )}

      {/* Main Portfolio Content */}
      {showPortfolio && <PortfolioContent />}
    </div>
  );
};

export default Index;
