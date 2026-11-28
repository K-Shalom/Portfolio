# Portfolio security — Phase 1

This documents implemented controls on the Phase 1 branch, not a claim they are deployed. Production deployment and merge require separate owner authorization. Phase 2 architecture and Phase 9 assistant features are out of scope.

## Assessment and control boundaries

| Before | Severity / exploitability | Implemented remediation |
| --- | --- | --- |
| Anonymous create/update/delete on four collections | Critical; direct unauthenticated data modification | Shared server-side administrator middleware on every existing mutation; 401 for absent/invalid/expired bearer sessions |
| Six-digit Math.random code, reusable verification, no session | High; guessing/replay and frontend-only access gate | crypto.randomInt code, keyed HMAC digest in memory, 10-minute expiry, five attempts, single use, resend cooldown, request/verification limits; cryptographic session token |
| Browser VITE OpenRouter key and direct provider request | High; exposed browser credential enables external misuse/cost | Server-only OPENROUTER_API_KEY; fixed provider URL, bounded requests/history/output, public-only context and rate/global budget; build rejects legacy secret VITE variables |
| CORS accepted every origin with credentials | High; cross-origin browser access, not itself authentication | Exact origin allowlist, no credentials/cookies, exact approved Preview URLs only |
| Broad req.body merges / unsafe URLs / unescaped contact HTML | High/Medium depending route/input; injection and stored-link risk | Strict per-collection schemas, types/lengths/URLs/dates/lists, unknown-field rejection, immutable IDs, email-header validation and escaped email HTML |
| Missing rate/body/provider limits | Medium/High abuse/availability/cost | Bounded fixed-window limiter, body limit, contact deduplication and global budgets, provider timeout/token cap |
| CMS local fallback after rejected writes | Medium; false success and divergence | Authenticated API client throws on failures, no fake local persistence, admin forms report errors; drafts/tokens not cached |
| Provider/file errors potentially exposed | Medium; configuration/path disclosure | Generic API errors and startup message; no request bodies, codes, tokens or provider responses logged |

Routes that do not exist (uploads/settings) were not invented. API catch-all returns 404. Future administrative routes must explicitly use the same authentication/authorization boundary and validators. There is a single administrator role, not a new user-management feature.

## Administrator flow and session management

1. POST `/api/request-admin-code` with JSON `{}`. Delivery goes only to the configured ADMIN_EMAIL, never to a request-supplied recipient. A generic success message reveals neither mailbox nor code. Delivery failure is generic 503.
2. A cryptographically random six-digit code is emailed using server Resend. Only a keyed HMAC digest/expiry/attempt count is retained; the per-process random HMAC key is not persisted. Code delivery necessarily includes the code to the administrator email, never to API responses/logs.
3. POST `/api/verify-admin-code` with JSON `{code}`. Successful verification consumes the code and issues a random 256-bit token with a 30-minute absolute expiry. Server stores only its keyed digest and expiry. Five failed attempts consume the code. New login revokes every prior admin session.
4. The frontend keeps the session in module memory only. Reload requires login; no token in cookies, URLs, sessionStorage or localStorage. Requests use `Authorization: Bearer ...`, `credentials: omit`, JSON payloads and a timeout. Expiry/401 clears memory and resets the admin UI/public data. No cookie attributes apply because no cookies are issued.
5. GET `/api/admin-session` validates session; POST `/api/logout` revokes it. If network logout fails, the client forgets the token while the server's absolute expiry remains the safety bound. Restart revokes all sessions/codes. Losing a connection never reports a content write as saved.

Cross-origin Cloudflare→Render bearer headers require a successful preflight with Authorization allowed. These are not ambient browser credentials, so cross-site form/cookie CSRF cannot authorize CMS writes. Origin checks provide defense in depth, not identity. CORS does not prevent direct nonbrowser requests; server auth does. Do not switch to cookie auth without a deliberate CSRF/SameSite/third-party-cookie design and tests.

## Route inventory

