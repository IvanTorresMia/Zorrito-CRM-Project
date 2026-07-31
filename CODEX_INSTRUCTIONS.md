# Zorrito Minerals Project Home — Build Instructions

This repo is the handoff from a Claude session (Cowork) where the Zorrito Minerals project's
source materials were organized and a working HTML prototype of the dashboard was built and
validated with the project owner. Your job is to rebuild this as a proper, scalable React app
and deploy it to GitHub Pages on the repo's default `github.io` domain.

Read this whole file before writing code. It contains the facts, data, and design direction —
you should not need to re-derive anything from the PDFs unless you want to double-check something.

---

## 1. Non-negotiable rule: do not invent facts

This project has one hard rule carried over from the source Claude project's instructions:

> Never fabricate company history, certifications, manufacturing details, product specifications,
> or business relationships. If information is missing, mark it as **PENDING** or **TO CONFIRM** —
> never fill the gap with a plausible-sounding guess.

Every piece of "confirmed" data below is traceable to a source document in `source-data/`.
Everything marked PENDING/TO CONFIRM should stay that way in the app until a human updates it.
When in doubt, under-claim rather than over-claim.

---

## 2. What this app is

A **project home / file index dashboard** for Zorrito Minerals, a Chile-based mineral supplier
(bentonite, quartz, silica products) building out a repeatable system for producing supplier
dossiers and retail sales packages. The audience is two people (the project owner and one
coworker) — this is an internal reference tool, not a public marketing site. It needs to be:

- Clean, fast, easy to scan — no unnecessary scrolling to find things
- A place to click through to source documents, lab reports, photos, and draft deliverables
- Editable/extensible over time as more companies, documents, and facts get added
- Free to host for now (GitHub Pages, default `*.github.io` domain), can move to a custom domain later

## 3. Reference prototype — start here

`reference-prototype/zorrito-project-home-PROTOTYPE.html` is a **fully working, single-file HTML
prototype** already approved by the project owner. Open it in a browser first. It demonstrates the
exact UX to rebuild in React:

- Dark sidebar navigation (not a long scrolling page) with one click per section and a count badge
- A top bar with global search + filters (by category, status, language, asset type)
- A "Home" dashboard tab with clickable stat tiles and a spotlight for the newest deliverables
- Click-to-view PDFs and images (opens in a new tab)
- Collapsible/expandable cards for Companies and Open Questions (use native-feeling accordions)
- Brand colors and typography pulled from the real Zorrito Minerals website (see Section 5)

The prototype embeds all files as base64 data URIs (fine for a single-file HTML demo, **not**
fine for a real app — in the React rebuild, serve images/PDFs as normal static assets from
`source-data/` instead, copied into `public/` or imported normally).

## 4. Tech stack recommendation

- **React + Vite** (fast, simple static build, no backend needed for v1 — all content below can
  live in a typed data file, e.g. `src/data/*.ts`, and be edited by hand or later swapped for a
  CMS/API)
- **react-router** with `HashRouter` (simplest for GitHub Pages, avoids 404/basePath issues) or
  configure Vite's `base` + a proper 404.html redirect trick if you prefer BrowserRouter
- **Deploy via GitHub Actions** to GitHub Pages: on push to `main`, build with Vite, publish
  `dist/` to the `gh-pages` branch (or use `actions/deploy-pages` + `actions/upload-pages-artifact`
  with Pages set to "GitHub Actions" as the source in repo Settings → Pages)
- No database required yet — treat this as a structured content site. Note in the README that a
  future iteration could move the data layer to a small API/CMS if non-technical editing is needed

## 5. Brand identity (confirmed from the live Zorrito Minerals website)

Pulled directly from a screenshot of the production site — see
`source-data/images/branding/website_reference_screenshot.png`.

- **Primary orange (brand accent):** `#E68331`
- **Dark navy/near-black (headers, sidebar, nav):** `#15151D`
- **Typography:** headline font is a bold geometric sans, close to **Poppins Bold/ExtraBold**
  (use Google Fonts `Poppins` — weights 400/600/700 are enough)
