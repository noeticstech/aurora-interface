import CardNav from './CardNav';
import TextType from './TextType';
import TiltedCard from './TiltedCard';
import { ArrowRight, Eye } from 'lucide-react';
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

  return (
    <div className="entry-screen">
      {/* Background */}
      <div className="entry-background" />
      
      {/* Navigation */}
      <CardNav
        logoText="RONIN"
        items={navItems}
        onNavigate={handleNavigate}
      />
      
      {/* Main Content */}
      <div className="entry-main-content">
        {/* Left: Introduction Section */}
        <div className="intro-section">
          <span className="intro-greeting">Welcome, I am</span>
          <h1 className="intro-name">Shivam Yadav</h1>
          
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
              onClick={onEnterPortfolio}
            >
              Explore
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        
        {/* Right: Card Section */}
        <div className="card-section">
          <TiltedCard
            imageSrc="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80"
            altText="Developer workspace"
            captionText="Shivam Yadav"
            containerHeight="350px"
            containerWidth="100%"
            imageHeight="350px"
            imageWidth="300px"
            scaleOnHover={1.08}
            rotateAmplitude={12}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <div className="flex flex-col gap-2">
                <span className="text-sm font-display text-primary">Developer</span>
                <span className="text-lg font-display text-foreground">Creating Digital Art</span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;
