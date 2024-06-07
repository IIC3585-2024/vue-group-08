<script>
// BookView.vue
import { useBookLoadingStore } from "../stores/bookLoading";
import LoadingIcon from "../components/LoadingIcon.vue";
import AddToListComponent from "../components/AddToListComponent.vue";
import SelectScore from "../components/SelectScore.vue";
import RecommendButton from "../components/RecommendButton.vue";
import { useAuthStore } from "../stores/auth";


export default {
  name: "BookView",
  components: {
    LoadingIcon,
    AddToListComponent,
    SelectScore,
    RecommendButton,
  },
  data() {
    return {
      bookTitle: "",
      bookCover: "",
      bookDescription: "",
      book: null,
      error: null,
      bookKey: "",
      bookState: "",
      userHasBook: false,
      listElementId: null,
      bookScore: null
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

      const stateResponse = await fetch(
        `http://localhost:3000/listElements/userList/getByKey/${useAuthStore().userId}/${to.params.bookKey}`);
      const stateData = await stateResponse.json();
      let bookState;
      let listElementId;
      let bookScore;
      if (stateData.userHasBook){
          bookState = stateData.listElement.state;
          listElementId = stateData.listElement.id;
          bookScore = stateData.listElement.score;

      }
      else {
           bookState = "";
           listElementId = null;
           bookScore = null;
      }

      next((vm) => {
        vm.setBookTitle(book.book.title);
        vm.setBookCover(book.book.covers);
        vm.setBookDescription(book.book.description);
        vm.setBookKey(book.book.key);
        vm.setBookState(bookState);
        vm.setUserHasBook(stateData.userHasBook);
        vm.setListElementId(listElementId);
        vm.setBookScore(bookScore);
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
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((book) => {
        this.book = book;
        setBookTitle(book.book.title);
        setBookCover(book.book.covers);
        setBookDescription(book.book.description);
        setBookKey(book.book.key);
        bookLoadingStore.setLoading(null, false);
        // TODO: preguntar a vini la diferencia entre estos 2 metodos
        fetch(
        `http://localhost:3000/listElements/userList/getByKey/${useAuthStore().userId}/${to.params.bookKey}`)
        .then((stateResponse) => {
          return stateResponse.json();
        })
        .then((stateData) => {
          let bookState;
          let listElementId;
          let bookScore;
          if (stateData.userHasBook){
              bookState = stateData.listElement.state;
              listElementId = stateData.listElement.id;
              bookScore = stateData.listElement.score;
          }
          else {
              bookState = "";
              listElementId = null;
              bookScore = null;
          }

          setBookState(bookState);
          setUserHasBook(stateData.userHasBook);
          setListElementId(listElementId);
          setBookScore(bookScore);
        })
        next();
      })
      .catch((err) => {
        this.error = err.toString();
        bookLoadingStore.setLoading(null, false);
        next();
      });
  },

  methods: {
    setBookTitle(title) {
      this.bookTitle = title;
    },
    setBookCover(covers) {
      if (covers){
        this.bookCover = covers[0];
      }
    },
    setBookDescription(description) {
      this.bookDescription = description;
    },
    setBook(book) {
      this.book = book;
    },
    setBookKey(key) {
      this.bookKey = key;
    },
    setBookState(state) {
      this.bookState = state;
    },
    setUserHasBook(userHasBook) {
      this.userHasBook = userHasBook;
    },
    setListElementId(listElementId) {
      this.listElementId = listElementId;
    },
    setBookScore(bookScore) {
      this.bookScore = bookScore;
    },
    setError(err) {
      this.error = err.toString();
    },
  },
};


</script>

<template>
  <section class="py-8 antialiased mt-24">
    <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div class="shrink-0 max-w-md lg:max-w-lg">
          <img
            :src="`https://covers.openlibrary.org/b/id/${bookCover}-L.jpg`"
            :alt="bookTitle"
            class="w-32 h-48 object-cover rounded-lg"
          />
        </div>

        <div class="mt-6 sm:mt-8 lg:mt-0">
          <h1
            class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
          >
            {{ bookTitle }}
          </h1>
          <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
            <div class="flex items-center gap-2 mt-2 sm:mt-0">
              <div class="flex items-center gap-1">
                <svg
                  class="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
              </div>
              <p
                class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
              >
                (5.0)
              </p>
            </div>
          </div>

          <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
            <AddToListComponent :bookKey="bookKey" :userHasBook="userHasBook" 
            :bookState="bookState" :listElementId="listElementId" @addToList="() => userHasBook = true"/>
            <SelectScore v-if="userHasBook" :listElementId="listElementId" :bookScore="bookScore"/>
            <RecommendButton :bookKey="bookKey"/>
          </div>

          <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

          <p class="mb-6 text-gray-500 dark:text-gray-400">
            {{ bookDescription }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