| Route | Access |
| --- | --- |
| GET `/api/projects`, `/api/articles`, `/api/certificates`, `/api/events` | Public; filters `published: false` |
| GET collection with `?includeDrafts=true` | Administrator; unauthorized draft-query attempts return 401 |
| POST same collections; PUT/DELETE `/api/{collection}/:id` | Administrator; strict schema and write rate limit |
| GET `/api/admin-session`; POST `/api/logout` | Administrator |
| POST `/api/request-admin-code`, `/api/verify-admin-code` | Public but bounded authentication endpoints; JSON validation required |
| POST `/api/send-email` | Public; validated, escaped, deduplicated and rate/global limited |
| POST `/api/assistant` | Public; bounded public-portfolio assistant, never a privileged/admin endpoint |
| GET `/api/health` | Public status/published record counts only |

The assistant receives a server-selected projection of published project titles/descriptions (max 30) and already-public profile/skills names only. It receives no environment values, credentials, OTPs, sessions, drafts or private records, and has no tools/data mutation privileges. System text marks public content untrusted. User history permits six user/assistant turns of 1,500 characters each; system/tool roles are rejected. Output is capped at 350 provider tokens and 6,000 response characters with a 15-second timeout. Prompt injection cannot retrieve data that is never provided; output truthfulness is not guaranteed by a prompt. The existing local assistant remains a fallback when the provider/backend is unavailable.

## Rate, payload and error policies

| Action | Per process limit |
| --- | --- |
| API traffic | 300/IP/minute |
| Code request | 5/IP/15 minutes; 60-second global resend cooldown; 10 code emails/hour globally |
| Code verification | 10/IP/15 minutes plus five wrong attempts/code |
| Admin writes | 60/IP/minute |
| Contact | 3/IP/15 minutes, identical-message suppression for 15 minutes, 30 sends/hour globally |
| AI | 8/IP/minute, 100 provider attempts/day globally |

Limiter memory is capped at 10,000 active keys with rejection on saturation and expiry cleanup. The daily AI cap limits attempts, not a provider-currency guarantee; configure provider-side spend limits too. Limits/OTP/session state are per process and reset on restart. Before scaling to multiple instances, move state to a coordinated store; do not assume aggregate quotas or session affinity. TRUST_PROXY_HOPS defaults off: never blindly trust forwarded IP headers. Enable only the verified one/two-hop topology; otherwise limits may apply to the shared proxy IP, favoring safety over availability. Spoofed IP assumptions are part of deployment review.

JSON body limit 64 KiB; content fields max 20,000 chars, descriptions/messages 5,000, list 30 items ×100 chars, URLs 2,048, title/common text 240. Unknown keys and non-HTTP(S)/credential-bearing URLs rejected; API is plain text/React-safe rendering, not HTML execution. Future rich HTML must use a real sanitizer. Mutations validate before saving, write a temporary JSON file then replace, and update in-memory data only after persistence succeeds. This is still a single-instance JSON store; no database migration is performed in Phase 1.

Responses use 400 validation/JSON, 401 auth, 403 origin, 404 missing route/record, 413 body size, 415 content type, 429 limits, 503 provider delivery/unavailability, generic 500 internal errors. No stack/provider detail returned. Public fallback does not turn errors into administrative success.

## Origin and HTTP headers

Backend defaults: `https://shalomk.me`, `https://www.shalomk.me`; local `http://localhost:3000` and `http://localhost:5173` only outside production. ALLOWED_ORIGINS adds comma-separated **exact** origins (legacy ALLOWED_ORIGIN supported). No wildcard Pages domain or stale unrelated pages.dev host. Preview hostname must be approved and explicitly configured on a test/staging backend; do not silently widen production CORS.

API responses have no-store, nosniff, DENY framing, restrictive CSP, strict-origin referrer policy, permissions restrictions and HSTS when HTTPS is established. Cloudflare frontend headers live in `public/_headers`: same-origin scripts, self/known backend connections, HTTPS/data images, Google fonts, no objects/frames/form navigation. Inline styles remain allowed for existing React/MUI inline styles; inline executable scripts are not allowed. Contact uses fetch; no native form navigation. No permissive script unsafe-inline/eval. If the backend hostname changes, update the exact frontend connect-src alongside the public API URL. Vite development middleware needs development permissions; frontend production policy is delivered by Pages, not assumed inherited from Render.

