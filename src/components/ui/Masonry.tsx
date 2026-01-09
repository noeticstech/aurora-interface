import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Masonry.css';

gsap.registerPlugin(ScrollTrigger);

interface MasonryItem {
  id: string | number;
  img: string;
  url?: string;
  title?: string;
  category?: string;
  date?: string;
  readTime?: string;
  height: number;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: MasonryItem[];
  scaleOnHover?: boolean;
  hoverScale?: number;
  onItemClick?: (item: MasonryItem) => void;
}

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = (): [React.RefObject<HTMLDivElement>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const Masonry = ({
  items,
  scaleOnHover = true,
  hoverScale = 0.95,
  onItemClick
}: MasonryProps) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [4, 3, 2, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { grid, containerHeight } = useMemo((): { grid: GridItem[]; containerHeight: number } => {
    if (!width) return { grid: [], containerHeight: 800 };

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const gridItems = items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];
      colHeights[col] += height;
      return { ...child, x, y, w: columnWidth, h: height };
    });

    const maxHeight = Math.max(...colHeights);
    return { grid: gridItems, containerHeight: maxHeight };
  }, [columns, items, width]);

  // Set positions immediately without animation
  useLayoutEffect(() => {
    grid.forEach((item, index) => {
      const el = itemsRef.current[index];
      if (el) {
        gsap.set(el, {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h
        });
      }
    });
  }, [grid]);

  // ScrollTrigger for staggered reveal on scroll
  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    // Set initial state
    gsap.set(items, { opacity: 0, y: 60 });

    // Create batch for efficient scroll-triggered animations
    ScrollTrigger.batch(items, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          overwrite: true
        });
      },
      start: 'top 90%',
      once: true
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [grid]);

  const handleMouseEnter = (index: number) => {
    if (!scaleOnHover) return;
    const el = itemsRef.current[index];
    if (el) {
      gsap.to(el, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = (index: number) => {
    if (!scaleOnHover) return;
    const el = itemsRef.current[index];
    if (el) {
      gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleClick = (item: MasonryItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener');
    }
  };

  return (
    <div
      ref={containerRef}
      className="masonry-list"
      style={{ height: containerHeight }}
    >
      {grid.map((item, index) => (
        <div
          key={item.id}
          ref={el => { itemsRef.current[index] = el; }}
          className="masonry-item-wrapper"
          onClick={() => handleClick(item)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <div className="masonry-item-content">
            <div
              className="masonry-item-img"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className="masonry-item-overlay" />
            <div className="masonry-item-info">
              {item.category && (
                <span className="masonry-item-category">{item.category}</span>
              )}
              {item.title && <h3 className="masonry-item-title">{item.title}</h3>}
              <div className="masonry-item-meta">
                {item.date && <span className="masonry-item-date">{item.date}</span>}
                {item.readTime && (
                  <span className="masonry-item-read-time">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {item.readTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
