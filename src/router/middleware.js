import { useAuth } from '@/hooks/app/auth';
export { createMiddleware };

function createMiddleware (context) {
  const { router, request } = context;
  const auth = useAuth({ctx: context});
  router.beforeEach((to, from, next) => {
    //const auth = useAuth(pinia);
    var at = (import.meta.env.SSR) ? 'ssr' : 'client';
    console.log(at + ':router > mid ', {to: to.path, isLoggedIn: auth.isLoggedIn()});

    if (auth.isLoggedIn()) {
      if (to.path === '/login') return next('/app');
    } else {
      if (to.meta?.auth === true) return next('/login?path=' + to.path);
    }

    next();
  });
}  