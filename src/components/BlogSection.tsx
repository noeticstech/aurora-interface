import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Masonry from '@/components/ui/Masonry';
import ScrollReveal from '@/components/ui/ScrollReveal';

import blogDesign from '@/assets/blog-design.jpg';
import blogArchitecture from '@/assets/blog-architecture.jpg';
import blogWorkspace from '@/assets/blog-workspace.jpg';
import blogArt from '@/assets/blog-art.jpg';
import blogTypography from '@/assets/blog-typography.jpg';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: string | number;
  img: string;
  url?: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  height: number;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    img: blogDesign,
    title: 'The Art of Minimalist Design in Digital Products',
    category: 'Design',
    date: 'Dec 28, 2025',
    readTime: '5 min read',
    height: 700,
    url: '#'
  },
  {
    id: 2,
    img: blogArchitecture,
    title: 'How Architecture Influences Digital Interface Design',
    category: 'Inspiration',
    date: 'Dec 15, 2025',
    readTime: '6 min read',
    height: 800,
    url: '#'
  },
  {
    id: 3,
    img: blogArt,
    title: 'The Intersection of Art and Technology',
    category: 'Creative',
    date: 'Dec 5, 2025',
    readTime: '7 min read',
    height: 600,
    url: '#'
  },
  {
    id: 4,
    img: blogWorkspace,
    title: 'Crafting the Perfect Creative Workspace',
    category: 'Lifestyle',
    date: 'Dec 10, 2025',
    readTime: '4 min read',
    height: 500,
    url: '#'
  },
  {
    id: 5,
    img: blogTypography,
    title: 'Typography Trends Shaping 2026 Design',
    category: 'Design',
    date: 'Nov 28, 2025',
    readTime: '5 min read',
    height: 400,
    url: '#'
  }
];

const categories = ['All', 'Design', 'Inspiration', 'Lifestyle', 'Creative'];

interface BlogSectionProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

const BlogSection = ({ scrollContainerRef }: BlogSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const masonryContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scroller = scrollContainerRef?.current || window;

      // Eyebrow line animation
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current.querySelectorAll('.eyebrow-line'),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
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
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
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

      // Subtitle parallax and fade
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: subtitleRef.current,
              scroller,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Category filters staggered animation
      if (filtersRef.current) {
        gsap.fromTo(
          filtersRef.current.querySelectorAll('button'),
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: filtersRef.current,
              scroller,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Masonry container parallax effect
      if (masonryContainerRef.current) {
        gsap.fromTo(
          masonryContainerRef.current,
          { y: 60 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: masonryContainerRef.current,
              scroller,
              start: 'top bottom',
              end: 'top center',
              scrub: 1
            }
          }
        );
      }

      // Background glow parallax
      const glowElement = sectionRef.current?.querySelector('.glow-bg');
      if (glowElement) {
        gsap.to(glowElement, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollContainerRef]);

  return (
    <section ref={sectionRef} className="relative py-8 overflow-hidden">
      {/* Animated background glow */}
      <div className="glow-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(var(--blog-accent)/0.05)] blur-[150px] pointer-events-none" />

      {/* Decorative floating elements */}
      <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-[hsl(var(--blog-accent))] opacity-40 animate-pulse" />
      <div className="absolute bottom-40 left-16 w-1.5 h-1.5 rounded-full bg-[hsl(var(--blog-accent-secondary))] opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Journal Eyebrow - Full Width with centered text */}
        <div ref={eyebrowRef} className="flex items-center justify-center gap-4 mb-12">
          <div className="eyebrow-line flex-1 h-px bg-border origin-right" />
          <span className="eyebrow-text text-xs tracking-[0.3em] uppercase text-primary font-semibold">
            Journal
          </span>
          <div className="eyebrow-line flex-1 h-px bg-border origin-left" />
        </div>

        {/* Two Column Layout - Left narrow, Right wide for blogs */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Left Column - Header */}
          <div className="space-y-6">
            {/* Decorative dot */}
            <div className="w-2 h-2 rounded-full bg-primary" />
            
            {/* Main Title with Scroll Reveal - Smaller size */}
            <div>
              <ScrollReveal
                scrollContainerRef={scrollContainerRef}
                enableBlur={true}
                baseOpacity={0.15}
                baseRotation={2}
                blurStrength={6}
                rotationEnd="center center"
                wordAnimationEnd="center center"
              >
                Thoughts on Design, Code & Creativity
              </ScrollReveal>
            </div>

            {/* Subtitle */}
            <p ref={subtitleRef} className="text-muted-foreground text-sm leading-relaxed">
              Exploring the intersection of aesthetics and functionality. 
              Ideas that shape the digital landscape.
            </p>

            {/* Category Filter */}
            <div ref={filtersRef} className="flex flex-wrap gap-2 pt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                    ${activeCategory === category 
                      ? 'bg-primary text-primary-foreground shadow-glow' 
                      : 'bg-secondary text-secondary-foreground hover:bg-muted hover:scale-105'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Masonry Grid */}
          <div ref={masonryContainerRef}>
            <Masonry items={filteredPosts} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
