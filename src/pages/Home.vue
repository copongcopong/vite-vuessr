<template>
  <div class="bg-gray-50">
    <HeaderNavBase />
    <section>
      <h1>Home</h1>
      <router-link to="/about">
          <n-button tag="span">naive-ui</n-button>
        </router-link>
    </section>
  </div>
</template>
<script setup>
  import { useHead } from '@vueuse/head'
  import HeaderNavBase from '@/components/HeaderNavBase.vue';
  import { NButton } from 'naive-ui'
  
  useHead({
    title: 'Home: Vite in the VueSSR!'
  })
  </script>
