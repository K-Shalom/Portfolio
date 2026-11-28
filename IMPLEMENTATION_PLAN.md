# Portfolio V2 implementation plan

Status: FINALIZED for the owner-confirmed November 28, 2026 scope. PORTFOLIO_MASTER_SPEC.md preserves the full final confirmation, detailed design/RP specification and mandatory GitHub workflow. Existing repository inventory is included; the earlier missing-prompt blocker is resolved. CONTENT_REVIEW.md tracks later evidence and status checks without blocking Phase 0.

This renovates the existing application. Preserve existing stack, public features, authentic content and all nine stored project records; do not create duplicates. The owner's latest workflow authorizes commits, phase-branch pushes, PRs and qualifying merges; production deployment remains unauthorized. No phase beyond Phase 0 is currently authorized. The numbered phase order governs sequencing: security, architecture, then design.

## Mandatory phase delivery workflow
Apply AGENTS.md's eleven-step GitHub workflow to all 13 phases: (1) status/remote/default-branch verification, fetch and safe default-branch synchronization, then dedicated phase branch (Phase 0 retains portfolio-v2); (2) scoped implementation against criteria; (3) relevant automated/manual verification with baseline failures distinguished; (4) dedicated full-diff review recorded in CODE_REVIEW.md, severity classification and blocker fixes/rechecks; (5) inspect/stage only relevant credential-free files and conventional commit; (6) non-force push via configured remote, never implementation directly to default; (7) create/update one PR targeting actual default; (8) inspect PR diff/base/conflicts, checks/security findings/comments/required approvals and request available authorized automated review; (9) conditional squash merge without bypassing protections; (10) fetch/default-branch pull, verify clean synchronization, safely remove phase branch and commit/synchronize tracker metadata; (11) report implementation and GitHub integration statuses separately, then stop.

PR content must cover phase/title, summary/objectives, modified files, features, bug/security fixes, architecture, screenshots where applicable, tests, code review findings/resolutions, limitations, breaking changes, acceptance checklist, rollback and next phase. Self-review is not human approval. Do not enable paid reviewers/infrastructure. Every phase must satisfy its acceptance criteria plus this delivery workflow. Required tests/checks/approvals must pass, conflicts and critical/high blockers must be resolved, and no new regression may remain before merging.

Inspect branch-triggered hosting behavior. Do not merge if it would deploy production without authorization; if unknown, record the unresolved gate. No production environment/DNS changes, production data deletion, destructive migrations, force pushes or protection bypass. Record branch, implementation commit, push, PR URL/status, merge SHA, test/review/acceptance statuses, issues and blockers. Keep progress committed/synchronized; exact final commit hashes also belong in the PR/report rather than self-referential file content. Phase 1 requires explicit continuation even after Phase 0 integration.

Suggested branches: portfolio-v2-phase-01-security, phase-02-architecture, phase-03-design-system, phase-04-homepage, phase-05-projects, phase-06-profile-skills, phase-07-developer-lab, phase-08-admin-dashboard, phase-09-advanced-features, phase-10-optimization, phase-11-testing, phase-12-documentation (each with portfolio-v2- prefix).

## Requirement register

### R1 — Brand and distinct compositions
Centralize CSS variables and tokens, including spacing, typography, borders, interaction and semantic success/warning/error/info colors. Green may indicate functional success, never the main brand.

| Token | Dark | Light |
| --- | --- | --- |
| Main background | #0B0D12 | #F8FAFC |
| Secondary surface | #151821 | #FFFFFF |
| Elevated surface | #1E2230 | To be selected and contrast-tested |
| Primary accent | #6366F1 | #4F46E5 |
| Secondary accent | #818CF8 | #6366F1 |
| Primary text | #F8FAFC | #0F172A |
| Secondary text | #94A3B8 | #64748B |
| Borders | #2D3342 | #E2E8F0 |

Evaluate Space Grotesk or Manrope headings, Inter body and JetBrains Mono technical text for readability and brand fit. Do not repeatedly hardcode colors.

Use asymmetrical editorial homepage; alternating large image/text featured showcases; filterable responsive all-project gallery; professional case studies; skills bento; editorial About; vertical journey timeline; experimental Developer Lab; digital-magazine articles; clean credential gallery; minimal welcoming functional contact. Keep coherent navigation and interactions across these compositions.

