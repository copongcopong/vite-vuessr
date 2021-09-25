import Cookies from 'universal-cookie';
import { createStore } from '@/hooks/app/data-store';
import { nanoid } from 'nanoid';

export const useAuth = (initData) => {
  const TOKEN = import.meta.env.VITE_AUTH_TOKEN_NAME;
  let cookie;
  let context;
  let serverCookies;
  if (initData) {
    //console.log('init called', init)
    if (initData.ctx) {
      const { ctx } = initData;
      context = ctx;
      if (ctx.cookies) {
        serverCookies = ctx.cookies;
      } else if (ctx.request) {
        serverCookies = ctx.request?.headers?.cookie
      }
      if (serverCookies) {
        console.log('> cookie init from server')
        cookie = new Cookies(serverCookies)
      }
    }
  }
  
  console.log('cookie is ', cookie, import.meta.env.SSR)
  if (!cookie) {
    console.log('> no server cookies. init cookie')
    cookie = new Cookies();
  }

  return createStore('auth', {
    ctx: context,
    data: {'name': 'auth', auth: null},
    init () {
      //if (initData.ctx) {
      //  this.$ctx = initData.ctx
      //}
      console.log('init auth ', import.meta.env.SSR, serverCookies)
      this.set('boo', 1)
      this.$cookie = cookie
    },

    isLoggedIn () {
      //console.log('this.$cookie', this.$cookie)
      const t = this.$cookie.get(TOKEN);
      return t;
    },
    doLogout () {
      this.$cookie.remove(TOKEN)
      delete this.$data['auth']
      return true;
    },
    async doLogin (pars) {
      console.log('sett after login', pars)
      this.set('auth', pars)
      this.set('deep.is', 'how')
      this.$cookie.set(TOKEN, nanoid())
      return true;
    }
  });
}