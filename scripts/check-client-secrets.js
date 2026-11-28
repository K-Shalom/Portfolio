import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('dist')
let count = 0
function inspect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) inspect(file)
    else if (/\.(js|html|css|map)$/.test(file)) {
      const content = fs.readFileSync(file, 'utf8')
      if (/sk-or-v1-[a-zA-Z0-9_-]{12,}|ghp_[a-zA-Z0-9]{12,}|PRIVATE KEY-----|VITE_OPENROUTER_API_KEY|VITE_RESEND_API_KEY|SECRET_PROVIDER_SENTINEL/.test(content)) throw new Error('Client credential pattern detected; file details deliberately withheld.')
      count++
    }
  }
}
inspect(root)
console.log(`Client credential-pattern inspection passed for ${count} build files. This is not an exhaustive secret scan.`)
