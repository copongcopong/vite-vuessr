import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

export { useRouteParams, useQueryParams };
function useRouteParams (key, cb) {
  
  const route = useRoute();
  const param = ref(route.params[key]);
    watch(() => route.params[key], async (nval, oval) => {
      param.value = nval;
      if (cb) cb(nval, oval)
    });

    return param;
}

function useQueryParams (key, cb) {
  
  const route = useRoute();
  const param = ref(route.query[key]);
    watch(() => route.query[key], async (nval, oval) => {
      param.value = nval;
      if (cb) cb(nval, oval)
    });

    return param;
}