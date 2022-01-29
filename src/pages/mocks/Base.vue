<template>
  <!-- acts as the base layout for child routes of /app -->
  <div>
    <header>
      <h4>The Main App Section</h4>
      <router-link to="/">home</router-link> |
      <router-link to="/about">about</router-link> |
      <router-link to="/mocks">app</router-link> |
      <router-link to="/mocks?qid=3">app?qid=3</router-link> |
      <router-link to="/mocks/pars/1">p 1</router-link> |
      <router-link to="/mocks/pars/2">p 2</router-link> |
      <router-link to="/mocks/pars/3?qid=1">q 2</router-link> |
      <router-link to="/mocks/pars/3?qid=2">q 2</router-link> |
      <router-link to="/logout">logout</router-link> |
    </header>
    <section>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
    </section>
  </div>
</template>