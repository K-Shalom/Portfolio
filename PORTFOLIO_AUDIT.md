# Portfolio V2 initial audit

Inspected November 28, 2026, branch portfolio-v2, HEAD 0cb128a. Initial working tree clean; no earlier implementation phase completed. This is a local source audit, not a production penetration test or independent verification of personal claims.

## Structure and stack

- Root: server.js, index.html, package manifests, Vite/Tailwind/ESLint configuration, tracked data_store.json, README and public assets. No existing renovation documents or test suite found.

- src/App.jsx composes Navbar, Hero, About, Projects, Articles, Certificates, Events, Skills, Contact, Footer, assistant and admin modal, plus loader/progress/cursor/particle effects. Timeline exists separately but is not composed by App.jsx.

- src/components contains section components; hooks manage CMS caching, AI chat, scrolling, skill bars and physics; src/data contains six seed/content modules. No feature routing or backend module structure currently exists.

- Installed baseline: Node 26.13.0, npm 11.20.0, React/React DOM 19.2.8, Vite 8.1.5, Tailwind 4.3.3, Express 4.22.2, MUI 6.5.0, Emotion 11.14.0, Resend 6.20.0, ESLint 10.8.0. package.json also declares nodemailer, @openrouter/agent and yaml; current mail route imports Resend directly.

## Backend, endpoints and storage
server.js owns CORS, body parsing, email, passcodes, CRUD, persistence and Vite/static hosting. JSON is loaded into process memory from process.cwd()/data_store.json, falling back to seed modules. Writes synchronously overwrite the full file; exceptions are logged without propagating persistence failure. There is no database, transaction, atomic file replacement or multi-instance coordination.

| Routes | Behavior |
| --- | --- |
| GET /api/projects, /api/articles, /api/certificates, /api/events | Public collections |
| POST same collection paths | Create records |
| PUT /api/{collection}/:id | Merge updates |
| DELETE /api/{collection}/:id | Remove matching records |
| POST /api/send-email | Resend contact email |
| POST /api/request-admin-code | Generate and email six-digit code |
| POST /api/verify-admin-code | Compare in-memory code and expiry |
| GET /api/health | Status and collection counts |

AdminModal provides create/edit/delete tabs for four collections and email passcode UI. Verification returns success without issuing a session or token. CMS requests send no authentication proof. useCMSData initializes from localStorage or seeds, fetches four collections, and falls back to local changes even after failed writes. Invalid cached JSON is not caught at initialization.

## Content inventory (preserve; authenticity needs owner evidence)
Seed projects (8): Smart Small Business Management Web App; Green Vehicle Exchange Initiative (GVEI); E-Portfolio System; Local Chat App; Task Management System; Library Management System; Smart Attendance System (IoT); Smart Irrigation Monitoring System. Stored projects (9) additionally contain `jasjas`. Do not delete this record without review. Project links frequently point to the generic K-Shalom profile; several live links are #. No verified project-specific completion statuses or authentic screenshot collection established.

Articles (3, identical in seeds/store): Architecting Enterprise Backend Systems with Spring Boot & Spring Security; Bridging Hardware & Web: Building IoT Micro-Controllers with Arduino & Node.js; The Full-Stack Developer Roadmap in East Africa.

Certificates (4, identical in seeds/store): Advanced Full-Stack Engineering & Spring Boot Architecture; Embedded Systems & IoT Hardware Engineering Specialist; Relational Database Administration & ERD Systems; Modern React & Interactive Frontend Engineering. Records mark credentials verified but link to the generic GitHub profile; that does not verify issuance.

Events (3, identical in seeds/store): Rwanda Tech Innovation Summit & IoT Expo; Karongi Engineering & Developer Hackathon; East Africa Open Source Developer Conference. Awards and participation claims are present, not independently established by this audit.

