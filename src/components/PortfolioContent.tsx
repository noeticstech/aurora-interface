import { Moon, Mail, Github, Linkedin } from 'lucide-react';
import Aurora from './Aurora';
import CertificateCarousel from './CertificateCarousel';
import LogoLoop from './LogoLoop';
import MagicBento from './MagicBento';

const projects = [
  { color: '#060010', title: "Void Engine", description: "Real-time rendering system built in silence", label: "Engine" },
  { color: '#060010', title: "Shadow Protocol", description: "Distributed architecture for the invisible", label: "Architecture" },
  { color: '#060010', title: "Eclipse Framework", description: "Minimal core. Maximum precision", label: "Framework" },
  { color: '#060010', title: "Silent Compiler", description: "Code that speaks through absence", label: "Compiler" },
  { color: '#060010', title: "Phantom Cache", description: "Memory optimization at the edge", label: "Performance" },
  { color: '#060010', title: "Night Vision", description: "Analytics that see in the dark", label: "Analytics" }
];

const skills = [
  { name: "React", node: <span className="text-foreground/80 font-medium tracking-wide">React</span> },
  { name: "Node.js", node: <span className="text-foreground/80 font-medium tracking-wide">Node.js</span> },
  { name: "TypeScript", node: <span className="text-foreground/80 font-medium tracking-wide">TypeScript</span> },
  { name: "Python", node: <span className="text-foreground/80 font-medium tracking-wide">Python</span> },
  { name: "WebGL", node: <span className="text-foreground/80 font-medium tracking-wide">WebGL</span> },
  { name: "System Design", node: <span className="text-foreground/80 font-medium tracking-wide">System Design</span> },
  { name: "Algorithm", node: <span className="text-foreground/80 font-medium tracking-wide">Algorithm</span> },
  { name: "Performance", node: <span className="text-foreground/80 font-medium tracking-wide">Performance</span> },
];

const PortfolioContent = () => {
  return (
    <div className="absolute inset-0 z-10 opacity-0 animate-fade-in">
      {/* Aurora Background Layer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Aurora 
          colorStops={['#3d3d5c', '#52525b', '#3d3d5c']}
          amplitude={0.6}
          blend={0.35}
          speed={0.25}
        />
      </div>

      {/* Dark overlay to maintain mood */}
      <div className="absolute inset-0 bg-background/40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 h-full overflow-y-auto">
        
        <header className="mb-24 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display text-foreground mb-2">
                KAITO YAMAMOTO
              </h2>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <div className="w-2 h-px bg-border" />
                <span className="tracking-wider">CREATIVE ENGINEER</span>
              </div>
            </div>
            <Moon className="w-6 h-6 text-muted-foreground opacity-40" strokeWidth={1} />
          </div>
        </header>

        <section className="mb-32">
          <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-12 flex items-center gap-4">
            <span>Selected Works</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </h3>
          
          <MagicBento 
            cardData={projects}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableStars={true}
            enableMagnetism={true}
            clickEffect={true}
            glowColor="132, 0, 255"
          />
        </section>

        <section className="mb-32">
          <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-12 flex items-center gap-4">
            <span>Certifications</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </h3>
          
          <div className="flex justify-center">
            <CertificateCarousel 
              baseWidth={320}
              autoplay={true}
              autoplayDelay={4000}
              pauseOnHover={true}
              loop={true}
            />
          </div>
        </section>

        <section className="mb-32">
          <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-12 flex items-center gap-4">
            <span>Arsenal</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </h3>
          
          <div className="relative overflow-hidden py-4">
            <LogoLoop
              logos={skills.map(s => ({ node: s.node }))}
              speed={60}
              direction="left"
              logoHeight={24}
              gap={48}
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="hsl(var(--background))"
              ariaLabel="Skills"
            />
          </div>
        </section>

        <section className="mb-32">
          <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-12 flex items-center gap-4">
            <span>Code</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </h3>
          
          <div className="max-w-2xl space-y-6 text-muted-foreground leading-loose">
            <p>I build systems that exist in the margins between visible and invisible.</p>
            <p>Every line of code is a deliberate strike. Every interface, a blade forged in restraint.</p>
            <p>I do not optimize for attention. I engineer for precision, silence, and endurance.</p>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-12 flex items-center gap-4">
            <span>Contact</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </h3>
          
          <div className="flex items-center gap-8">
            <a href="mailto:kaito@example.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground/80 transition-colors duration-300 group">
              <Mail className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm border-b border-transparent group-hover:border-border transition-colors">
                kaito@example.com
              </span>
            </a>
            
            <a href="#" className="text-muted-foreground hover:text-foreground/70 transition-colors duration-300">
              <Github className="w-5 h-5" strokeWidth={1.5} />
            </a>
            
            <a href="#" className="text-muted-foreground hover:text-foreground/70 transition-colors duration-300">
              <Linkedin className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PortfolioContent;
