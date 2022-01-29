import { createApp } from 'vue';
import { createRouter } from '@/router/spa-router';

export { boot };

function boot (App, context) {
  const { PrimeVue, ClientOnly, head } = context;
  const app = createApp(App);
  const router = createRouter();
  
  app.use(PrimeVue);
  app.use(router);
  app.use(head);
  app.mount('#app');
  app.component(ClientOnly.name, ClientOnly);

  return app
}