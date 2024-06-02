<script setup>
import { ref, onMounted } from "vue";
import BookCoverImage from "../components/BookCoverImage.vue";
import LoadingIcon from "../components/LoadingIcon.vue";

const apiUrl = "http://localhost:3000";

const fetchedBooks = ref([]);
const searchQuery = ref("");
const isLoading = ref(true); // Variable para rastrear el estado de carga

async function fetchBooks() {
  isLoading.value = true; // Comienza la carga
  try {
    const response = await fetch(
      `${apiUrl}/books/searchByTitle?title=Clean Code&limit=10&page=1&sortedBy=rating`
    );
    const data = await response.json();
    fetchedBooks.value = data.books;
  } catch (error) {
    console.error("Error fetching books:", error);
  } finally {
    isLoading.value = false; // Termina la carga
  }
}

onMounted(fetchBooks);
</script>

<template>
  <div class="container mx-auto px-4 py-6 mt-24">
    <div
      v-if="isLoading"
      role="status"
      class="flex items-center justify-center"
    >
      <LoadingIcon />
      <span class="sr-only">Loading...</span>
    </div>

    <div
      v-else
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <div
        v-for="book in fetchedBooks"
        :key="book.id"
        class="border border-gray-300 p-4 rounded-lg flex flex-col items-center bg-white shadow-md dark:bg-gray-800 dark:border-gray-600 dark:shadow-lg"
      >
        <div
          class="flex flex-col items-start mt-2 w-full text-gray-800 dark:text-gray-300"
        >
          <div class="font-bold">{{ book.title }}</div>
          <div class="mt-1">{{ book.first_sentence }}</div>
          <div class="mt-2 italic text-gray-500 dark:text-gray-400">
            Author: {{ book.author_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
