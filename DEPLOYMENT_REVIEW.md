# Phase 0 GitHub integration and deployment review

Inspected November 28, 2026 (Africa/Kigali). Scope: read-only hosting/PR diagnosis and documentation. Phase 1 remains unauthorized. No application/dependency changes, hosting configuration changes, retry deployments, production changes or merge performed.

## Established Cloudflare failure root cause

Inspected the complete displayed build log for preview deployment `370ae502-c0cb-4d21-9df0-b9e9023315b0`, commit `c3cf4c8f9bde3fe8126b54591e896deccc8c4e8e`, branch `portfolio-v2`. Cloning succeeded. The automatic dependency installation step selected **Bun** and ran `bun install --frozen-lockfile`. It failed before the configured npm command or Vite build could run:

```text
Detected tools: npm@10.9.9, bun@1.4.4, nodejs@22.23.4
Installing project dependencies: bun install --frozen-lockfile
error: Missing lockfile version
at bun.lock:1:1
InvalidLockfile: failed to parse lockfile: 'bun.lock'
error: lockfile had changes, but lockfile is frozen
Error: Exit with error code: 1
```

The tracked `bun.lock` is **zero bytes** in both local checkout and `origin/main`; it is unchanged by PR #1. The PR's seven documentation files did not introduce this invalid lockfile. This run establishes a package-manager/lockfile failure, not missing application dependencies, faulty Markdown, Node incompatibility, incorrect output directory or a Vite compilation error. It does not prove that later build stages will pass once corrected.

