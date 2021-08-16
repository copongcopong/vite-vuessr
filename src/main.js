import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { createRouter } from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
const router = createRouter(pinia)

app.use(pinia)
app.use(router)
app.mount('#app')
