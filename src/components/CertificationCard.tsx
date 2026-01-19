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
    <article className="cert-card w-full max-w-sm rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      {/* Header with gradient */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold-dark/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(45_100%_70%_/_0.15),_transparent_50%)]" />

        <motion.div
          className="absolute top-4 left-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg">
            <Award className="w-7 h-7 text-background" />
          </div>
        </motion.div>

        {certification.link && (
          <a
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-secondary transition-all duration-300"
            aria-label={`Open credential link for ${certification.title}`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <motion.h3
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-xl font-semibold text-foreground leading-tight"
        >
          {certification.title}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <Building2 className="w-4 h-4 text-gold" />
          <span className="text-sm font-medium">{certification.issuer}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <Calendar className="w-4 h-4 text-gold" />
          <span className="text-sm">{certification.date}</span>
        </motion.div>

        {certification.credentialId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-muted-foreground/70 font-mono"
          >
            ID: {certification.credentialId}
          </motion.div>
        )}

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="flex flex-wrap gap-1.5 pt-1"
          aria-label="Certification skills"
        >
          {certification.skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.28 + index * 0.05 }}
              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-gold border border-gold/20"
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