Avoid identical section structures, repeated three-column grids, excessive rounded containers, card-wrapping everything, glassmorphism, gradients/glows, generic generated patterns, unnecessary icons, fake dashboard statistics, excessive badges and purposeless empty space. Use typography, alignment and meaningful whitespace.

### R2 — Modular application
Adapt the proposed structure to the current stack: src/app, components/{ui,layout,shared}, features/{home,about,projects,skills,journey,articles,certificates,events,lab,contact,assistant,admin}, hooks, services, contexts, config, styles, utils, routes. Backend: backend/src/{config,modules,middleware,database,services,utils,app.js,server.js}; modules for auth, projects, articles, certificates, events, profile, skills, lab, contact and assistant; backend/tests.

Require separation of concerns, reusable UI, feature-specific logic, centralized API/config/error handling, independent modules, maintainable routing, shared authentication middleware, beneficial route lazy-loading and minimal coupling. Keep bootstrap files small. No unnecessary microservices/micro-frontends. Do not mechanically create empty directories.

### R3 — RP Smart Attendance canonical content

- Name RP Smart Attendance; slug rp-smart-attendance; primary final-year capstone, in progress. Categories IoT, Education Technology, Full-Stack Development, Biometric Systems.

- Summary: IoT biometric attendance for Rwanda Polytechnic, ESP32 fingerprint scanners connecting attendance to academic timetables. Designed for eight colleges; do not claim deployment/adoption across them.

- Problem: manual lecturer-led marking is time-consuming, inconsistent and vulnerable to proxy attendance, bias, late-arrival/name-calling errors; cumulative tracking and eligibility decisions are difficult.

- Solution: centralized multi-college platform identifying the device's room, matching scan time to a timetable slot and recording/scoring the session with reporting and role dashboards.

- Scores: absent 0%; check-in only 50%; late or excused 95%; full check-in/check-out 100%. Cumulative student/course attendance uses adjustable exam threshold, default 80%.

- Features: fingerprint check-in/check-out API, timetable matching, duplicate protection, percentage scoring, exam eligibility and adjustable threshold; check-in confirmations, checkout reminders, low-attendance warnings, weekly email reports; multi-college management and college-scoped authorization; college/department/program/course/classroom/device/timetable management; trends, at-risk identification, filterable reports, CSV export, bulk student CSV import; responsive dashboards, device-aware light/dark themes and tabbed settings.

- Five roles: Super Admin across colleges; Quality Assurance college monitoring/reporting; HOD department academic/attendance management; Lecturer course monitoring; Student personal attendance and eligibility.

- Backend technology: Laravel 13, PHP 8.4, PostgreSQL, Laravel Sanctum, REST API. Frontend: React, Vite, Tailwind CSS, React Router, Recharts, Material UI icons. Hardware: ESP32 and R307 or AS608 fingerprint sensor. Tools: Postman, Mailtrap, Git, GitHub. These describe the capstone, not a rewrite of the portfolio backend into Laravel.

- Contribution: sole developer; designed schema/API and role-based React frontend/web dashboards. Owner reports backend and dashboards working; ESP32 fingerprint hardware integration is next. Do not portray the planned hardware path as fully implemented.

- Backend repository: https://github.com/K-Shalom/rp-smart-attendance ; frontend repository: https://github.com/K-Shalom/rp-smart-attendance-frontend . Separate Backend Repository and Frontend Repository actions. No invented live URL.

### R4 — Capstone case study and privacy
Include overview, problem, solution, target users, system architecture, attendance workflow/scoring, roles/permissions, multi-college architecture, stack, database architecture, actual screenshots, contribution, challenges, current status, future improvements and repository links. Challenges/database internals must come from verified evidence, not invented prose.

Responsive planned architecture: Student Fingerprint → Fingerprint Sensor → ESP32 → Laravel REST API → PostgreSQL → React Dashboards. API branches: device/room identification, timetable matching, scoring, duplicate protection, exam eligibility and email notifications. Label working software versus pending hardware. Visualize all four scores and explain adjustable default 80% eligibility.

