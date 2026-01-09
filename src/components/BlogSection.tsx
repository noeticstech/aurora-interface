import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Masonry from '@/components/ui/Masonry';

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
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple header animation on scroll
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(var(--blog-accent)/0.03)] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div ref={headerRef} className="mb-16 space-y-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-[hsl(var(--blog-accent))]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[hsl(var(--blog-accent))] font-semibold">
              Journal
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--blog-foreground))] leading-tight max-w-3xl">
            Thoughts on Design, Code & Creativity
          </h2>

          {/* Subtitle */}
          <p className="max-w-xl text-[hsl(var(--blog-muted))] text-lg leading-relaxed">
            Exploring the intersection of aesthetics and functionality. 
            Ideas that shape the digital landscape.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 pt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                  ${activeCategory === category 
                    ? 'bg-[hsl(var(--blog-accent))] text-[hsl(var(--blog-background))]' 
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <Masonry items={filteredPosts} />
      </div>
    </section>
  );
};

export default BlogSection;
