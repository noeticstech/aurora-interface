import { Moon, Mail, Github, Linkedin, Twitter, Atom, Server, FileCode2, Terminal, Box, Layers, Binary, Zap } from 'lucide-react';
import Aurora from './Aurora';
import CertificateCarousel from './CertificateCarousel';
import LogoLoop from './LogoLoop';
import MagicBento from './MagicBento';
import Dock from './Dock';
import ClickSpark from './ClickSpark';
import AnimatedContent from './AnimatedContent';

const projects = [
  { color: '#060010', title: "Void Engine", description: "Real-time rendering system built in silence", label: "Engine" },
  { color: '#060010', title: "Shadow Protocol", description: "Distributed architecture for the invisible", label: "Architecture" },
  { color: '#060010', title: "Eclipse Framework", description: "Minimal core. Maximum precision", label: "Framework" },
  { color: '#060010', title: "Silent Compiler", description: "Code that speaks through absence", label: "Compiler" },
  { color: '#060010', title: "Phantom Cache", description: "Memory optimization at the edge", label: "Performance" },
  { color: '#060010', title: "Night Vision", description: "Analytics that see in the dark", label: "Analytics" }
];

const skills = [
  { name: "React", node: <Atom className="w-6 h-6 text-foreground/80" strokeWidth={1.5} /> },
  { name: "Node.js", node: <Server className="w-6 h-6 text-foreground/80" strokeWidth={1.5} /> },
  { name: "TypeScript", node: <FileCode2 className="w-6 h-6 text-foreground/80" strokeWidth={1.5} /> },
  { name: "Python", node: <Terminal className="w-6 h-6 text-foreground/80" strokeWidth={1.5} /> },
  { name: "WebGL", node: <Box className="w-6 h-6 text-foreground/80" strokeWidth={1.5} /> },
  { name: "System Design", node: <Layers className="w-6 h-6 text-foreground/80" strokeWidth={1.5} /> },
  { name: "Algorithm", node: <Binary className="w-6 h-6 text-foreground/80" strokeWidth={1.5} /> },
  { name: "Performance", node: <Zap className="w-6 h-6 text-foreground/80" strokeWidth={1.5} /> },
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
                VAIBHAV SINGH KUSHWAHA
              </h2>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <div className="w-2 h-px bg-border" />
                <span className="tracking-wider">CREATIVE ENGINEER</span>
              </div>
            </div>
            <Moon className="w-6 h-6 text-muted-foreground opacity-40" strokeWidth={1} />
          </div>
          
          <AnimatedContent
            direction="horizontal"
            distance={150}
            reverse={false}
            duration={1.8}
            delay={0.8}
            ease="power2.out"
            className="mt-8"
          >
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Crafting digital experiences at the intersection of design and technology. 
              I transform complex problems into elegant, minimal solutions.
            </p>
          </AnimatedContent>
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
          
          <ClickSpark
            sparkColor="rgba(132, 0, 255, 1)"
            sparkSize={12}
            sparkRadius={25}
            sparkCount={10}
            duration={500}
          >
            <div className="flex flex-col items-center gap-6 py-8">
              <Dock
                items={[
                  {
                    icon: <Twitter className="w-6 h-6" strokeWidth={1.5} />,
                    label: "X / Twitter",
                    onClick: () => window.open('https://x.com/noeticstech', '_blank')
                  },
                  {
                    icon: <Linkedin className="w-6 h-6" strokeWidth={1.5} />,
                    label: "LinkedIn",
                    onClick: () => window.open('https://www.linkedin.com/in/vaibhav-singh-kushwaha-1941813a1/', '_blank')
                  },
                  {
                    icon: <Github className="w-6 h-6" strokeWidth={1.5} />,
                    label: "GitHub",
                    onClick: () => window.open('https://github.com/noeticstech', '_blank')
                  },
                  {
                    icon: <Mail className="w-6 h-6" strokeWidth={1.5} />,
                    label: "Email",
                    onClick: () => window.location.href = 'mailto:realvaibhav2005@gmail.com'
                  }
                ]}
                magnification={70}
                distance={150}
                baseItemSize={50}
              />
              
              <p className="text-muted-foreground text-center max-w-md">
                Ready to forge something extraordinary? Reach out through any channel.
              </p>
              
              <p className="text-xs text-muted-foreground/60 tracking-wider">
                realvaibhav2005@gmail.com
              </p>
            </div>
          </ClickSpark>
        </section>

      </div>
    </div>
  );
};

export default PortfolioContent;
