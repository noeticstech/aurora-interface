import SkillCard from './SkillCard';
import {
  JavaScriptIcon,
  PythonIcon,
  CppIcon,
  CIcon,
  TypeScriptIcon,
  ReactIcon,
  NodeIcon,
  HtmlIcon,
  CssIcon,
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
  FrameworkIcon,
} from './LanguageIcons';

const skillCategories = [
  {
    title: "Languages",
    titleIcon: <CodeIcon />,
    command: "cat languages.txt",
    skills: [
      { name: "JavaScript", icon: <JavaScriptIcon /> },
      { name: "Python", icon: <PythonIcon /> },
      { name: "C++", icon: <CppIcon /> },
      { name: "C", icon: <CIcon /> },
      { name: "TypeScript", icon: <TypeScriptIcon /> },
    ],
  },
  {
    title: "Web Dev",
    titleIcon: <WebIcon />,
    command: "ls web-stack/",
    skills: [
      { name: "React", icon: <ReactIcon /> },
      { name: "Node.js", icon: <NodeIcon /> },
      { name: "HTML5", icon: <HtmlIcon /> },
      { name: "CSS3", icon: <CssIcon /> },
    ],
  },
  {
    title: "Databases",
    titleIcon: <DatabaseIcon />,
    command: "show databases;",
    skills: [
      { name: "MySQL", icon: <MySQLIcon /> },
      { name: "MongoDB", icon: <MongoDBIcon /> },
      { name: "PostgreSQL", icon: <PostgreSQLIcon /> },
      { name: "Firebase", icon: <FirebaseIcon /> },
    ],
  },
  {
    title: "Frameworks",
    titleIcon: <FrameworkIcon />,
    command: "npm list --depth=0",
    skills: [
      { name: "Next.js", icon: <NextJsIcon /> },
      { name: "Tailwind CSS", icon: <TailwindIcon /> },
      { name: "Express.js", icon: <ExpressIcon /> },
    ],
  },
  {
    title: "Tools",
    titleIcon: <ToolsIcon />,
    command: "which tools",
    skills: [
      { name: "Git", icon: <GitIcon /> },
      { name: "GitHub", icon: <GitHubIcon /> },
      { name: "VS Code", icon: <VSCodeIcon /> },
      { name: "Linux", icon: <LinuxIcon /> },
    ],
  },
  {
    title: "Soft Skills",
    titleIcon: <SoftSkillsIcon />,
    command: "echo $SOFT_SKILLS",
    skills: [
      { name: "Problem Solving", icon: <ProblemSolvingIcon /> },
      { name: "Team Collaboration", icon: <TeamIcon /> },
      { name: "Quick Learner", icon: <LearnerIcon /> },
      { name: "Adaptability", icon: <AdaptabilityIcon /> },
    ],
  },
];

const SkillArsenal = () => {
  return (
    <div className="w-full">
      <h3 className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-16 flex items-center gap-4">
        <span>Skill Arsenal</span>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        {skillCategories.map((category, index) => (
          <div key={category.title} className="flex justify-center">
            <SkillCard
              title={category.title}
              titleIcon={category.titleIcon}
              command={category.command}
              skills={category.skills}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillArsenal;
