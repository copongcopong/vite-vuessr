import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';
import axios from 'axios';

const apiuri = import.meta.env.VITE_API_BASEURI;
const cookies = useCookies(['authToken']);
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
    isLoggedIn () {
      
      const ok = cookies.get('authToken');

      console.log('isloggedin', ok, !!ok)

      return !!ok;
    },
    tagAsAuth (token) {
      cookies.set('authToken', token);
      this.token = token;
    },
    removeAuthTag () {
      cookies.remove('authToken');
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
      localStorage.clear();
      this.removeAuthTag();
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