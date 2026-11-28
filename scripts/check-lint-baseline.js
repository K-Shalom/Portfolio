/* global process */
import { ESLint } from 'eslint'

// Explicitly report, rather than silently suppress, the owner's tracked baseline.
const expected = new Set(['1:41:no-unused-vars', '164:16:react-hooks/immutability', '164:49:react-hooks/immutability'])
const results = await new ESLint().lintFiles(['.'])
let retained = 0
const unexpected = []
for (const file of results) for (const message of file.messages) {
  const signature = `${message.line}:${message.column}:${message.ruleId}`
  if (file.filePath.replaceAll('\\', '/').endsWith('/src/components/Timeline.jsx') && message.severity === 2 && expected.has(signature)) retained++
  else unexpected.push(`${file.filePath}:${message.line} ${message.ruleId}: ${message.message}`)
}
if (unexpected.length || retained !== 3) {
  console.error(unexpected.join('\n') || 'Lint baseline changed; review the recorded exception.')
  process.exitCode = 1
} else console.log('No new lint errors/warnings. Exactly three tracked Timeline.jsx errors remain; full npm run lint still fails.')