Skills (29 in six groups): HTML5, CSS3, JavaScript, React, Bootstrap, Tailwind CSS; PHP, Java, Spring Boot, Node.js, REST APIs, Authentication, JDBC, C / C++; Arduino, IoT Systems, Sensors & Automation, Wokwi Simulation; MySQL, Oracle DB, ERD Modeling, SQL Optimization; Git / GitHub, VS Code, Linux CLI, Hosting Basics, GitHub Actions; Figma, UI/UX Thinking. Percentages are hardcoded self-assessments, not measured results. AI knowledge additionally mentions Spring Security and hardware components. Timeline contains six milestones from 2023–2026. Profile/contact source identifies Shalom Kubwimbabazi, Rwanda Polytechnic–Karongi College, Rwanda, K-Shalom GitHub, email and social links. Retain source information pending verification.

## Security findings
| Priority | Evidence | Finding and recommended work |
| --- | --- | --- |
| Critical | server.js CRUD handlers | All collection mutations lack authentication/authorization middleware. Protect server-side before exposing renovated administration. |
| High | useAIChat.js | VITE_OPENROUTER_API_KEY is read in the browser and sent directly to OpenRouter. If configured, it is publicly exposed; move provider calls server-side and assess rotation if previously deployed. No actual key found or printed in this audit. |
| High | server.js CORS callback | Both allowed and disallowed origins receive callback(null, true), with credentials enabled. Enforce the allowlist. |
| High | passcode routes | Math.random code generation, no attempt limits/rate limits, reusable code until expiry, no authenticated session; requests can overwrite the global code. Use secure random codes, single-use verification, throttling and sessions. |
| Medium | contact route | Presence-only checks, unescaped fields interpolated into email HTML, no visible route rate limiting. Validate types/length/email and escape HTML. |
| Medium | persistence/CRUD | Broad req.body merges, generic defaults, 10 MB JSON limit; weak schema guarantees. Validate allowed fields and reliable write outcomes. |

These findings are source-supported; no production exploit requests or write tests were performed. Offline npm audit reported zero advisories, but that is not a current online vulnerability assessment.

## Architecture, UX, accessibility and performance

- AdminModal mixes authentication, four forms, editing and presentation in one large component. Inline styles and hardcoded accents are repeated across sections. Extract shared primitives and feature logic progressively.

