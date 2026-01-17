import { useState, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import CircularGallery, { CircularGalleryRef } from './CircularGallery';
import CertificationCard from './CertificationCard';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills: string[];
  image: string;
  link?: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'December 2024',
    credentialId: 'AWS-SAA-C03-2024',
    skills: ['Cloud Architecture', 'AWS', 'Scalability'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    link: 'https://aws.amazon.com/certification/'
  },
  {
    id: 2,
    title: 'Google Cloud Professional',
    issuer: 'Google Cloud',
    date: 'November 2024',
    credentialId: 'GCP-ACE-2024',
    skills: ['GCP', 'DevOps', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    link: 'https://cloud.google.com/certification'
  },
  {
    id: 3,
    title: 'Meta Frontend Developer',
    issuer: 'Meta (Facebook)',
    date: 'October 2024',
    credentialId: 'META-FE-2024',
    skills: ['React', 'JavaScript', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    link: 'https://www.coursera.org/meta'
  },
  {
    id: 4,
    title: 'Azure Data Engineer',
    issuer: 'Microsoft',
    date: 'September 2024',
    credentialId: 'AZ-305-2024',
    skills: ['Azure', 'Data Engineering', 'SQL'],
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop',
    link: 'https://learn.microsoft.com/certifications/'
  },
  {
    id: 5,
    title: 'Certified Kubernetes Admin',
    issuer: 'CNCF',
    date: 'August 2024',
    credentialId: 'CKA-2024',
    skills: ['Kubernetes', 'Docker', 'Cloud Native'],
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
    link: 'https://www.cncf.io/certification/cka/'
  },
  {
    id: 6,
    title: 'TensorFlow Developer',
    issuer: 'Google',
    date: 'July 2024',
    credentialId: 'TF-DEV-2024',
    skills: ['Machine Learning', 'Python', 'AI'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    link: 'https://www.tensorflow.org/certificate'
  }
];

export default function CertificationShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef<CircularGalleryRef>(null);

  const galleryItems = useMemo(
    () =>
      CERTIFICATIONS.map((cert) => ({
        image: cert.image,
        text: cert.title
      })),
    []
  );

  const handleItemChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handlePrev = useCallback(() => {
    const newIndex = (activeIndex - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length;
    setActiveIndex(newIndex);
    galleryRef.current?.scrollToIndex(newIndex);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    const newIndex = (activeIndex + 1) % CERTIFICATIONS.length;
    setActiveIndex(newIndex);
    galleryRef.current?.scrollToIndex(newIndex);
  }, [activeIndex]);

  const handleDotClick = useCallback((index: number) => {
    setActiveIndex(index);
    galleryRef.current?.scrollToIndex(index);
  }, []);

  const activeCert = CERTIFICATIONS[activeIndex];

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(45_93%_58%_/_0.03),_transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 text-center pt-6 pb-4 px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 backdrop-blur border border-border mb-4">
          <Award className="w-3 h-3 text-gold" />
          <span className="text-xs font-medium text-muted-foreground">Professional Certifications</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          <span className="text-foreground">My </span>
          <span className="gold-text">Credentials</span>
        </h1>

        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Scroll or drag to explore my professional certifications and achievements
        </p>
      </motion.header>

      {/* Main content area */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Center card */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCert.id}
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -18 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 mb-8"
          >
            <CertificationCard certification={activeCert} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 mb-4"
        >
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-secondary/50 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all duration-300"
            aria-label="Previous certification"
            type="button"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1.5" aria-label="Certification navigation">
            {CERTIFICATIONS.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-6 bg-gold' : 'bg-muted hover:bg-muted-foreground'
                }`}
                aria-label={`Go to certification ${index + 1}`}
                type="button"
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-secondary/50 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all duration-300"
            aria-label="Next certification"
            type="button"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-2"
          aria-label="Certification counter"
        >
          <span className="font-display text-3xl font-bold gold-text">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-muted-foreground text-xl font-light mx-2">/</span>
          <span className="text-muted-foreground text-xl font-light">
            {String(CERTIFICATIONS.length).padStart(2, '0')}
          </span>
        </motion.div>
      </div>

      {/* Circular Gallery */}
      <div className="absolute inset-0 z-0" style={{ height: '70vh' }}>
        <CircularGallery
          ref={galleryRef}
          items={galleryItems}
          bend={2}
          textColor="#D4AF37"
          borderRadius={0.08}
          font="500 24px Inter"
          scrollSpeed={1.5}
          scrollEase={0.08}
          onItemChange={handleItemChange}
        />
      </div>

      {/* Gradient overlays for better readability */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      {/* Side gradients */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-1 h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent z-10" />
      <div className="absolute top-1/3 right-10 w-1 h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent z-10" />
    </div>
  );
}
