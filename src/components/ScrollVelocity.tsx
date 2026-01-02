import { useRef, useLayoutEffect, useState, ReactNode } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';
import './ScrollVelocity.css';

function useElementWidth(ref: React.RefObject<HTMLSpanElement | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

interface VelocityTextProps {
  children: ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
}

function VelocityRow({
  children,
  baseVelocity,
  scrollContainerRef,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] }
}: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });

  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  );

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  function wrap(min: number, max: number, v: number) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, v => {
    if (copyWidth === 0) return '0px';
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef(1);
  const baseDirection = baseVelocity > 0 ? 1 : -1;

  useAnimationFrame((_, delta) => {
    const vf = velocityFactor.get();
    
    // Scroll down = positive velocity = both rows speed up in their own direction
    // Scroll up = negative velocity = both rows reverse direction
    if (vf < 0) {
      directionFactor.current = -baseDirection;
    } else {
      directionFactor.current = baseDirection;
    }

    const speedBoost = 1 + Math.min(15, Math.abs(vf));
    const moveBy = directionFactor.current * Math.abs(baseVelocity) * speedBoost * (delta / 1000);
    
    baseX.set(baseX.get() + moveBy);
  });

  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span className={className} key={i} ref={i === 0 ? copyRef : null}>
        {children}
      </span>
    );
  }

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        {spans}
      </motion.div>
    </div>
  );
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  rows: ReactNode[][];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
}

export const ScrollVelocity = ({
  scrollContainerRef,
  rows = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] }
}: ScrollVelocityProps) => {
  return (
    <section className="space-y-4">
      {rows.map((rowItems, index) => (
        <VelocityRow
          key={index}
          className={className}
          baseVelocity={index % 2 === 0 ? velocity : -velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
        >
          {rowItems.map((item, i) => (
            <span key={i} className="inline-flex items-center mx-6">
              {item}
            </span>
          ))}
        </VelocityRow>
      ))}
    </section>
  );
};

export default ScrollVelocity;
