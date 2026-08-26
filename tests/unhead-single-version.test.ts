import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

/**
 * Nitro's serverless tracer copies an incomplete `unhead` when more than one
 * version is installed. The Netlify function then 500s on
 * `unhead/dist/legacy.mjs` (imported from chunks/routes/renderer.mjs).
 */
const lockfile = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '..', 'pnpm-lock.yaml'),
  'utf8'
)

function lockfileVersions(name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`^ {2}'?${escaped}@([^'"\\s:(]+)`, 'gm')
  return new Set([...lockfile.matchAll(pattern)].map((match) => match[1]))
}

test('lockfile resolves a single unhead version', () => {
  const versions = lockfileVersions('unhead')
  assert.equal(
    versions.size,
    1,
    `expected one unhead version so Nitro can package dist/legacy.mjs; found ${[...versions].join(', ')}`
  )
})
