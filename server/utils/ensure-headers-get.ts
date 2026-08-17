type NodeLikeHeaders = Record<string, string | string[] | undefined> & {
  get?: (name: string) => string | null
}

type NodeLikeRequest = {
  url?: string
  originalUrl?: string
  headers?: NodeLikeHeaders
  socket?: { encrypted?: boolean }
  connection?: { encrypted?: boolean }
}

export type NodeLikeEvent = {
  url?: URL
  node?: { req?: NodeLikeRequest }
  req?: NodeLikeRequest
}

function rawHeaderValue(headers: NodeLikeHeaders, name: string): string | null {
  const value = headers[name]
  if (value == null) {
    return null
  }
  return Array.isArray(value) ? value.join(', ') : String(value)
}

function headerValue(headers: NodeLikeHeaders, name: string): string | null {
  if (typeof headers.get === 'function') {
    return headers.get(name)
  }
  return rawHeaderValue(headers, name)
}

function ensureHeadersGetMethod(headers: NodeLikeHeaders) {
  if (typeof headers.get === 'function') {
    return
  }

  headers.get = (name: string) => rawHeaderValue(headers, String(name).toLowerCase())
}

function resolveRequestPath(event: NodeLikeEvent): string {
  const req = event.node?.req || event.req
  const raw = req?.originalUrl || req?.url || '/'
  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw
  }
  return raw.startsWith('/') ? raw : `/${raw}`
}

function resolveRequestOrigin(event: NodeLikeEvent, headers: NodeLikeHeaders): string {
  const forwardedHost = headerValue(headers, 'x-forwarded-host')
  const host =
    (forwardedHost || '').split(',')[0]?.trim() || headerValue(headers, 'host') || 'localhost'
  const forwardedProto = headerValue(headers, 'x-forwarded-proto')
  const protoFromHeader = (forwardedProto || '').split(',')[0]?.trim()
  const req = event.node?.req || event.req
  const proto =
    protoFromHeader === 'http' || protoFromHeader === 'https'
      ? protoFromHeader
      : req?.socket?.encrypted || req?.connection?.encrypted
        ? 'https'
        : 'http'
  return `${proto}://${host}`
}

/**
 * Nitro on Netlify still uses Node IncomingMessage events (h3 v1).
 * Helpers bundled from h3 v2 expect a Web Request: Headers#get and an absolute URL.
 */
export function ensureHeadersGet(event: NodeLikeEvent) {
  const req = event.node?.req || event.req
  const headers = req?.headers
  if (headers) {
    ensureHeadersGetMethod(headers)
  }

  if (event.url instanceof URL) {
    return
  }

  const path = resolveRequestPath(event)
  const origin = headers ? resolveRequestOrigin(event, headers) : 'http://localhost'
  try {
    event.url =
      path.startsWith('http://') || path.startsWith('https://')
        ? new URL(path)
        : new URL(path, origin)
  } catch {
    event.url = new URL(origin.endsWith('/') ? origin : `${origin}/`)
  }
}
