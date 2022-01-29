import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes';
import { createMiddleware } from './middleware';

export { createRouter }

function createRouter() {
  const router = _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: routes
  });
  
  createMiddleware({router});

  return router;
}
