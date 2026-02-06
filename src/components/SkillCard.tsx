import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  icon: ReactNode;
}

interface SkillCardProps {
  title: string;
  titleIcon: ReactNode;
  command: string;
  skills: Skill[];
  index?: number;
}

const SkillCard = ({ title, titleIcon, command, skills, index = 0 }: SkillCardProps) => {
  return (
    <motion.div 
      className="relative group perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Glass holder frame - left side */}
      <div className="absolute -left-5 top-4 bottom-4 w-4 glass-holder rounded-l-full z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-l-full" />
      </div>
      
      {/* Glass holder frame - right side */}
      <div className="absolute -right-5 top-4 bottom-4 w-4 glass-holder rounded-r-full z-10">
        <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent rounded-r-full" />
      </div>
      
      {/* Glass corner orbs - top */}
      <div className="absolute -left-7 -top-2 w-7 h-7 glass-orb rounded-full z-20">
        <div className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/30 rounded-full blur-[1px]" />
      </div>
      <div className="absolute -right-7 -top-2 w-7 h-7 glass-orb rounded-full z-20">
        <div className="absolute inset-1 bg-gradient-to-bl from-white/40 to-transparent rounded-full" />
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-[1px]" />
      </div>
      
      {/* Glass corner orbs - bottom */}
      <div className="absolute -left-7 -bottom-2 w-7 h-7 glass-orb rounded-full z-20">
        <div className="absolute inset-1 bg-gradient-to-tr from-white/40 to-transparent rounded-full" />
        <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full blur-[1px]" />
      </div>
      <div className="absolute -right-7 -bottom-2 w-7 h-7 glass-orb rounded-full z-20">
        <div className="absolute inset-1 bg-gradient-to-tl from-white/40 to-transparent rounded-full" />
        <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-[1px]" />
      </div>
      
      {/* Glass connector bars */}
      <div className="absolute -left-6 top-1/3 w-2 h-12 glass-connector rounded-full opacity-70" />
      <div className="absolute -right-6 top-1/3 w-2 h-12 glass-connector rounded-full opacity-70" />
      
      {/* Animated glow effect behind card */}
      <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 via-gold-light/30 to-gold/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="glass-card relative overflow-hidden rounded-2xl px-8 py-6 min-w-[320px] transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-glass-hover">
        {/* Glass shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
        
        {/* Moving light reflection */}
        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out pointer-events-none" />
        
        {/* Top edge highlight */}
        <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/40 rounded-tl-lg opacity-60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/40 rounded-tr-lg opacity-60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/40 rounded-bl-lg opacity-60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/40 rounded-br-lg opacity-60" />
        
        {/* Header */}
        <div className="relative flex items-center gap-3 mb-2">
          <span className="text-gold text-2xl drop-shadow-[0_0_8px_hsl(var(--gold)/0.5)]">{titleIcon}</span>
          <h2 className="font-display font-semibold text-xl text-sepia tracking-wide">
            {title}
          </h2>
        </div>
        
        {/* Terminal command */}
        <div className="terminal-header mb-4 pl-1 relative">
          $ {command}
        </div>
        
        {/* Skills list */}
        <div className="space-y-3 relative">
          {skills.map((skill, skillIndex) => (
            <motion.div 
              key={skill.name}
              className="flex items-center gap-3 pl-2 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] cursor-default backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.15 + 0.3 + skillIndex * 0.08,
                ease: "easeOut"
              }}
            >
              <span className="text-xl flex-shrink-0 drop-shadow-sm">{skill.icon}</span>
              <span className="font-mono text-sm text-sepia font-medium">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
