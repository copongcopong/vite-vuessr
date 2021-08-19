<template>
  <main>
    <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view>
  </main>
</template>
<script setup>
  import { useHead } from '@vueuse/head'

  useHead({
    title: import.meta.env.VITE_HTML_TITLE || 'Vite in the VueSSR!'
  });
</script>
