import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes';
import { useAuth } from '@/stores/auth';

export { createRouter }

function createRouter(pinia) {
  const router = _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: routes
  });
  const auth = useAuth(pinia);
  router.beforeEach((to, from, next) => {
    //const auth = useAuth(pinia);
    console.log('router > mid '+ to.path, import.meta.env.SSR);
    console.log({auth, to}, auth.isLoggedIn(), auth.auth)

    if (auth.isLoggedIn()) {
      if (to.path === '/login') return next('/app');
    } else {
      if (to.meta?.auth === true) return next('/login?path=' + to.path);
    }

    
    return next()
  });

  return router;
}
