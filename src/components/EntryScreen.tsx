import CardNav from './CardNav';
import TextType from './TextType';
import TiltedCard from './TiltedCard';
import { Download, Eye } from 'lucide-react';
import './EntryScreen.css';
import heroBackgroundVideo from '@/assets/hero-background.mp4';
import cardBackgroundVideo from '@/assets/card-background.mp4';
import characterFace from '@/assets/character-face.png';

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
      {/* Video Background */}
      <div className="entry-background">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="entry-background-video"
          src={heroBackgroundVideo}
        />
        <div className="entry-background-overlay" />
      </div>
      
      {/* Navigation */}
      <CardNav
        logoText="𝙽𝚘𝚎𝚝𝚒𝚌𝚜𝚃𝚎𝚌𝚑"
        items={navItems}
        onNavigate={handleNavigate}
      />
      
      {/* Main Content - Two Column Layout */}
      <div className="entry-main-content">
        {/* Left Side - Introduction */}
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
        
        {/* Right Side - Floating Card */}
        <div className="floating-card-section">
          <TiltedCard
            videoSrc={cardBackgroundVideo}
            characterSrc={characterFace}
            altText="Developer character"
            captionText="Creative Developer"
            containerHeight="450px"
            containerWidth="320px"
            imageHeight="450px"
            imageWidth="320px"
            scaleOnHover={1.05}
            rotateAmplitude={12}
            showTooltip={true}
            showMobileWarning={false}
            displayOverlayContent={false}
          />
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;
