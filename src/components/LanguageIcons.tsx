import { Lightbulb, Users, BookOpen, RefreshCw } from "lucide-react";

export const JavaScriptIcon = () => (
  <div className="w-5 h-5 bg-[#F7DF1E] rounded-sm flex items-center justify-center">
    <span className="text-black font-bold text-xs">JS</span>
  </div>
);

export const PythonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M12 2C6.48 2 6 4.02 6 5.5V8h6v1H5.5C3.57 9 2 10.57 2 12.5S3.57 16 5.5 16H7v-2.5C7 11.57 8.57 10 10.5 10H16c1.1 0 2-.9 2-2V5.5C18 4.02 17.52 2 12 2zm-1 2.5a.75.75 0 110 1.5.75.75 0 010-1.5z" fill="#3776AB"/>
    <path d="M12 22c5.52 0 6-2.02 6-3.5V16h-6v-1h6.5c1.93 0 3.5-1.57 3.5-3.5S20.43 8 18.5 8H17v2.5c0 1.93-1.57 3.5-3.5 3.5H8c-1.1 0-2 .9-2 2v2.5c0 1.48.48 3.5 6 3.5zm1-2.5a.75.75 0 110-1.5.75.75 0 010 1.5z" fill="#FFD43B"/>
  </svg>
);

export const CppIcon = () => (
  <div className="w-5 h-5 bg-[#00599C] rounded-full flex items-center justify-center">
    <span className="text-white font-bold text-[9px]">C++</span>
  </div>
);

export const CIcon = () => (
  <div className="w-5 h-5 bg-[#A8B9CC] rounded-full flex items-center justify-center">
    <span className="text-[#283593] font-bold text-xs">C</span>
  </div>
);

export const TypeScriptIcon = () => (
  <div className="w-5 h-5 bg-[#3178C6] rounded-sm flex items-center justify-center">
    <span className="text-white font-bold text-xs">TS</span>
  </div>
);

export const ReactIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#61DAFB">
    <circle cx="12" cy="12" r="2.5"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)"/>
  </svg>
);

export const NodeIcon = () => (
  <div className="w-5 h-5 bg-[#339933] rounded-sm flex items-center justify-center">
    <span className="text-white font-bold text-[8px]">N.js</span>
  </div>
);

export const HtmlIcon = () => (
  <div className="w-5 h-5 bg-[#E34F26] rounded-sm flex items-center justify-center">
    <span className="text-white font-bold text-[7px]">HTML</span>
  </div>
);

export const CssIcon = () => (
  <div className="w-5 h-5 bg-[#1572B6] rounded-sm flex items-center justify-center">
    <span className="text-white font-bold text-[7px]">CSS</span>
  </div>
);

export const GitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#F05032">
    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
  </svg>
);

export const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export const VSCodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#007ACC">
    <path d="M17.583 2.207L8.4 10.143 3.7 6.357l-1.7.883v9.52l1.7.883 4.7-3.786 9.183 7.936L22 19.6V4.4l-4.417-2.193zM3.7 14.707V9.293L6.2 12l-2.5 2.707zm13.883 2.236L12.3 12l5.283-4.943v9.886z"/>
  </svg>
);

export const LinuxIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587.26 1.35.352 2.174.272 1.372-.106 2.79-.665 3.456-1.468.18-.2.344-.451.399-.71.235.09.545.119.93.149.463.06.899.172 1.248.263.349.092.566.278.706.543.13.255.19.587.189.93 0 .184-.015.366-.041.548a.87.87 0 00.015.413c.07.193.225.376.531.537.306.16.734.28 1.202.307.935.046 2.047-.282 2.795-1.065.587-.614.932-1.49.876-2.418-.027-.448-.146-.856-.375-1.166a2.064 2.064 0 00-.348-.36c-.065-.06-.138-.119-.216-.175a.46.46 0 00-.016-.046c-.153-.416-.412-.748-.772-.98-.36-.234-.764-.36-1.11-.432a5.894 5.894 0 00-.457-.068l-.14-.017z"/>
  </svg>
);

export const CodeIcon = () => (
  <span className="text-gold font-mono font-bold">&lt;/&gt;</span>
);

export const WebIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

export const ToolsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="currentColor">
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
  </svg>
);

export const SoftSkillsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const ProblemSolvingIcon = () => (
  <Lightbulb className="w-5 h-5 text-yellow-500" />
);

export const TeamIcon = () => (
  <Users className="w-5 h-5 text-blue-500" />
);

export const LearnerIcon = () => (
  <BookOpen className="w-5 h-5 text-green-500" />
);

export const AdaptabilityIcon = () => (
  <RefreshCw className="w-5 h-5 text-purple-500" />
);

// Database Icons
export const MySQLIcon = () => (
  <div className="w-5 h-5 bg-[#4479A1] rounded-sm flex items-center justify-center">
    <span className="text-white font-bold text-[6px]">MySQL</span>
  </div>
);

export const MongoDBIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#47A248">
    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
  </svg>
);

export const PostgreSQLIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#336791">
    <path d="M17.128 0a10.134 10.134 0 00-2.755.403l-.063.02A10.922 10.922 0 0012.6.258C11.422.238 10.403.524 9.594 1.065c-.618-.22-2.018-.637-3.559-.545-1.253.073-2.747.469-3.892 1.673C1.103 3.282.617 4.645.48 6.454c-.135 1.79.152 4.093.992 6.856.84 2.762 2.137 5.293 3.658 6.879.76.793 1.645 1.404 2.615 1.571.487.084.986.07 1.467-.04.34-.078.662-.202.966-.354.085.042.173.082.264.12.568.24 1.213.38 1.893.402.197.007.394.002.587-.013l.064-.004c.235.148.528.288.878.404 1.04.347 2.433.474 4.083-.091 1.362-.466 1.721-1.143 1.943-1.887.12-.404.201-.822.276-1.273z"/>
  </svg>
);

export const FirebaseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FFCA28">
    <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z"/>
  </svg>
);

export const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="currentColor">
    <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm6 12c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-5c0 .5-2.13 2-6 2s-6-1.5-6-2V9.77c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V12z"/>
  </svg>
);

// Framework Icons
export const NextJsIcon = () => (
  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
    <span className="text-white font-bold text-[7px]">N</span>
  </div>
);

export const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#06B6D4">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
  </svg>
);

export const ExpressIcon = () => (
  <div className="w-5 h-5 bg-[#000000] rounded-sm flex items-center justify-center">
    <span className="text-white font-bold text-[7px]">Ex</span>
  </div>
);

export const FrameworkIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="currentColor">
    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
  </svg>
);
