export type Status =
  | "AVAILABLE"
  | "REQUIRED"
  | "TO CONFIRM"
  | "PARTIALLY CONFIRMED"
  | "ACTIVE - DRAFTING"
  | "COMPLETE / AVAILABLE"
  | "NEXT"
  | "UPCOMING";

export type DocumentItem = {
  name: string;
  file: string;
  href: string;
  type: string;
  language: string;
  category: string;
  purpose: string;
  status: Status;
};

export type AssetItem = {
  name: string;
  type: string;
  status: Status;
  purpose: string;
  version: string;
  updated: string;
  notes?: string;
};

export type DraftItem = {
  name: string;
  shortName: string;
  href: string;
  description: string;
  variant: "classic" | "brand";
};

export type CompanyItem = {
  name: string;
  status: Status;
  summary: string;
  fields: Array<{ label: string; value: string; links?: Array<{ label: string; href: string }> }>;
};

export type PhotoAsset = {
  label: string;
  href: string;
  group: "Branding" | "Product Packaging" | "Mining & Processing Site Photography";
};

export type OpenQuestion = {
  question: string;
  status: Status;
  owner: string;
  notes: string;
  updated: string;
};

export const assetBase = "/source-data";

export const drafts: DraftItem[] = [
  {
    name: "Chile Supplier Package - Style A (Industrial Classic)",
    shortName: "DRAFT v0.1",
    href: `${assetBase}/drafts/Chile_Supplier_Package_DRAFT_v0.1_IndustrialClassic.pdf`,
    description:
      "Clean industrial layout with orange/black accents and CONFIRMED / PARTIAL / PENDING tagging throughout.",
    variant: "classic",
  },
  {
    name: "Chile Supplier Package - Style B (Brand-Matched)",
    shortName: "DRAFT v0.2",
    href: `${assetBase}/drafts/Chile_Supplier_Package_DRAFT_v0.2_BrandMatched.pdf`,
    description:
      "Bolder editorial layout built from the real website's evidenced colors and typography.",
    variant: "brand",
  },
];

export const coreDocuments: DocumentItem[] = [
  {
    name: "Supplier Readiness Program",
    file: "Supplier_Readiness_Program.pdf",
    href: `${assetBase}/documents/Supplier_Readiness_Program.pdf`,
    type: "PDF checklist",
    language: "English",
    category: "Business Process",
    status: "AVAILABLE",
    purpose:
      "Master readiness checklist, 12 sections from company info to 90-day success metrics. States current readiness at 40-50%, target 85-90%.",
  },
  {
    name: "AI Knowledge Base Guide",
    file: "AI_Knowledge_Base_Guide.pdf",
    href: `${assetBase}/documents/AI_Knowledge_Base_Guide.pdf`,
    type: "PDF guide",
    language: "English",
    category: "Operational Guide",
    status: "AVAILABLE",
    purpose: "Recommended Drive folder structure so the team and AI share one source of truth.",
  },
  {
    name: "Guia para Crear el Supplier Package",
    file: "Guia_Supplier_Package_Zorrito.md",
    href: `${assetBase}/documents/Guia_Supplier_Package_Zorrito.md`,
    type: "Markdown",
    language: "Spanish",
    category: "Business Process",
    status: "AVAILABLE",
    purpose:
      "Lists Supplier Package contents and info still needed from Chile. Only source document currently mentioning BENTONIX.",
  },
  {
    name: "Design References Guide",
    file: "Design_References_Guide.pdf",
    href: `${assetBase}/documents/Design_References_Guide.pdf`,
    type: "PDF guide",
    language: "English",
    category: "Creative Standard",
    status: "AVAILABLE",
    purpose: "Creative direction: modern, premium, industrial, clean; cites Imerys as a style reference.",
  },
  {
    name: "Creative Brief",
    file: "Creative_Brief.md",
    href: `${assetBase}/documents/Creative_Brief.md`,
    type: "Markdown",
    language: "English",
    category: "Creative Standard",
    status: "AVAILABLE",
    purpose:
      "Master content and structure blueprint: target buyers, visual style, section list, and deliverable set.",
  },
  {
    name: "Cat Litter Retail Supply Package",
    file: "Zorrito_Cat_Litter_Retail_Supply_Package_EXAMPLE.pdf",
    href: `${assetBase}/documents/Zorrito_Cat_Litter_Retail_Supply_Package_EXAMPLE.pdf`,
    type: "PDF, 12pp",
    language: "English",
    category: "Zorrito Example (internal)",
    status: "AVAILABLE",
    purpose: "Zorrito's own finished example package for Canadian retailers. Not a competitor document.",
  },
  {
    name: "Imerys Mineral Solutions for Cat Litter",
    file: "Imerys_Mineral_Solutions_EXTERNAL_BENCHMARK.pdf",
    href: `${assetBase}/documents/Imerys_Mineral_Solutions_EXTERNAL_BENCHMARK.pdf`,
    type: "PDF, 10pp",
    language: "English",
    category: "External Benchmark",
    status: "AVAILABLE",
    purpose:
      "Competitor brochure for style and structure reference only. Never a source for Zorrito claims.",
  },
  {
    name: "Informe de Ensayo (Test Report) - Cert. 317_2026",
    file: "Chile_Lab_Test_Report_Cert317_2026.pdf",
    href: `${assetBase}/lab-reports/Chile_Lab_Test_Report_Cert317_2026.pdf`,
    type: "PDF lab report",
    language: "Spanish",
    category: "Internal Reference",
    status: "AVAILABLE",
    purpose:
      "Alex Stewart International Chile assay for bentonite sample 'Bentonita Lote 05122025.' Raw assay, not a formatted COA/TDS/SDS.",
  },
  {
    name: "Sample Receipt - ZORRITO SpA, LAB-2607317",
    file: "Chile_Sample_Receipt_LAB-2607317.pdf",
    href: `${assetBase}/lab-reports/Chile_Sample_Receipt_LAB-2607317.pdf`,
    type: "PDF receipt",
    language: "English",
    category: "Internal Reference",
    status: "AVAILABLE",
    purpose: "Chain-of-custody companion document to the test report.",
  },
];

