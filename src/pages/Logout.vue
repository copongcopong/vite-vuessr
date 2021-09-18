<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">out</h1>
    </div>
  </header>
</template>
<script>
import { onMounted } from "vue";
import { useAuth } from '@/hooks/app/auth';
import { useRouter } from 'vue-router';
export default {
  setup () {
    const auth = useAuth();
    const router = useRouter();
    onMounted(async () => {
      const ok = await auth.doLogout();
      console.log({ok})
      if (ok) {
        router.push('/')
      }
    })
    
    return {

    }
  }
}
</script>
