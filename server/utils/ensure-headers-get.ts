type NodeLikeHeaders = Record<string, string | string[] | undefined> & {
  get?: (name: string) => string | null
}

type NodeLikeEvent = {
  req?: {
    headers?: NodeLikeHeaders
  }
}

/**
 * Nitro on Netlify still exposes Node IncomingMessage headers (a plain object).
 * h3 v2 helpers call `event.req.headers.get()`, which throws TypeError there.
 */
export function ensureHeadersGet(event: NodeLikeEvent) {
  const headers = event.req?.headers
  if (!headers || typeof headers.get === 'function') {
    return
  }

  headers.get = (name: string) => {
    const value = headers[String(name).toLowerCase()]
    if (value == null) {
      return null
    }
    return Array.isArray(value) ? value.join(', ') : String(value)
  }
}