Discuss biometric privacy, data protection, device authentication, role authorization and college isolation responsibly. Only call controls implemented after checking actual project evidence. Never show real students, templates, credentials or private attendance data.

Gallery slots editable in CMS: Super Admin, Quality Assurance, HOD, Lecturer and Student dashboards; attendance reports; timetable management; ESP32 device management; student management; settings; hardware prototype when available. Use authentic images, otherwise clearly labeled replaceable placeholders. Do not generate fake actual-system screenshots.

### R5 — Project model and inventory
Extend compatibly for multiple repositories, category, featured flag/order, status/type, role, development progress, problem, solution, architecture, key features, grouped technologies, screenshots, hardware, challenges, future improvements, optional live demo/documentation links and SEO metadata. Every field must be admin-manageable. Preserve old records/IDs and legacy github/live fields during migration.

Suggested featured order, admin editable: RP Smart Attendance; Menyesha System; OPTW — Online Players Transfer Window; MyIkibina; Chattova; CungaAI. Descriptions are supplied in the master spec; verify actual implementation/status before publishing completion claims. Preserve all eight seed projects and the ninth stored record listed in the audit. Inspect whether generic Smart Attendance is the same capstone; merge only with confirmation/evidence and preserve distinct projects. Distinguish completed, ongoing, prototype and proposed concepts.

### R6 — Profile and skills
Preserve the audit's complete existing skills/content inventory. Add authentic coverage of full-stack development, UI/UX, REST API architecture, Laravel/React, database design, PostgreSQL/MySQL, multi-tenant concepts, RBAC, IoT/embedded systems, ESP32, biometrics, networking, USSD and technical problem-solving. Distinguish practical experience, familiarity and current learning; do not call the owner an expert in everything. The complete confirmed inventory in PORTFOLIO_MASTER_SPEC.md is authoritative. Use Practical Experience, Familiar and Currently Learning; no arbitrary percentage ratings.

### R7 — Confirmed profile, attachment and complete inventories
PORTFOLIO_MASTER_SPEC.md contains all source details verbatim. Profile: Shalom Kubwimbabazi, Rwanda, Full-Stack Developer, UI/UX Designer and Multidisciplinary IT Professional; RP Karongi College Advanced Diploma in Information Technology, final year/Year 3, expected completion 2027. Class Representative: academic coordination, communication and collaboration. No senior-engineer or unearned qualification claims.

Industrial attachment: Tajyire Training Center — TAJYIRE Electronics/Group, Kigali, May 4–June 19, 2026, seven weeks. Preserve every listed hardware/software activity in the master spec; assign journey to Phase 6 and experiments/evidence to Phase 7. Use authentic internship photos where available.

All 19 named projects, all technical skill categories/items and all 16 Developer Lab categories are required. The master spec is the exhaustive item-level checklist; CONTENT_REVIEW.md maps projects to existing records and verification tasks. Verify identities before updating/merging, preserving nine stored records and authentic discoveries. Draft/unverified records are allowed; no fabricated capabilities or screenshots.

### R8 — Functional coverage and phase ownership

- Phase 2: central API, data persistence, feature routing and content contracts.

- Phase 3: shared layout, light/dark/system themes and accessible navigation.

- Phase 4: homepage/About preview, contact, verified CV access and no fabricated/download-dead CV action.

- Phase 5: featured/gallery/case studies, filters AND search, multiple repositories and all 19 project requirements with authentic status labels.

- Phase 6: full About/profile, complete categorized skills without percentages, education, attachment, professional journey, credentials and events.

- Phase 7: dedicated Developer Lab with all 16 categories, authentic screenshots/snippets/explanations/repositories/challenges/lessons, plus articles.

- Phase 8: all major content admin-manageable, including profile, skills, education, journey, attachment, certificates/events/articles/Lab, project case-study fields, ordering, screenshots and CV content.

- Phase 9: existing assistant improvement, global search, command palette and GitHub integration where beneficial; accessible keyboard behavior, honest loading/error/fallback states and no provider secrets.

- Phase 10: SEO/accessibility/performance across every public route/theme; Phase 11 verifies all flows; Phase 12 documents setup/configuration, security, persistence, content operations and deployment readiness. GitHub delivery follows the mandatory workflow on every phase.

