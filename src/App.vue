<script setup>
import { RouterLink, RouterView } from "vue-router";
import { computed, ref, watch, onMounted } from "vue";
import { useAuthStore } from "./stores/auth";
import NavBar from "./components/NavBar.vue";
import HomeView from "./views/HomeView.vue";

const searchQuery = ref("Clean Code");
const fetchedBooks = ref([]);
const isLoading = ref(true);

const apiUrl = "http://localhost:3000";
const limit = 10;
const page = 1;
const sortedBy = "rating";
const authStore = useAuthStore();
const loggedIn = computed(() => authStore.loggedIn);

function updateSearchQuery(query) {
  searchQuery.value = query;
  console.log("En App.vue searchQuery toma el valor de: ", searchQuery.value);
}

async function fetchBooks() {
  isLoading.value = true;
  try {
    const response = await fetch(
      `${apiUrl}/books/searchByTitle?title=${searchQuery.value}&limit=${limit}&page=${page}&sortedBy=${sortedBy}`
    );
    const data = await response.json();
    fetchedBooks.value = data.books;
  } catch (error) {
    console.error("Error fetching books:", error);
  } finally {
    isLoading.value = false;
  }
}

watch(searchQuery, fetchBooks);
onMounted(fetchBooks);
</script>

<template>
  <main class="bg-gray-50 dark:bg-gray-800 flex flex-col">
    <NavBar @searchQuery="updateSearchQuery" :loggedIn="loggedIn" />
    <RouterView :fetchedBooks="fetchedBooks" :isHomeViewLoading="isLoading" />
  </main>
</template>
