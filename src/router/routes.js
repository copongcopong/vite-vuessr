import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import NotFound from '@/pages/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  {
    path: '/about',
    meta: { title: 'About' },
    component: About,
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue')
  },
  {
    path: '/app',
    meta: {auth: true},
    component: () => import('@/pages/app/Base.vue'),
    children: [
      {path: '', component: () => import('@/pages/app/Index.vue')},
      {path: 'pars/:id?', component: () => import('@/pages/app/Pars.vue')}
      
    ]
  },
  {path: '/login', component: () => import('@/pages/Login.vue')},
  {path: '/logout', component: () => import('@/pages/Logout.vue')},
  { path: '/:path(.*)', component: NotFound },
];

