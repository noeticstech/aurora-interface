import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Masonry from '@/components/ui/Masonry';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Import blog images
import blogDesign from '@/assets/blog-design.jpg';
import blogCode from '@/assets/blog-code.jpg';
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
  excerpt?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    img: blogDesign,
    title: 'The Art of Minimalist Design in Digital Products',
    category: 'Design',
    date: 'Dec 28, 2025',
    readTime: '5 min read',
    height: 600,
    url: '#'
  },
  {
    id: 2,
    img: blogCode,
    title: 'Building Scalable React Applications with Modern Patterns',
    category: 'Development',
    date: 'Dec 20, 2025',
    readTime: '8 min read',
    height: 700,
    url: '#'
  },
  {
    id: 3,
    img: blogArchitecture,
    title: 'How Architecture Influences Digital Interface Design',
    category: 'Inspiration',
    date: 'Dec 15, 2025',
    readTime: '6 min read',
    height: 800,
    url: '#'
  },
  {
    id: 4,
    img: blogWorkspace,
    title: 'Crafting the Perfect Creative Workspace',
    category: 'Lifestyle',
    date: 'Dec 10, 2025',
    readTime: '4 min read',
    height: 650,
    url: '#'
  },
  {
    id: 5,
    img: blogArt,
    title: 'The Intersection of Art and Technology',
    category: 'Creative',
    date: 'Dec 5, 2025',
    readTime: '7 min read',
    height: 550,
    url: '#'
  },
  {
    id: 6,
    img: blogTypography,
    title: 'Typography Trends Shaping 2026 Design',
    category: 'Design',
    date: 'Nov 28, 2025',
    readTime: '5 min read',
    height: 520,
    url: '#'
  }
];

const categories = ['All', 'Design', 'Development', 'Inspiration', 'Lifestyle', 'Creative'];

const BlogSection = () => {
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
      // Eyebrow line animation
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current.querySelector('.eyebrow-line'),
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: eyebrowRef.current,
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
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Animated background glow */}
      <div className="glow-bg absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(var(--blog-accent)/0.08)] blur-[120px] pointer-events-none" />

      {/* Decorative floating elements */}
      <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-[hsl(var(--blog-accent)/0.6)] animate-pulse" />
      <div className="absolute bottom-40 left-16 w-3 h-3 rounded-full bg-[hsl(var(--blog-accent-secondary)/0.4)] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-32 w-1.5 h-1.5 rounded-full bg-[hsl(var(--blog-accent)/0.5)] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-4 mb-8">
            <div className="eyebrow-line w-8 h-px bg-[hsl(var(--blog-accent))]" />
            <span className="eyebrow-text text-sm font-medium tracking-widest uppercase text-[hsl(var(--blog-accent))]">
              Journal
            </span>
          </div>

          {/* Main Title with Scroll Reveal */}
          <div className="mb-6">
            <ScrollReveal
              enableBlur={true}
              baseOpacity={0.15}
              baseRotation={2}
              blurStrength={6}
              as="h2"
              containerClassName="max-w-4xl"
            >
              Thoughts on Design, Code & Creativity
            </ScrollReveal>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10"
          >
            Exploring the intersection of aesthetics and functionality. 
            Ideas that shape the digital landscape.
          </p>

          {/* Category Filter */}
          <div ref={filtersRef} className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${activeCategory === category 
                    ? 'bg-[hsl(var(--blog-accent))] text-[hsl(var(--blog-background))] shadow-[0_0_20px_hsl(var(--blog-accent)/0.4)]' 
                    : 'bg-secondary text-secondary-foreground hover:bg-muted hover:scale-105'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid with scroll-triggered entrance */}
        <div ref={masonryContainerRef}>
          <Masonry
            items={filteredPosts}
            animateFrom="bottom"
            stagger={0.08}
            blurToFocus={true}
            scaleOnHover={true}
            hoverScale={0.98}
            colorShiftOnHover={true}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
