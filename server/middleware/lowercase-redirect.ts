export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const path = url.pathname
  const lower = path.toLowerCase()
  if (lower !== path) {
    return sendRedirect(event, lower + (url.search ?? ''), 301)
  }
})
