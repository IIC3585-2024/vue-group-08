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
    const bookLoadingStore = useBookLoadingStore();
    bookLoadingStore.setLoading(to.params.bookKey, true);
    try {
      const response = await fetch(
        `http://localhost:3000/books/searchByKey?key=${to.params.bookKey}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const book = await response.json();
      next((vm) => {
        vm.setBook(book);
        bookLoadingStore.setLoading(null, false);
      });
    } catch (err) {
      next((vm) => {
        vm.setError(err);
        bookLoadingStore.setLoading(null, false);
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    const bookLoadingStore = useBookLoadingStore();
    this.book = null;
    bookLoadingStore.setLoading(to.params.bookKey, true);
    fetch(`http://localhost:3000/books/searchByKey?key=${to.params.bookKey}`)
      .then((response) => {
        console.log("response", response);
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((book) => {
        this.book = book;
        bookLoadingStore.setLoading(null, false);
        next();
      })
      .catch((err) => {
        this.error = err.toString();
        bookLoadingStore.setLoading(null, false);
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
    </div>
    <div v-else-if="error">
      <p>Error: {{ error }}</p>
    </div>
    <div v-else>
      <LoadingIcon />
    </div>
  </div>
</template>