## Environment / release sequence (no production changes made)

Server `.env.example` contains placeholders only. Real `.env*` files ignored, example explicitly allowed. Required production: NODE_ENV=production, ADMIN_EMAIL, RESEND_API_KEY; verify MAIL_FROM against Resend's verified domain. Optional OPENROUTER_API_KEY and OPENROUTER_MODEL; without key, remote AI returns generic 503 and client local fallback works. PORT valid integer. ALLOWED_ORIGINS exact list; TRUST_PROXY_HOPS only after topology verification. Startup fails closed for missing required production mail configuration/invalid configuration or corrupt store.

Cloudflare: keep VITE_API_BASE_URL as the public API origin. **Remove VITE_OPENROUTER_API_KEY and VITE_WEB3FORMS_KEY from build variables before production build**; the build deliberately fails if legacy provider-secret VITE variables are supplied. Move OpenRouter key to Render OPENROUTER_API_KEY. Do not reveal the existing values. Previously shipped browser OpenRouter key should be treated as exposed: owner must authorize provider rotation/revocation; Phase 1 does not rotate it. Audit any Web3Forms credential separately; it is no longer used by this contact path. No DNS or hosting/secret settings modified here.

Use isolated staging API/test mail and mock AI for Preview. Production currently points at the old API; the new client requires a valid session-token response and thus fails closed against the old success-only login response. Release the secured backend first (public reads/contact compatible), configure server mail/origins, remove client secret variables, then release frontend. Old admin clients cannot mutate the secured backend; administrators must refresh/re-authenticate. Public display remains functional during this transition. Verify real mailbox delivery and login manually only with owner-approved controlled delivery. Do not merge Phase 1 until these prerequisites are reviewed and production authorization is granted.

Rollback: redeploy a known secured build and restore a verified data backup if needed. Do not roll back blindly to unauthenticated CMS writes or browser keys. If authentication fails, keep writes closed and fix configuration; never enable a demo code/bypass. Retain JSON backup and compare all existing IDs/counts before any future storage work.

## Verification and limitations

`npm ci`, `npm run test:security` / `npm test`, `npm run build`, `npm run lint`, online npm audit, local isolated HTTP smoke checks, bundle credential inspection and configuration tests. Native node:test fixtures inject mock mail/AI, fake clock and persistence, never production providers/store. Tests cover public/draft reads, all collection mutations, successful/invalid/expired/reused OTP, attempt limits/cooldown, session expiry/logout, schemas/URLs/identifiers, CORS, body/content types, rates, safe errors, contact escaping/deduplication and AI role/context/cost controls. Provider budget and multi-instance limitations require operator configuration, not fake tests. Baseline Timeline.jsx lint errors are separate from Phase 1 regressions.

Dependency before/after report, versions, chains, exposure and actual verification are in DEPENDENCY_SECURITY_REVIEW.md (fresh baseline 21, final known advisory count zero). No npm audit fix --force or framework-major upgrade. Source search confirmed the removed integrations had no application imports. Never describe the app as fully secure merely because tests/audit pass. Visual/accessibility renovation remains later phases; local smoke/UI checks assess regressions only.

Phase 1 CI: pinned official checkout/setup-node actions, read-only contents permission, no persisted checkout credentials or provider secrets. Runs clean install, 12 mocked tests, build, bundle inspection, online audit and an explicit exact-baseline lint comparison. npm run lint:phase1 fails on any new diagnostic or baseline drift and reports the three unchanged Timeline.jsx errors; it does not claim full npm run lint passes. The full lint command remains a recorded baseline failure, as expressly allowed by the owner. No production deployment job is added. Local regression server port 3015 was stopped after read-only smoke tests.
