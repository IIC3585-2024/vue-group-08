<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import BooksTable from "../components/BooksTable.vue";
import LoadingIcon from "../components/LoadingIcon.vue";
import { useAuthStore } from "../stores/auth";

export default defineComponent({
  components: { BooksTable, LoadingIcon },
  setup() {
    const authStore = useAuthStore();
    const books = ref([]);
    const tabs = [
      { name: "Completed", label: "Completed" }, // 1
      { name: "Reading", label: "Currently reading" }, // 2
      { name: "On Hold", label: "On hold" }, // 3
      { name: "Plan to read", label: "Plan to read" }, // 4
      { name: "Dropped", label: "Dropped" }, // 5
      { name: "Recommended", label: "Recommended" },
    ];
    const activeTab = ref("Recommended");
    const loading = ref(false);

    const fetchBooks = async (tab) => {
      loading.value = true;
      try {
        let url;
        const userId = authStore.userId;
        // const userId = authStore.getUserId;
        if (tab === "Recommended") {
          // url = `http://localhost:3000/recommendations/received/1`;
          url = `http://localhost:3000/recomendations/received/${userId}`;
        } else {
          // url = `http://localhost:3000/listElements/userList/1?state=${tab}`;
          url = `http://localhost:3000/listElements/userList/${userId}?state=${tab}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        books.value = data;
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        loading.value = false;
      }
    };

    const setActiveTab = (tab) => {
      activeTab.value = tab;
    };

    watch(activeTab, (newTab) => {
      fetchBooks(newTab);
    });

    onMounted(() => {
      fetchBooks(activeTab.value);
    });

    return {
      books,
      tabs,
      activeTab,
      loading,
      setActiveTab,
    };
  },
});
</script>

<style scoped>
.active-tab {
  border-bottom: 2px solid #3b82f6;
  color: #3b82f6;
}
</style>

<template>
  <div>
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700 mt-28">
      <ul
        class="flex flex-wrap text-sm font-medium text-center w-full"
        role="tablist"
      >
        <li
          class="flex-1"
          role="presentation"
          v-for="tab in tabs"
          :key="tab.name"
        >
          <button
            class="inline-block w-full p-4 rounded-t-lg text-white"
            :class="{ 'active-tab': activeTab === tab.name }"
            @click="setActiveTab(tab.name)"
            type="button"
            :role="tab.name"
            :aria-controls="tab.name"
            :aria-selected="activeTab === tab.name"
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>
    </div>
    <div>
      <div
        v-if="loading"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
      >
        <LoadingIcon />
      </div>
      <div
        v-if="!loading"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="all-books-tab"
      >
        <BooksTable :books="books" />
      </div>

      <!-- <div
        v-if="loading"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
      >
        <LoadingIcon />
      </div>
      <div
        v-if="!loading && activeTab === 'Recommended'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="all-books-tab"
      >
        <BooksTable :books="books" />
      </div>
      <div
        v-if="!loading && activeTab === 'Plan to read'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="plan-to-read-tab"
      >
        <BooksTable :books="books" />
      </div>
      <div
        v-if="!loading && activeTab === 'Dropped'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="dropped-tab"
      >
        <BooksTable :books="books" />
      </div>
      <div
        v-if="!loading && activeTab === 'On Hold'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="on-hold-tab"
      >
        <BooksTable :books="books" />
      </div>
      <div
        v-if="!loading && activeTab === 'Completed'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="completed-tab"
      >
        <BooksTable :books="books" />
      </div>
      <div
        v-if="!loading && activeTab === 'Reading'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="currently-reading-tab"
      >
        <BooksTable :books="books" />
      </div> -->
    </div>
  </div>
</template>
