# Vite-VueSSR

 - Server Side Render (initial url load is created server-side.)
  - based on https://github.com/frandiox/vite-ssr and https://github.com/web2033/vite-vue3-tailwind-starter
 - uses vue 3 (composition api), vue-router, vueuse, vee-validate, universal-cookie, axios
 - uses **polka** for ssr nodejs server and **sirv**
 - uses simple store based on vue3 reactive pattern

## Install

```
npm i 
```
## SSR mode

Run local dev (ssr version) 

```
npm run dev-ssr

```

Run local (build) ssr (prod in local)

```
npm run serve-ssr:dist

```

Build ssr version

```
npm run build-ssr
```

## SPA mode

Run local dev 

```
npm run dev

```
Build spa

```
npm run build
```

Run local preview 

```
npm run serve

```

### Files and Folders

- rename `~.env` to `.env` for vite env config
    - VITE_API_BASEURI = the api uri

- `/src/pages/app` - main app pages folder
- `/src/routes` - routing logic; see `middleware.js` on how stack handles authentication;
   - uses `meta.auth` in `routes.js` for protected pages
- `/src/stores` - pinia stores; `auth.js` handles authentication logic


## Gotchas

- call images inside `/src/assests` folder like `<img src="@/assets/logo.png">`
- SSR may sometimes will not work for Components designed for clientside only
    - to solve this use `<client-only>...</client-only>` 