- **Logo files:** `source-data/images/branding/logo_stacked.png` and
  `logo_horizontal_black_bg.png` (fox-head shield mark + "ZORRITO" wordmark)
- **Site nav pattern worth echoing:** top orange kicker bar with tagline, dark nav below it,
  "Get In Touch"-style CTA button — you don't need to copy this literally, just stay consistent
  with the palette and type
- Status colors used in the prototype (fine to keep): available/complete = green `#2f6b41` on
  `#e1f0e4`; pending/required = red `#a13a3a` on `#f7e1e1`; to-confirm = violet `#6b5aa8` on
  `#ece8f7`; next/upcoming = orange-tinted `#c96b1f` on `#fdeee0`

**Important:** these colors/type are evidenced by the live site, not from an approved brand
guide — there isn't one yet. Keep the UI clearly labeled as using a provisional style if you
want to be safe, or just note it in the README. Don't present this as "the official Zorrito
brand system."

## 6. Information architecture (10 sections — build as routes/tabs, one per sidebar item)

1. **Home** — dashboard overview, clickable stat tiles, spotlight on latest deliverables
2. **Chile Drafts** — the two supplier package PDF drafts (Section 8)
3. **Core Documents** — the 7 foundational project documents (Section 7)
4. **Shared Assets** — reusable templates/trackers, most still REQUIRED (Section 9)
5. **Companies** — active/prospective supplier companies (Section 10)
6. **Photo Assets** — branding, product packaging, site photography (Section 11)
7. **Buyer Targets** — prospect list, explicitly not clients (Section 12)
8. **Benchmarks** — 1 internal example vs. 1 external benchmark (Section 13)
9. **Current Work** — punch list of what's done/next (Section 14)
10. **Open Questions** — unresolved items, each expandable (Section 15)

## 7. Core documents data (7 items)

| Friendly name | File | Type | Language | Category | Purpose |
|---|---|---|---|---|---|
| Supplier Readiness Program | `source-data/documents/Supplier_Readiness_Program.pdf` | PDF checklist | English | Business Process | Master readiness checklist, 12 sections (company info → 90-day success metrics). States current readiness at 40–50%, target 85–90%. |
| AI Knowledge Base Guide | `source-data/documents/AI_Knowledge_Base_Guide.pdf` | PDF guide | English | Operational Guide | Recommended Drive folder structure so team + AI share one source of truth. |
| Guía para Crear el Supplier Package | `source-data/documents/Guia_Supplier_Package_Zorrito.md` | Markdown | Spanish | Business Process | Lists Supplier Package contents + info still needed "from Chile." States goal: 40–60pg dossier for BENTONIX and future clients. Only doc mentioning BENTONIX. |
| Design References Guide | `source-data/documents/Design_References_Guide.pdf` | PDF guide | English | Creative Standard | Creative direction: modern, premium, industrial, clean; cites Imerys as a style reference. |
| Creative Brief | `source-data/documents/Creative_Brief.md` | Markdown | English | Creative Standard | Master content/structure blueprint: target buyers, visual style (orange/black), section list, deliverable set. |
| Cat Litter Retail Supply Package | `source-data/documents/Zorrito_Cat_Litter_Retail_Supply_Package_EXAMPLE.pdf` | PDF, 12pp | English | Zorrito Example (internal) | Zorrito's own finished example package for Canadian retailers. NOT a competitor doc. |
| Imerys Mineral Solutions for Cat Litter | `source-data/documents/Imerys_Mineral_Solutions_EXTERNAL_BENCHMARK.pdf` | PDF, 10pp | English | External Benchmark | Competitor brochure — style/structure reference ONLY. Never a source for Zorrito claims. |

Plus 2 lab documents (own category, "Internal Reference"):

| Name | File | Notes |
|---|---|---|
| Informe de Ensayo (Test Report) — Cert. 317_2026 | `source-data/lab-reports/Chile_Lab_Test_Report_Cert317_2026.pdf` | Alex Stewart International Chile (ISO 17020/9001 accredited). Bentonite sample "Bentonita Lote 05122025." Full chemistry: SiO2 54.20%, Al 6.99%, Fe 3.19%, Ca 4.83%, Mg 0.28%, moisture 5.5%, LOI 8.81%, plus trace elements. Received 13-07-2026, results 20-07-2026. Raw assay — NOT a formatted COA/TDS/SDS. |
| Sample Receipt — ZORRITO SpA, LAB-2607317 | `source-data/lab-reports/Chile_Sample_Receipt_LAB-2607317.pdf` | Chain-of-custody companion doc to the test report. |

