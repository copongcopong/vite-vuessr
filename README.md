# VITE-SSR + VUE3

 - Server Side Render (initial url load is created server-side.)
  - based on https://github.com/frandiox/vite-ssr

 - uses vue-router/next
 - uses Pinia for store https://pinia.esm.dev/


```
npm i 
```

Run local dev

```
npm run devssr

```

Run local (build) ssr (prod in local)

```
npm run serve-ssr:dist

```

Build ssr version

```
npm run vbuild
```

### Files and Folders

- rename `~.env` to `.env` for vite env config
    - VITE_API_BASEURI = the api uri

- `/src/pages/app` - main app pages folder
- `/src/pages/mocks` - Mock folder for html and design mocks
    - `Base.vue` - main layout for mocks. edit to add links (edit also mock-routes.js)

- `/src/router/routes.js` - Main Route for the application
- `/src/router/mock-routes.js` - Route for '/mocks


## Gotchas

- call images inside `/src/assests` folder like `<img src="@/assets/logo.png">`
- SSR may sometimes will not work for Components designed for clientside only
    - to solve this use `<client-only>...</client-only>` 

