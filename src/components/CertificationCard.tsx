import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, Building2 } from 'lucide-react';

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

interface CertificationCardProps {
  certification: Certification;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <article className="cert-card w-full max-w-xs rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      {/* Header with subtle gradient */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />

        <motion.div
          className="absolute top-3 left-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
            <Award className="w-5 h-5 text-background" />
          </div>
        </motion.div>

        {certification.link && (
          <a
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-gold transition-all duration-300"
            aria-label={`Open credential link for ${certification.title}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <motion.h3
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-base font-semibold text-foreground leading-tight"
        >
          {certification.title}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="flex items-center gap-1.5 text-muted-foreground"
        >
          <Building2 className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs font-medium">{certification.issuer}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
          className="flex items-center gap-1.5 text-muted-foreground"
        >
          <Calendar className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs">{certification.date}</span>
        </motion.div>

        {certification.credentialId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] text-muted-foreground/70 font-mono"
          >
            ID: {certification.credentialId}
          </motion.div>
        )}

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="flex flex-wrap gap-1 pt-1"
          aria-label="Certification skills"
        >
          {certification.skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.28 + index * 0.05 }}
              className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-secondary text-gold border border-gold/20"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
    </article>
  );
}
