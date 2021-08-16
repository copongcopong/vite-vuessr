<template>
  <div>
    <header>
      <h4>Base App</h4>
      <router-link to="/">home</router-link> |
      <router-link to="/about">about</router-link> |
      <router-link to="/app">app</router-link> |
      <router-link to="/app/pars/1">p 1</router-link> |
      
    </header>
    <section>
      <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
    </section>
  </div>
</template>