## 8. Chile Drafts data (2 items)

| Name | File | Description |
|---|---|---|
| Draft v0.1 — Industrial Classic | `source-data/drafts/Chile_Supplier_Package_DRAFT_v0.1_IndustrialClassic.pdf` | Clean industrial layout, orange/black accents, CONFIRMED/PARTIAL/PENDING tagging throughout every section. |
| Draft v0.2 — Brand-Matched | `source-data/drafts/Chile_Supplier_Package_DRAFT_v0.2_BrandMatched.pdf` | Bolder layout built from the real website's colors/type — dark section pages, visual readiness bar, lab-data bar chart. |

Both drafts contain identical underlying facts (same CONFIRMED/PARTIAL/PENDING status per
section) — they're an A/B style comparison, not different content.

## 9. Shared Assets data (11 items — mostly still REQUIRED)

| Name | Type | Status | Notes |
|---|---|---|---|
| Supplier Readiness Tracker | Tracker | AVAILABLE | |
| Project Knowledge Map v1 | Reference map | AVAILABLE | Superseded by v2 |
| Project Knowledge Map v2 | Reference map | AVAILABLE | |
| ZPOS Module 0 Dashboard draft | Dashboard draft | AVAILABLE | |
| Master Facts Register | Register | REQUIRED | Next up — central register of verified facts to prevent fabrication across dossiers |
| Supplier Information Request Template | Template | REQUIRED | |
| Master Supplier Dossier Template | Template | REQUIRED | |
| TDS Template | Template | REQUIRED | |
| SDS Template | Template | REQUIRED | |
| COA Template | Template | REQUIRED | |
| QA Checklist | Checklist | REQUIRED | |

## 10. Companies data (2 items)

**Zorrito Chile (ZORRITO SpA Comercializadora)** — ACTIVE, drafting
- Country: Chile (Arica) — CONFIRMED
- Stage: first-draft supplier package produced (2 style variants), routed for team review
- Readiness: PARTIAL — company info, product line & one lab assay confirmed; mining, commercial
  terms, formal TDS/SDS/COA still pending
- Available source files: lab test report, sample receipt, website brand reference, 17
  product/site photos (see `source-data/images/`)
- Missing: company history, mission/vision, org chart, mine location/reserves/permits,
  production capacity, formal TDS/SDS/COA, pricing & export terms, private label, sustainability
- Deliverables: both draft PDFs (Section 8)
- Next action: review both draft styles with the team; route PENDING items to the Chile contact
  (Patricia Rojas, p.rojas@zorritospa.cl, Puerta de América Mz E Lote 5, Arica, Chile)

**BENTONIX** — TO CONFIRM
- Everything TO CONFIRM. Only reference: mentioned once in the Guía document as a party the
  dossier is being prepared for. Role relative to Zorrito Minerals is undefined.
- Next action: confirm BENTONIX's role (see Open Questions)

Design the Companies UI so new companies can be added easily later (e.g. a typed array/object,
not hardcoded JSX) — the project owner has said Korea may become a third entry pending
clarification of what "Korea" actually is (see Open Questions).

## 11. Photo & Brand Assets (24 files, in `source-data/images/`)

- `branding/` — 2 logo lockups (stacked + horizontal), 1 alternate color variant, 1 website
  reference screenshot
