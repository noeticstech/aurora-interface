import CardNav from './CardNav';
import TextType from './TextType';
import TiltedCard from './TiltedCard';
import { Download, Eye } from 'lucide-react';
import './EntryScreen.css';

interface EntryScreenProps {
  onEnterPortfolio: () => void;
}

const navItems = [
  {
    label: 'About',
    bgColor: 'hsl(var(--accent))',
    textColor: 'hsl(var(--accent-foreground))',
    links: [
      { label: 'My Story', href: '#about', ariaLabel: 'Learn about me' },
      { label: 'Experience', href: '#experience', ariaLabel: 'View experience' }
    ]
  },
  {
    label: 'Projects',
    bgColor: 'hsl(var(--primary))',
    textColor: 'hsl(var(--primary-foreground))',
    links: [
      { label: 'Selected Works', href: '#works', ariaLabel: 'View selected works' },
      { label: 'All Projects', href: '#projects', ariaLabel: 'View all projects' }
    ]
  },
  {
    label: 'Contact',
    bgColor: 'hsl(var(--secondary))',
    textColor: 'hsl(var(--secondary-foreground))',
    links: [
      { label: 'Get in Touch', href: '#contact', ariaLabel: 'Contact me' },
      { label: 'Social Links', href: '#social', ariaLabel: 'View social links' }
    ]
  }
];

const typingTexts = [
  'Full Stack Developer',
  'UI/UX Designer',
  'Problem Solver',
  'Creative Coder'
];

const EntryScreen = ({ onEnterPortfolio }: EntryScreenProps) => {
  const handleNavigate = (href: string) => {
    if (href === '#contact' || href === '#works' || href === '#projects') {
      onEnterPortfolio();
    }
  };

  const handleDownloadCV = () => {
    // TODO: Add actual CV download link
    window.open('/cv.pdf', '_blank');
  };

  return (
    <div className="entry-screen">
      {/* Background with TiltedCard */}
      <div className="entry-background">
        <div className="entry-background-card">
          <TiltedCard
            imageSrc="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1920&q=80"
            altText="Developer workspace"
            captionText=""
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            scaleOnHover={1.02}
            rotateAmplitude={3}
            showTooltip={false}
            showMobileWarning={false}
            displayOverlayContent={false}
          />
        </div>
        <div className="entry-background-overlay" />
      </div>
      
      {/* Navigation */}
      <CardNav
        logoText="RONIN"
        items={navItems}
        onNavigate={handleNavigate}
      />
      
      {/* Main Content - Centered Introduction */}
      <div className="entry-main-content">
        <div className="intro-section">
          <span className="intro-greeting">Welcome, I am</span>
          <h1 className="intro-name">Vaibhav Singh Kushwaha</h1>
          
          <div className="intro-title-wrapper">
            <TextType
              text={typingTexts}
              className="intro-title"
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2500}
              loop={true}
              showCursor={true}
              cursorCharacter="_"
            />
          </div>
          
          <p className="intro-description">
            Crafting digital experiences with precision and artistry. 
            I blend code and creativity to build solutions that make an impact.
          </p>
          
          <div className="intro-cta">
            <button 
              className="intro-cta-button intro-cta-button--primary"
              onClick={onEnterPortfolio}
            >
              <Eye size={18} />
              View Portfolio
            </button>
            <button 
              className="intro-cta-button intro-cta-button--secondary"
              onClick={handleDownloadCV}
            >
              <Download size={18} />
              Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;
