<script>
// BookView.vue
import { useBookLoadingStore } from "../stores/bookLoading";
import LoadingIcon from "../components/LoadingIcon.vue";

export default {
  name: "BookView",
  components: { LoadingIcon },
  data() {
    return {
      book: null,
      error: null,
    };
  },
  async beforeRouteEnter(to, from, next) {
    const loadingStore = useBookLoadingStore();
    loadingStore.setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/books/searchByKey?key=${to.params.bookKey}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const book = await response.json();
      next((vm) => {
        vm.setBook(book);
        loadingStore.setLoading(false);
      });
    } catch (err) {
      next((vm) => {
        vm.setError(err);
        loadingStore.setLoading(false);
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    const loadingStore = useBookLoadingStore();
    this.book = null;
    loadingStore.setLoading(true);
    fetch(`http://localhost:3000/books/searchByKey?key=${to.params.bookKey}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((book) => {
        this.book = book;
        loadingStore.setLoading(false);
        next();
      })
      .catch((err) => {
        this.error = err.toString();
        loadingStore.setLoading(false);
        next();
      });
  },
  methods: {
    setBook(book) {
      this.book = book;
    },
    setError(err) {
      this.error = err.toString();
    },
  },
};
</script>

<template>
  <div class="flex-1 justify-center items-center mt-28">
    <h1>BookView with key {{ $route.params.bookKey }}</h1>
    <div v-if="book">
      <h2>{{ book.book.title }}</h2>
      <p>{{ book.authors[0] }}</p>
      <!-- <p>{{ book.description }}</p> -->
      <!-- Muestra más detalles del libro aquí -->
    </div>
    <div v-else-if="error">
      <p>Error: {{ error }}</p>
    </div>
    <div v-else>
      <LoadingIcon />
    </div>
  </div>
</template>
