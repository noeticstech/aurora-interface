import { useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './TiltedCard.css';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

interface TiltedCardProps {
  imageSrc?: string;
  videoSrc?: string;
  characterSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
}

export default function TiltedCard({
  imageSrc,
  videoSrc,
  characterSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = false,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  // Character 3D effect - more dramatic movement
  const characterX = useSpring(0, { stiffness: 150, damping: 20 });
  const characterY = useSpring(0, { stiffness: 150, damping: 20 });
  const characterScale = useSpring(1, { stiffness: 200, damping: 25 });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);

    // Character parallax effect - moves opposite to create depth
    if (characterSrc) {
      characterX.set(offsetX * 0.05);
      characterY.set(offsetY * 0.03);
    }
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
    if (characterSrc) {
      characterScale.set(1.08);
    }
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
    if (characterSrc) {
      characterX.set(0);
      characterY.set(0);
      characterScale.set(1);
    }
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}
      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        {/* Video Background */}
        {videoSrc && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="tilted-card-video"
            src={videoSrc}
          />
        )}
        
        {/* Static Image Background (fallback) */}
        {imageSrc && !videoSrc && (
          <motion.img
            src={imageSrc}
            alt={altText}
            className="tilted-card-img"
            style={{
              width: imageWidth,
              height: imageHeight
            }}
          />
        )}

        {/* Character Overlay with 3D Effect */}
        {characterSrc && (
          <motion.div
            className="tilted-card-character-wrapper"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              zIndex: 2,
              pointerEvents: 'none',
              x: characterX,
              y: characterY,
              scale: characterScale,
              translateX: '-50%'
            }}
          >
            <img
              src={characterSrc}
              alt="Character"
              style={{
                height: '100%',
                width: 'auto',
                objectFit: 'contain',
                objectPosition: 'center bottom',
                filter: 'drop-shadow(0 10px 30px hsl(var(--primary) / 0.4))'
              }}
            />
          </motion.div>
        )}

        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        )}
      </motion.div>
      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
