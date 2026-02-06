import SkillCard from './SkillCard';
import { motion } from 'framer-motion';
import {
  JavaScriptIcon,
  PythonIcon,
  CppIcon,
  CIcon,
  HtmlIcon,
  CssIcon,
  ReactIcon,
  NodeIcon,
  GitIcon,
  GitHubIcon,
  VSCodeIcon,
  LinuxIcon,
  CodeIcon,
  WebIcon,
  ToolsIcon,
  SoftSkillsIcon,
  ProblemSolvingIcon,
  TeamIcon,
  LearnerIcon,
  AdaptabilityIcon,
  MySQLIcon,
  MongoDBIcon,
  PostgreSQLIcon,
  FirebaseIcon,
  DatabaseIcon,
  NextJsIcon,
  TailwindIcon,
  ExpressIcon,
  TypeScriptIcon,
  FrameworkIcon,
  DataScienceIcon,
  PandasIcon,
  NumPyIcon,
  TensorFlowIcon,
  JupyterIcon,
  PlatformIcon,
  VercelIcon,
  NetlifyIcon,
  AWSIcon,
  DockerIcon,
} from './icons/LanguageIcons';

const programmingSkills = [
  { name: "JavaScript", icon: <JavaScriptIcon /> },
  { name: "Python", icon: <PythonIcon /> },
  { name: "C++", icon: <CppIcon /> },
  { name: "C", icon: <CIcon /> },
];

const webDevSkills = [
  { name: "HTML", icon: <HtmlIcon /> },
  { name: "CSS", icon: <CssIcon /> },
  { name: "React", icon: <ReactIcon /> },
  { name: "Node.js", icon: <NodeIcon /> },
];

const toolsSkills = [
  { name: "Git", icon: <GitIcon /> },
  { name: "GitHub", icon: <GitHubIcon /> },
  { name: "VS Code", icon: <VSCodeIcon /> },
  { name: "Linux", icon: <LinuxIcon /> },
];

const dataScienceSkills = [
  { name: "Pandas", icon: <PandasIcon /> },
  { name: "NumPy", icon: <NumPyIcon /> },
  { name: "TensorFlow", icon: <TensorFlowIcon /> },
  { name: "Jupyter", icon: <JupyterIcon /> },
];

const platformSkills = [
  { name: "Vercel", icon: <VercelIcon /> },
  { name: "Netlify", icon: <NetlifyIcon /> },
  { name: "AWS", icon: <AWSIcon /> },
  { name: "Docker", icon: <DockerIcon /> },
];

const databaseSkills = [
  { name: "MySQL", icon: <MySQLIcon /> },
  { name: "MongoDB", icon: <MongoDBIcon /> },
  { name: "PostgreSQL", icon: <PostgreSQLIcon /> },
  { name: "Firebase", icon: <FirebaseIcon /> },
];

const frameworkSkills = [
  { name: "Next.js", icon: <NextJsIcon /> },
  { name: "Tailwind CSS", icon: <TailwindIcon /> },
  { name: "Express.js", icon: <ExpressIcon /> },
  { name: "TypeScript", icon: <TypeScriptIcon /> },
];

const softSkills = [
  { name: "Problem Solving", icon: <ProblemSolvingIcon /> },
  { name: "Team Collaboration", icon: <TeamIcon /> },
  { name: "Quick Learner", icon: <LearnerIcon /> },
  { name: "Adaptability", icon: <AdaptabilityIcon /> },
];

const SkillArsenal = () => {
  return (
    <div className="w-full">
      <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-16 flex items-center gap-4">
        <span>Skill Arsenal</span>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </h3>

      {/* Ornamental Divider */}
      <motion.div 
        className="flex items-center justify-center gap-4 mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold/50" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gold/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
          <motion.div 
            className="w-3 h-3 rounded-full bg-gold shimmer"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
          <div className="w-2 h-2 rounded-full bg-gold/40" />
        </div>
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold/50" />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16">
        <SkillCard
          title="Languages"
          titleIcon={<CodeIcon />}
          command="ls ./languages/"
          skills={programmingSkills}
          index={0}
        />
        <SkillCard
          title="Web Dev"
          titleIcon={<WebIcon />}
          command="ls ./web/"
          skills={webDevSkills}
          index={1}
        />
        <SkillCard
          title="Tools"
          titleIcon={<ToolsIcon />}
          command="ls ./tools/"
          skills={toolsSkills}
          index={2}
        />
        <SkillCard
          title="Databases"
          titleIcon={<DatabaseIcon />}
          command="ls ./databases/"
          skills={databaseSkills}
          index={3}
        />
        <SkillCard
          title="Frameworks"
          titleIcon={<FrameworkIcon />}
          command="ls ./frameworks/"
          skills={frameworkSkills}
          index={4}
        />
        <SkillCard
          title="Data Science"
          titleIcon={<DataScienceIcon />}
          command="ls ./data-science/"
          skills={dataScienceSkills}
          index={5}
        />
        <SkillCard
          title="Platforms"
          titleIcon={<PlatformIcon />}
          command="ls ./platforms/"
          skills={platformSkills}
          index={6}
        />
        <SkillCard
          title="Soft Skills"
          titleIcon={<SoftSkillsIcon />}
          command="ls ./soft-skills/"
          skills={softSkills}
          index={7}
        />
      </div>
    </div>
  );
};

export default SkillArsenal;
