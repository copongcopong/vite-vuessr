import '/node_modules/primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'; 

import App from './App.vue';
import { ClientOnly } from 'vite-ssr';
import { createHead } from '@vueuse/head';
import PrimeVue from 'primevue/config';
import { boot as bootSpa } from './configs/bootstrap-spa';
import { boot as bootSsr } from './configs/bootstrap-ssr';

const head = createHead();
const context = { PrimeVue, ClientOnly, head };
let init;

if (import.meta.env.VITE_STACK_MODE === 'spa') {
  bootSpa(App, context);
} else {
  init = bootSsr(App, context)
}

export default init;