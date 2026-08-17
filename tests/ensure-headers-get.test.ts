import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ensureHeadersGet } from '../server/utils/ensure-headers-get.ts'

/**
 * Mirrors h3 v2 getRequestHost, which the Netlify Nitro bundle calls via
 * getNitroOrigin. Node IncomingMessage headers are a plain object, so
 * `.get()` throws without the polyfill.
 */
function getRequestHostV2(
  event: { req: { headers: { get: (name: string) => string | null } } },
  opts: { xForwardedHost?: boolean } = {}
) {
  if (opts.xForwardedHost) {
    const forwarded = event.req.headers.get('x-forwarded-host')
    const host = (forwarded || '').split(',').shift()?.trim()
    if (host) return host
  }
  return event.req.headers.get('host') || ''
}

test('h3 v2 getRequestHost throws on Node IncomingMessage headers', () => {
  const event = { req: { headers: { host: 'memento-mori.mx' } } }
  assert.throws(() => getRequestHostV2(event as never), {
    name: 'TypeError',
    message: /headers\.get is not a function/
  })
})

test('polyfill lets h3 v2 getRequestHost read Node headers', () => {
  const event = {
    req: {
      headers: {
        host: 'memento-mori.mx',
        'x-forwarded-host': 'cdn.example.com, origin.example.com'
      }
    }
  }

  ensureHeadersGet(event)

  assert.equal(getRequestHostV2(event), 'memento-mori.mx')
  assert.equal(getRequestHostV2(event, { xForwardedHost: true }), 'cdn.example.com')
  assert.equal(event.req.headers.get('missing'), null)
})
