import { defineStore } from 'pinia';
import { createCookies } from '@vueuse/integrations';

import axios from 'axios';
import { waitFor } from '@/hooks/libs';

const apiuri = import.meta.env.VITE_API_BASEURI;
const cookiename = 'authToken';
let ucookies, cookies;
export const useAuth = defineStore('auth', {
  state () {
    var a, user, token, expires;
    try {
      a = JSON.parse(localStorage.getItem('auth'));
      user = a.userinfo;
      token = a.token;
      expires = a.expires;
    } catch (e) {

    }
    
    return {
      user, token, expires,
      t: true,
      auth: a
    }
  },
  actions: {
    initCookie (request) {
      ucookies = createCookies(request);
      cookies = ucookies([cookiename]);
    },
    isLoggedIn () {
      
      const ok = cookies.get(cookiename);

      //console.log('isloggedin', !!ok)

      return !!ok;
    },
    tagAsAuth (token) {
      cookies.set(cookiename, token);
      this.token = token;
    },
    async removeAuthTag () {
      //console.log('logut', cookies.get(cookiename))
      cookies.remove(cookiename);
    },
    async doLogin (params) {
      console.log(params);
      try {
        const auth = await login(params);
        this.tagAsAuth(auth.token);
        this.user = auth.userinfo;
        this.expires = auth.expires;
        localStorage.setItem('auth', JSON.stringify(auth))
        return true;
      } catch (e) {
        console.log(e);
      }
      return false;
    },
    async doLogout () {
      //console.log('auth>logout', cookies.get(cookiename))
      await waitFor(10);
      localStorage.clear();
      await this.removeAuthTag();
      return true;
    }
  }
});

async function login (data) {
  try {
    data.identity = encodeURIComponent(data.email);
    var resp = await axios({
      method: 'post',
      url: `${apiuri}/auth/login`,
      data: `identity=${data.identity}&password=${data.password}&userinfo=true`,
      config:  { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    })
    var reply = resp.data;
    if (reply.status === 'error') {
      throw Error(reply.message || 'Unable to login.')
    }
    
    return reply.data;
  } catch (e) {
    throw(e)
   
    return false;
  }
}