- Current primary CSS tokens are blue (#3B82F6 dark, #2563EB light), not the target indigo. Some Timeline borders retain yellow-green rgba(232,255,0,...). Fonts load Space Grotesk/Fira Code via remote Google CSS. Replace branding through centralized tokens during Phase 3.

- Card-heavy sections and decorative effects are apparent in source; final visual quality and responsive behavior have not been browser-reviewed.

- Admin, project and article modal source lacks dialog semantics, Escape handling and focus management. Contact does have explicit labels; Navbar includes menu aria labels/expanded state. CSS and several hooks support reduced motion, but ParticleBackground runs requestAnimationFrame without checking that preference. Full WCAG/contrast and screen-reader testing remain pending.

- All sections and admin are statically imported. Built JS is 408.85 kB (117.69 kB gzip), CSS 15.99 kB (4.54 kB gzip), hero PNG 13.05 kB. These are build sizes, not runtime performance scores.

- ParticleBackground draws pairwise particle connections on every frame (30–80 particles). Remote Unsplash imagery and Google Fonts add network dependencies. Profile responsive performance before changing effects.

- index.html has canonical/social metadata and JSON-LD, but YOUR-OG-IMAGE.png and YOUR-PROFILE-IMAGE.jpg placeholders remain. robots/sitemap use www.shalomk.me; sitemap lastmod is fixed at 2026-08-18. Canonical host/asset validation is required.

## Environment and deployment
No .env or .env.example present. Source references PORT, NODE_ENV, RESEND_API_KEY, ADMIN_EMAIL, SMTP_USER, ALLOWED_ORIGIN, VITE_API_BASE_URL and VITE_OPENROUTER_API_KEY. Never put secrets in VITE variables. CMS/admin default to localhost:3000; Contact hardcodes the live Render URL, so UI contact submission is unsafe for isolated baseline testing. Vite proxies /api to localhost:3000. Non-production Express embeds Vite; production serves dist when present. Source references Cloudflare Pages and Render, but no provider deployment manifest or verified deployed environment was found. Vite is imported at server module scope despite being a dev dependency; production install strategy needs checking. data_store.json is tracked even though ignored; ignores do not untrack existing files. README remains Vite boilerplate with malformed trailing text.

## Baseline checks
| Check | Actual result |
| --- | --- |
| npm run build | PASS: 383 modules, Vite reported 5.29 s |
| npm run lint | FAIL: three errors in Timeline.jsx (unused useEffect at line 1; two react-hooks/immutability errors at line 164) |
| Automated tests | No test script or suite found; not reported as passed |
| npm ls --depth=0 | PASS, installed dependency inventory obtained |
| npm audit --offline --json | Zero reported advisories; offline/cache-limited, not security clearance |
| node server.js | Startup logged on port 3000; missing RESEND_API_KEY warning expected |
| Local HTTP smoke checks | PASS on temporary port 3012: homepage, health and four collections all 200; counts 9/3/4/3. Initial sandbox requests EACCES; separate-scope retry ETIMEDOUT. Same-scope server/request execution succeeded. Concurrent first server caused an HMR port warning, without preventing HTTP checks. |

## Limitations and recommendations
Do not deploy the existing unprotected CMS. Prioritize server authorization, secret isolation, input validation and abuse prevention in Phase 1, then modularity and durable persistence in Phase 2. Preserve all stored records and establish explicit migration checks. Follow the indigo and content requirements in the plan after security foundations.

Historical source gap: resolved by the final scope confirmation recorded below. No production data modified, emails sent, external project repositories inspected, live services tested, browser screenshots captured, or Lighthouse/assistive-technology evaluation performed. RP implementation/security claims require separate evidence from its actual repositories; the owner's supplied status is recorded as owner-provided.

## Phase 0 finalization follow-up
On November 28, 2026 the owner authorized the mandatory GitHub workflow for completed phases. GitHub repository metadata confirms K-Shalom/Portfolio is public and its default branch is main. Configured origin is https://github.com/K-Shalom/Portfolio.git. After an authorized fetch, local main and origin/main both point to 0cb128a with zero divergence; portfolio-v2 remains the Phase 0 branch. No phase PR was returned by the GitHub search at this inspection.

Fetched default-branch tree contains no .github/workflows files or hosting deployment manifest. Render/Cloudflare service-side deployment settings were not accessible through this inspection, so automatic deployment on push/merge remains unknown. Absence of a repository manifest is not evidence that deployment is disabled. Do not merge until the deployment gate is resolved.

At that follow-up the workflow attachment did not contain the referenced original scope, so requirements coverage remained unverified. The final scope confirmation now resolves this historical gap. No application or data changes were made to compensate for this gap. IMPLEMENTATION_PLAN.md now maps every identified baseline issue to its owning phase, including the three Timeline.jsx lint failures in Phase 6.

## Final scope reconciliation
The owner explicitly confirmed the existing inventory, detailed design/RP specification, GitHub workflow and final scope confirmation as the complete authoritative scope. PORTFOLIO_MASTER_SPEC.md preserves those complete source texts; no earlier prompt is needed. It includes 19 named projects, all 13 technical skill categories and 16 Lab categories, education (Advanced Diploma IT, Year 3, expected 2027), class leadership and seven-week Tajyire industrial attachment (May 4–June 19, 2026). CONTENT_REVIEW.md reconciles the nine existing stored records and all named projects, avoiding unsupported identity merges. Missing project evidence/screenshots/proficiency is deferred to Phases 4–9 and does not block Phase 0. Original runtime audit results above remain valid historical baseline, not a claim of a secure/test-complete application.

## Confirmed GitHub deployment evidence after Phase 0 push
PR #1 is open and its Cloudflare Pages check failed with summary Build failed; provider root cause has not been determined. GitHub Pages API confirms source main:/, build_type legacy, status built and published URL http://shalomk.me/Portfolio/. Recent dynamic pages build and deployment Actions runs on main succeeded. No branch protection, rulesets or repository webhooks were returned. External Cloudflare/Render production settings remain unverified. This explains why the absence of checked-in workflows did not rule out automatic publishing; stop before merge under the owner deployment restriction. No production settings were changed.

## Phase 1 security implementation — November 28, 2026

Scope: owner-authorized implementation on portfolio-v2-phase-01-security. No merge, production deployment, credential rotation, DNS/hosting/environment change or Phase 2 work.

Implemented: keyed-hash single-use cryptographic OTPs (10 minutes, five attempts, cooldown/rates); memory-only 30-minute revocable bearer sessions and logout; shared server auth on all four collection mutations/draft reads; strict field/type/length/date/list/URL/ID validation and no mass assignment; exact-origin CORS without ambient cookies; API/static-frontend headers/CSP; bounded payloads, rates, contact HTML/header escaping/deduplication; server-only fixed-endpoint AI with public context, timeout/token/history/IP/global limits and safe fallback; generic errors and no provider/token/code logging; client failure handling without fake saved state or draft/token caches. Minimal app factory/security files enable isolated testing, not a Phase 2 feature-module renovation.

Dependency assessment: fresh online baseline 21 (6 direct/15 transitive; 4 critical, 8 high, 9 moderate). Removed verified unused Pigment/OpenRouter-agent/nodemailer/yaml integrations and updated compatible resolutions within framework majors. Final online npm audit: zero known advisories. Per-package installed versions, dependency chains, exposure and decisions are in DEPENDENCY_SECURITY_REVIEW.md. No force fixes or automatic breaking downgrade/upgrade. npm/package-lock preserved; data_store.json unchanged with nine original projects.

Verification: npm ci PASS (295 installed on first revised lock); justified subsequent compatible update changed three packages. npm test PASS, 12 scenarios including actual local HTTP API behavior and mocked client bearer/session/error handling. Mock mail/AI, injected clock and isolated persistence; no real messages/provider costs/data writes. Production build PASS (Vite 8.4, 384 modules). Client bundle credential-pattern scan PASS, plus build guard rejection of a fake legacy VITE provider key without revealing it. npm run lint has exactly the three baseline Timeline.jsx errors (unused useEffect, two immutability errors), zero new errors/warnings. Six local HTTP smoke endpoints returned 200; content counts 9/3/4/3. Real browser automation timed out twice, so no fresh visual/manual browser authentication pass is claimed; client transport and backend behavior have automated coverage. HMR port warning during Vite-based transport test is dev-only and did not fail tests; local regression server cleanup tracked separately.

Release prerequisites: do NOT merge yet. On Render verify ADMIN_EMAIL, verified MAIL_FROM, RESEND_API_KEY, NODE_ENV production, exact ALLOWED_ORIGINS and verified TRUST_PROXY_HOPS; move OpenRouter key to server-only OPENROUTER_API_KEY with provider budget. On Cloudflare remove VITE_OPENROUTER_API_KEY/VITE_WEB3FORMS_KEY; keep VITE_API_BASE_URL and frontend CSP connect-src aligned to API host. Build intentionally rejects legacy VITE provider-key variables. Owner-authorized rotation of previously browser-exposed OpenRouter credential is required before production reuse; no values revealed or rotated here. Preview frontend alone uses the currently deployed old API unless a secured staging API is configured, so does not prove new server deployed. Deploy backend first, then frontend; old admin clients/new backend require refresh and login, new client/old backend fails closed without token. Public reads/contact contracts retained. Single-instance in-memory limits/sessions reset on restart; provider-side budget/coordinated state needed before scaling. See SECURITY.md for exact controls/limits, configuration and safe rollback.
