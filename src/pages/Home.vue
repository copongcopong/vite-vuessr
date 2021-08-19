<template>
  <div class="bg-gray-50">
    <HeaderNavBase />
    <section>
      <h1>Home</h1>
    </section>
  </div>
</template>
<script setup>
  import { useHead } from '@vueuse/head'
  import HeaderNavBase from '@/components/HeaderNavBase.vue';
  
  useHead({
    title: 'Home: Vite in the VueSSR!'
  })
  </script>
