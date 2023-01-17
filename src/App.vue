<script setup>
import {RouterView} from 'vue-router';
import Navigation from './components/Navigation.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen font-Poppins bg-weather-primary">
    <Navigation />
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
