<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";

const loggedIn = ref(false);
</script>

<template>
  <!-- <main class="bg-gray-50 dark:bg-gray-800 flex flex-col min-h-screen"> -->
  <NavBar loggedIn="{loggedIn}" />
  <RouterView />
  <!-- </main> -->
</template>
