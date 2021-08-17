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


## Gotchas

- call images inside `/src/assests` folder like `<img src="@/assets/logo.png">`
- SSR may sometimes will not work for Components designed for clientside only
    - to solve this use `<client-only>...</client-only>` 