## Baseline issue ownership
| Inspected finding | Owning phase and verification |
| --- | --- |
| Unprotected mutations, missing sessions, weak/reusable passcode, unrestricted CORS | Phase 1: negative auth/origin/replay/abuse tests |
| Browser provider secret, contact validation/HTML and payload limits | Phase 1: server boundary, input tests and client artifact scan; assistant polish Phase 9 |
| Synchronous JSON durability, broad update merges, misleading local write success, cache parse failures | Phase 1 validation; Phase 2 persistence/error/cache tests |
| Large admin component and absent modular routes/config | Phase 2 structural refactor; Phase 8 editor completeness tests |
| Existing Timeline.jsx lint errors (three) and unreachable timeline | Phase 6 journey integration: fix unused import/ref handling and require lint pass; fix earlier only if an earlier phase touches it |
| Blue/legacy yellow-green styling, repeated inline styles/fonts/effects | Phase 3 tokens; Phase 4/6/7 distinct compositions |
| Generic project links, jasjas extra record, attendance identity ambiguity | Phase 5 evidence and inventory/ID/no-duplicate checks; preserve all nine records |
| Unsupported verified credential/award claims and self-assessed skill percentages | Phase 6 content provenance and experience qualification |
| Stale duplicated AI knowledge | Phase 9 verified content and fallback tests |
| Modal semantics/focus, incomplete reduced motion, eager bundle/particle cost | Phase 3 primitives, Phase 8 admin usability, Phase 10 manual/automated accessibility and profiling |
| Placeholder metadata assets/canonical consistency | Phase 10 link/schema/asset checks |
| No automated test suite | Introduce meaningful tests in affected phases 1 onward; comprehensive Phase 11 matrix |
| Missing safe env example, boilerplate README, production Vite import/storage/hosting uncertainty | Phase 1 config security, Phase 2 runtime/storage boundaries, Phase 12 setup/restore verification |
| Offline-only vulnerability audit | Phase 1 current dependency assessment where network permits; Phase 11 regression/release evidence |
| Earlier source gap | RESOLVED by final scope confirmation; later content evidence tracked in CONTENT_REVIEW.md, Phases 5–7 |
| Hosting deployment trigger unknown | Every delivery gate, especially Phase 0 PR merge; verify externally configured hosting before merge |

## Phase 0 — Repository inspection and baseline

- **Objectives:** Establish evidence, constraints and complete requirements before implementation.

- **Tasks:** Inspect source, Git, APIs, admin/auth, data, content, AI, dependencies, env/deployment, branding, security, accessibility/performance. Run local application and available lint/build/tests. Create all seven permanent documents, inventory content, reconcile the owner-confirmed complete scope and verify all phase criteria.

- **Dependencies:** Existing checkout; owner-confirmed scope in PORTFOLIO_MASTER_SPEC.md.

- **Deliverables:** AGENTS.md, PORTFOLIO_MASTER_SPEC.md, PORTFOLIO_AUDIT.md, IMPLEMENTATION_PLAN.md, PROGRESS.md, CODE_REVIEW.md, CONTENT_REVIEW.md; recorded baseline and requirement mapping, reviewed documentation and GitHub delivery evidence.

- **Acceptance criteria:** Seven required files exist; all 13 phases have objectives/tasks/dependencies/deliverables/criteria/tests/risks; findings grounded in inspection; actual checks/limitations recorded; complete confirmed inventory reconciled; no production writes or unauthorized code implementation.

- **Testing requirements:** npm run lint/build; enumerate test scripts; dependency inventory; local startup and read-only health/collection/HTML checks; document validation and clean source diff.

- **Risks:** Content provenance gaps deferred to CONTENT_REVIEW.md, existing lint failures, absent credentials and sandbox network restrictions. Failures must be recorded, not hidden.

## Phase 1 — Critical security improvements

- **Objectives:** Close exposed administrative writes and provider-secret risks while preserving public functionality.

