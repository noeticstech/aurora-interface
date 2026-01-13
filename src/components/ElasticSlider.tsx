import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, ReactNode, useMemo } from 'react';
import { RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri';
import './ElasticSlider.css';

const MAX_OVERFLOW = 50;

interface ElasticSliderProps {
  defaultValue?: number;
  startingValue?: number;
  maxValue?: number;
  className?: string;
  isStepped?: boolean;
  stepSize?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChange?: (value: number) => void;
}

export default function ElasticSlider({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  className = '',
  isStepped = false,
  stepSize = 1,
  leftIcon = <RiVolumeDownFill className="slider-icon" />,
  rightIcon = <RiVolumeUpFill className="slider-icon" />,
  onChange
}: ElasticSliderProps) {
  return (
    <div className={`slider-container ${className}`}>
      <Slider
        defaultValue={defaultValue}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onChange={onChange}
      />
    </div>
  );
}

interface SliderProps {
  defaultValue: number;
  startingValue: number;
  maxValue: number;
  isStepped: boolean;
  stepSize: number;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  onChange?: (value: number) => void;
}

function Slider({ defaultValue, startingValue, maxValue, isStepped, stepSize, leftIcon, rightIcon, onChange }: SliderProps) {
  const [value, setValue] = useState(defaultValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<'left' | 'middle' | 'right'>('middle');
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  useMotionValueEvent(clientX, 'change', (latest) => {
    if (sliderRef.current) {
      const { left, right } = sliderRef.current.getBoundingClientRect();
      let newValue;

      if (latest < left) {
        setRegion('left');
        newValue = left - latest;
      } else if (latest > right) {
        setRegion('right');
        newValue = latest - right;
      } else {
        setRegion('middle');
        newValue = 0;
      }

      overflow.jump(decay(newValue, MAX_OVERFLOW));
    }
  });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons > 0 && sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);

      if (isStepped) {
        newValue = Math.round(newValue / stepSize) * stepSize;
      }

      newValue = Math.min(Math.max(newValue, startingValue), maxValue);
      setValue(newValue);
      clientX.jump(e.clientX);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    handlePointerMove(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = () => {
    animate(overflow, 0, { type: 'spring', bounce: 0.5 });
  };

  const getRangePercentage = () => {
    const totalRange = maxValue - startingValue;
    if (totalRange === 0) return 0;
    return ((value - startingValue) / totalRange) * 100;
  };

  // Pre-compute transforms to avoid recreating during render
  const leftIconX = useTransform(overflow, (o) => (region === 'left' ? -o / scale.get() : 0));
  const rightIconX = useTransform(overflow, (o) => (region === 'right' ? o / scale.get() : 0));
  const wrapperOpacity = useTransform(scale, [1, 1.2], [0.7, 1]);
  const trackScaleY = useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]);
  const trackHeight = useTransform(scale, [1, 1.2], [6, 12]);
  const trackMarginTop = useTransform(scale, [1, 1.2], [0, -3]);
  const trackMarginBottom = useTransform(scale, [1, 1.2], [0, -3]);

  return (
    <>
      <motion.div
        onHoverStart={() => animate(scale, 1.2)}
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, 1.2)}
        onTouchEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity: wrapperOpacity
        }}
        className="slider-wrapper"
      >
        <motion.div style={{ x: leftIconX }}>
          {leftIcon}
        </motion.div>

        <div
          ref={sliderRef}
          className="slider-root"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <motion.div
            style={{
              scaleY: trackScaleY,
              height: trackHeight,
              marginTop: trackMarginTop,
              marginBottom: trackMarginBottom
            }}
            className="slider-track-wrapper"
          >
            <div className="slider-track">
              <motion.div
                className="slider-range"
                style={{ width: `${getRangePercentage()}%` }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div style={{ x: rightIconX }}>
          {rightIcon}
        </motion.div>
      </motion.div>

      <div className="value-indicator">{Math.round(value)}</div>
    </>
  );
}

function decay(value: number, max: number) {
  if (max === 0) {
    return 0;
  }

  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);

  return sigmoid * max;
}
