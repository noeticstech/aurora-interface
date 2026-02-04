import { ReactNode } from "react";

interface Skill {
  name: string;
  icon: ReactNode;
}

interface SkillCardProps {
  title: string;
  titleIcon: ReactNode;
  command: string;
  skills: Skill[];
}

const SkillCard = ({ title, titleIcon, command, skills }: SkillCardProps) => {
  return (
    <div className="relative group">
      {/* Decorative columns */}
      <div className="absolute -left-6 top-0 bottom-0 w-5 scroll-ornament rounded-l-full shadow-lg z-10" />
      <div className="absolute -right-6 top-0 bottom-0 w-5 scroll-ornament rounded-r-full shadow-lg z-10" />
      
      {/* Top ornaments */}
      <div className="absolute -left-8 -top-3 w-8 h-8 scroll-ornament rounded-full shadow-lg border-2 border-gold/50" />
      <div className="absolute -right-8 -top-3 w-8 h-8 scroll-ornament rounded-full shadow-lg border-2 border-gold/50" />
      
      {/* Bottom ornaments */}
      <div className="absolute -left-8 -bottom-3 w-8 h-8 scroll-ornament rounded-full shadow-lg border-2 border-gold/50" />
      <div className="absolute -right-8 -bottom-3 w-8 h-8 scroll-ornament rounded-full shadow-lg border-2 border-gold/50" />
      
      {/* Tassel decorations */}
      <div className="absolute -left-7 top-1/4 w-2 h-16 scroll-ornament rounded-b-full opacity-80" />
      <div className="absolute -right-7 top-1/4 w-2 h-16 scroll-ornament rounded-b-full opacity-80" />
      
      {/* Main card */}
      <div className="parchment-bg gold-border rounded-lg px-8 py-6 min-w-[320px] shadow-parchment transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
        {/* Decorative corner flourishes */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-gold text-2xl">{titleIcon}</span>
          <h2 className="font-display font-semibold text-xl text-sepia tracking-wide">
            {title}
          </h2>
        </div>
        
        {/* Terminal command */}
        <div className="terminal-header mb-4 pl-1">
          $ {command}
        </div>
        
        {/* Skills list */}
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div 
              key={skill.name}
              className="flex items-center gap-3 pl-2 py-1 rounded transition-all duration-200 hover:bg-gold/10 cursor-default"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-xl flex-shrink-0">{skill.icon}</span>
              <span className="font-mono text-sm text-sepia font-medium">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
