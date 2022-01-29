<template>
  <h1>pars</h1>
  <p>{{auth.expires}}</p>
  <p>{{preData.parsId}}-{{preData.b}}</p>
  <p>parsId {{parsId}}</p>
  <p>pId {{pId}}</p>
  <p>qId {{qId}}</p>

  <h2>Yeah</h2>
  <PvButton icon="pi pi-check" label="Save" />
  <PvCard>
    <template #header>
        <img alt="user header" src="demo/images/usercard.png">wwww
    </template>
    <template #title>
        Advanced Card
    </template>
    <template #content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
        quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
    </template>
    <template #footer>
        <PvButton icon="pi pi-check" label="Save" />
        <PvButton icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
    </template>
  </PvCard>

</template>
<script>
import { useAuth } from '@/hooks/app/auth';
import { usePageState } from '@/hooks/page-state';
import { useRouteParams, useQueryParams } from '@/hooks/route-params';
import { useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue';

//import Card from 'primevue/card/sfc';
//import Button from 'primevue/button/sfc';

export default {

  async setup(props) {
    const auth = useAuth();
    
    //pattern for a reactive route.params or route.query
    //to test, click to /pars/1 then click to /pars/2; parsId in template should change
    //use case like trigger new server call to change data show
    const route = useRoute();
    //console.log(route.path, route.name, route.fullPath, route)
    const parsId = ref(route.params.id);
    const stop = watch(() => route.params.id, async (nval, oval) => {
      console.log('watch', {oval, nval});
      parsId.value = nval;
    });
    //needed to stop the watcher
    onMounted(() => {
      console.log('mounted', auth.$data)
      stop()
    });
    //--- end pattern doc



    //new composable/hook for a reactive route params
    const pId = useRouteParams('id', (n, v) => {
      console.log('pId', {n, v})
    });

    //new composable/hook for a reactive query params
    const qId = useQueryParams('qid', (n, v) => {
      console.log('qId', {n, v})
    })

    console.log('setup', route.params, route.query);

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