- `products/` — 5 confirmed product packaging designs: Cat Litter (4kg), Crystal Cat Litter
  (4kg), Quartz (25kg), Calcium Bentonite (25kg), Mabel Gel+ (25kg — an "ohmic resistance
  reducer" grounding/earthing compound for electrical/industrial use, not pet care)
- `site-photos/` — 15 mine/processing/warehouse photos

**Flag prominently in the UI:** authenticity of the site photos is unconfirmed — not verified as
genuine photos of Zorrito's own operations vs. stock/rendered imagery. Carry this warning into
the Photo Assets view exactly like the prototype does (a visible banner, not a tooltip).

## 12. Buyer Targets (7 — display as prospects, never as clients)

Pet Valu, Pet Supplies Plus, Costco, PetSmart, Chewy, Phillips Pet Food & Supplies,
Pet Food Experts.

This list is explicitly provisional (see Open Questions) — don't hardcode it as if it were final.

## 13. Benchmarks (2 — keep visually/structurally separated)

- **Internal example:** Zorrito Cat Litter Retail Supply Package (Section 7 table)
- **External benchmark:** Imerys Mineral Solutions for Cat Litter (Section 7 table)
- Rule to display prominently: *"External benchmark materials may guide structure, layout, and
  communication style — but must never be used as a source for Zorrito claims or copied
  content."*

## 14. Current Work (5 items, ordered)

1. Chile Supplier Package — Draft v0.1 & v0.2 (A/B) — COMPLETE / AVAILABLE
2. Supplier Readiness Tracker — COMPLETE / AVAILABLE
3. Master Facts Register — NEXT
4. Supplier Information Request Template — UPCOMING
5. Master Supplier Dossier Template — UPCOMING

## 15. Open Questions (5 — build as an expandable list, not a wide table)

1. **What is BENTONIX?** — TO CONFIRM. Mentioned in the Guía document as a party the dossier is
   prepared for; role not defined.
2. **What are the approved brand colors, fonts, and logo rules?** — PARTIALLY CONFIRMED. Live
   website confirms real colors (#E68331 / #15151D) and headline type — used in Draft v0.2 and
   in this app. Still not a formal, approved brand guide. (2026-07-30)
3. **Who owns English/Spanish/French translation maintenance?** — TO CONFIRM. No owner
   documented.
4. **Should the expanded buyer-target list be treated as canonical?** — TO CONFIRM. Current list
   of 7 is provisional.
5. **What is "Korea"?** — TO CONFIRM. The AI Knowledge Base Guide lists Korea under Customer
   Subfolders (implying a market), but it's come up in conversation as a possible second
   supplier track alongside Chile. Not resolved. (2026-07-30)

## 16. Overview / Home tab copy

- Project: Zorrito Minerals
- Purpose: Build a repeatable production system for premium supplier dossiers and
  retailer-facing sales packages.
- Current phase: Foundations and initial asset production
- Current focus: Chile supplier package drafting; organizing the production system
- Stats to surface as clickable tiles: companies tracked (2), drafts ready (2), core documents
  (9, i.e. 7 + 2 lab docs), shared assets available (4 of 11), photo/brand files (24), open
  questions (5)

## 17. What NOT to do

- Don't invent a company history, certifications, or facts for BENTONIX, Korea, mine
  permits/capacity, pricing, or anything else marked PENDING/TO CONFIRM above.
- Don't present the color/font palette as an "official brand guide" — it's evidenced, not
  approved.
- Don't treat Buyer Targets as clients or active deals anywhere in the UI/copy.
- Don't blend the internal example (Cat Litter Retail Supply Package) and the external benchmark
  (Imerys) into one undifferentiated "examples" bucket — keep them visually distinct.

## 18. Suggested first milestones

1. Scaffold Vite + React + TypeScript, add Poppins via Google Fonts, set up the brand color
   tokens as CSS variables.
2. Build the sidebar + tab-routing shell (mirror the prototype's IA from Section 6).
3. Port the data tables above into `src/data/*.ts` files (typed, easy to extend).
4. Build each tab's view, copying images from `source-data/images/` into `public/` (or import
   them so Vite fingerprints/optimizes them) and linking to PDFs in `source-data/` similarly.
5. Wire up search/filter across documents, assets, companies, and buyer targets (reference the
   prototype's filtering logic for behavior, not implementation).
6. Set up the GitHub Actions workflow to deploy to Pages on push to `main`.
7. Confirm the deployed `*.github.io` URL loads correctly, then share it with the project owner
   for review before anything gets treated as "final."

Questions about intent or missing facts should go back to the project owner directly — not be
guessed at here.
