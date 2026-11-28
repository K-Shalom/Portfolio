# Portfolio V2 development instructions

## Project and source of truth
Renovate the existing Shalom Kubwimbabazi portfolio in place. Stack: React/Vite/Tailwind with MUI icons, Express/Node, Resend and current JSON persistence. Preserve working public sections, CMS, contact delivery, themes, navigation and assistant fallback while progressively improving them.

Read this file, PORTFOLIO_MASTER_SPEC.md, PORTFOLIO_AUDIT.md, IMPLEMENTATION_PLAN.md, PROGRESS.md, CODE_REVIEW.md and CONTENT_REVIEW.md before work. The owner has confirmed the complete authoritative scope; the earlier missing-prompt blocker is resolved. Do not request the earlier prompt again. Never invent missing project descriptions, skills, credentials or completion claims; track later evidence checks in CONTENT_REVIEW.md.

## Development rules and conventions

- Inspect git status and preserve unrelated edits. Phase 0 uses portfolio-v2. Commits, pushes, pull requests and qualifying merges are authorized by the owner's November 28, 2026 workflow instructions; production deployment is not authorized. Follow the mandatory workflow below.

- Complete one authorized phase at a time. Verify previous acceptance criteria, implement unfinished requirements, run relevant checks, update progress, then stop for review.

- Phase 0 authorizes documentation and baseline inspection only. Do not begin Phase 1 until Phase 0 is complete and further work is authorized.

- Use existing ES modules, functional React components and hooks. Follow local conventions; avoid unrelated reformatting and dependency churn.

- Use feature modules, shared UI/layout, centralized configuration/API/error handling and maintainable routing. Keep App.jsx and server entry points focused on composition/bootstrap. No unnecessary microservices.

- Preserve API compatibility and records during refactors. Back up and validate before migrations; verify record counts and IDs. Never silently replace the stored dataset with seed content.

- Failed CMS writes must not be represented as persisted success. Keep public fallback behavior explicit and separate from administrative persistence.

## Security and content

- Enforce authorization on the server for every administrative mutation. Client UI state is not authorization.

- Keep provider secrets server-side; never use VITE_* for secrets. Do not print environment values. Validate inputs and URLs, escape untrusted email HTML, limit abuse and payload sizes, restrict CORS, and handle errors consistently.

- Do not test destructive routes against production. Do not send email or paid AI requests during baseline checks.

- Preserve existing authentic content. Repository claims are inventory, not independent verification. Verify credentials, awards, project status and screenshots before strengthening claims.

- RP Smart Attendance is the primary final-year capstone, in progress, sole developer. Backend and web dashboards work according to the owner; ESP32 integration is next. Never claim completed hardware integration or adoption by all eight colleges.

- Merge the older attendance entry only after confirming it is the same project. Preserve unrelated projects. No invented live demos or fake screenshots.

- Never publish student identities, fingerprint templates, private attendance records or credentials. Describe biometric safeguards as implemented only with evidence from the actual project.

## Design and verification
Use centralized electric indigo tokens and semantic states; green is allowed for success, not branding. Major sections need distinct compositions with coherent typography, spacing and interactions. See the plan for exact palettes and layouts.

Run npm run lint and npm run build when relevant; record existing failures separately from regressions. Add meaningful API/integration checks as features change. Verify keyboard navigation, responsive layouts, themes, reduced motion and content preservation. Do not claim a browser, deployment, security or accessibility check passed unless actually performed.

Future sessions: read the authoritative repository specification first, inspect progress and diffs, work only within the authorized phase, and report changed files, acceptance evidence, tests, limitations and next steps. Never mark incomplete criteria complete merely to advance the tracker.

## Mandatory GitHub workflow for every phase
This section supersedes earlier restrictions on committing, pushing and merging. Repository: https://github.com/K-Shalom/Portfolio. The authoritative owner workflow is also recorded in IMPLEMENTATION_PLAN.md. Phase 1 still requires an explicit instruction to continue.