- **Tasks:** Enforce shared server auth on every mutation; secure single-use code/session lifecycle, logout/expiry and attempt/request limits; restrict CORS; server-side AI provider boundary; validate types/lengths/URLs/allowed fields; escape contact HTML; bound payloads and abuse; consistent safe errors/config. Assess credential rotation if a public provider key was deployed; follow confirmed master security requirements. Treat the 21 package findings (6 direct, 15 transitive; 4 critical, 8 high, 9 moderate) in DEPLOYMENT_REVIEW.md as Phase 1 priorities; assess runtime/build reachability, use reviewed compatible fixes, and require explicit compatibility review for major upgrades/downgrades. Do not run automatic breaking audit fixes.

- **Dependencies:** Completed Phase 0 and authorization to proceed; email/provider test configuration.

- **Deliverables:** Protected APIs, session-aware admin client, validated contact/auth and documented safe environment setup.

- **Acceptance criteria:** Unauthorized/expired access cannot mutate data; successful auth supports intended CRUD; code replay/throttling and origin rejection work; public reads/contact remain functional; no provider secrets in client artifacts.

- **Testing requirements:** Isolated API auth/expiry/replay/rate-limit/CORS/schema tests, mocked email/AI failures, admin login/logout regression, bundle secret inspection, lint/build.

- **Risks:** Locking out admin, proxy/cookie deployment differences, leaking secrets in logs, accidental real messages.

## Phase 2 — Modular architecture and data persistence

- **Objectives:** Establish maintainable modules and reliable persistence without data loss.

- **Tasks:** Apply R2 incrementally; central API/config/errors, reusable UI boundaries, routing/lazy loading where beneficial; isolate server bootstrap/routes/services/repositories; choose persistent storage based on confirmed deployment constraints; back up, migrate and verify all data; eliminate misleading local-only admin success.

- **Dependencies:** Phase 1 authorization/session contracts; confirmed storage/deployment requirements.

- **Deliverables:** Feature-based structure, persistence adapter/schema/migration and recovery instructions.

- **Acceptance criteria:** All existing records/IDs and APIs survive migration/restart; failed writes return actionable errors; auth remains enforced; App/server files compose modules; no lost public fallback functionality.

- **Testing requirements:** Migration count/content comparison, restart/recovery and failure tests, API contract/CRUD regressions, lint/build.

- **Risks:** JSON concurrency, incompatible migrations, ephemeral hosting, stale cache or route regressions.

## Phase 3 — Indigo design system and global layout

- **Objectives:** Implement R1 foundation across themes and shared navigation including light/dark/system themes.

- **Tasks:** Centralize exact palettes, semantic/spacing/type tokens, select readable typography, build shared accessible controls/layout, responsive navigation/footer and theme persistence; remove repeated brand color literals and decorative excess.

- **Dependencies:** Phase 2 modular shell; baseline content preserved.

- **Deliverables:** Token stylesheet, UI primitives, global layout/theme behavior and visual reference.

- **Acceptance criteria:** Exact supplied palette applied in both themes; no primary green branding; keyboard/focus/contrast and responsive shell verified; page section compositions can vary coherently.

- **Testing requirements:** Mobile/desktop and both-theme visual checks, keyboard/menu/theme persistence, reduced motion, contrast, lint/build.

- **Risks:** Contrast failures on secondary text, font loading cost, legacy inline-style overrides.

## Phase 4 — Homepage renovation

- **Objectives:** Establish distinctive multidisciplinary professional storytelling.

- **Tasks:** Asymmetrical editorial hero, clear identity/value/availability grounded in evidence, purposeful calls to action, alternating large featured product showcases using editable ordering; minimal contact composition and preserve delivery behavior.

- **Dependencies:** Phase 3; verified content and project evidence (temporary links only to existing valid destinations until Phase 5).

- **Deliverables:** Renovated homepage, featured preview and contact presentation.

- **Acceptance criteria:** Layout varies meaningfully; mobile reading order and navigation work; authentic claims, no invented metrics; featured content and contact retained without data loss.

- **Testing requirements:** Responsive/theme/keyboard visual QA, CTA/link and contact validation/success/error tests with mocked delivery, lint/build.

- **Risks:** Over-design, blocking animations, hardcoded production contact endpoint, premature project claims.

## Phase 5 — Projects and professional case studies

- **Objectives:** Deliver R3–R5, retaining every distinct existing project.

