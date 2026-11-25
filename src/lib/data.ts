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
    ],
  },
  {
    category: "Frontend / Móvil",
    description: "Interfaces modernas, componentes y experiencias fluidas en web y móvil.",
    items: [
      { name: "React", iconKey: "react", detail: "UI declarativa" },
      { name: "Next.js", iconKey: "nextdotjs", detail: "App Router" },
      { name: "JavaScript", iconKey: "javascript", detail: "ES6+" },
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
    category: "Herramientas",
    description: "Control de versiones, colaboración y contenedores.",
    items: [
      { name: "Git", iconKey: "git", detail: "Control de versiones" },
      { name: "GitHub", iconKey: "github", detail: "Colaboración" },
      { name: "Docker", iconKey: "docker", detail: "Contenedores" },
    ],
  },
];

export const education = [
  {
    role: "Bachiller Académico",
    organization: "I.E. Ciudadela Nuevo Occidente",
    description:
      "Formación académica que consolidó bases sólidas de razonamiento lógico, comunicación y trabajo autónomo antes de ingresar a la formación técnica especializada.",
    period: "Graduado el 26 de noviembre de 2024",
  },
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

export const complementaryCourses = [
  {
    title: "Construcción de Bases de Datos MySQL",
    subtitle: "Formación Técnica en Gestión y Modelado de Datos",
    description:
      "Diseño de esquemas relacionales, normalización, creación de tablas, llaves primarias/foráneas y consultas SQL estructuradas en MySQL.",
  },
  {
    title: "Derechos Fundamentales para el Trabajo",
    subtitle: "Formación Complementaria Laboral",
    description:
      "Conocimiento del marco normativo laboral, derechos fundamentales en el entorno profesional, ética y deberes en las relaciones de trabajo.",
  },
];

export const projects = [
  {
    name: "SIGIF",
    subtitle: "Sistema Integral de Gestión de Inventarios y Facturación",
    description:
      "Plataforma empresarial colaborativa para el control de inventarios, gestión de productos y procesos de facturación. Desarrollo de vistas y lógica backend, migración de controladores y respaldo de datos en la nube.",
    stack: ["Python", "Django", "Vercel", "Supabase", "Git/GitHub"],
    kind: "dashboard" as const,
    url: "https://sigif-final.vercel.app/",
    repoUrl: "https://github.com/DMoya-max/sigif-final",
  },
  {
    name: "Velvet Beauty",
    subtitle: "Catálogo Web & E-Commerce",
    description:
      "Aplicación web responsiva de catálogo digital para productos de belleza y cosmética con carrito de compras persistente, modal de confirmación e integración directa para pedidos por WhatsApp.",
    stack: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "Netlify"],
    kind: "commerce" as const,
    url: "https://velvetbeauty-catalogo.netlify.app/",
    repoUrl: "https://github.com/DMoya-max/Velvet-Beauty",
  },
];

export const FULL_NAME = "Daniel Jose Moya Quiroz";

export const ABOUT_TEXT =
  "Soy un desarrollador de software apasionado por transformar ideas complejas en soluciones digitales sólidas, funcionales y bien estructuradas. Me enfoco en comprender a fondo cada problema para diseñar sistemas escalables, seguros e intuitivos, cuidando tanto la lógica interna como la experiencia final de cada usuario. Trabajo bajo buenas prácticas de ingeniería, aprendizaje continuo y atención al detalle para entregar productos confiables de principio a fin.";

export const CONTACT_EMAIL = "dmoya1873@gmail.com";
export const CONTACT_PHONE = "+57 313 573 2066";
export const GITHUB_URL = "https://github.com/DMoya-max";
