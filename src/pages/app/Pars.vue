<template>
  <h1>pars</h1>
  <p>{{auth.expires}}</p>
  <p>{{preData.parsId}}-{{preData.b}}</p>
  <p>parsId {{parsId}}</p>
  <p>pId {{pId}}</p>
  <p>qId {{qId}}</p>
</template>
<script>
import { useAuth } from '@/stores/auth';
import { usePageState } from '@/hooks/page-state';
import { useRouteParams, useQueryParams } from '@/hooks/route-params';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

export default {

  async setup(props) {
    const auth = useAuth();
    
    //pattern for a reactive route.params or route.query
    //to test, click to /pars/1 then click to /pars/2; parsId in template should change
    //use case like trigger new server call to change data show
    const route = useRoute();
    const parsId = ref(route.params.id);
    watch(() => route.params.id, async (nval, oval) => {
      console.log('watch', {oval, nval});
      parsId.value = nval;
    });

    //new composable/hook for a reactive route params
    const pId = useRouteParams('id', (n, v) => {
      console.log('pId', {n, v})
    });

    //new composable/hook for a reactive query params
    const qId = useQueryParams('qid', (n, v) => {
      console.log('pId', {n, v})
    })

    console.log('setup', parsId, route.params, route.query);

    //sample pageState usage; good for not-changing route params or query
    const preData = await usePageState(() => {
      return {b: new Date(), parsId}
    })

    return {
      auth, preData, parsId, pId, qId
    }
  }
}
</script>