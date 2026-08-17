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

/**
 * h3 v2 getQuery uses `new URL(event.req.url)`. On Node, IncomingMessage.url
 * is a path (`/` or `/_i18n/...`), which throws ERR_INVALID_URL.
 */
function getQueryV2(event: { url?: URL; req: { url: string } }) {
  const url = event.url || new URL(event.req.url)
  return Object.fromEntries(new URLSearchParams(url.search.slice(1)))
}

test('h3 v2 getQuery throws Invalid URL on Node IncomingMessage path', () => {
  const event = { req: { url: '/', headers: { host: 'memento-mori.mx' } } }
  assert.throws(() => getQueryV2(event), {
    name: 'TypeError',
    message: /Invalid URL/
  })
})

test('compat sets event.url so h3 v2 getQuery accepts Node paths', () => {
  const event = {
    req: {
      url: '/_i18n/c3dfac1b/es/messages.json?foo=1',
      headers: {
        host: 'memento-mori.mx',
        'x-forwarded-proto': 'https'
      }
    }
  }

  ensureHeadersGet(event)

  assert.ok(event.url instanceof URL)
  assert.equal(event.url.href, 'https://memento-mori.mx/_i18n/c3dfac1b/es/messages.json?foo=1')
  assert.deepEqual(getQueryV2(event), { foo: '1' })
})

test('compat turns Node path / into an absolute URL', () => {
  const event = {
    req: {
      url: '/',
      headers: {
        host: 'memento-mori.mx',
        'x-forwarded-proto': 'https'
      }
    }
  }

  ensureHeadersGet(event)

  assert.equal(event.url?.href, 'https://memento-mori.mx/')
  assert.deepEqual(getQueryV2(event), {})
})
