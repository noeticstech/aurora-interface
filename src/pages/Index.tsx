import { useState } from 'react';
import HolographicCard from '@/components/HolographicCard';
import PortfolioContent from '@/components/PortfolioContent';

const Index = () => {
  const [isSlashed, setIsSlashed] = useState(false);

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        </div>
        <div 
          className="absolute inset-0 opacity-[0.015] bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px'
          }}
        />
      </div>

      {/* Entry Screen with Holographic Card */}
      {!isSlashed && (
        <HolographicCard onSlashComplete={() => setIsSlashed(true)} />
      )}

      {/* Main Interface with Aurora Background */}
      {isSlashed && <PortfolioContent />}
    </div>
  );
};

export default Index;