- **Tasks:** Backward-compatible full model; gallery filtering and search; editable featured order; evidence-based records for all named projects; attendance identity review; RP case study including responsive architecture/scoring and all screenshot slots; separate repositories; privacy review and optional links/metadata. Expose minimal secure editor support for new fields now; polish in Phase 8.

- **Dependencies:** Phases 2–4; authentic project evidence, screenshots or explicit placeholders; owner clarification for undocumented project statuses.

- **Deliverables:** Project schema/migration, gallery/details routes, RP content/visualizations, CMS-editable extended fields.

- **Acceptance criteria:** All R3/R4 details covered; exact scores and threshold; working-vs-planned labels accurate; two repository actions, no fabricated demo; all R5 fields editable; order configurable; legacy records retained; no unverified merges or sensitive screenshots.

- **Testing requirements:** Legacy/new schema round trips, filtering/order/multiple-link tests, deep-link/SEO checks, admin field persistence, diagram responsive/keyboard QA, privacy/content checklist, lint/build.

- **Risks:** Confusing old attendance with capstone, invented security/deployment claims, missing authentic imagery and project information.

## Phase 6 — Professional profile, skills and journey

- **Objectives:** Present R6 accurately through distinct About/skills/timeline layouts.

- **Tasks:** Editorial About, modular skills bento and vertical journey; reconcile all existing and master skills with evidence/experience levels and no arbitrary percentages; verify education, industrial attachment, contact and timeline claims; resolve the three baseline Timeline.jsx lint errors; clean credential gallery and events presentation while retaining inventory.

- **Dependencies:** Design foundation, reconciled master inventory, owner evidence for credentials/awards.

- **Deliverables:** About, skills, journey, certificates/events presentation and verified content records.

- **Acceptance criteria:** All confirmed skills preserved; education and industrial attachment accurately represented from evidence; learning versus practical experience clear; no blanket expertise/unsupported credentials; distinct layouts and accessible content; timeline actually reachable; all three baseline Timeline.jsx errors resolved and lint passes.

- **Testing requirements:** Inventory comparison, responsive/theme checks, chronological/content/link validation, keyboard navigation, lint/build.

- **Risks:** Treating existing self-assessments as measured capability or repository credential flags as proof.

## Phase 7 — Developer Lab and articles

- **Objectives:** Add experimental gallery and digital-magazine editorial experience.

- **Tasks:** Use all 16 confirmed Lab categories from the master spec, label prototypes/proposals, preserve three existing articles, build article details/navigation/search or filtering only as supported by requirements, safe content rendering, explicit empty/unavailable states and reusable CMS data contracts.

- **Dependencies:** Phase 2 routing/data; Phase 3 design; verified Lab/article content.

- **Deliverables:** Lab feature and magazine-style article views with maintainable content model.

- **Acceptance criteria:** Experimental status explicit; existing articles retained/readable; no fabricated publication claims; all 16 Lab categories and required evidence fields supported; content links/routes work; missing content represented honestly.

- **Testing requirements:** Safe rendering, detail deep links, empty/error states, responsive/keyboard QA, content preservation, lint/build.

- **Risks:** Untrusted rich content, inventing experiments, duplicate or inaccessible articles.

## Phase 8 — Admin dashboard renovation

- **Objectives:** Make management secure, modular and complete.

- **Tasks:** Replace oversized modal implementation with coherent feature forms/navigation; manage all project fields from R5 including screenshot placeholders/order; preserve four collection CRUD flows; implement profile/skills/Lab management where confirmed; labels, validation, actionable errors, authenticated routing, session handling and delete safeguards.

- **Dependencies:** Secure Phase 1/2 contracts and content schemas through Phase 7.

- **Deliverables:** Renovated dashboard and reusable validated editors.

- **Acceptance criteria:** Every required field and all major R8 content types can be saved/reloaded; all existing CRUD retained; failed requests never report saved; unauthorized calls rejected; keyboard/dialog/focus behavior accessible.

- **Testing requirements:** Authenticated end-to-end CRUD on isolated data, schema field round trips, validation/failure/session expiry, keyboard/mobile checks, lint/build.

- **Risks:** Accidental deletion, lost fields on edits, stale caches, inaccessible complex forms.

