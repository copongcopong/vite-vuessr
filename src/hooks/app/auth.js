import Cookies from 'universal-cookie';
import { createStore } from '@/hooks/app/data-store';
import { nanoid } from 'nanoid';

export const useAuth = (initData) => {
  const TOKEN = import.meta.env.VITE_AUTH_TOKEN_NAME;
  let cookie;
  let context;
  if (initData) {
    //console.log('init called', init)
    if (initData.ctx) {
      context = initData.ctx;
      if (initData.ctx.request?.headers?.cookie) {
        console.log('> cookie init from headers')
      }
      cookie = new Cookies(initData.ctx.request?.headers?.cookie)
    }
  }

  if (!cookie) {
    console.log('> cookie init from local')
    cookie = new Cookies();
  }

  return createStore('auth', {
    ctx: context,
    data: {'name': 'auth', auth: null},
    init () {
      //if (initData.ctx) {
      //  this.$ctx = initData.ctx
      //}
      console.log('init auth')
      this.set('boo', 1)
    },

    isLoggedIn () {
      const t = cookie.get(TOKEN);
      return t;
    },
    doLogout () {
      cookie.remove(TOKEN)
      delete this.$data['auth']
      return true;
    },
    async doLogin (pars) {
      console.log('sett after login', pars)
      this.set('auth', pars)
      this.set('deep.is', 'how')
      cookie.set(TOKEN, nanoid())
      return true;
    }
  });
}