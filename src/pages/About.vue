<template>
  <div class="bg-gray-50">
    <HeaderNavBase />
    <section>
      <h1>About</h1>
      <p>
      <img src="@/assets/images/logo.jpg" alt="" width="250" />
    </p>
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