export const sharedAssets: AssetItem[] = [
  { name: "Supplier Readiness Tracker", type: "Tracker", status: "AVAILABLE", purpose: "Tracks supplier readiness categories.", version: "Not recorded", updated: "Not recorded" },
  { name: "Project Knowledge Map v1", type: "Reference map", status: "AVAILABLE", purpose: "Early map of project knowledge and structure.", version: "v1", updated: "Not recorded", notes: "Superseded by v2" },
  { name: "Project Knowledge Map v2", type: "Reference map", status: "AVAILABLE", purpose: "Updated map of project knowledge and structure.", version: "v2", updated: "Not recorded" },
  { name: "ZPOS Module 0 Dashboard draft", type: "Dashboard draft", status: "AVAILABLE", purpose: "Draft dashboard for ZPOS Module 0.", version: "Draft", updated: "Not recorded" },
  { name: "Master Facts Register", type: "Register", status: "REQUIRED", purpose: "Central register of verified facts to prevent fabrication across dossiers.", version: "PENDING", updated: "PENDING", notes: "Next up in Current Work" },
  { name: "Supplier Information Request Template", type: "Template", status: "REQUIRED", purpose: "Standard template to request source information from supplier companies.", version: "PENDING", updated: "PENDING" },
  { name: "Master Supplier Dossier Template", type: "Template", status: "REQUIRED", purpose: "Reusable base template for building any company's supplier dossier.", version: "PENDING", updated: "PENDING" },
  { name: "TDS Template", type: "Template", status: "REQUIRED", purpose: "Standard Technical Data Sheet template.", version: "PENDING", updated: "PENDING" },
  { name: "SDS Template", type: "Template", status: "REQUIRED", purpose: "Standard Safety Data Sheet template.", version: "PENDING", updated: "PENDING" },
  { name: "COA Template", type: "Template", status: "REQUIRED", purpose: "Standard Certificate of Analysis template.", version: "PENDING", updated: "PENDING" },
  { name: "QA Checklist", type: "Checklist", status: "REQUIRED", purpose: "Quality assurance checklist for dossier production.", version: "PENDING", updated: "PENDING" },
];

export const companies: CompanyItem[] = [
  {
    name: "Zorrito Chile (ZORRITO SpA Comercializadora)",
    status: "ACTIVE - DRAFTING",
    summary: "Chile - first-draft supplier package produced; 2 style variants ready for review.",
    fields: [
      { label: "Country", value: "Chile (Arica) - CONFIRMED" },
      { label: "Current stage", value: "First-draft supplier package produced, routed for team review." },
      { label: "Readiness status", value: "PARTIAL - company info, product line, and one lab assay confirmed; mining, commercial terms, TDS/SDS/COA still pending." },
      {
        label: "Available source files",
        value: "Lab test report, sample receipt, website brand reference, plus product/site photos.",
        links: [
          { label: "Lab Test Report", href: `${assetBase}/lab-reports/Chile_Lab_Test_Report_Cert317_2026.pdf` },
          { label: "Sample Receipt", href: `${assetBase}/lab-reports/Chile_Sample_Receipt_LAB-2607317.pdf` },
          { label: "Website Reference", href: `${assetBase}/images/branding/website_reference_screenshot.png` },
        ],
      },
      { label: "Missing information", value: "Company history, mission/vision, org chart, mine location/reserves/permits, production capacity, formal TDS/SDS/COA, pricing/export terms, private label, sustainability." },
      { label: "Next action", value: "Review both draft styles with the team; route PENDING items to Patricia Rojas." },
    ],
  },
  {
    name: "BENTONIX",
    status: "TO CONFIRM",
    summary: "Role not yet defined - mentioned once in source material.",
    fields: [
      { label: "Country", value: "TO CONFIRM" },
      { label: "Current stage", value: "TO CONFIRM" },
      { label: "Readiness status", value: "TO CONFIRM" },
      { label: "Available source files", value: "None confirmed. Referenced by name in the Guia document as a party the dossier is prepared for." },
      { label: "Missing information", value: "What BENTONIX is and its relationship to Zorrito Minerals." },
      { label: "Next action", value: "Confirm BENTONIX's role." },
    ],
  },
];

