import { ArrowUpRight, BriefcaseBusiness, Building2, ChevronRight, FileText, HelpCircle, Home, Image, Languages, ListChecks, Search, Target, X } from "lucide-react";
import { Link, NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  assetBase,
  buyerTargets,
  companies,
  coreDocuments,
  currentWork,
  drafts,
  openQuestions,
  photoAssets,
  sharedAssets,
  type AssetItem,
  type CompanyItem,
  type DocumentItem,
  type PhotoAsset,
  type Status,
} from "./data/dashboard";
import { copy, dataText, type Language, navLabels, sectionCopy, statusLabel } from "./i18n";

type Section = {
  path: string;
  key: keyof typeof navLabels.en;
  count?: string | number;
  icon: typeof Home;
};

type Filters = {
  query: string;
  category: string;
  status: string;
  language: string;
  type: string;
};

const sections: Section[] = [
  { path: "/", key: "home", icon: Home },
  { path: "/chile-drafts", key: "chileDrafts", count: drafts.length, icon: FileText },
  { path: "/core-documents", key: "coreDocuments", count: coreDocuments.length, icon: BriefcaseBusiness },
  { path: "/shared-assets", key: "sharedAssets", count: sharedAssets.length, icon: ListChecks },
  { path: "/companies", key: "companies", count: companies.length, icon: Building2 },
  { path: "/photo-assets", key: "photoAssets", count: photoAssets.length, icon: Image },
  { path: "/buyer-targets", key: "buyerTargets", count: buyerTargets.length, icon: Target },
  { path: "/benchmarks", key: "benchmarks", count: 2, icon: FileText },
  { path: "/current-work", key: "currentWork", count: currentWork.length, icon: ListChecks },
  { path: "/open-questions", key: "openQuestions", count: openQuestions.length, icon: HelpCircle },
];

const initialFilters: Filters = { query: "", category: "", status: "", language: "", type: "" };

function statusClass(status: Status | string) {
  const value = status.toUpperCase();
  if (value.includes("AVAILABLE") || value.includes("ACTIVE")) return "tag tag-available";
  if (value.includes("REQUIRED")) return "tag tag-required";
  if (value.includes("NEXT") || value.includes("UPCOMING") || value.includes("PARTIALLY")) return "tag tag-next";
  return "tag tag-confirm";
}

function unique(values: string[]) {
  return [...new Set(values)].filter(Boolean).sort((a, b) => a.localeCompare(b));
}

function textMatches(value: string, query: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}

