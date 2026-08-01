import type { Status } from "./data/dashboard";

export type Language = "en" | "es";

type CopyKey =
  | "projectHome"
  | "temporaryStyle"
  | "searchDashboard"
  | "searchEverything"
  | "clearFilters"
  | "all"
  | "category"
  | "status"
  | "language"
  | "assetType"
  | "showing"
  | "of"
  | "openFile"
  | "viewPdf"
  | "viewBoth"
  | "noMatches"
  | "prospect"
  | "owner"
  | "notes"
  | "lastUpdated";

type SectionKey =
  | "home"
  | "chileDrafts"
  | "coreDocuments"
  | "sharedAssets"
  | "companies"
  | "photoAssets"
  | "buyerTargets"
  | "benchmarks"
  | "currentWork"
  | "openQuestions";

export const navLabels: Record<Language, Record<SectionKey, string>> = {
  en: {
    home: "Home",
    chileDrafts: "Chile Drafts",
    coreDocuments: "Core Documents",
    sharedAssets: "Shared Assets",
    companies: "Companies",
    photoAssets: "Photo Assets",
    buyerTargets: "Buyer Targets",
    benchmarks: "Benchmarks",
    currentWork: "Current Work",
    openQuestions: "Open Questions",
  },
  es: {
    home: "Inicio",
    chileDrafts: "Borradores Chile",
    coreDocuments: "Documentos base",
    sharedAssets: "Activos compartidos",
    companies: "Empresas",
    photoAssets: "Fotos y marca",
    buyerTargets: "Compradores objetivo",
    benchmarks: "Referencias",
    currentWork: "Trabajo actual",
    openQuestions: "Preguntas abiertas",
  },
};

export const copy: Record<Language, Record<CopyKey, string>> = {
  en: {
    projectHome: "Project Home",
    temporaryStyle: "Temporary UI styling. Colors and type are evidenced by the live website; formal brand guide remains pending.",
    searchDashboard: "Search dashboard",
    searchEverything: "Search everything",
    clearFilters: "Clear filters",
    all: "All",
    category: "Category",
    status: "Status",
    language: "Language",
    assetType: "Asset type",
    showing: "Showing",
    of: "of",
    openFile: "Open file",
    viewPdf: "View PDF",
    viewBoth: "View both",
    noMatches: "No indexed items match the current filters.",
    prospect: "PROSPECT",
    owner: "Owner",
    notes: "Notes",
    lastUpdated: "Last updated",
  },
  es: {
    projectHome: "Inicio del proyecto",
    temporaryStyle: "Estilo visual provisional. Los colores y la tipografia estan basados en el sitio web activo; la guia formal de marca sigue pendiente.",
    searchDashboard: "Buscar en el panel",
    searchEverything: "Buscar en todo",
    clearFilters: "Limpiar filtros",
    all: "Todos",
    category: "Categoria",
    status: "Estado",
    language: "Idioma",
    assetType: "Tipo de activo",
    showing: "Mostrando",
    of: "de",
    openFile: "Abrir archivo",
    viewPdf: "Ver PDF",
    viewBoth: "Ver ambos",
    noMatches: "Ningun elemento indexado coincide con los filtros actuales.",
    prospect: "PROSPECTO",
    owner: "Responsable",
    notes: "Notas",
    lastUpdated: "Ultima actualizacion",
  },
};

