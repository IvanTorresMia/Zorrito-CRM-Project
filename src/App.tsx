import { ArrowUpRight, BriefcaseBusiness, Building2, ChevronRight, FileText, HelpCircle, Home, Image, ListChecks, Search, Target, X } from "lucide-react";
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

type Section = {
  path: string;
  label: string;
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
  { path: "/", label: "Home", icon: Home },
  { path: "/chile-drafts", label: "Chile Drafts", count: drafts.length, icon: FileText },
  { path: "/core-documents", label: "Core Documents", count: coreDocuments.length, icon: BriefcaseBusiness },
  { path: "/shared-assets", label: "Shared Assets", count: sharedAssets.length, icon: ListChecks },
  { path: "/companies", label: "Companies", count: companies.length, icon: Building2 },
  { path: "/photo-assets", label: "Photo Assets", count: photoAssets.length, icon: Image },
  { path: "/buyer-targets", label: "Buyer Targets", count: buyerTargets.length, icon: Target },
  { path: "/benchmarks", label: "Benchmarks", count: 2, icon: FileText },
  { path: "/current-work", label: "Current Work", count: currentWork.length, icon: ListChecks },
  { path: "/open-questions", label: "Open Questions", count: openQuestions.length, icon: HelpCircle },
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

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <img src={`${assetBase}/images/branding/logo_horizontal_black_bg.png`} alt="Zorrito Minerals" />
          <p>Project Home</p>
        </div>
        <nav className="nav-list" aria-label="Dashboard sections">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <NavLink key={section.path} to={section.path} end={section.path === "/"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
                <span className="nav-label"><Icon size={17} aria-hidden="true" />{section.label}</span>
                {section.count !== undefined && <span className="count">{section.count}</span>}
              </NavLink>
            );
          })}
        </nav>
        <div className="sidebar-footer">Temporary UI styling. Colors and type are evidenced by the live website; formal brand guide remains pending.</div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Zorrito Minerals</p>
            <h1>{active.label}</h1>
          </div>
          <div className="filters" role="search">
            <label className="search-box">
              <Search size={16} aria-hidden="true" />
              <span className="sr-only">Search dashboard</span>
              <input value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} placeholder="Search everything" />
            </label>
            <SelectFilter label="Category" value={filters.category} options={filterOptions.categories} onChange={(category) => setFilters({ ...filters, category })} />
            <SelectFilter label="Status" value={filters.status} options={filterOptions.statuses} onChange={(status) => setFilters({ ...filters, status })} />
            <SelectFilter label="Language" value={filters.language} options={filterOptions.languages} onChange={(language) => setFilters({ ...filters, language })} />
            <SelectFilter label="Asset type" value={filters.type} options={filterOptions.types} onChange={(type) => setFilters({ ...filters, type })} />
            <button className="icon-button" type="button" onClick={() => setFilters(initialFilters)} aria-label="Clear filters" title="Clear filters" disabled={activeFilterCount === 0}>
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="content">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/chile-drafts" element={<DraftsView />} />
            <Route path="/core-documents" element={<CoreDocumentsView filters={filters} />} />
            <Route path="/shared-assets" element={<SharedAssetsView filters={filters} />} />
            <Route path="/companies" element={<CompaniesView filters={filters} />} />
            <Route path="/photo-assets" element={<PhotoAssetsView filters={filters} />} />
            <Route path="/buyer-targets" element={<BuyerTargetsView filters={filters} />} />
            <Route path="/benchmarks" element={<BenchmarksView filters={filters} />} />
            <Route path="/current-work" element={<CurrentWorkView filters={filters} />} />
            <Route path="/open-questions" element={<OpenQuestionsView filters={filters} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function SelectFilter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="select-filter">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All {label.toLowerCase()}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function HomeView() {
  const availableAssets = sharedAssets.filter((asset) => asset.status === "AVAILABLE").length;
  return (
    <section>
      <SectionHeader title="Welcome" description="Central file-and-asset index for the Zorrito Minerals project: what exists, what it is for, and what is next." />
      <div className="overview-grid">
        <InfoTile label="Project" value="Zorrito Minerals" />
        <InfoTile label="Purpose" value="Repeatable production system for premium supplier dossiers and retailer-facing sales packages." />
        <InfoTile label="Current phase" value="Foundations and initial asset production" />
        <InfoTile label="Current focus" value="Chile supplier package drafting; organizing the production system" />
      </div>
      <div className="stat-grid">
        <StatTile to="/companies" value={companies.length} label="Companies tracked" />
        <StatTile to="/chile-drafts" value={drafts.length} label="Drafts ready" />
        <StatTile to="/core-documents" value={coreDocuments.length} label="Core documents" />
        <StatTile to="/shared-assets" value={`${availableAssets} / ${sharedAssets.length}`} label="Assets available" />
        <StatTile to="/photo-assets" value={photoAssets.length} label="Photo & brand files" />
        <StatTile to="/open-questions" value={openQuestions.length} label="Open questions" />
      </div>
      <div className="spotlight">
        <div className="spotlight-head">
          <h2>Chile Drafts - ready for review</h2>
          <Link to="/chile-drafts">View both <ArrowUpRight size={14} /></Link>
        </div>
        <DraftGrid compact />
      </div>
      <div className="note-card">Use the sidebar to jump directly to each section. Search and filters apply to whichever indexed view is open.</div>
    </section>
  );
}

function DraftsView() {
  return (
    <section>
      <SectionHeader title="Chile Drafts - Latest Deliverables" description="First-round supplier package drafts for the Chile entity. Same underlying facts in both; gaps remain marked PENDING." />
      <DraftGrid />
    </section>
  );
}

function CoreDocumentsView({ filters }: { filters: Filters }) {
  const items = coreDocuments.filter((doc) => matchesDocument(doc, filters));
  return (
    <section>
      <SectionHeader title="Core Project Documents" description="Foundational source documents, lab reports, and reference materials currently available." count={items.length} total={coreDocuments.length} />
      <div className="doc-grid">{items.map((doc) => <DocumentCard key={doc.href} doc={doc} />)}</div>
      <EmptyState show={items.length === 0} />
    </section>
  );
}

function SharedAssetsView({ filters }: { filters: Filters }) {
  const items = sharedAssets.filter((asset) => matchesAsset(asset, filters));
  return (
    <section>
      <SectionHeader title="Shared Assets" description="Reusable production-system assets. AVAILABLE means usable now; REQUIRED means still not built." count={items.length} total={sharedAssets.length} />
      <div className="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Type</th><th>Status</th><th>Purpose</th><th>Version</th><th>Last updated</th><th>Notes</th></tr></thead>
          <tbody>
            {items.map((asset) => (
              <tr key={asset.name}>
                <td><strong>{asset.name}</strong></td>
                <td>{asset.type}</td>
                <td><span className={statusClass(asset.status)}>{asset.status}</span></td>
                <td>{asset.purpose}</td>
                <td>{asset.version}</td>
                <td>{asset.updated}</td>
                <td>{asset.notes ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EmptyState show={items.length === 0} />
    </section>
  );
}

function CompaniesView({ filters }: { filters: Filters }) {
  const items = companies.filter((company) => matchesCompany(company, filters));
  return (
    <section>
      <SectionHeader title="Companies & Supplier Projects" description="Active or prospective supplier companies with individual dossier work. Buyer targets are listed separately." count={items.length} total={companies.length} />
      <div className="accordion-list">
        {items.map((company) => <CompanyAccordion key={company.name} company={company} />)}
      </div>
      <div className="note-card">Korea has come up as a possible second track, but it is not yet confirmed as a supplier company.</div>
      <EmptyState show={items.length === 0} />
    </section>
  );
}

function PhotoAssetsView({ filters }: { filters: Filters }) {
  const items = photoAssets.filter((photo) => matchesPhoto(photo, filters));
  const groups = ["Branding", "Product Packaging", "Mining & Processing Site Photography"] as const;
  return (
    <section>
      <SectionHeader title="Photo & Brand Assets" description="Branding, product packaging, and mine/processing site photography. Click any image to open full size." count={items.length} total={photoAssets.length} />
      <div className="warning-banner">Authenticity of the mine/processing site photos is unconfirmed - not verified as genuine photos of Zorrito's own operations vs. stock/rendered imagery. Do not use externally until confirmed.</div>
      {groups.map((group) => {
        const groupItems = items.filter((photo) => photo.group === group);
        if (groupItems.length === 0) return null;
        return (
          <div key={group} className="photo-section">
            <h2>{group}</h2>
            <div className="photo-grid">{groupItems.map((photo) => <PhotoCard key={photo.href} photo={photo} />)}</div>
          </div>
        );
      })}
      <EmptyState show={items.length === 0} />
    </section>
  );
}

function BuyerTargetsView({ filters }: { filters: Filters }) {
  const items = buyerTargets.filter((buyer) => matchesBuyer(buyer, filters));
  return (
    <section>
      <SectionHeader title="Buyer Targets" description="Priority buyer / prospect list. These are not clients and not active supplier projects." count={items.length} total={buyerTargets.length} />
      <div className="buyer-grid">{items.map((buyer) => <div className="buyer-chip" key={buyer}><span>{buyer}</span><span>PROSPECT</span></div>)}</div>
      <EmptyState show={items.length === 0} />
    </section>
  );
}

function BenchmarksView({ filters }: { filters: Filters }) {
  const internalExample = coreDocuments.find((doc) => doc.category.includes("Zorrito Example"));
  const externalBenchmark = coreDocuments.find((doc) => doc.category === "External Benchmark");
  const items = [internalExample, externalBenchmark].filter((doc): doc is DocumentItem => Boolean(doc)).filter((doc) => matchesDocument(doc, filters));
  return (
    <section>
      <SectionHeader title="Benchmarks & Examples" description="Internal example vs. external benchmark, kept clearly separate." count={items.length} total={2} />
      <div className="bench-grid">
        {internalExample && matchesDocument(internalExample, filters) && <BenchColumn label="Internal example" doc={internalExample} />}
        {externalBenchmark && matchesDocument(externalBenchmark, filters) && <BenchColumn label="External benchmark" doc={externalBenchmark} />}
      </div>
      <div className="rule-box">External benchmark materials may guide structure, layout, and communication style, but must never be used as a source for Zorrito claims or copied content.</div>
      <EmptyState show={items.length === 0} />
    </section>
  );
}

function CurrentWorkView({ filters }: { filters: Filters }) {
  const items = currentWork.filter((item) => matchesWork(item, filters));
  return (
    <section>
      <SectionHeader title="Current Work" description="What's done and what's next, at a glance." count={items.length} total={currentWork.length} />
      <div className="work-list">{items.map((item) => <div className="work-item" key={item.name}><strong>{item.name}</strong><span className={statusClass(item.status)}>{item.status}</span></div>)}</div>
      <EmptyState show={items.length === 0} />
    </section>
  );
}

function OpenQuestionsView({ filters }: { filters: Filters }) {
  const items = openQuestions.filter((question) => matchesQuestion(question, filters));
  return (
    <section>
      <SectionHeader title="Open Questions" description="Unresolved items. Keep these explicit until source facts change." count={items.length} total={openQuestions.length} />
      <div className="accordion-list">
        {items.map((item) => (
          <details key={item.question} className="accordion">
            <summary><span>{item.question}</span><span className="summary-meta"><span className={statusClass(item.status)}>{item.status}</span><ChevronRight size={16} /></span></summary>
            <div className="accordion-body">
              <Field label="Owner" value={item.owner} />
              <Field label="Notes" value={item.notes} />
              <Field label="Last updated" value={item.updated} />
            </div>
          </details>
        ))}
      </div>
      <EmptyState show={items.length === 0} />
    </section>
  );
}

function SectionHeader({ title, description, count, total }: { title: string; description: string; count?: number; total?: number }) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {count !== undefined && total !== undefined && <span className="result-count">Showing {count} of {total}</span>}
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return <div className="info-tile"><span>{label}</span><strong>{value}</strong></div>;
}

function StatTile({ to, value, label }: { to: string; value: string | number; label: string }) {
  return <Link className="stat-card" to={to}><strong>{value}</strong><span>{label}</span></Link>;
}

function DraftGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="draft-grid">
      {drafts.map((draft) => (
        <article className="draft-card" key={draft.href}>
          <div className={`draft-thumb ${draft.variant}`}>{draft.shortName}</div>
          <div className="draft-body">
            <h3>{compact ? draft.name.replace("Chile Supplier Package - ", "") : draft.name}</h3>
            <p>{draft.description}</p>
            <a className="button-link" href={draft.href} target="_blank" rel="noreferrer">View PDF <ArrowUpRight size={15} /></a>
          </div>
        </article>
      ))}
    </div>
  );
}

function DocumentCard({ doc }: { doc: DocumentItem }) {
  return (
    <article className="doc-card">
      <h3>{doc.name}</h3>
      <code>{doc.file}</code>
      <p>{doc.purpose}</p>
      <div className="tag-row">
        <span className="tag tag-category">{doc.category}</span>
        <span className={statusClass(doc.status)}>{doc.status}</span>
        <span className="tag tag-language">{doc.language}</span>
      </div>
      <a className="text-link" href={doc.href} target="_blank" rel="noreferrer">Open file <ArrowUpRight size={14} /></a>
    </article>
  );
}

function CompanyAccordion({ company }: { company: CompanyItem }) {
  return (
    <details className="accordion" open={company.name.includes("Zorrito Chile")}>
      <summary>
        <span><strong>{company.name}</strong><small>{company.summary}</small></span>
        <span className="summary-meta"><span className={statusClass(company.status)}>{company.status}</span><ChevronRight size={16} /></span>
      </summary>
      <div className="accordion-body field-grid">
        {company.fields.map((field) => <Field key={field.label} {...field} />)}
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

function PhotoCard({ photo }: { photo: PhotoAsset }) {
  return (
    <a className="photo-card" href={photo.href} target="_blank" rel="noreferrer">
      <img src={photo.href} alt={photo.label} loading="lazy" />
      <span>{photo.label}</span>
    </a>
  );
}

function BenchColumn({ label, doc }: { label: string; doc: DocumentItem }) {
  return <div><h3 className="bench-label">{label}</h3><DocumentCard doc={doc} /></div>;
}

function EmptyState({ show }: { show: boolean }) {
  if (!show) return null;
  return <div className="empty-state">No indexed items match the current filters.</div>;
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
