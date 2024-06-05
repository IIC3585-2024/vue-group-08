<script setup>
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";
import LoadingIcon from "../components/LoadingIcon.vue";
import { useBookLoadingStore } from "../stores/bookLoading";
import { useAuthStore } from "../stores/auth";

const props = defineProps({
  fetchedBooks: {
    type: Array,
    required: true,
  },
  isHomeViewLoading: {
    type: Boolean,
    required: true,
  },
});

const router = useRouter();

const bookLoadingStore = useBookLoadingStore();
const isFetchedBookLoading = computed(() => bookLoadingStore.isLoading);
const bookLoadingStoreKey = computed(() => bookLoadingStore.key);
const loggedIn = computed(() => useAuthStore().loggedIn);

function handleClick(bookKey) {
  const bookId = getBookId(bookKey);
  router.push({ name: "book", params: { bookKey: bookId } });
}

function getBookId(bookKey) {
  return bookKey.split("/").pop();
}
</script>

<template>
  <div class="container mx-auto px-4 py-6 mt-24">
    <div
      v-if="isHomeViewLoading"
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
          <img
            v-if="book.cover_i"
            :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
            :alt="book.title"
            class="w-32 h-48 object-cover rounded-lg"
          />
          <img
            v-else
            src="https://scholastic.co.in/sites/all/themes/scholastic_asia/images/default-book.png"
            alt="Default Book Image"
            class="w-32 h-48 object-cover rounded-lg"
          />
          <!-- <BookCoverImage :src="book.cover_i" :alt="book.title" :size="M" /> -->
          <div class="font-bold">{{ book.title }}</div>
          <div class="mt-1">{{ book.first_sentence }}</div>
          <div class="mt-2 italic text-gray-500 dark:text-gray-400">
            Author: {{ book.author_name }}
          </div>
          <button
            v-if="loggedIn"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex self-end mt-4"
            @click="handleClick(book.key)"
          >
            <div v-if="bookLoadingStoreKey !== getBookId(book.key)">
              <span>Ver Libro</span>
            </div>
            <LoadingIcon
              v-else-if="
                isFetchedBookLoading &&
                bookLoadingStoreKey === getBookId(book.key)
              "
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
