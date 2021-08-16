import { useAuth } from '@/stores/auth';
export { createMiddleware };

function createMiddleware (context) {
  const { pinia, router } = context;
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

    next();
  });
}  