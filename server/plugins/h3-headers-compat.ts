import { ensureHeadersGet } from '../utils/ensure-headers-get'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    ensureHeadersGet(event)
  })
})