function App() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem("zorrito-language") === "es" ? "es" : "en"));
  const location = useLocation();
  const active = sections.find((section) => section.path === location.pathname) ?? sections[0];

  const filterOptions = useMemo(
    () => ({
      categories: unique([...coreDocuments.map((doc) => doc.category), ...photoAssets.map((photo) => photo.group)]),
      statuses: unique([
        ...coreDocuments.map((doc) => doc.status),
        ...sharedAssets.map((asset) => asset.status),
        ...companies.map((company) => company.status),
        ...openQuestions.map((question) => question.status),
      ]),
      languages: unique(coreDocuments.map((doc) => doc.language)),
      types: unique(sharedAssets.map((asset) => asset.type)),
    }),
    [],
  );

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const setAppLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    localStorage.setItem("zorrito-language", nextLanguage);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <img src={`${assetBase}/images/branding/logo_horizontal_black_bg.png`} alt="Zorrito Minerals" />
          <p>{copy[language].projectHome}</p>
        </div>
        <nav className="nav-list" aria-label="Dashboard sections">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <NavLink key={section.path} to={section.path} end={section.path === "/"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
                <span className="nav-label"><Icon size={17} aria-hidden="true" />{navLabels[language][section.key]}</span>
                {section.count !== undefined && <span className="count">{section.count}</span>}
              </NavLink>
            );
          })}
        </nav>
        <div className="sidebar-footer">{copy[language].temporaryStyle}</div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Zorrito Minerals</p>
            <h1>{navLabels[language][active.key]}</h1>
          </div>
          <div className="filters" role="search">
            <div className="language-toggle" aria-label="Language selector">
              <Languages size={16} aria-hidden="true" />
              <button type="button" className={language === "en" ? "active" : ""} onClick={() => setAppLanguage("en")}>EN</button>
              <button type="button" className={language === "es" ? "active" : ""} onClick={() => setAppLanguage("es")}>ES</button>
            </div>
            <label className="search-box">
              <Search size={16} aria-hidden="true" />
              <span className="sr-only">{copy[language].searchDashboard}</span>
              <input value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} placeholder={copy[language].searchEverything} />
            </label>
            <SelectFilter label={copy[language].category} value={filters.category} options={filterOptions.categories} language={language} onChange={(category) => setFilters({ ...filters, category })} />
            <SelectFilter label={copy[language].status} value={filters.status} options={filterOptions.statuses} language={language} onChange={(status) => setFilters({ ...filters, status })} />
            <SelectFilter label={copy[language].language} value={filters.language} options={filterOptions.languages} language={language} onChange={(selectedLanguage) => setFilters({ ...filters, language: selectedLanguage })} />
            <SelectFilter label={copy[language].assetType} value={filters.type} options={filterOptions.types} language={language} onChange={(type) => setFilters({ ...filters, type })} />
            <button className="icon-button" type="button" onClick={() => setFilters(initialFilters)} aria-label={copy[language].clearFilters} title={copy[language].clearFilters} disabled={activeFilterCount === 0}>
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="content">
          <Routes>
            <Route path="/" element={<HomeView language={language} />} />
            <Route path="/chile-drafts" element={<DraftsView language={language} />} />
            <Route path="/core-documents" element={<CoreDocumentsView filters={filters} language={language} />} />
            <Route path="/shared-assets" element={<SharedAssetsView filters={filters} language={language} />} />
            <Route path="/companies" element={<CompaniesView filters={filters} language={language} />} />
            <Route path="/photo-assets" element={<PhotoAssetsView filters={filters} language={language} />} />
            <Route path="/buyer-targets" element={<BuyerTargetsView filters={filters} language={language} />} />
            <Route path="/benchmarks" element={<BenchmarksView filters={filters} language={language} />} />
            <Route path="/current-work" element={<CurrentWorkView filters={filters} language={language} />} />
            <Route path="/open-questions" element={<OpenQuestionsView filters={filters} language={language} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function SelectFilter({ label, value, options, language, onChange }: { label: string; value: string; options: string[]; language: Language; onChange: (value: string) => void }) {
  return (
    <label className="select-filter">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{copy[language].all} {label.toLowerCase()}</option>
        {options.map((option) => <option key={option} value={option}>{dataText(statusLabel(option, language), language)}</option>)}
      </select>
    </label>
  );
}

function HomeView({ language }: { language: Language }) {
  const availableAssets = sharedAssets.filter((asset) => asset.status === "AVAILABLE").length;
  return (
    <section>
      <SectionHeader title={sectionCopy[language].home.title} description={sectionCopy[language].home.description} language={language} />
      <div className="overview-grid">
        <InfoTile label={dataText("Project", language)} value={dataText("Zorrito Minerals", language)} />
        <InfoTile label={dataText("Purpose", language)} value={dataText("Repeatable production system for premium supplier dossiers and retailer-facing sales packages.", language)} />
        <InfoTile label={dataText("Current phase", language)} value={dataText("Foundations and initial asset production", language)} />
        <InfoTile label={dataText("Current focus", language)} value={dataText("Chile supplier package drafting; organizing the production system", language)} />
      </div>
      <div className="stat-grid">
        <StatTile to="/companies" value={companies.length} label={dataText("Companies tracked", language)} />
        <StatTile to="/chile-drafts" value={drafts.length} label={dataText("Drafts ready", language)} />
        <StatTile to="/core-documents" value={coreDocuments.length} label={dataText("Core documents", language)} />
        <StatTile to="/shared-assets" value={`${availableAssets} / ${sharedAssets.length}`} label={dataText("Assets available", language)} />
        <StatTile to="/photo-assets" value={photoAssets.length} label={dataText("Photo & brand files", language)} />
        <StatTile to="/open-questions" value={openQuestions.length} label={dataText("Open questions", language)} />
      </div>
      <div className="spotlight">
        <div className="spotlight-head">
          <h2>{dataText("Chile Drafts - ready for review", language)}</h2>
          <Link to="/chile-drafts">{copy[language].viewBoth} <ArrowUpRight size={14} /></Link>
        </div>
        <DraftGrid compact language={language} />
      </div>
      <div className="note-card">{dataText("Use the sidebar to jump directly to each section. Search and filters apply to whichever indexed view is open.", language)}</div>
    </section>
  );
}

function DraftsView({ language }: { language: Language }) {
  return (
    <section>
      <SectionHeader title={sectionCopy[language].chileDrafts.title} description={sectionCopy[language].chileDrafts.description} language={language} />
      <DraftGrid language={language} />
    </section>
  );
}

function CoreDocumentsView({ filters, language }: { filters: Filters; language: Language }) {
  const items = coreDocuments.filter((doc) => matchesDocument(doc, filters));
  return (
    <section>
      <SectionHeader title={sectionCopy[language].coreDocuments.title} description={sectionCopy[language].coreDocuments.description} count={items.length} total={coreDocuments.length} language={language} />
      <div className="doc-grid">{items.map((doc) => <DocumentCard key={doc.href} doc={doc} language={language} />)}</div>
      <EmptyState show={items.length === 0} language={language} />
    </section>
  );
}

function SharedAssetsView({ filters, language }: { filters: Filters; language: Language }) {
  const items = sharedAssets.filter((asset) => matchesAsset(asset, filters));
  return (
    <section>
      <SectionHeader title={sectionCopy[language].sharedAssets.title} description={sectionCopy[language].sharedAssets.description} count={items.length} total={sharedAssets.length} language={language} />
      <div className="table-wrap">
        <table>
          <thead><tr><th>{dataText("Name", language)}</th><th>{dataText("Type", language)}</th><th>{copy[language].status}</th><th>{dataText("Purpose", language)}</th><th>{dataText("Version", language)}</th><th>{copy[language].lastUpdated}</th><th>{copy[language].notes}</th></tr></thead>
          <tbody>
            {items.map((asset) => (
              <tr key={asset.name}>
                <td><strong>{dataText(asset.name, language)}</strong></td>
                <td>{dataText(asset.type, language)}</td>
                <td><span className={statusClass(asset.status)}>{statusLabel(asset.status, language)}</span></td>
                <td>{dataText(asset.purpose, language)}</td>
                <td>{dataText(asset.version, language)}</td>
                <td>{dataText(asset.updated, language)}</td>
                <td>{asset.notes ? dataText(asset.notes, language) : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EmptyState show={items.length === 0} language={language} />
    </section>
  );
}

function CompaniesView({ filters, language }: { filters: Filters; language: Language }) {
  const items = companies.filter((company) => matchesCompany(company, filters));
  return (
    <section>
      <SectionHeader title={sectionCopy[language].companies.title} description={sectionCopy[language].companies.description} count={items.length} total={companies.length} language={language} />
      <div className="accordion-list">
        {items.map((company) => <CompanyAccordion key={company.name} company={company} language={language} />)}
      </div>
      <div className="note-card">{dataText("Korea has come up as a possible second track, but it is not yet confirmed as a supplier company.", language)}</div>
      <EmptyState show={items.length === 0} language={language} />
    </section>
  );
}

function PhotoAssetsView({ filters, language }: { filters: Filters; language: Language }) {
  const items = photoAssets.filter((photo) => matchesPhoto(photo, filters));
  const groups = ["Branding", "Product Packaging", "Mining & Processing Site Photography"] as const;
  return (
    <section>
      <SectionHeader title={sectionCopy[language].photoAssets.title} description={sectionCopy[language].photoAssets.description} count={items.length} total={photoAssets.length} language={language} />
      <div className="warning-banner">{dataText("Authenticity of the mine/processing site photos is unconfirmed - not verified as genuine photos of Zorrito's own operations vs. stock/rendered imagery. Do not use externally until confirmed.", language)}</div>
      {groups.map((group) => {
        const groupItems = items.filter((photo) => photo.group === group);
        if (groupItems.length === 0) return null;
        return (
          <div key={group} className="photo-section">
            <h2>{dataText(group, language)}</h2>
            <div className="photo-grid">{groupItems.map((photo) => <PhotoCard key={photo.href} photo={photo} language={language} />)}</div>
          </div>
        );
      })}
      <EmptyState show={items.length === 0} language={language} />
    </section>
  );
}

function BuyerTargetsView({ filters, language }: { filters: Filters; language: Language }) {
  const items = buyerTargets.filter((buyer) => matchesBuyer(buyer, filters));
  return (
    <section>
      <SectionHeader title={sectionCopy[language].buyerTargets.title} description={sectionCopy[language].buyerTargets.description} count={items.length} total={buyerTargets.length} language={language} />
      <div className="buyer-grid">{items.map((buyer) => <div className="buyer-chip" key={buyer}><span>{buyer}</span><span>{copy[language].prospect}</span></div>)}</div>
      <EmptyState show={items.length === 0} language={language} />
    </section>
  );
}

function BenchmarksView({ filters, language }: { filters: Filters; language: Language }) {
  const internalExample = coreDocuments.find((doc) => doc.category.includes("Zorrito Example"));
  const externalBenchmark = coreDocuments.find((doc) => doc.category === "External Benchmark");
  const items = [internalExample, externalBenchmark].filter((doc): doc is DocumentItem => Boolean(doc)).filter((doc) => matchesDocument(doc, filters));
  return (
    <section>
      <SectionHeader title={sectionCopy[language].benchmarks.title} description={sectionCopy[language].benchmarks.description} count={items.length} total={2} language={language} />
      <div className="bench-grid">
        {internalExample && matchesDocument(internalExample, filters) && <BenchColumn label="Internal example" doc={internalExample} language={language} />}
        {externalBenchmark && matchesDocument(externalBenchmark, filters) && <BenchColumn label="External benchmark" doc={externalBenchmark} language={language} />}
      </div>
      <div className="rule-box">{dataText("External benchmark materials may guide structure, layout, and communication style, but must never be used as a source for Zorrito claims or copied content.", language)}</div>
      <EmptyState show={items.length === 0} language={language} />
    </section>
  );
}

function CurrentWorkView({ filters, language }: { filters: Filters; language: Language }) {
  const items = currentWork.filter((item) => matchesWork(item, filters));
  return (
    <section>
      <SectionHeader title={sectionCopy[language].currentWork.title} description={sectionCopy[language].currentWork.description} count={items.length} total={currentWork.length} language={language} />
      <div className="work-list">{items.map((item) => <div className="work-item" key={item.name}><strong>{dataText(item.name, language)}</strong><span className={statusClass(item.status)}>{statusLabel(item.status, language)}</span></div>)}</div>
      <EmptyState show={items.length === 0} language={language} />
    </section>
  );
}

function OpenQuestionsView({ filters, language }: { filters: Filters; language: Language }) {
  const items = openQuestions.filter((question) => matchesQuestion(question, filters));
  return (
    <section>
      <SectionHeader title={sectionCopy[language].openQuestions.title} description={sectionCopy[language].openQuestions.description} count={items.length} total={openQuestions.length} language={language} />
      <div className="accordion-list">
        {items.map((item) => (
          <details key={item.question} className="accordion">
            <summary><span>{dataText(item.question, language)}</span><span className="summary-meta"><span className={statusClass(item.status)}>{statusLabel(item.status, language)}</span><ChevronRight size={16} /></span></summary>
            <div className="accordion-body">
              <Field label={copy[language].owner} value={dataText(item.owner, language)} />
              <Field label={copy[language].notes} value={dataText(item.notes, language)} />
              <Field label={copy[language].lastUpdated} value={dataText(item.updated, language)} />
            </div>
          </details>
        ))}
      </div>
      <EmptyState show={items.length === 0} language={language} />
    </section>
  );
}

function SectionHeader({ title, description, count, total, language }: { title: string; description: string; count?: number; total?: number; language: Language }) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {count !== undefined && total !== undefined && <span className="result-count">{copy[language].showing} {count} {copy[language].of} {total}</span>}
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return <div className="info-tile"><span>{label}</span><strong>{value}</strong></div>;
}

function StatTile({ to, value, label }: { to: string; value: string | number; label: string }) {
  return <Link className="stat-card" to={to}><strong>{value}</strong><span>{label}</span></Link>;
}

function DraftGrid({ compact = false, language }: { compact?: boolean; language: Language }) {
  return (
    <div className="draft-grid">
      {drafts.map((draft) => (
        <article className="draft-card" key={draft.href}>
          <div className={`draft-thumb ${draft.variant}`}>{draft.shortName}</div>
          <div className="draft-body">
            <h3>{compact ? dataText(draft.name.replace("Chile Supplier Package - ", ""), language) : dataText(draft.name, language)}</h3>
            <p>{dataText(draft.description, language)}</p>
            <a className="button-link" href={draft.href} target="_blank" rel="noreferrer">{copy[language].viewPdf} <ArrowUpRight size={15} /></a>
          </div>
        </article>
      ))}
    </div>
  );
}

function DocumentCard({ doc, language }: { doc: DocumentItem; language: Language }) {
  return (
    <article className="doc-card">
      <h3>{dataText(doc.name, language)}</h3>
      <code>{doc.file}</code>
      <p>{dataText(doc.purpose, language)}</p>
      <div className="tag-row">
        <span className="tag tag-category">{dataText(doc.category, language)}</span>
        <span className={statusClass(doc.status)}>{statusLabel(doc.status, language)}</span>
        <span className="tag tag-language">{dataText(doc.language, language)}</span>
      </div>
      <a className="text-link" href={doc.href} target="_blank" rel="noreferrer">{copy[language].openFile} <ArrowUpRight size={14} /></a>
    </article>
  );
}

function CompanyAccordion({ company, language }: { company: CompanyItem; language: Language }) {
  return (
    <details className="accordion" open={company.name.includes("Zorrito Chile")}>
      <summary>
        <span><strong>{dataText(company.name, language)}</strong><small>{dataText(company.summary, language)}</small></span>
        <span className="summary-meta"><span className={statusClass(company.status)}>{statusLabel(company.status, language)}</span><ChevronRight size={16} /></span>
      </summary>
      <div className="accordion-body field-grid">
        {company.fields.map((field) => <Field key={field.label} label={dataText(field.label, language)} value={dataText(field.value, language)} links={field.links?.map((link) => ({ ...link, label: dataText(link.label, language) }))} />)}
      </div>
    </details>
  );
}

function Field({ label, value, links }: { label: string; value: string; links?: Array<{ label: string; href: string }> }) {
  return (
    <div className="field">
      <span>{label}</span>
      <p>{value}</p>
      {links && <div className="field-links">{links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={13} /></a>)}</div>}
    </div>
  );
}

function PhotoCard({ photo, language }: { photo: PhotoAsset; language: Language }) {
  return (
    <a className="photo-card" href={photo.href} target="_blank" rel="noreferrer">
      <img src={photo.href} alt={dataText(photo.label, language)} loading="lazy" />
      <span>{dataText(photo.label, language)}</span>
    </a>
  );
}

function BenchColumn({ label, doc, language }: { label: string; doc: DocumentItem; language: Language }) {
  return <div><h3 className="bench-label">{dataText(label, language)}</h3><DocumentCard doc={doc} language={language} /></div>;
}

function EmptyState({ show, language }: { show: boolean; language: Language }) {
  if (!show) return null;
  return <div className="empty-state">{copy[language].noMatches}</div>;
}

function matchesDocument(doc: DocumentItem, filters: Filters) {
  const haystack = `${doc.name} ${doc.file} ${doc.type} ${doc.language} ${doc.category} ${doc.purpose} ${doc.status}`;
  return (!filters.query || textMatches(haystack, filters.query)) &&
    (!filters.category || doc.category === filters.category) &&
    (!filters.status || doc.status === filters.status) &&
    (!filters.language || doc.language === filters.language) &&
    !filters.type;
}

function matchesAsset(asset: AssetItem, filters: Filters) {
  const haystack = `${asset.name} ${asset.type} ${asset.status} ${asset.purpose} ${asset.version} ${asset.updated} ${asset.notes ?? ""}`;
  return (!filters.query || textMatches(haystack, filters.query)) &&
    !filters.category &&
    (!filters.status || asset.status === filters.status) &&
    !filters.language &&
    (!filters.type || asset.type === filters.type);
}

function matchesCompany(company: CompanyItem, filters: Filters) {
  const haystack = `${company.name} ${company.status} ${company.summary} ${company.fields.map((field) => `${field.label} ${field.value}`).join(" ")}`;
  return (!filters.query || textMatches(haystack, filters.query)) &&
    !filters.category &&
    (!filters.status || company.status === filters.status) &&
    !filters.language &&
    !filters.type;
}

function matchesPhoto(photo: PhotoAsset, filters: Filters) {
  const haystack = `${photo.label} ${photo.group}`;
  return (!filters.query || textMatches(haystack, filters.query)) &&
    (!filters.category || photo.group === filters.category) &&
    !filters.status &&
    !filters.language &&
    !filters.type;
}

function matchesBuyer(buyer: string, filters: Filters) {
  return (!filters.query || textMatches(`${buyer} buyer target prospect`, filters.query)) &&
    !filters.category &&
    !filters.status &&
    !filters.language &&
    !filters.type;
}

function matchesWork(item: { name: string; status: Status }, filters: Filters) {
  return (!filters.query || textMatches(`${item.name} ${item.status}`, filters.query)) &&
    !filters.category &&
    (!filters.status || item.status === filters.status) &&
    !filters.language &&
    !filters.type;
}

function matchesQuestion(item: { question: string; status: Status; owner: string; notes: string; updated: string }, filters: Filters) {
  return (!filters.query || textMatches(`${item.question} ${item.status} ${item.owner} ${item.notes} ${item.updated}`, filters.query)) &&
    !filters.category &&
    (!filters.status || item.status === filters.status) &&
    !filters.language &&
    !filters.type;
}

export default App;