## Phase 9 — AI assistant and advanced features

- **Objectives:** Improve truthful assistance while retaining safe fallback.

- **Tasks:** Use centralized verified profile/project knowledge, distinguish status/experience, remove duplicated inaccurate claims, build server provider integration over Phase 1 boundary, bounded conversation/request limits, useful loading/error/fallback/clear behavior; implement R8 global search, command palette and beneficial GitHub integration.

- **Dependencies:** Secure provider/config and confirmed content model.

- **Deliverables:** Updated assistant feature, knowledge source and documented advanced features from full requirements.

- **Acceptance criteria:** No client provider secret; assistant reflects RP status and authentic inventory; unavailable provider preserves local fallback; no unsupported implemented-security claims; global search and command palette work across intended content with keyboard access; beneficial GitHub integration is evaluated/documented; advanced scope traceable to requirements.

- **Testing requirements:** Mocked provider timeout/error/success, fallback knowledge assertions, input/rate-limit and accessibility tests, bundle inspection, lint/build.

- **Risks:** Hallucination, prompt injection, stale biography, provider costs and third-party integration limits.

## Phase 10 — SEO, accessibility and performance

- **Objectives:** Verify usable, discoverable and efficient public experiences.

- **Tasks:** Replace metadata placeholders with authentic assets, canonical host consistency, page metadata/schema/sitemap/robots; audit keyboard/focus/dialogs/contrast/headings/alt text; reduced-motion including canvas; optimize images/fonts/chunks, lazy routes and effect workload against measurements.

- **Dependencies:** Completed public routes/content and authentic share assets.

- **Deliverables:** Metadata/assets, accessibility fixes and measured performance report.

- **Acceptance criteria:** No placeholder metadata; valid deep links and canonical URLs; no critical observed accessibility barriers; meaningful measured performance improvement without content/feature regressions; measurements and acceptance targets documented honestly rather than invented.

- **Testing requirements:** Browser mobile/desktop profiling, Lighthouse/axe or equivalent, manual keyboard/reduced-motion/theme review, link/schema checks, bundle comparison, lint/build.

- **Risks:** Automated scores hiding manual barriers, network-dependent measurements, route hosting behavior.

## Phase 11 — Comprehensive testing

- **Objectives:** Demonstrate complete requirement coverage and regression safety.

- **Tasks:** Consolidate unit/integration/end-to-end coverage for auth, CMS, persistence, contact, projects, assistant, routing/themes/accessibility; realistic isolated fixtures and mocked external delivery; inventory and security regression checks; reconcile all master requirements against evidence.

- **Dependencies:** Phases 1–10 and full traceability matrix.

- **Deliverables:** Repeatable suite, test instructions and results/remaining defects.

- **Acceptance criteria:** Critical flows pass; no unexplained regressions or missing requirements; lint/build pass or explicitly reviewed unresolved blockers prevent release; no production mutations during tests.

- **Testing requirements:** Full automated suite plus documented manual/browser matrix, migration/recovery and unauthorized-access cases; no invented pass results.

- **Risks:** Flaky external calls, testing only happy paths, unverified data provenance.

## Phase 12 — Documentation and deployment readiness

- **Objectives:** Prepare a reviewable, reproducible release without automatic publishing.

- **Tasks:** Replace boilerplate README, document architecture/config/auth/content workflows/migrations/backups/restoration/hosting, safe environment example, actual runtime/dependency needs, frontend/API origins, static deep-link handling, release/rollback procedure and remaining limitations; reconcile final requirements and progress.

- **Dependencies:** Phase 11 evidence and confirmed hosting constraints.

- **Deliverables:** Maintainer documentation, safe configuration template and readiness/rollback report.

- **Acceptance criteria:** Fresh local setup/build/start reproducible; all content preserved and claims verified or clearly qualified; security and test blockers resolved; operator can deploy and restore using docs; authorized GitHub workflow complete without unauthorized production deployment.

- **Testing requirements:** Clean setup/config validation, production-mode local startup/deep links, migration/restore rehearsal on copies, secret scan and full relevant suite.

- **Risks:** Hosting filesystem loss, dev-only Vite import, incorrect CORS/cookies/env, documentation drifting from actual deployment.
