import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CodeSectionProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

const CodeSection = ({ scrollContainerRef }: CodeSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scroller = scrollContainerRef?.current || window;

      // Eyebrow animation
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current.querySelector('.eyebrow-line'),
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: eyebrowRef.current,
              scroller,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        gsap.fromTo(
          eyebrowRef.current.querySelector('.eyebrow-text'),
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: eyebrowRef.current,
              scroller,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Text paragraphs staggered animation
      textRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: index * 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ref,
                scroller,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollContainerRef]);

  const setTextRef = (index: number) => (el: HTMLParagraphElement | null) => {
    textRefs.current[index] = el;
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/30 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/30 blur-[80px]" />
      <div className="absolute top-40 left-20 w-20 h-20 rounded-full bg-[hsl(280_60%_55%/0.4)] blur-[60px]" />
      <div className="absolute bottom-40 right-20 w-16 h-16 rounded-full bg-primary/20 blur-[40px]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-12 py-20">
        {/* CODE Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-4 mb-16">
          <span className="eyebrow-text text-xs tracking-[0.3em] uppercase text-primary font-semibold">
            Code
          </span>
          <div className="eyebrow-line flex-1 h-px bg-primary/60 max-w-md" />
        </div>

        {/* Philosophical Text */}
        <div className="space-y-10">
          <p 
            ref={setTextRef(0)}
            className="text-xl md:text-2xl lg:text-3xl font-light text-foreground/90 leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            I build systems that exist in the margins between visible and invisible.
          </p>

          <p 
            ref={setTextRef(1)}
            className="text-xl md:text-2xl lg:text-3xl font-light text-foreground/90 leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Every line of code is a deliberate strike. Every interface, a blade forged in restraint.
          </p>

          <p 
            ref={setTextRef(2)}
            className="text-xl md:text-2xl lg:text-3xl font-light text-foreground/90 leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            I do not optimize for attention. I engineer for precision, silence, and endurance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CodeSection;