export const sectionCopy: Record<Language, Record<SectionKey, { title: string; description: string }>> = {
  en: {
    home: { title: "Welcome", description: "Central file-and-asset index for the Zorrito Minerals project: what exists, what it is for, and what is next." },
    chileDrafts: { title: "Chile Drafts - Latest Deliverables", description: "First-round supplier package drafts for the Chile entity. Same underlying facts in both; gaps remain marked PENDING." },
    coreDocuments: { title: "Core Project Documents", description: "Foundational source documents, lab reports, and reference materials currently available." },
    sharedAssets: { title: "Shared Assets", description: "Reusable production-system assets. AVAILABLE means usable now; REQUIRED means still not built." },
    companies: { title: "Companies & Supplier Projects", description: "Active or prospective supplier companies with individual dossier work. Buyer targets are listed separately." },
    photoAssets: { title: "Photo & Brand Assets", description: "Branding, product packaging, and mine/processing site photography. Click any image to open full size." },
    buyerTargets: { title: "Buyer Targets", description: "Priority buyer / prospect list. These are not clients and not active supplier projects." },
    benchmarks: { title: "Benchmarks & Examples", description: "Internal example vs. external benchmark, kept clearly separate." },
    currentWork: { title: "Current Work", description: "What's done and what's next, at a glance." },
    openQuestions: { title: "Open Questions", description: "Unresolved items. Keep these explicit until source facts change." },
  },
  es: {
    home: { title: "Bienvenido", description: "Indice central de archivos y activos para el proyecto Zorrito Minerals: que existe, para que sirve y que sigue." },
    chileDrafts: { title: "Borradores Chile - entregables recientes", description: "Primeros borradores del paquete de proveedor para la entidad de Chile. Ambos usan los mismos hechos base; los vacios siguen marcados como PENDING." },
    coreDocuments: { title: "Documentos base del proyecto", description: "Documentos fuente, reportes de laboratorio y materiales de referencia disponibles actualmente." },
    sharedAssets: { title: "Activos compartidos", description: "Activos reutilizables del sistema de produccion. AVAILABLE significa usable ahora; REQUIRED significa pendiente de crear." },
    companies: { title: "Empresas y proyectos de proveedor", description: "Empresas proveedoras activas o prospectivas con trabajo de dossier individual. Los compradores objetivo se listan aparte." },
    photoAssets: { title: "Fotos y activos de marca", description: "Marca, empaques de producto y fotografia de mina/procesamiento. Haz clic en cualquier imagen para abrirla en tamano completo." },
    buyerTargets: { title: "Compradores objetivo", description: "Lista prioritaria de compradores/prospectos. No son clientes ni proyectos activos de proveedor." },
    benchmarks: { title: "Referencias y ejemplos", description: "Ejemplo interno vs. referencia externa, mantenidos claramente separados." },
    currentWork: { title: "Trabajo actual", description: "Lo que esta hecho y lo que sigue, de un vistazo." },
    openQuestions: { title: "Preguntas abiertas", description: "Puntos no resueltos. Mantenerlos explicitos hasta que cambien los hechos de origen." },
  },
};

export function statusLabel(status: Status | string, language: Language) {
  if (language === "en") return status;
  const labels: Record<string, string> = {
    AVAILABLE: "DISPONIBLE",
    REQUIRED: "REQUERIDO",
    "TO CONFIRM": "POR CONFIRMAR",
    "PARTIALLY CONFIRMED": "PARCIALMENTE CONFIRMADO",
    "ACTIVE - DRAFTING": "ACTIVO - EN BORRADOR",
    "COMPLETE / AVAILABLE": "COMPLETO / DISPONIBLE",
    NEXT: "SIGUIENTE",
    UPCOMING: "PROXIMO",
    PENDING: "PENDIENTE",
  };
  return labels[status.toUpperCase()] ?? status;
}

export function dataText(value: string, language: Language) {
  if (language === "en") return value;
  return dataTranslations[value] ?? value;
}

