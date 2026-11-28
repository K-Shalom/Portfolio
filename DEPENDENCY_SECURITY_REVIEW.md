# Phase 1 dependency security review

November 28, 2026. Fresh online baseline: {"info":0,"low":0,"moderate":9,"high":8,"critical":4,"total":21}. Final online audit: {"info":0,"low":0,"moderate":0,"high":0,"critical":0,"total":0}. npm audit counts package entries including inherited chains, not unique CVEs. No npm audit fix --force, framework-major change, blanket override or automatic major downgrade. Actual installs/build/API tests validate the resulting tree; zero reported known advisories is not a security guarantee.

## Per-finding assessment and outcome

| Package | Baseline version(s) | Direct/transitive | Severity | Baseline chain | Exposure / remediation | Final version(s) |
| --- | --- | --- | --- | --- | --- | --- |
| @eslint/config-array | 0.23.5 | Transitive | moderate | eslint → @eslint/config-array | Build/lint or library dependency; assess actual caller/input reachability, not severity alone. Compatible resolution updated. | 0.23.7 |
| @mui/icons-material | 6.5.0 | Direct | moderate | @mui/icons-material | UI runtime packages retained at same major/version; inherited optional Pigment exposure removed. Rejected suggested major downgrade. | 6.5.0 |
| @mui/material | 6.5.0 | Direct | moderate | @mui/material | UI runtime packages retained at same major/version; inherited optional Pigment exposure removed. Rejected suggested major downgrade. | 6.5.0 |
| @mui/material-pigment-css | 6.5.0 | Direct | moderate | @mui/material-pigment-css | Unused optional Pigment build chain. Removed direct Pigment integration; MUI/Emotion and icons retained, no MUI downgrade. | Removed |
| @pigment-css/react | 0.0.29 | Transitive | critical | @mui/material-pigment-css → @pigment-css/react | Unused optional Pigment build chain. Removed direct Pigment integration; MUI/Emotion and icons retained, no MUI downgrade. | Removed |
| @wyw-in-js/processor-utils | 0.5.5 | Transitive | moderate | @mui/material-pigment-css → @pigment-css/react → @wyw-in-js/processor-utils | Unused optional Pigment build chain. Removed direct Pigment integration; MUI/Emotion and icons retained, no MUI downgrade. | Removed |
| @wyw-in-js/shared | 0.5.5 | Transitive | moderate | @mui/material-pigment-css → @pigment-css/react → @wyw-in-js/shared | Unused optional Pigment build chain. Removed direct Pigment integration; MUI/Emotion and icons retained, no MUI downgrade. | Removed |
| @wyw-in-js/transform | 0.5.5 | Transitive | critical | @mui/material-pigment-css → @pigment-css/react → @wyw-in-js/transform | Unused optional Pigment build chain. Removed direct Pigment integration; MUI/Emotion and icons retained, no MUI downgrade. | Removed |
| body-parser | 1.20.6 | Transitive | high | express → body-parser | Runtime Express request/IP parsing; bounded JSON input and explicit proxy trust plus compatible Express/parser patch. | 1.20.9 |
| brace-expansion | 5.0.8, 2.1.4 | Transitive | high | eslint → @eslint/config-array → minimatch → brace-expansion | Build/lint or library dependency; assess actual caller/input reachability, not severity alone. Compatible resolution updated. | 5.1.0 |
| eslint | 10.8.0 | Direct | moderate | eslint | Build/lint or library dependency; assess actual caller/input reachability, not severity alone. Compatible resolution updated. | 10.16.0 |
| happy-dom | 15.11.7 | Transitive | critical | @mui/material-pigment-css → @pigment-css/react → @wyw-in-js/transform → happy-dom | Unused optional Pigment build chain. Removed direct Pigment integration; MUI/Emotion and icons retained, no MUI downgrade. | Removed |
| js-yaml | 4.3.1 | Transitive | high | @mui/material-pigment-css → @pigment-css/react → @wyw-in-js/transform → cosmiconfig → js-yaml | Removed with the unused build integration chain; no runtime handler used it. | Removed |
| minimatch | 10.2.5, 9.0.9 | Transitive | moderate | eslint → @eslint/config-array → minimatch | Build/lint or library dependency; assess actual caller/input reachability, not severity alone. Compatible resolution updated. | 11.0.9 |
| nanoid | 3.3.16 | Transitive | high | vite → postcss → nanoid | Build/lint or library dependency; assess actual caller/input reachability, not severity alone. Compatible resolution updated. | 3.3.20 |
| nodemailer | 6.10.1 | Direct | high | nodemailer | Direct but unused: live mail path uses Resend. Removed rather than accepting a major-upgrade suggestion. | Removed |
| proxy-addr | 2.0.7 | Transitive | critical | express → proxy-addr | Runtime Express request/IP parsing; bounded JSON input and explicit proxy trust plus compatible Express/parser patch. | 2.0.8 |
| qs | 6.15.3 | Transitive | moderate | express → qs | Runtime Express request/IP parsing; bounded JSON input and explicit proxy trust plus compatible Express/parser patch. | 6.16.2 |
| source-map-js | 1.2.1 | Transitive | high | @tailwindcss/vite → @tailwindcss/node → source-map-js | Build/lint or library dependency; assess actual caller/input reachability, not severity alone. Compatible resolution updated. | 1.2.4 |
| vite | 8.1.5 | Direct | high | vite | Development server/editor/middleware exposure; updated within Vite 8. Production API no longer imports Vite at module load. | 8.4.0 |
| zod | 4.4.3 | Transitive | high | @openrouter/agent → zod | Remaining hooks-lint plugin validation dependency after unused OpenRouter agent removal. Updated to patched 4.x within its declared 3.x-or-4.x dependency range; app has no Zod input handler. | 4.6.7 |

## Compatible changes and evidence
Removed four unimported direct dependencies: @mui/material-pigment-css, @openrouter/agent, nodemailer and yaml. Search of src/server found no import/use of those packages; existing AI moved to native server fetch and mail remains Resend. npm update targeted existing compatible Express 4, Vite 8, ESLint 10 and affected transitive packages; no framework majors changed. Zod 4 is accepted by the existing eslint-plugin-react-hooks dependency union, not a new app framework migration. package-lock.json is maintained by npm; no Bun lock reintroduced.

Clean npm ci completed (295 packages / 296 audited on the first revised tree; three findings remained), then a justified compatible update of Express/query parsing/Zod changed three packages and removed one. Final npm test passed all 12 isolated API/security/client/configuration scenarios; final online audit reports zero known advisories. Build and lint results are recorded in PROGRESS.md. The three Timeline.jsx issues are pre-existing and separate. No runtime source of the original nine stored records changed.

No unresolved advisory appears in this final report. Continue monitoring advisories and verify actual Render production install/runtime configuration before deployment. Existing production has not been upgraded. No independent human review or provider security certification is implied.
