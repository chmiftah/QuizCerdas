export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')

  const baseUrl = 'https://countingduo.id'
  const today = new Date().toISOString().split('T')[0]

  const routes = [
    { loc: '/', changefreq: 'daily', priority: '1.0' },
    { loc: '/catalog', changefreq: 'weekly', priority: '0.9' },
    { loc: '/tracing', changefreq: 'weekly', priority: '0.8' },
    { loc: '/games/bubble-pop', changefreq: 'weekly', priority: '0.8' },
    { loc: '/coloring', changefreq: 'weekly', priority: '0.8' },
    { loc: '/nursery-rhymes', changefreq: 'monthly', priority: '0.7' },
    { loc: '/pricing', changefreq: 'monthly', priority: '0.8' },
    { loc: '/about', changefreq: 'monthly', priority: '0.8' },
    { loc: '/parent-dashboard', changefreq: 'weekly', priority: '0.8' },
    { loc: '/shop', changefreq: 'weekly', priority: '0.7' },
    { loc: '/leaderboard', changefreq: 'daily', priority: '0.7' },
    { loc: '/stickers', changefreq: 'monthly', priority: '0.6' },
    { loc: '/register', changefreq: 'monthly', priority: '0.6' },
    { loc: '/login', changefreq: 'monthly', priority: '0.5' }
  ]

  const xmlUrls = routes
    .map(
      (r) => `  <url>
    <loc>${baseUrl}${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`
})
