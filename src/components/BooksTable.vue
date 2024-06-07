<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import LoadingIcon from "./LoadingIcon.vue";

export default defineComponent({
  name: "BooksTable",
  props: {
    books: {
      required: true,
      type: Array,
    },
  },
  setup(props) {
    const detailedBooks = ref([]);
    const loading = ref(true);

    const fetchBookDetails = async (bookKey) => {
      try {
        const response = await fetch(
          `http://localhost:3000/books/searchByKey?key=${bookKey}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Failed to fetch book details:", error);
        return null;
      }
    };

    const getDetailedBooks = async () => {
      loading.value = true;
      try {
        const promises = props.books.map(async (book) => {
          const details = await fetchBookDetails(book.book.key);
          return { ...book, book: details };
        });
        detailedBooks.value = await Promise.all(promises);
      } catch (error) {
        console.error("Failed to get detailed books:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      getDetailedBooks();
    });

    return {
      detailedBooks,
      loading,
    };
  },
});
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Cover</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Author</th>
          <th scope="col" class="px-6 py-3">Introduction</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="4" class="px-6 py-4 text-center">Loading...</td>
        </tr>
        <tr
          v-for="book in detailedBooks"
          :key="book.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td class="px-6 py-4">
            <img
              v-if="book.book.book.covers && book.book.book.covers.length > 0"
              :src="`https://covers.openlibrary.org/b/id/${book.book.book.covers[0]}-M.jpg`"
              :alt="book.book.book.title"
              class="w-32 h-48 object-cover rounded-lg"
            />
          </td>
          <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {{ book.book.book.title }}
          </td>
          <td class="px-6 py-4">
            {{ book.book.authors[0] }}
          </td>
          <td class="px-6 py-4">{{ book.book.book.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
