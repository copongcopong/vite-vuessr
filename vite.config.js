import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSSR from 'vite-ssr/plugin.js'
import path from 'path'


import Components from 'unplugin-vue-components/vite'
import {
  PrimeVueResolver,
} from 'unplugin-vue-components/resolvers'


export default defineConfig({
  plugins: [
    viteSSR(),
    vue({
      script: {
        refSugar: true,
      },
    }),
    Components({
      resolvers: [
        PrimeVueResolver({prefix: 'Pv'}),
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    //open: true,
  }
})
