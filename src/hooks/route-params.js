import { useRoute } from 'vue-router';
import { ref, watch, onUnmounted } from 'vue';

const types = ['params', 'query'];

export { useRouteParams, useQueryParams };

function useRouteParams (key, cb) {
  return _use(key, cb, 'params');
}

function useQueryParams (key, cb) {
  return _use(key, cb, 'query');
}

function _use (key, cb, type) {
  if (types.indexOf(type) < 0) {
    throw new Error('Type must be `query` or `params`');
  }
  const u = Symbol(`${key}${type}`);
  const route = useRoute();
  const param = {};
  param[u] = ref(route[type][key]);
  const stop = watch(() => route[type][key], async (nval, oval) => {
      param[u].value = nval;
      if (cb) cb(nval, oval)
    });
  onUnmounted(() => stop());
  return param[u];
}