export type TechItem = {
  name: string;
  iconKey: string;
  detail: string;
};

export type TechGroup = {
  category: string;
  description: string;
  items: TechItem[];
};

export const techGroups: TechGroup[] = [
  {
    category: "Backend",
    description: "Lógica de negocio, APIs y arquitectura de servicios.",
    items: [
      { name: "Python", iconKey: "python", detail: "Lenguaje base" },
      { name: "Django", iconKey: "django", detail: "Framework web" },
      { name: "Node.js", iconKey: "nodedotjs", detail: "Runtime y APIs" },
      { name: "Nest.js", iconKey: "nestjs", detail: "Arquitectura backend" },
    ],
  },
  {
    category: "Frontend",
    description: "Interfaces modernas, componentes y experiencias fluidas.",
    items: [
      { name: "React", iconKey: "react", detail: "UI declarativa" },
      { name: "Next.js", iconKey: "nextdotjs", detail: "App Router" },
      { name: "JavaScript", iconKey: "javascript", detail: "ES6+" },
      { name: "TypeScript", iconKey: "typescript", detail: "Tipado estático" },
      { name: "HTML5", iconKey: "html5", detail: "Semántica web" },
      { name: "CSS3", iconKey: "css", detail: "Estilos y layout" },
    ],
  },
  {
    category: "Bases de datos",
    description: "Modelado relacional y documental para cada necesidad.",
    items: [
      { name: "PostgreSQL", iconKey: "postgresql", detail: "SQL avanzada" },
      { name: "MySQL", iconKey: "mysql", detail: "SQL" },
      { name: "SQLite", iconKey: "sqlite", detail: "SQL embebida" },
      { name: "MongoDB", iconKey: "mongodb", detail: "NoSQL" },
    ],
  },
  {
    category: "Herramientas y despliegue",
    description: "Colaboración, contenedores y entrega continua.",
    items: [
      { name: "Git", iconKey: "git", detail: "Control de versiones" },
      { name: "GitHub", iconKey: "github", detail: "Colaboración" },
      { name: "Docker", iconKey: "docker", detail: "Contenedores" },
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Análisis y Modelado",
    description:
      "Levantamiento de requerimientos, arquitectura de software y diseño de esquemas SQL/NoSQL.",
  },
  {
    number: "02",
    title: "Desarrollo Backend & APIs",
    description:
      "Lógica de negocio robusta, autenticación segura (JWT/sesiones) e integración de servicios.",
  },
  {
    number: "03",
    title: "Interfaz React / Next.js",
    description:
      "Componentes modulares, diseño responsivo y animaciones fluidas orientadas a la experiencia de usuario.",
  },
  {
    number: "04",
    title: "Control de Versiones, Pruebas y Despliegue",
    description:
      "Flujos colaborativos con Git/GitHub, control de calidad y puesta en producción en la nube.",
  },
];

export const education = [
  {
    role: "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
    organization: "SENA · Centro de Formación en Diseño, Confección y Moda, Itagüí",
    description:
      "Formación integral en ingeniería de software, bases de datos relacionales y no relacionales, desarrollo web full-stack, control de versiones y métricas de calidad de software.",
    period: "Formación técnica",
  },
  {
    role: "Desarrollador de Software (Etapa Productiva / Prácticas)",
    organization: "CODERI · Corporación Educativa Coredi",
    description:
      "Desarrollo, mantenimiento e implementación de soluciones tecnológicas en entorno real.",
    period: "Etapa productiva",
  },
];

export const projects = [
  {
    name: "SIGIF",
    subtitle: "Sistema Integral de Gestión de Inventarios y Facturación",
    description:
      "Plataforma empresarial colaborativa para el control de inventarios, gestión de productos y procesos de facturación. Desarrollo de vistas y lógica backend, migración de controladores y respaldo de datos en la nube.",
    stack: ["Python", "Django", "Node.js", "MongoDB Atlas", "Git/GitHub"],
    kind: "dashboard" as const,
  },
  {
    name: "Velvet Beauty",
    subtitle: "Catálogo Web & E-Commerce",
    description:
      "Aplicación web responsiva de catálogo digital para productos de belleza y cosmética con carrito de compras persistente, modal de confirmación e integración directa para pedidos por WhatsApp.",
    stack: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "Netlify"],
    kind: "commerce" as const,
  },
];

export const FULL_NAME = "Daniel Jose Moya Quiroz";

export const ABOUT_TEXT =
  "Soy un desarrollador de software apasionado por transformar ideas complejas en soluciones digitales sólidas, funcionales y bien estructuradas. Me enfoco en comprender a fondo cada problema para diseñar sistemas escalables, seguros e intuitivos, cuidando tanto la lógica interna como la experiencia final de cada usuario. Trabajo bajo buenas prácticas de ingeniería, aprendizaje continuo y atención al detalle para entregar productos confiables de principio a fin.";

export const CONTACT_EMAIL = "dmoya1873@gmail.com";
export const GITHUB_URL = "https://github.com/DMoya-max";
