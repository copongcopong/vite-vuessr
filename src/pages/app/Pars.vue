<template>
  <h1>pars</h1>
  <p>{{auth.expires}}</p>
</template>
<script>
import { useAuth } from '@/stores/auth';
export default {
  setup() {
    const auth = useAuth();

    return {
      auth
    }
  }
}
</script>