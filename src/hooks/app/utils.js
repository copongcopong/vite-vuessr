import axios from 'axios';
import Cookies from 'universal-cookie';
import { useAuth } from '@/hooks/app/auth';

const apiuri = import.meta.env.VITE_API_BASEURI;

var conf = {
  baseURL: apiuri
};

const axiosInstance = axios.create(conf);
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  
  if(response.data && response.data.status === 'error') {
    if (response.data?.token_issue === true) {
      
      //re login is required
      if (!import.meta.env.SSR) {
        const auth = useAuth();
        auth.doLogout();
      }
      if (location) {
        location.href = '/';
      }
    }
  }

  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('ax error', error.message || 'error')
  return Promise.reject(error);
});

function getAuthToken () {
  const auth = useAuth();
  if (auth.$ctx) {
    var ctx = auth.$ctx;
    var request = {};
    if (ctx.request) request = ctx.request;
    const t = 'authToken'
    const cookie = new Cookies(request?.headers?.cookie)
    return cookie.get(t)
  }
  return null;
}

export const useAppUtils = () => {
  //console.log('~~~getToken ' + new Date(), getAuthToken())
  const token = getAuthToken();
  if (token) {
    axiosInstance.defaults.headers.common['x-access-token'] = token;
  }

  return {
    $ax: axiosInstance
  }
}