import { motion } from 'framer-motion';
import { useState } from 'react';
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
    onClick: () => window.open('https://github.com/noeticstech', '_blank'),
  },
  {
    icon: <Linkedin size={22} />,
    label: 'LinkedIn',
    onClick: () => window.open('https://www.linkedin.com/in/vaibhav-singh-kushwaha-1941813a1/', '_blank'),
  },
  {
    icon: <Twitter size={22} />,
    label: 'Twitter',
    onClick: () => window.open('https://x.com/noeticstech', '_blank'),
  },
  {
    icon: <Mail size={22} />,
    label: 'Email',
    onClick: () => window.open('mailto:realvaibhav2005@gmail.com', '_blank'),
  },
  {
    icon: <FileText size={22} />,
    label: 'Resume',
    onClick: () => window.open('#', '_blank'),
  },
];

export default function ContactSection() {
  const [isDockHovered, setIsDockHovered] = useState(false);

  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="mb-12">
        <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-8 flex items-center gap-4">
          <span>Contact</span>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 gold-text">
            Let's Connect
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Ready to start your next project? Get in touch and let's create something amazing together.
          </p>
        </motion.div>
      </div>

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
        Based in India · Available for freelance & full-time opportunities
      </motion.p>
    </div>
  );
}