Source: [failed deployment log](https://dash.cloudflare.com/6109334645dfca57304baa38d1177310/pages/view/portfolio/370ae502-c0cb-4d21-9df0-b9e9023315b0).

## Verified build and environment settings

| Setting | Observed value |
| --- | --- |
| Project/repository | `portfolio` / `K-Shalom/Portfolio` |
| Build system | Version 3 |
| Root | Repository root (`/`; blank in project settings) |
| Configured command | `npm install --legacy-peer-deps && npm run build` |
| Output | `dist` (deployment detail shows `/dist`) |
| Failed-run runtime | Node 22.23.4, npm 10.9.9, Bun 1.4.4 |
| Build cache | Disabled |
| Watch paths | Include `*` |
| Failed preview's environment | Build details explicitly show no environment variables |
| Production npm settings | `NPM_CONFIG_PRODUCTION=false`, `NPM_FLAGS=--legacy-peer-deps` |
| Production API base | `VITE_API_BASE_URL=https://portfolio-backend-dvn5.onrender.com` |
| Production secret entries | `VITE_OPENROUTER_API_KEY`, `VITE_WEB3FORMS_KEY` present and encrypted in the dashboard; values not revealed |

No explicit NODE_VERSION override was displayed in the inspected production variable list. The failed-run version is taken from its log, not inferred from the local Node 26 baseline. Installed Vite's engine range supports Node >=22.12 in that major; the observed failure happens in Bun's parser regardless. `dist` matches normal Vite output in this repository. Production variables do not establish preview variables: preview details say None. In particular, a later successful preview with no VITE_API_BASE_URL would use the client's localhost fallback; that is a separate configuration issue, not this installation failure.

Encrypted dashboard variables with VITE prefixes are build-time client inputs, not a guarantee of browser secrecy. The existing source reads the OpenRouter variable in client code; its configured presence strengthens the already-recorded Phase 1 secret-isolation/rotation assessment. No key value was inspected or copied.

## Hosting architecture and deployment triggers

| Service | Verified role | Trigger evidence |
| --- | --- | --- |
| Cloudflare Pages `portfolio` (`portfolio-csd.pages.dev`) | Current portfolio frontend. Dashboard lists `shalomk.me` and `www.shalomk.me` as **Active**, SSL enabled. Last production source shown is main commit `0cb128a`. | Production branch **main**, automatic deployments **Enabled**. `portfolio-v2` deployments explicitly labeled Preview. All-path watch includes documentation. Merging to main will trigger production build/deployment. |
| GitHub Pages | Additional configured legacy publication, not established as current apex-domain origin. API reports source `main:/`, build_type legacy, status built, URL `http://shalomk.me/Portfolio/`, cname null. | Previous dynamic Pages build/deployment runs on main succeeded. Main updates can initiate this publication too. |
| Render (`portfolio-backend-dvn5.onrender.com`) | Backend used by production API base and hardcoded Contact endpoint. Read-only health returned HTTP 200 and counts 9 projects / 3 articles / 4 certificates / 3 events. | Service-side auto-deploy toggle, linked branch and build/start/env settings **not inspected**; Render authenticated access is still needed to establish its trigger. Do not infer it from URL/source alone. |

Public DNS returned Cloudflare nameservers and A records; both custom hosts returned 200 with `server: cloudflare` and matching portfolio asset names. These observations alone identify the edge, but the signed-in Pages project's active custom-domain table establishes the frontend project association. The historical `portfolio-4y9.pages.dev` URL currently serves unrelated content; it is stale and must not be used as the current project target. No DNS or custom-domain changes made.

Sources: [Cloudflare settings](https://dash.cloudflare.com/6109334645dfca57304baa38d1177310/pages/view/portfolio/settings/production), [custom domains](https://dash.cloudflare.com/6109334645dfca57304baa38d1177310/pages/view/portfolio/domains), GitHub REST Pages/deployments/Actions responses and public read-only HTTP/DNS checks.

## Minimal corrections — recommendations only, require authorization

Choose one package-manager correction; do not apply both blindly:

1. **Preferred repository correction:** approve removal of the empty tracked `bun.lock`, retaining `package-lock.json` as the npm source of truth. No application feature code needs changing. Verify a clean npm install/build with the intended Node runtime and then the real provider check. This is a dependency/build-file change outside the seven-document PR scope, so it has not been applied.
2. **Alternative Cloudflare-only correction:** with explicit hosting-setting authorization, set build variable `SKIP_DEPENDENCY_INSTALL=1` in **Preview first** so the configured npm install/build command can run instead of failing in automatic Bun detection. The documented variable disables dependency auto-install; it does not skip compilation or fake a check. For reproducible installs, propose `npm ci --legacy-peer-deps && npm run build`, with dev dependencies included, rather than an unconstrained npm install. Apply equivalent Production changes only after separate approval and validation. Keep root and output `dist`; no evidence supports changing them.

Cloudflare documents [skipping automatic dependency install](https://developers.cloudflare.com/pages/configuration/build-image/) and [build command/output settings](https://developers.cloudflare.com/pages/configuration/build-configuration/). A build-command change alone will not fix this run because automatic installation fails first. NODE_VERSION pinning is optional reproducibility work, not an established fix for this failure. Do not copy provider secrets into Preview; any API URL configuration must be deliberate and approved.

After the chosen correction, a real Cloudflare validation build is necessary. Do not retry now: even a Preview retry publishes a preview if successful, and this recovery request does not authorize deployment. Separately resolve the production merge gate: authorize the resulting production deployment, or explicitly authorize a controlled hosting-trigger change and verify it before merge. Do not silently disable checks, exclude Markdown to hide the failure, or change production settings. Inspect Render auto-deploy settings before authorizing main changes.

## PR #1 review and eligibility

Reviewed PR head `c3cf4c8f9bde3fe8126b54591e896deccc8c4e8e`, base main. GitHub lists exactly AGENTS.md, CODE_REVIEW.md, CONTENT_REVIEW.md, IMPLEMENTATION_PLAN.md, PORTFOLIO_AUDIT.md, PORTFOLIO_MASTER_SPEC.md and PROGRESS.md. No runtime/package/lockfile/data diff. Local full-document review and selected credential/private-key pattern scan found no committed credential values; this is not an exhaustive provider secret-scanning claim. Nine stored project records remain unchanged. Phase 0 documentation implementation acceptance remains met; provider checks and deployment authorization are separate delivery gates.

GitHub reports open, merged false, mergeable true, mergeable_state unstable. Cloudflare Pages check `140784036521` is completed/failure. No human reviews, requested reviewers or inline review comments were returned. A Cloudflare bot conversation comment links the same failed build. Protection endpoint returns Branch not protected and rulesets empty: no repository-enforced approval requirement was found, but no independent approval exists and the owner's passing-check/deployment conditions still govern. Self-review cannot be substituted for independent approval.

**Merge eligibility: BLOCKED.** Failed check is unresolved and automatic production deployment from main is now confirmed. Leave PR open; no merge commit or post-merge default-branch synchronization exists. This recovery adds DEPLOYMENT_REVIEW.md locally, making eight documentation files in the prospective phase diff; the remote PR at the reviewed head still contains seven.

## Recovery delivery limitation

No push or deployment retry during this investigation: the dashboard confirms every branch push triggers automatic Pages processing, and the user explicitly prohibits deploying. Recovery findings can be committed locally for review; publishing them to the PR branch requires permission for the resulting automatic Preview build/deployment. PR metadata may be updated without pushing or triggering a build. No Phase 1 work has begun.

## Authorized npm correction — November 28, 2026
The owner explicitly authorized removal of empty bun.lock, clean npm installation, build/lint verification, commit/push and automatic Preview validation. This supersedes the earlier no-push/no-Preview restriction for this correction only. Production settings, DNS, production environment and merge remain unauthorized; Phase 1 is not started. Verified portfolio-v2 and clean working tree before changes; bun.lock was zero bytes and package-lock.json exists (181,228 bytes). Removed bun.lock using git rm; no package manifest or npm lock regeneration. Local verification and provider results will be recorded below.

Local checks: npm ci PASS (322 packages installed, 323 audited); npm run build PASS (383 modules, Vite 8.1.5, 3.29 s); npm run lint FAIL with exactly the three pre-existing Timeline.jsx errors (unused useEffect at line 1; two react-hooks/immutability reports at line 164), no new lint failures. Online install audit reported 21 vulnerabilities (9 moderate, 8 high, 4 critical), plus babel-merge deprecation and an unapproved @openrouter/sdk postinstall warning; no audit fix, script approval or dependency update performed. Earlier offline zero-advisory result was cache-limited and is not current security clearance. Existing dependency findings are tracked for Phase 1 assessment; no Phase 1 fixes implemented.

Correction self-review PASS for the authorized minimal scope: only zero-byte bun.lock deletion plus the three review/tracking documents since recovery commit 7a7c54e. package.json, package-lock.json, application source and all stored content preserved; npm lock remains authoritative. Existing documentation recovery commit will be included in the authorized push. No Cloudflare settings/production changes, DNS changes or merge. Provider result is pending the authorized push; do not claim success until logs/checks confirm it.

## Verified corrected Preview result
Cloudflare Preview PASS for correction abd387a78a2027b553780549d24fb2005bfd61c2, deployment 03cb7a4f-7f7b-4c58-9009-a8537c27b87e. Signed-in complete log confirms Node 22.23.4/npm 10.9.9 and automatic npm clean-install --progress=false (325 packages), followed by existing npm install --legacy-peer-deps (31 packages removed) and npm run build. Vite 8.1.5 transformed 383 modules, build succeeded (409 ms), assets published and deployment success (31 s total). No Bun selected and no installation override/account-setting change required. Platform-specific package counts differ from local npm ci; both installations/builds passed. Preview: https://03cb7a4f.portfolio-csd.pages.dev/ (alias https://portfolio-v2.portfolio-csd.pages.dev/).

The dependency-install failure is resolved. Self-review confirms the minimal lockfile correction plus necessary documentation only, with npm package-lock.json unchanged. Prior investigation wording describes historical states; this result supersedes the failed-check/no-push state for the corrected commit. PR remains open and must not be merged under the latest instruction. Ready for final merge authorization review subject to refreshed checks/required approvals, existing lint and dependency findings, and explicit production-deployment authorization. Independent review has not been fabricated. Production main remains unmodified; Phase 1 remains unauthorized.

## Final merge preparation — dependency security backlog

Reviewed November 28, 2026. Fresh online npm audit confirms **21 affected package entries: 9 moderate, 8 high, 4 critical; 6 direct and 15 transitive**. These counts include inherited vulnerability chains; they are not 21 distinct CVEs or proof that every advisory is exploitable in production. No dependency/lockfile changes or automated upgrades performed. Phase 1 security assessment remains separately unauthorized.

| Package | Relationship | Audit severity | Phase 1 priority / action |
| --- | --- | --- | --- |
| proxy-addr | Transitive | Critical | First triage server IP/trust-proxy exposure; evaluate compatible patched resolution and regression tests. |
| happy-dom | Transitive | Critical | First triage build-time code execution/untrusted DOM exposure through Pigment/WyW chain. |
| @wyw-in-js/transform | Transitive | Critical | Trace inherited happy-dom/other findings through CSS build tooling; assess actual usage. |
| @pigment-css/react | Transitive | Critical | Trace WyW chain and necessity of Pigment integration before choosing remediation. |
| nodemailer | Direct | High | Triage mail/parser/TLS advisories; verify actual runtime usage (current contact implementation uses Resend); consider removal if unused, otherwise planned tested migration. |
| vite | Direct (devDependency) | High | Triage dev/middleware exposure and compatible patch; verify production server's import/runtime strategy. |
| body-parser | Transitive | High | Triage backend request parsing/DoS exposure; compatible dependency resolution and API regression tests. |
| brace-expansion | Transitive | High | Trace multiple toolchain nodes and pathological expansion reachability; compatible patch review. |
| js-yaml | Transitive | High | Determine parser exposure/untrusted inputs and compatible fix. Distinct from direct package yaml. |
| nanoid | Transitive | High | Trace caller usage of custom generators; compatible patch review. |
| source-map-js | Transitive | High | Assess source-map processing reachability; compatible patch review. |
| zod | Transitive | High | Trace validation callers and input limits; compatible patch review. |
| @mui/icons-material | Direct | Moderate | Inherited MUI/Pigment chain; coordinate remediation with UI dependency compatibility. |
| @mui/material | Direct | Moderate | Inherited Pigment chain; audit-proposed major downgrade is not preapproved. |
| @mui/material-pigment-css | Direct | Moderate | Inherited Pigment/WyW chain; establish usage before removal/migration. |
| eslint | Direct (devDependency) | Moderate | Inherited minimatch chain; review compatible tooling patch. |
| @eslint/config-array | Transitive | Moderate | Inherited minimatch chain through lint tooling. |
| @wyw-in-js/processor-utils | Transitive | Moderate | Inherited WyW/shared chain; resolve together with Pigment. |
| @wyw-in-js/shared | Transitive | Moderate | Inherited minimatch chain; resolve together with Pigment. |
| minimatch | Transitive | Moderate | Multiple build/lint nodes; review all affected paths. |
| qs | Transitive | Moderate | Assess backend query/parser reachability and request limits; compatible resolution/tests. |

Remediation rules for Phase 1: assess runtime versus build/dev reachability, actual advisory affected ranges and installed dependency paths; prioritize critical/high issues without ignoring moderate server risks. Prefer reviewed compatible patches; where parent changes are necessary, evaluate removing unused integrations or a deliberate tested migration. npm's proposed fixes for MUI/Pigment/WyW/happy-dom/minimatch include a semver-major MUI downgrade to 5.18.0, and nodemailer proposes a major upgrade; neither is an automatically safe fix. Do not run npm audit fix --force, blindly accept overrides, regenerate lockfiles wholesale or treat fixAvailable=true as compatibility proof. Preserve a reproducible npm lock, rerun audit and meaningful build/API/UI/security checks after each approved change, and document any risk left unresolved. Sources: actual npm audit --json output and repository package.json/package-lock.json. Advisory root example: https://github.com/advisories/GHSA-37j7-fg3j-429f ; server proxy advisory: https://github.com/advisories/GHSA-jqcg-44mw-7w3h .

The three pre-existing Timeline.jsx lint errors remain tracked for Phase 6 (earlier if touched): unused useEffect at line 1 and two react-hooks/immutability reports at line 164. They have not been fixed, waived as passing, or conflated with new regressions.

## Phase 1 security implementation — November 28, 2026

Scope: owner-authorized implementation on portfolio-v2-phase-01-security. No merge, production deployment, credential rotation, DNS/hosting/environment change or Phase 2 work.

Implemented: keyed-hash single-use cryptographic OTPs (10 minutes, five attempts, cooldown/rates); memory-only 30-minute revocable bearer sessions and logout; shared server auth on all four collection mutations/draft reads; strict field/type/length/date/list/URL/ID validation and no mass assignment; exact-origin CORS without ambient cookies; API/static-frontend headers/CSP; bounded payloads, rates, contact HTML/header escaping/deduplication; server-only fixed-endpoint AI with public context, timeout/token/history/IP/global limits and safe fallback; generic errors and no provider/token/code logging; client failure handling without fake saved state or draft/token caches. Minimal app factory/security files enable isolated testing, not a Phase 2 feature-module renovation.

Dependency assessment: fresh online baseline 21 (6 direct/15 transitive; 4 critical, 8 high, 9 moderate). Removed verified unused Pigment/OpenRouter-agent/nodemailer/yaml integrations and updated compatible resolutions within framework majors. Final online npm audit: zero known advisories. Per-package installed versions, dependency chains, exposure and decisions are in DEPENDENCY_SECURITY_REVIEW.md. No force fixes or automatic breaking downgrade/upgrade. npm/package-lock preserved; data_store.json unchanged with nine original projects.

Verification: npm ci PASS (295 installed on first revised lock); justified subsequent compatible update changed three packages. npm test PASS, 12 scenarios including actual local HTTP API behavior and mocked client bearer/session/error handling. Mock mail/AI, injected clock and isolated persistence; no real messages/provider costs/data writes. Production build PASS (Vite 8.4, 384 modules). Client bundle credential-pattern scan PASS, plus build guard rejection of a fake legacy VITE provider key without revealing it. npm run lint has exactly the three baseline Timeline.jsx errors (unused useEffect, two immutability errors), zero new errors/warnings. Six local HTTP smoke endpoints returned 200; content counts 9/3/4/3. Real browser automation timed out twice, so no fresh visual/manual browser authentication pass is claimed; client transport and backend behavior have automated coverage. HMR port warning during Vite-based transport test is dev-only and did not fail tests; local regression server cleanup tracked separately.

Release prerequisites: do NOT merge yet. On Render verify ADMIN_EMAIL, verified MAIL_FROM, RESEND_API_KEY, NODE_ENV production, exact ALLOWED_ORIGINS and verified TRUST_PROXY_HOPS; move OpenRouter key to server-only OPENROUTER_API_KEY with provider budget. On Cloudflare remove VITE_OPENROUTER_API_KEY/VITE_WEB3FORMS_KEY; keep VITE_API_BASE_URL and frontend CSP connect-src aligned to API host. Build intentionally rejects legacy VITE provider-key variables. Owner-authorized rotation of previously browser-exposed OpenRouter credential is required before production reuse; no values revealed or rotated here. Preview frontend alone uses the currently deployed old API unless a secured staging API is configured, so does not prove new server deployed. Deploy backend first, then frontend; old admin clients/new backend require refresh and login, new client/old backend fails closed without token. Public reads/contact contracts retained. Single-instance in-memory limits/sessions reset on restart; provider-side budget/coordinated state needed before scaling. See SECURITY.md for exact controls/limits, configuration and safe rollback.

Phase 1 deployment authorization is limited to Cloudflare Preview; Render/Cloudflare production changes are proposals only. Do not repeat the Phase 0 auto-deployment/extra-tracker cycle. Record PR commit/check evidence before merge review.
