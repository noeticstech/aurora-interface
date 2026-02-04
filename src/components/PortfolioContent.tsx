import { useRef, useEffect } from 'react';
import { Moon } from 'lucide-react';
import { SiReact, SiNodedotjs, SiTypescript, SiPython, SiThreedotjs, SiDocker, SiGit, SiTailwindcss } from 'react-icons/si';
import Aurora from './Aurora';
import CertificationShowcase from './CertificationShowcase';
import ScrollVelocity from './ScrollVelocity';
import MagicBento from './MagicBento';
import ContactSection from './ContactSection';
import BlogSection from './BlogSection';
import AnimatedContent from './AnimatedContent';
import CardNav from './CardNav';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioBgMountain from '@/assets/portfolio-bg-mountain.png';
import cutoutWorks from '@/assets/cutout-works.png';
import cutoutArsenal from '@/assets/cutout-arsenal.png';

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
  const worksCutoutRef = useRef<HTMLDivElement>(null);
  const arsenalCutoutRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);
  const certRef = useRef<HTMLElement>(null);

  useEffect(() => {
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

    // Works cutout slides in from right as we scroll toward Selected Works
    if (worksCutoutRef.current && worksRef.current) {
      // Set initial position off-screen to the right
      gsap.set(worksCutoutRef.current, { xPercent: 100 });

      // Slide in from right (100% to 0%) as we approach works section
      ScrollTrigger.create({
        trigger: worksRef.current,
        scroller: scrollRef.current,
        start: 'top 100%',
        end: 'top 40%',
        scrub: 0.8,
        onUpdate: (self) => {
          if (worksCutoutRef.current) {
            const xPos = (1 - self.progress) * 100;
            gsap.set(worksCutoutRef.current, { xPercent: xPos });
          }
        }
      });
    }

    // Blur out works cutout when reaching Blog section
    if (worksCutoutRef.current && blogRef.current) {
      ScrollTrigger.create({
        trigger: blogRef.current,
        scroller: scrollRef.current,
        start: 'top 100%',
        end: 'top 50%',
        scrub: 1,
        onUpdate: (self) => {
          if (worksCutoutRef.current) {
            const blur = self.progress * 20;
            const opacity = 1 - self.progress;
            gsap.set(worksCutoutRef.current, { 
              filter: `blur(${blur}px)`,
              opacity: opacity
            });
          }
        }
      });
    }

    // Arsenal (horse) cutout slides in from below when entering Blog section
    if (arsenalCutoutRef.current && blogRef.current) {
      // Set initial position off-screen at bottom
      gsap.set(arsenalCutoutRef.current, { yPercent: 100, opacity: 1 });

      // Slide in from bottom (100% to 0%) as we approach blog section
      ScrollTrigger.create({
        trigger: blogRef.current,
        scroller: scrollRef.current,
        start: 'top 100%',
        end: 'top 40%',
        scrub: 0.8,
        onUpdate: (self) => {
          if (arsenalCutoutRef.current) {
            const yPos = (1 - self.progress) * 100;
            gsap.set(arsenalCutoutRef.current, { yPercent: yPos });
          }
        }
      });
    }

    // Blur out arsenal cutout when reaching Certifications section
    if (arsenalCutoutRef.current && certRef.current) {
      ScrollTrigger.create({
        trigger: certRef.current,
        scroller: scrollRef.current,
        start: 'top 100%',
        end: 'top 50%',
        scrub: 1,
        onUpdate: (self) => {
          if (arsenalCutoutRef.current) {
            const blur = self.progress * 20;
            const opacity = 1 - self.progress;
            gsap.set(arsenalCutoutRef.current, { 
              filter: `blur(${blur}px)`,
              opacity: opacity
            });
          }
        }
      });
    }

    return () => {
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
          backgroundPosition: 'center bottom',
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
      <div className="fixed inset-0 bg-background/30 pointer-events-none" />

      {/* Works Cutout - behind Selected Works section, slides in from right */}
      <div 
        ref={worksCutoutRef}
        className="fixed inset-0 pointer-events-none z-[5]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${cutoutWorks})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* Arsenal Cutout - slides in from below when entering Arsenal section */}
      <div 
        ref={arsenalCutoutRef}
        className="fixed inset-0 pointer-events-none z-[5]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${cutoutArsenal})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* Navigation */}
      <CardNav
        logoText="𝙽𝚘𝚎𝚝𝚒𝚌𝚜𝚃𝚎𝚌𝚑"
        items={navItems}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        
        {/* Introduction Header - Full Screen */}
        <header ref={headerRef} className="min-h-screen flex flex-col justify-center pb-32 pt-8 relative">

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

        {/* Selected Works */}
        <section ref={(el) => { addToRefs(el); worksRef.current = el; }} className="flex flex-col py-16">
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
            glowColor="30, 65, 45"
          />
          
          {/* Skills flowing under works */}
          <div className="relative overflow-hidden py-12 mt-16">
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

        {/* Blog Section */}
        <section ref={(el) => { addToRefs(el); blogRef.current = el; }} className="py-12">
          <BlogSection scrollContainerRef={scrollRef} />
        </section>

        {/* Certifications */}
        <section ref={(el) => { addToRefs(el); certRef.current = el; }} className="flex flex-col py-16">
          <CertificationShowcase />
        </section>

        {/* Code Section */}
        <section ref={addToRefs} className="flex flex-col py-16">
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

        {/* Contact Section */}
        <section ref={addToRefs} className="flex flex-col py-16">
          <ContactSection />
        </section>

      </div>
    </div>
  );
};

export default PortfolioContent;
