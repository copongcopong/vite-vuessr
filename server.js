const polka = require('polka')
const sirv = require('sirv');
global.fetch = require('node-fetch')
const path = require('path')


const dist = `./dist`

// This contains a list of static routes (assets)
const { ssr } = require(`${dist}/server/package.json`)

// The manifest is required for preloading assets
const manifest = require(`${dist}/client/ssr-manifest.json`)

// This is the server renderer we just built
const { default: renderPage } = require(`${dist}/server`)

//const api = require('./api')

const server = polka()


console.log(ssr.assets)
server.use(sirv(`${dist}/client/`))
// Serve every static asset route
/*for (const asset of ssr.assets || []) {
  server.use(
    '/' + asset,
    sirv(path.join(__dirname, `${dist}/client/` + asset))
  )
}
*/
/*
// Custom API to get data for each page
// See src/main.js to see how this is called
api.forEach(({ route, handler, method = 'get' }) =>
  server[method](route, handler)
)
*/

// Everything else is treated as a "rendering request"
server.get('*', async (request, response) => {
  //console.log(request)
  const host = request.headers?.host;
  const url = 'http://' + host + request.url
    console.log('ssr > url ', url)
  const { html, status, statusText, headers } = await renderPage(url, {
    manifest,
    preload: true,
    // Anything passed here will be available in the main hook
    request,
    response,
    // initialState: { ... } // <- This would also be available
  })

  response.writeHead(status || 200, statusText || headers, headers)
  response.end(html)
})

const port = process.env.PORT || 8080
console.log(`Server started: http://localhost:${port}`)
server.listen(port)