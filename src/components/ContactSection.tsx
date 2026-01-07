import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Dock from './Dock';
import ContactForm from './ContactForm';
import { Github, Linkedin, Twitter, Mail, FileText, ExternalLink } from 'lucide-react';

interface DockItemData {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

const socialLinks: DockItemData[] = [
  {
    icon: <Github size={22} />,
    label: 'GitHub',
    onClick: () => window.open('https://github.com', '_blank'),
  },
  {
    icon: <Linkedin size={22} />,
    label: 'LinkedIn',
    onClick: () => window.open('https://linkedin.com', '_blank'),
  },
  {
    icon: <Twitter size={22} />,
    label: 'Twitter',
    onClick: () => window.open('https://twitter.com', '_blank'),
  },
  {
    icon: <Mail size={22} />,
    label: 'Email',
    onClick: () => window.open('mailto:hello@example.com', '_blank'),
  },
  {
    icon: <FileText size={22} />,
    label: 'Resume',
    onClick: () => window.open('#', '_blank'),
  },
];

export default function ContactSection() {
  const [isDockHovered, setIsDockHovered] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  return (
    <section id="contact" className="relative min-h-screen py-20 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 gold-text">
            Let's Connect
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Get in touch and let's create something amazing together.
          </p>
        </motion.div>

        {/* Main content - use items-end to align bottoms */}
        <div className="grid md:grid-cols-2 gap-12 items-end">
          {/* Left side - Links and Dock */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Quick links at top */}
            <div className="mb-8">
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
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
                  >
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Find me online - blurs when dock is hovered */}
            <motion.div
              animate={{
                filter: isDockHovered ? 'blur(4px)' : 'blur(0px)',
                opacity: isDockHovered ? 0.5 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-2">Find me online</h3>
              <p className="text-muted-foreground text-sm">
                Check out my work or connect on social platforms.
              </p>
            </motion.div>

            {/* Dock - fixed height container, items grow upward */}
            <div
              className="h-24 flex items-end"
              onMouseEnter={() => setIsDockHovered(true)}
              onMouseLeave={() => setIsDockHovered(false)}
            >
              <Dock
                ref={dockRef}
                items={socialLinks}
                magnification={70}
                distance={150}
                baseItemSize={50}
              />
            </div>
          </motion.div>

          {/* Right side - Contact form */}
          <ContactForm />
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-muted-foreground text-sm mt-16"
        >
          Based in San Francisco, CA · Available for freelance & full-time opportunities
        </motion.p>
      </div>
    </section>
  );
}
