<template>
  <h1>pars</h1>
  <p>{{auth.expires}}</p>
  <p>{{preData.b}}</p>
</template>
<script>
import { useAuth } from '@/stores/auth';
import { usePageState } from '@/hooks/page-state';
export default {

  async setup() {
    const auth = useAuth();

    const preData = await usePageState(() => {
      return {b: new Date()}
    })

    return {
      auth, preData
    }
  }
}
</script>