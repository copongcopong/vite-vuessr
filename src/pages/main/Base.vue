<template>
  <div class="bg-gray-50">
   <HeaderNavBase />
    <section>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
    </section>
  </div>
</template>
<script setup>
  import { useHead } from '@vueuse/head';
  import HeaderNavBase from '@/components/HeaderNavBase.vue';

  useHead({
    title: import.meta.env.VITE_HTML_TITLE || 'Vite in the VueSSR!'
  });
</script>
