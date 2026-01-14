import { useRef, useEffect, useState } from 'react';
import { Moon } from 'lucide-react';
import { SiReact, SiNodedotjs, SiTypescript, SiPython, SiThreedotjs, SiDocker, SiGit, SiTailwindcss } from 'react-icons/si';
import Aurora from './Aurora';
import CertificationShowcase from './CertificationShowcase';
import ScrollVelocity from './ScrollVelocity';
import MagicBento from './MagicBento';
import ContactSection from './ContactSection';
import BlogSection from './BlogSection';
import AnimatedContent from './AnimatedContent';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioBgMountain from '@/assets/portfolio-bg-mountain.png';
import cutoutSamurai from '@/assets/cutout-samurai.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { color: '#060010', title: "Void Engine", description: "Real-time rendering system built in silence", label: "Engine" },
  { color: '#060010', title: "Shadow Protocol", description: "Distributed architecture for the invisible", label: "Architecture" },
  { color: '#060010', title: "Eclipse Framework", description: "Minimal core. Maximum precision", label: "Framework" },
  { color: '#060010', title: "Silent Compiler", description: "Code that speaks through absence", label: "Compiler" },
  { color: '#060010', title: "Phantom Cache", description: "Memory optimization at the edge", label: "Performance" },
  { color: '#060010', title: "Night Vision", description: "Analytics that see in the dark", label: "Analytics" }
];

const skillsRow1 = [
  <span key="react" className="inline-flex items-center gap-3"><SiReact className="w-10 h-10 text-[#61DAFB]" /><span className="text-foreground/80 text-xl font-medium">React</span></span>,
  <span key="node" className="inline-flex items-center gap-3"><SiNodedotjs className="w-10 h-10 text-[#339933]" /><span className="text-foreground/80 text-xl font-medium">Node.js</span></span>,
  <span key="ts" className="inline-flex items-center gap-3"><SiTypescript className="w-10 h-10 text-[#3178C6]" /><span className="text-foreground/80 text-xl font-medium">TypeScript</span></span>,
  <span key="python" className="inline-flex items-center gap-3"><SiPython className="w-10 h-10 text-[#3776AB]" /><span className="text-foreground/80 text-xl font-medium">Python</span></span>,
];

const skillsRow2 = [
  <span key="three" className="inline-flex items-center gap-3"><SiThreedotjs className="w-10 h-10 text-foreground" /><span className="text-foreground/80 text-xl font-medium">Three.js</span></span>,
  <span key="docker" className="inline-flex items-center gap-3"><SiDocker className="w-10 h-10 text-[#2496ED]" /><span className="text-foreground/80 text-xl font-medium">Docker</span></span>,
  <span key="git" className="inline-flex items-center gap-3"><SiGit className="w-10 h-10 text-[#F05032]" /><span className="text-foreground/80 text-xl font-medium">Git</span></span>,
  <span key="tailwind" className="inline-flex items-center gap-3"><SiTailwindcss className="w-10 h-10 text-[#06B6D4]" /><span className="text-foreground/80 text-xl font-medium">Tailwind</span></span>,
];

const PortfolioContent = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const cutoutRef = useRef<HTMLDivElement>(null);
  const [cutoutProgress, setCutoutProgress] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Handle scroll for cutout reveal
    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const windowHeight = window.innerHeight;
      // Progress from 0 to 1 over the first screen height
      const progress = Math.min(1, Math.max(0, scrollTop / windowHeight));
      setCutoutProgress(progress);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    const sections = sectionsRef.current;
    
    sections.forEach((section) => {
      if (!section) return;
      
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 100,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            scroller: scrollRef.current,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div ref={scrollRef} className="absolute inset-0 z-10 opacity-0 animate-fade-in overflow-y-auto scroll-smooth">
      {/* Fixed Mountain Background - stays static while content scrolls */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${portfolioBgMountain})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Aurora Background Layer */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <Aurora 
          colorStops={['#3d3d5c', '#52525b', '#3d3d5c']}
          amplitude={0.6}
          blend={0.35}
          speed={0.25}
        />
      </div>

      {/* Dark overlay to maintain mood */}
      <div className="fixed inset-0 bg-background/70 pointer-events-none" />

      {/* Cutout Overlay - reveals as you scroll */}
      <div 
        ref={cutoutRef}
        className="fixed inset-0 pointer-events-none transition-opacity duration-100"
        style={{
          opacity: cutoutProgress,
          zIndex: 5
        }}
      >
        <img 
          src={cutoutSamurai} 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        
        {/* Introduction Header - Full Screen */}
        <header className="min-h-screen flex flex-col justify-center pb-32 pt-8 relative">

          <div className="relative z-10 flex items-center justify-between mb-12">
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
          >
            <p className="relative z-10 text-muted-foreground text-lg leading-relaxed max-w-xl">
              Crafting digital experiences at the intersection of design and technology. 
              I transform complex problems into elegant, minimal solutions.
            </p>
          </AnimatedContent>
        </header>

        {/* Selected Works - Full Screen */}
        <section ref={addToRefs} className="min-h-screen flex flex-col justify-center py-24">
          <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-16 flex items-center gap-4">
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

        {/* Arsenal Section - Full Screen */}
        <section ref={addToRefs} className="min-h-screen flex flex-col justify-center py-24">
          <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-16 flex items-center gap-4">
            <span>Arsenal</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </h3>
          
          <div className="relative overflow-hidden py-12">
            <ScrollVelocity
              scrollContainerRef={scrollRef}
              rows={[skillsRow1, skillsRow2]}
              velocity={40}
              numCopies={4}
              velocityMapping={{ input: [0, 600], output: [0, 14] }}
              className="inline-flex items-center"
            />
          </div>
        </section>

        {/* Blog Section - Full Screen */}
        <section ref={addToRefs} className="py-24">
          <BlogSection scrollContainerRef={scrollRef} />
        </section>

        {/* Certifications - Full Screen */}
        <section ref={addToRefs} className="min-h-screen flex flex-col justify-center py-24">
          <CertificationShowcase />
        </section>

        {/* Code Section - Full Screen */}
        <section ref={addToRefs} className="min-h-screen flex flex-col justify-center py-24">
          <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-16 flex items-center gap-4">
            <span>Code</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </h3>
          
          <div className="max-w-2xl space-y-8 text-muted-foreground leading-loose text-xl">
            <p>I build systems that exist in the margins between visible and invisible.</p>
            <p>Every line of code is a deliberate strike. Every interface, a blade forged in restraint.</p>
            <p>I do not optimize for attention. I engineer for precision, silence, and endurance.</p>
          </div>
        </section>

        {/* Contact Section - Full Screen */}
        <section ref={addToRefs} className="min-h-screen flex flex-col justify-center py-24">
          <ContactSection />
        </section>

      </div>
    </div>
  );
};

export default PortfolioContent;
