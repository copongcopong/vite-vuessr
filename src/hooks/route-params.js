import { useRoute } from 'vue-router';
import { ref, watch, onUnmounted } from 'vue';

export { useRouteParams, useQueryParams };

function useRouteParams (key, cb) {
  const u = Symbol(key);
  const route = useRoute();
  const param = {};
  param[u] = ref(route.params[key]);
  const stop = watch(() => route.params[key], async (nval, oval) => {
      param[u].value = nval;
      if (cb) cb(nval, oval)
    });
  onUnmounted(() => stop());
  return param[u];
}

function useQueryParams (key, cb) {
  const u = Symbol(key);
  const route = useRoute();
  const param = {};
  param[u] = ref(route.query[key]);
  const stop = watch(() => route.query[key], async (nval, oval) => {
      param[u].value = nval;
      if (cb) cb(nval, oval)
    });
  onUnmounted(() => stop());
  return param[u];
}