export const photoAssets: PhotoAsset[] = [
  { label: "Logo - stacked", group: "Branding", href: `${assetBase}/images/branding/logo_stacked.png` },
  { label: "Logo - horizontal black", group: "Branding", href: `${assetBase}/images/branding/logo_horizontal_black_bg.png` },
  { label: "Logo - horizontal brown", group: "Branding", href: `${assetBase}/images/branding/logo_horizontal_brown_bg.png` },
  { label: "Logo - horizontal alternate", group: "Branding", href: `${assetBase}/images/branding/logo_horizontal_black_bg_alt.png` },
  { label: "Website reference", group: "Branding", href: `${assetBase}/images/branding/website_reference_screenshot.png` },
  { label: "Cat Litter 4kg", group: "Product Packaging", href: `${assetBase}/images/products/cat_litter_4kg.png` },
  { label: "Crystal Cat Litter 4kg", group: "Product Packaging", href: `${assetBase}/images/products/crystal_cat_litter_4kg.png` },
  { label: "Quartz 25kg", group: "Product Packaging", href: `${assetBase}/images/products/quartz_25kg.png` },
  { label: "Calcium Bentonite 25kg", group: "Product Packaging", href: `${assetBase}/images/products/calcium_bentonite_25kg.png` },
  { label: "Mabel Gel+ 25kg", group: "Product Packaging", href: `${assetBase}/images/products/mabel_gel_plus_25kg.png` },
  { label: "Mine - aerial 1", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/mine_aerial_1.webp` },
  { label: "Mine - aerial 2", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/mine_aerial_2.jpg` },
  { label: "Mine - aerial 3", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/mine_aerial_3.jpg` },
  { label: "Mine - excavator", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/mine_excavator_1.jpg` },
  { label: "Processing plant 1", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/processing_plant_1.jpg` },
  { label: "Processing plant 2", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/processing_plant_2.webp` },
  { label: "Processing plant 3", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/processing_plant_3.webp` },
  { label: "Processing plant 4", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/processing_plant_4.jpg` },
  { label: "Processing building", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/processing_building_1.jpg` },
  { label: "Warehouse - bagged product", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/warehouse_bagged_product_1.jpg` },
  { label: "Raw material pile 1", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/raw_material_pile_1.jpg` },
  { label: "Raw material pile 2", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/raw_material_pile_2.webp` },
  { label: "Bentonite pellets closeup", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/bentonite_pellets_closeup.jpg` },
  { label: "Mabel Gel raw granules", group: "Mining & Processing Site Photography", href: `${assetBase}/images/site-photos/mabel_gel_raw_granules.jpg` },
];

export const buyerTargets = [
  "Pet Valu",
  "Pet Supplies Plus",
  "Costco",
  "PetSmart",
  "Chewy",
  "Phillips Pet Food & Supplies",
  "Pet Food Experts",
];

export const currentWork = [
  { name: "Chile Supplier Package - Draft v0.1 & v0.2 (A/B)", status: "COMPLETE / AVAILABLE" as Status },
  { name: "Supplier Readiness Tracker", status: "COMPLETE / AVAILABLE" as Status },
  { name: "Master Facts Register", status: "NEXT" as Status },
  { name: "Supplier Information Request Template", status: "UPCOMING" as Status },
  { name: "Master Supplier Dossier Template", status: "UPCOMING" as Status },
];

export const openQuestions: OpenQuestion[] = [
  { question: "What is BENTONIX?", status: "TO CONFIRM", owner: "Unassigned", notes: "Mentioned in the Guia document as a party the dossier is prepared for. Role not defined.", updated: "Not recorded" },
  { question: "What are the approved brand colors, fonts, and logo rules?", status: "PARTIALLY CONFIRMED", owner: "Unassigned", notes: "Live website screenshot confirms real colors (#E68331 / #15151D) and headline typography. Still not a formal, approved brand guide.", updated: "2026-07-30" },
  { question: "Who owns English/Spanish/French translation maintenance?", status: "TO CONFIRM", owner: "Unassigned", notes: "No owner documented.", updated: "Not recorded" },
  { question: "Should the expanded buyer-target list be treated as canonical?", status: "TO CONFIRM", owner: "Unassigned", notes: "Current list of 7 buyer targets is provisional pending confirmation.", updated: "Not recorded" },
  { question: "What is Korea?", status: "TO CONFIRM", owner: "Unassigned", notes: "AI Knowledge Base Guide lists Korea under Customer Subfolders, but it has come up as a possible supplier track alongside Chile. Not resolved.", updated: "2026-07-30" },
];
