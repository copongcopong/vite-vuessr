const fileServer = require('./ssr-server/file-server');
const HyperExpress = require('hyper-express');
const server = new HyperExpress.Server();

const dist = `./dist`

// This contains a list of static routes (assets)
const { ssr } = require(`${dist}/server/package.json`)

// The manifest is required for preloading assets
const manifest = require(`${dist}/client/ssr-manifest.json`)

// This is the server renderer we just built
const { default: renderPage } = require(`${dist}/server`)

const dir = `${dist}/client`;

server.get('/*', {
    middlewares: [fileServer(dir)]
  },
 async (request, response) => {
  //console.log(request)
  const host = request.headers?.host;
  const uri = 'http://' + host + request.url
  const {cookies, url, query, path, method } = request
  const serverRedirect = response.redirect;
  console.log('ssr > uri ', uri, request)
  try {
    const ssr = await renderPage(url, {
      manifest,
      preload: true,
      // Anything passed here will be available in the main hook
      request,
      response,
      cookies,
      url, query, path, method,
      serverIs: 'hyper-express',
      serverRedirect
      // initialState: { ... } // <- This would also be available
    });
  
    const { html, status, statusText, headers } = ssr;
  
    //console.log({ssr})
    response.status(status || 200)
    response.send(html)
  } catch (e) {
    console.log(e)
    response.status(500)
    response.send('error')
  }

})

const port = process.env.PORT || 8080
console.log(`Server started: http://localhost:${port}`)
server.listen(port)