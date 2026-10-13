export const personalInfo = {
  name: "Nguyễn Phúc Hoàng Anh",
  englishName: "Andrew Nguyen",
  title: "Software Engineer",
  location: "Hoài Đức, Hà Nội",
  phone: "0962120898",
  email: "ngphuchoanganh@gmail.com",
  // dummy: replace with real LinkedIn profile URL
  linkedin: "https://www.linkedin.com/in/andrew-nguyen",
  objective: [
    "With nearly 5 years of experience developing enterprise applications in Agile/Scrum environments, and focus on frontend engineering using React.js, Next.js, TypeScript, and modern UI implementation practices.",
    "I am highly skilled in implementing responsive, accessible UI/UX components using React.js as well as professional in delivering clean, maintainable, and well-tested code.",
  ],
};

export const stats = [
  { value: "~5", label: "Years Experience" },
  { value: "4+", label: "Projects Delivered" },
  { value: "3", label: "Companies" },
  { value: "6.5", label: "IELTS Score" },
];

export const skillCategories = [
  {
    name: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "CSS",
      "Tailwind",
      "Ant Design",
      "Redux",
      "Tanstack",
    ],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "Fastify"],
  },
  {
    name: "Databases",
    skills: ["MariaDB", "PostgreSQL", "Oracle", "SQL Server"],
  },
  {
    name: "Version Control",
    skills: ["Git", "GitHub", "GitLab"],
  },
  {
    name: "AI Tools",
    skills: ["Cursor", "Claude Code", "OpenCode"],
  },
];

export const experience = [
  {
    company: "TECHVIFY Joint Stock Company",
    role: "Software Engineer",
    period: "08/2025 — Present",
    description: null,
  },
  {
    company: "ICORP Investment Joint Stock Company",
    role: "Software Engineer",
    period: "10/2023 — 11/2024",
    description: null,
  },
  {
    company: "IFC - Infrastructure Investment and Development Consultant",
    role: "Software Engineer",
    period: "10/2020 — 10/2023",
    description: null,
  },
];

export const projects = [
  {
    slug: "cozy",
    name: "Cozy - Japanese Broadcast Sales Management Systems",
    period: "11/2025 — Present",
    role: "Software Engineer",
    client: "Japan",
    domain: "Management System",
    description:
      "A broadcast sales management system for Japanese enterprises, providing core features such as broadcast schedule management and contract management between customers and stations.",
    teamSize: "20+",
    responsibilities: [
      "Delivered frontend and backend tasks in line with project requirements.",
      "Translated Figma designs into pixel-perfect, production-ready components.",
      "Optimized component performance through tuning and refactoring.",
      "Performed code reviews, identifying issues and recommending actionable fixes to improve code quality.",
      "Leveraged AI tools to streamline development workflow, improve code quality, and accelerate delivery timelines.",
    ],
    stack: {
      languages: "ReactJS, NodeJS",
      frameworks: "Tailwind CSS, Antd, NestJS, TypeORM, TanStack Query",
      tools: "Vite, GitLab, Jira, Claude Code, Cursor, CodeRabbit, Docker",
      platform: "AWS services (S3, Aurora, CloudFront), PostgreSQL",
      methodology: "Agile Scrum",
    },
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind",
      "Antd",
      "NestJS",
      "TypeORM",
      "Docker",
      "AWS",
    ],
  },
  {
    slug: "spectacle",
    name: "Spectacle - Smart Comparison Application",
    period: "08/2025 — 09/2025",
    role: "Software Engineer",
    client: "France",
    domain: "BaaS",
    description:
      "An AI-powered document comparison app with a modern UI, delivering smooth UX and detailed analysis.",
    teamSize: "5+",
    responsibilities: [
      "Built accessible, reusable UI components with React Aria Components and Tailwind CSS.",
      "Implemented smooth async data operations with optimistic updates, skeleton loading states, and caching strategies, cutting perceived load times on large documents.",
      "Developed canvas-based annotations to visually highlight differences between compared documents.",
      "Implemented authentication guards and middleware to protect routes and restrict access to authorized users.",
      "Worked in an Agile Scrum team with GitHub-based code reviews and iterative delivery.",
      "Leveraged AI coding assistants to speed up development and improve code quality.",
    ],
    stack: {
      languages: "ReactJS, Python",
      frameworks:
        "NextJS, React Aria Components, Tailwind CSS, FastAPI, TanStack Query",
      tools: "GitHub, VS Code, Claude",
      platform:
        "Azure services (Blob, SQL, AI Document Intelligence, Cognitive Search), PostgreSQL",
      methodology: "Agile Scrum",
    },
    technologies: ["Next.js", "React Aria", "Tailwind", "FastAPI", "Azure"],
  },
  {
    slug: "vietinvoice",
    name: "VietInvoice V2 - Electronic Invoicing & Digital Signature",
    period: "09/2023 — 11/2024",
    role: "Software Engineer",
    client: "Vietnam",
    domain: "BaaS",
    description:
      "An all-in-one e-invoicing and digital signature platform, delivering end-to-end solutions for enterprise operations.",
    teamSize: "5+",
    responsibilities: [
      "Assisted in migrating the legacy stack to ReactJS and Antd.",
      "Customized Antd components to align with user requirements and UX needs.",
      "Delivered frontend and backend tasks in line with project requirements.",
      "Ensured smooth async data operations using optimistic updates, skeleton loading states, and effective caching strategies.",
      "Maintained the codebase and participated in refactoring tasks for optimal data loading speeds while ensuring seamless UX.",
    ],
    stack: {
      languages: "ReactJS, NodeJS",
      frameworks:
        "Antd, Sass, Redux, TanStack Query, React Router, ExpressJS, Sequelize",
      tools: "GitLab, VS Code, PM2",
      platform: "MariaDB",
      methodology: "Agile Scrum",
    },
    technologies: [
      "React",
      "Antd",
      "Sass",
      "Redux",
      "Tanstack Query",
      "Express",
      "MariaDB",
    ],
  },
  {
    slug: "econtract",
    name: "eContract - Agent Sales Management Portal",
    period: "12/2023 — 11/2024",
    role: "Software Engineer",
    client: "Vietnam",
    domain: "Management System",
    description:
      "An integrated enterprise solution for contract management within the company's product ecosystem.",
    teamSize: "5+",
    responsibilities: [
      "Coordinated with the BE team to build features tailored for Petro clients and VietInvoice customers.",
      "Responsible for building custom UI components based on Antd.",
      "Maintained the codebase and participated in refactoring tasks for optimal data loading speeds while ensuring seamless UX.",
    ],
    stack: {
      languages: "ReactJS, NodeJS",
      frameworks:
        "Antd, Sass, Redux, TanStack Query, React Router, ExpressJS, Sequelize",
      tools: "GitLab, VS Code, PM2",
      platform: "MariaDB",
      methodology: "Agile Scrum",
    },
    technologies: [
      "React",
      "Redux",
      "Tanstack Query",
      "Antd",
      "Sass",
      "Express",
      "MariaDB",
    ],
  },
];

export const certifications = [
  { name: "IELTS 6.5", year: 2025 },
  { name: "TOEIC 860", year: 2020 },
];
