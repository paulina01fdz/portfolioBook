/**
 * Toda la información editable del portafolio vive aquí.
 * Cambia estos valores con tus datos reales y el libro se actualizará solo.
 */
export const profile = {
  name: "Paulina Fernández Hernández",
  firstName: "Paulina",
  role: "Software developer",
  year: "2026",
  location: "Medellín, Colombia",
  email: "fpaulina545@gmail.com",
  github: "https://github.com/paulina01fdz",
  linkedin: "https://www.linkedin.com/in/paulina-fernández-aaa1ba2b9",
  whatsapp: "3004759778",
  whatsappUrl: "https://wa.me/573004759778",
  initials: "PFH",
  quote: "La diferencia brilla más",
  bio: "Soy desarrolladora de software en proceso. Me gusta la tecnología y el desarrollo de soluciones a través del mundo digital. He construido proyectos que me han permitido fortalecer mis habilidades en diferentes áreas de la tecnología. Me caracterizan la curiosidad, el interés y la motivación por el aprendizaje continuo.",
  bioTwo:
    "Mi enfoque está orientado al desarrollo web, la lógica de programación, la estructuración de bases de datos y el análisis de requerimientos y pruebas de software.",
  experience: "Proyectos web de principio a fin",
  focus: "Desarrollo web · lógica · datos · pruebas",
};

export type StudyCategory = "estudios" | "cursos";

export type Study = {
  id: string;
  title: string;
  category: StudyCategory;
  kind: "Carrera" | "Certificación" | "Curso" | "Diplomado" | "Otro";
  institution?: string;
  period?: string;
  description?: string;
};

export const studyCategories: { id: StudyCategory; label: string }[] = [
  { id: "estudios", label: "Estudios" },
  { id: "cursos", label: "Cursos" },
];

export const studies: Study[] = [
  {
    id: "bachiller",
    title: "Bachiller Académico",
    category: "estudios",
    kind: "Otro",
    institution: "I.E.R. Dario Gutiérrez Rave",
    period: "2023",
  },
  {
    id: "tecnologo-sena",
    title: "Tecnólogo en Análisis y Desarrollo de Software",
    category: "estudios",
    kind: "Carrera",
    institution: "SENA",
    period: "Actual",
  },
  {
    id: "react-redux",
    title: "Desarrollo Web FrontEnd React & Redux",
    category: "cursos",
    kind: "Certificación",
    institution: "SENA · KEYCODE · AHK",
    period: "Nov 2024",
  },
  {
    id: "programacion-intermedia",
    title: "Programación Intermedia",
    category: "cursos",
    kind: "Curso",
    institution: "Talento Tech · UdeA",
    period: "Jul 2025",
  },
  {
    id: "python",
    title: "Programación con Python",
    category: "cursos",
    kind: "Curso",
    institution: "Tecnológico de Antioquia",
    period: "2023",
  },
];

export type Skill = {
  name: string;
  level: number;
};

export type SkillGroup = {
  title: string;
  subtitle: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Front-end",
    subtitle: "INTERFACES",
    skills: [
      { name: "React", level: 50 },
      { name: "Redux", level: 50 },
      { name: "Bootstrap", level: 70 },
      { name: "Axios", level: 60 },
      { name: "JavaScript DOM", level: 70 },
      { name: "Diseño responsive", level: 70 },
    ],
  },
  {
    title: "Back-end y bases de datos",
    subtitle: "SYSTEMS",
    skills: [
      { name: "Node.js", level: 60 },
      { name: "NestJS", level: 40 },
      { name: "Django", level: 70 },
      { name: "Django REST Framework", level: 70 },
      { name: "MongoDB", level: 80 },
      { name: "Supabase", level: 30 },
      { name: "SQL", level: 50 },
    ],
  },
  {
    title: "Herramientas / Workflow",
    subtitle: "WORKFLOW",
    skills: [
      { name: "Git", level: 70 },
      { name: "GitHub", level: 70 },
      { name: "Visual Studio Code", level: 90 },
      { name: "Postman", level: 70 },
      { name: "JMeter", level: 60 },
      { name: "Swagger", level: 60 },
      { name: "Vercel", level: 50 },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  year: string;
  description: string;
  tech: string[];
  mock: "dashboard" | "shop" | "tasks" | "weather" | "space";
  /** URL del proyecto desplegado cuando se puede mostrar en un iframe. */
  demoUrl?: string;
  note?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    id: "orbit",
    title: "ORBIT",
    year: "2026",
    description:
      "Aplicación web de gestión de proyectos y tareas mediante metodología Kanban, con roles de usuario y administrador, estadísticas y gestión de actividades.",
    tech: ["Python", "Django", "DRF", "JavaScript", "Axios", "Supabase"],
    mock: "tasks",
    demoUrl: "https://orbit-aplicacion.vercel.app/",
    url: "https://orbit-aplicacion.vercel.app/",
  },
  {
    id: "expedicion-roja",
    title: "Expedición Roja y Más Allá",
    year: "2026",
    description:
      "Museo digital interactivo para recorrer Marte y descubrir exoplanetas con datos reales de la NASA. Seis paradas guiadas, preguntas breves, progreso guardado en el navegador e insignia final.",
    tech: ["React", "React Router", "Motion", "NASA API", "CSS"],
    mock: "space",
    // Vercel no devuelve X-Frame-Options ni CSP frame-ancestors: se puede incrustar.
    demoUrl: "https://expedicion-roja.vercel.app/",
    url: "https://expedicion-roja.vercel.app/",
  },
];
