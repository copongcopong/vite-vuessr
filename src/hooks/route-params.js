import { useRoute } from 'vue-router';
import { ref, watch, onUnmounted } from 'vue';

export { useRouteParams, useQueryParams };

function useRouteParams (key, cb) {
  
  const route = useRoute();
  const param = ref(route.params[key]);
  const stop = watch(() => route.params[key], async (nval, oval) => {
      param.value = nval;
      if (cb) cb(nval, oval)
    });
  onUnmounted(() => stop());
  return param;
}

function useQueryParams (key, cb) {
  
  const route = useRoute();
  const param = ref(route.query[key]);
  const stop = watch(() => route.query[key], async (nval, oval) => {
      param.value = nval;
      if (cb) cb(nval, oval)
    });
  onUnmounted(() => stop());
  return param;
}