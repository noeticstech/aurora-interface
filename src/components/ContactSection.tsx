import { motion } from 'framer-motion';
import { useState } from 'react';
import Dock from './Dock';
import ContactForm from './ContactForm';
import CodingPlatforms from './CodingPlatforms';
import { Linkedin, Twitter, Mail, Instagram, Facebook, ExternalLink } from 'lucide-react';

interface DockItemData {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

const socialLinks: DockItemData[] = [
  {
    icon: <Linkedin size={20} />,
    label: 'LinkedIn',
    onClick: () => window.open('https://www.linkedin.com/in/vaibhav-singh-kushwaha-1941813a1/', '_blank'),
  },
  {
    icon: <Twitter size={20} />,
    label: 'Twitter',
    onClick: () => window.open('https://x.com/noeticstech', '_blank'),
  },
  {
    icon: <Instagram size={20} />,
    label: 'Instagram',
    onClick: () => window.open('https://instagram.com', '_blank'),
  },
  {
    icon: <Facebook size={20} />,
    label: 'Facebook',
    onClick: () => window.open('https://facebook.com', '_blank'),
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    onClick: () => window.open('mailto:realvaibhav2005@gmail.com', '_blank'),
  },
];

export default function ContactSection() {
  const [isDockHovered, setIsDockHovered] = useState(false);

  return (
    <div className="relative w-full">
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-8 flex items-center gap-4">
          <span>Contact</span>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </h3>

        {/* Grid Layout - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          
          {/* Top Left - Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-foreground">
              Let's Connect
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ready to start your next project? Get in touch and let's create something amazing together.
            </p>
          </motion.div>

          {/* Top Center - Contact Form (spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:row-span-2"
          >
            <ContactForm />
          </motion.div>

          {/* Top Right - Coding Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CodingPlatforms />
          </motion.div>

          {/* Bottom Left - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6"
          >
            <p className="text-sm text-muted-foreground mb-4">Quick links</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'View Portfolio', href: '#portfolio' },
                { label: 'Download Resume', href: '#resume' },
                { label: 'Read Blog', href: '#blog' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group text-sm"
                >
                  <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Bottom Right - Find Me Online */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 flex flex-col"
          >
            {/* Find me online heading */}
            <motion.div
              animate={{
                filter: isDockHovered ? 'blur(4px)' : 'blur(0px)',
                opacity: isDockHovered ? 0.5 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Find me online
              </h3>
              <p className="text-muted-foreground text-sm">
                Check out my work or connect on social platforms.
              </p>
            </motion.div>

            {/* Social Dock */}
            <div
              className="mt-auto"
              onMouseEnter={() => setIsDockHovered(true)}
              onMouseLeave={() => setIsDockHovered(false)}
            >
              <div className="flex justify-center">
                <Dock
                  items={socialLinks}
                  magnification={60}
                  distance={120}
                  baseItemSize={40}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