1. **Prepare:** Check status and configured remote, verify the actual GitHub default branch, fetch remote changes and synchronize the local default branch without overwriting unrelated changes. Use portfolio-v2 for Phase 0. For later phases create dedicated branches such as portfolio-v2-phase-01-security through portfolio-v2-phase-12-documentation; meaningful equivalent names are acceptable. Never assume the default branch is main.
2. **Implement:** Read requirements and acceptance criteria; make actual scoped changes, preserve functionality/content, maintain modules and update documentation. Do not skip unfinished requirements.
3. **Verify:** Run relevant available lint, build, unit, integration, security, API, browser, responsive and accessibility checks. Record missing suites and introduce meaningful tests in the appropriate phase. Distinguish baseline failures from regressions; never invent pass results.
4. **Review before commit/push:** Dedicate a complete-diff review to correctness, security, auth/authz, privacy, errors/validation, architecture, readability, maintainability, reuse/duplication, performance, accessibility/responsiveness, dependencies, tests, documentation, regressions and exposed credentials. Documentation-only reviews check completeness, accuracy and consistency. Classify findings Critical/High/Medium/Low/Informational; fix blockers and rerun affected checks. Create/update CODE_REVIEW.md with phase, files, findings/severity, recommendations, applied fixes, concerns, verification and outcome. Self-review is not independent human approval.
5. **Commit:** After implementation and review succeed, inspect the final diff, exclude unrelated files and credentials, stage only phase files and use a meaningful conventional commit. Do not commit an incomplete phase as completed.
6. **Push:** Use the configured remote, push the phase branch, never force-push and never push implementation directly to the default branch.
7. **Pull request:** Find an existing phase PR before creating one; update it rather than duplicating it. Target the verified default branch. Include phase/title, summary/objectives, files, features/fixes/security/architecture, screenshots if relevant, tests, review findings/resolved issues, limitations/breaking changes, acceptance checklist, rollback and next phase.
8. **PR review:** Inspect the actual PR diff/base/conflicts, CI/Actions/security findings, human comments and required approvals. Resolve blockers and confirm criteria and no regressions. Request an additional authorized automated review if available; do not purchase services or enable paid integrations.
9. **Merge gate:** Prefer squash unless repository policy requires otherwise. Merge only with criteria met, review complete, no unresolved critical/high blockers, required tests/checks/approvals passed, no conflicts or regressions, and no unauthorized deployment trigger. Never bypass protection or fabricate approval. Inspect hosting deployment settings; if merge would deploy to shalomk.me, stop and explain before merging. Unknown trigger behavior must be resolved before merge. Report exact permission/authentication/approval/check blockers; never label a blocked PR merged.
10. **Synchronize:** After confirmed merge, fetch, switch to the default branch, pull merged changes, verify synchronization and clean status, and remove the local phase branch only where safe. Commit/synchronize progress updates and record PR URL and merge SHA. Avoid self-referential commit hashes: the commit field may identify the implementation commit, with later tracker-only commits described separately; report final exact hashes in the PR/report.
11. **Report and stop:** Report phase/name, implementation and GitHub statuses separately, requirements/files/tests/review/fixes/limitations, commit/branch/PR URL and status, merge status and next phase. Stop at the phase boundary.

Track implementation, acceptance, tests, review, branch, commit, push, PR URL/status, merge, issues, blockers and next phase in PROGRESS.md. Use accurate workflow statuses: PENDING, IN PROGRESS, IMPLEMENTED, UNDER REVIEW, CHANGES REQUESTED, READY TO MERGE, MERGED, BLOCKED. MERGED requires GitHub confirmation.

Never modify production environment variables/DNS, delete production data, run destructive database migrations, force-push, bypass protection or introduce paid infrastructure. Push authorization does not authorize production deployment; inspect branch-triggered hosting behavior before pushing where it could deploy production as well as before merging.

## Confirmed content rules
Preserve all nine stored projects and reconcile them against all 19 named projects in PORTFOLIO_MASTER_SPEC.md without duplication. Do not assume the PHP object-oriented Library project is the existing C++ Library project, or that Local Chat is Chattova. Use Practical Experience, Familiar and Currently Learning classifications; uncertain proficiency requires confirmation, never arbitrary percentages. Education is an Advanced Diploma in IT, final year/Year 3, expected 2027 at RP Karongi College; do not claim an obtained diploma or senior engineer title. Preserve the exact industrial attachment facts and Lab categories in the master spec. Missing authentic screenshots, statuses or implementation evidence become later content tasks, not Phase 0 blockers. All major content must be manageable in the existing admin.

## Permanent security rules from Phase 1
Read SECURITY.md before changing authentication/API/configuration. All administrative routes use shared server authorization; bearer tokens stay in memory and never in browser storage/URLs. Public requests cannot include drafts. Do not reintroduce local fake-saved admin writes, client provider credentials, broad CORS, unvalidated merges or code/session logging. Use injected mocks/isolated data for tests, never real mail/paid AI or production writes. Legacy VITE provider-key build variables intentionally fail builds; server keys/configuration/rotation need explicit release authorization. Single-instance sessions/rates are a documented limit, not shared persistence. Phase 1 branch pushes/Preview are authorized; Phase 1 merge/production and Phase 2 are not.
