<template>
  <header id="top" class="w-full flex flex-col fixed sm:relative bg-white pin-t pin-r pin-l">
      <nav id="site-menu" class="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-white shadow sm:shadow-none border-t-4 border-red-900">
        <div class="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
          <a href="/" class="no-underline py-1"><h1 class="font-bold text-lg tracking-widest">Home</h1></a>
          
        </div>
        <div id="menu" class="w-full sm:w-auto self-end sm:self-center sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0 hidden">
          <router-link class="text-dark font-bold hover:text-red text-lg w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1 sm:pt-2" to="/app">App</router-link>
          <router-link class="text-dark font-bold hover:text-red text-lg w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1 sm:pt-2" to="/about">About</router-link>
          
        </div>
      </nav>
    </header>
</template>