const dataTranslations: Record<string, string> = {
  "Zorrito Minerals": "Zorrito Minerals",
  "Project": "Proyecto",
  "Purpose": "Proposito",
  "Current phase": "Fase actual",
  "Current focus": "Enfoque actual",
  "Repeatable production system for premium supplier dossiers and retailer-facing sales packages.": "Sistema de produccion repetible para dossiers premium de proveedores y paquetes comerciales para retailers.",
  "Foundations and initial asset production": "Fundamentos y produccion inicial de activos",
  "Chile supplier package drafting; organizing the production system": "Redaccion del paquete de proveedor de Chile; organizacion del sistema de produccion",
  "Companies tracked": "Empresas rastreadas",
  "Drafts ready": "Borradores listos",
  "Core documents": "Documentos base",
  "Assets available": "Activos disponibles",
  "Photo & brand files": "Archivos de foto y marca",
  "Open questions": "Preguntas abiertas",
  "Chile Drafts - ready for review": "Borradores Chile - listos para revisar",
  "Use the sidebar to jump directly to each section. Search and filters apply to whichever indexed view is open.": "Usa la barra lateral para ir directamente a cada seccion. La busqueda y los filtros aplican a la vista indexada que este abierta.",
  "Style A (Industrial Classic)": "Estilo A (Industrial clasico)",
  "Style B (Brand-Matched)": "Estilo B (alineado con marca)",
  "Chile Supplier Package - Style A (Industrial Classic)": "Paquete de proveedor Chile - Estilo A (Industrial clasico)",
  "Chile Supplier Package - Style B (Brand-Matched)": "Paquete de proveedor Chile - Estilo B (alineado con marca)",
  "Clean industrial layout with orange/black accents and CONFIRMED / PARTIAL / PENDING tagging throughout.": "Diseno industrial limpio con acentos naranja/negro y etiquetas CONFIRMED / PARTIAL / PENDING en todo el documento.",
  "Bolder editorial layout built from the real website's evidenced colors and typography.": "Diseno editorial mas fuerte construido con los colores y la tipografia evidenciados en el sitio web real.",
  "PDF checklist": "Checklist PDF",
  "PDF guide": "Guia PDF",
  "Markdown": "Markdown",
  "PDF, 12pp": "PDF, 12 paginas",
  "PDF, 10pp": "PDF, 10 paginas",
  "PDF lab report": "Reporte de laboratorio PDF",
  "PDF receipt": "Recibo PDF",
  "English": "Ingles",
  "Spanish": "Espanol",
  "Business Process": "Proceso de negocio",
  "Operational Guide": "Guia operativa",
  "Creative Standard": "Estandar creativo",
  "Zorrito Example (internal)": "Ejemplo Zorrito (interno)",
  "External Benchmark": "Referencia externa",
  "Internal Reference": "Referencia interna",
  "Master readiness checklist, 12 sections from company info to 90-day success metrics. States current readiness at 40-50%, target 85-90%.": "Checklist maestro de preparacion, 12 secciones desde informacion de empresa hasta metricas de exito a 90 dias. Indica preparacion actual de 40-50%, objetivo 85-90%.",
  "Recommended Drive folder structure so the team and AI share one source of truth.": "Estructura recomendada de carpetas en Drive para que el equipo y la IA compartan una sola fuente de verdad.",
  "Lists Supplier Package contents and info still needed from Chile. Only source document currently mentioning BENTONIX.": "Lista el contenido del Supplier Package y la informacion que aun se necesita de Chile. Unico documento fuente que menciona BENTONIX actualmente.",
  "Creative direction: modern, premium, industrial, clean; cites Imerys as a style reference.": "Direccion creativa: moderna, premium, industrial y limpia; cita a Imerys como referencia de estilo.",
  "Master content and structure blueprint: target buyers, visual style, section list, and deliverable set.": "Plano maestro de contenido y estructura: compradores objetivo, estilo visual, lista de secciones y conjunto de entregables.",
  "Zorrito's own finished example package for Canadian retailers. Not a competitor document.": "Paquete de ejemplo terminado de Zorrito para retailers canadienses. No es un documento de competidor.",
  "Competitor brochure for style and structure reference only. Never a source for Zorrito claims.": "Folleto de competidor solo como referencia de estilo y estructura. Nunca como fuente para afirmaciones sobre Zorrito.",
  "Alex Stewart International Chile assay for bentonite sample 'Bentonita Lote 05122025.' Raw assay, not a formatted COA/TDS/SDS.": "Ensayo de Alex Stewart International Chile para la muestra de bentonita 'Bentonita Lote 05122025.' Ensayo bruto, no un COA/TDS/SDS formateado.",
  "Chain-of-custody companion document to the test report.": "Documento complementario de cadena de custodia del reporte de ensayo.",
  "Name": "Nombre",
  "Type": "Tipo",
  "Version": "Version",
  "Last updated": "Ultima actualizacion",
  "Not recorded": "No registrado",
  "Tracker": "Tracker",
  "Reference map": "Mapa de referencia",
  "Dashboard draft": "Borrador de dashboard",
  "Register": "Registro",
  "Template": "Plantilla",
  "Checklist": "Checklist",
  "Tracks supplier readiness categories.": "Rastrea categorias de preparacion del proveedor.",
  "Early map of project knowledge and structure.": "Mapa inicial del conocimiento y la estructura del proyecto.",
  "Superseded by v2": "Reemplazado por v2",
  "Updated map of project knowledge and structure.": "Mapa actualizado del conocimiento y la estructura del proyecto.",
  "Draft dashboard for ZPOS Module 0.": "Borrador del dashboard para ZPOS Modulo 0.",
  "Central register of verified facts to prevent fabrication across dossiers.": "Registro central de hechos verificados para evitar fabricaciones en los dossiers.",
  "Next up in Current Work": "Siguiente en Trabajo actual",
  "Standard template to request source information from supplier companies.": "Plantilla estandar para solicitar informacion fuente a empresas proveedoras.",
  "Reusable base template for building any company's supplier dossier.": "Plantilla base reutilizable para construir el dossier de proveedor de cualquier empresa.",
  "Standard Technical Data Sheet template.": "Plantilla estandar de ficha tecnica (TDS).",
  "Standard Safety Data Sheet template.": "Plantilla estandar de hoja de seguridad (SDS).",
  "Standard Certificate of Analysis template.": "Plantilla estandar de certificado de analisis (COA).",
  "Quality assurance checklist for dossier production.": "Checklist de control de calidad para la produccion de dossiers.",
  "Zorrito Chile (ZORRITO SpA Comercializadora)": "Zorrito Chile (ZORRITO SpA Comercializadora)",
  "Chile - first-draft supplier package produced; 2 style variants ready for review.": "Chile - primer borrador del paquete de proveedor producido; 2 variantes de estilo listas para revision.",
  "Role not yet defined - mentioned once in source material.": "Rol aun no definido - mencionado una vez en el material fuente.",
  "Country": "Pais",
  "Current stage": "Etapa actual",
  "Readiness status": "Estado de preparacion",
  "Available source files": "Archivos fuente disponibles",
  "Missing information": "Informacion faltante",
  "Next action": "Siguiente accion",
  "Chile (Arica) - CONFIRMED": "Chile (Arica) - CONFIRMADO",
  "First-draft supplier package produced, routed for team review.": "Primer borrador del paquete de proveedor producido y enviado para revision del equipo.",
  "PARTIAL - company info, product line, and one lab assay confirmed; mining, commercial terms, TDS/SDS/COA still pending.": "PARCIAL - informacion de empresa, linea de producto y un ensayo de laboratorio confirmados; mineria, terminos comerciales y TDS/SDS/COA aun pendientes.",
  "Lab test report, sample receipt, website brand reference, plus product/site photos.": "Reporte de laboratorio, recibo de muestra, referencia de marca del sitio web, mas fotos de producto/sitio.",
  "Lab Test Report": "Reporte de laboratorio",
  "Sample Receipt": "Recibo de muestra",
  "Website Reference": "Referencia del sitio web",
  "Company history, mission/vision, org chart, mine location/reserves/permits, production capacity, formal TDS/SDS/COA, pricing/export terms, private label, sustainability.": "Historia de la empresa, mision/vision, organigrama, ubicacion/reservas/permisos de mina, capacidad de produccion, TDS/SDS/COA formales, precios/terminos de exportacion, marca privada, sostenibilidad.",
  "Review both draft styles with the team; route PENDING items to Patricia Rojas.": "Revisar ambos estilos de borrador con el equipo; enviar los puntos PENDING a Patricia Rojas.",
  "None confirmed. Referenced by name in the Guia document as a party the dossier is prepared for.": "Ninguno confirmado. Referenciado por nombre en el documento Guia como parte para la cual se prepara el dossier.",
  "What BENTONIX is and its relationship to Zorrito Minerals.": "Que es BENTONIX y cual es su relacion con Zorrito Minerals.",
  "Confirm BENTONIX's role.": "Confirmar el rol de BENTONIX.",
  "Korea has come up as a possible second track, but it is not yet confirmed as a supplier company.": "Korea ha surgido como posible segunda linea de trabajo, pero aun no esta confirmado como empresa proveedora.",
  "Branding": "Marca",
  "Product Packaging": "Empaque de producto",
  "Mining & Processing Site Photography": "Fotografia de mina y procesamiento",
  "Logo - stacked": "Logo - vertical",
  "Logo - horizontal black": "Logo - horizontal negro",
  "Logo - horizontal brown": "Logo - horizontal marron",
  "Logo - horizontal alternate": "Logo - horizontal alternativo",
  "Website reference": "Referencia del sitio web",
  "Mine - aerial 1": "Mina - aerea 1",
  "Mine - aerial 2": "Mina - aerea 2",
  "Mine - aerial 3": "Mina - aerea 3",
  "Mine - excavator": "Mina - excavadora",
  "Processing building": "Edificio de procesamiento",
  "Warehouse - bagged product": "Bodega - producto en sacos",
  "Raw material pile 1": "Pila de materia prima 1",
  "Raw material pile 2": "Pila de materia prima 2",
  "Bentonite pellets closeup": "Detalle de pellets de bentonita",
  "Mabel Gel raw granules": "Granulos crudos de Mabel Gel",
  "Authenticity of the mine/processing site photos is unconfirmed - not verified as genuine photos of Zorrito's own operations vs. stock/rendered imagery. Do not use externally until confirmed.": "La autenticidad de las fotos de mina/procesamiento no esta confirmada: no se ha verificado si son fotos reales de operaciones de Zorrito o imagenes de stock/renderizadas. No usarlas externamente hasta confirmar.",
  "Internal example": "Ejemplo interno",
  "External benchmark": "Referencia externa",
  "External benchmark materials may guide structure, layout, and communication style, but must never be used as a source for Zorrito claims or copied content.": "Los materiales de referencia externa pueden guiar estructura, layout y estilo de comunicacion, pero nunca deben usarse como fuente para afirmaciones sobre Zorrito ni copiarse como contenido.",
  "Chile Supplier Package - Draft v0.1 & v0.2 (A/B)": "Paquete de proveedor Chile - Borradores v0.1 y v0.2 (A/B)",
  "Supplier Readiness Tracker": "Tracker de preparacion de proveedor",
  "Master Facts Register": "Registro maestro de hechos",
  "Supplier Information Request Template": "Plantilla de solicitud de informacion de proveedor",
  "Master Supplier Dossier Template": "Plantilla maestra de dossier de proveedor",
  "What is BENTONIX?": "Que es BENTONIX?",
  "What are the approved brand colors, fonts, and logo rules?": "Cuales son los colores, fuentes y reglas de logo aprobados?",
  "Who owns English/Spanish/French translation maintenance?": "Quien mantiene las traducciones ingles/espanol/frances?",
  "Should the expanded buyer-target list be treated as canonical?": "Debe tratarse como canonica la lista ampliada de compradores objetivo?",
  "What is Korea?": "Que es Korea?",
  "Unassigned": "Sin asignar",
  "Mentioned in the Guia document as a party the dossier is prepared for. Role not defined.": "Mencionado en el documento Guia como parte para la cual se prepara el dossier. Rol no definido.",
  "Live website screenshot confirms real colors (#E68331 / #15151D) and headline typography. Still not a formal, approved brand guide.": "La captura del sitio web activo confirma colores reales (#E68331 / #15151D) y tipografia de titulares. Aun no es una guia formal de marca aprobada.",
  "No owner documented.": "No hay responsable documentado.",
  "Current list of 7 buyer targets is provisional pending confirmation.": "La lista actual de 7 compradores objetivo es provisional y pendiente de confirmacion.",
  "AI Knowledge Base Guide lists Korea under Customer Subfolders, but it has come up as a possible supplier track alongside Chile. Not resolved.": "AI Knowledge Base Guide lista Korea bajo subcarpetas de clientes, pero ha surgido como posible linea de proveedor junto a Chile. No resuelto.",
};
