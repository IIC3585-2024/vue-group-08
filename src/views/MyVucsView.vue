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
      { name: "Completed", label: "Completed" },
      { name: "Reading", label: "Currently reading" },
      { name: "On Hold", label: "On hold" },
      { name: "Plan to read", label: "Plan to read" },
      { name: "Dropped", label: "Dropped" },
      { name: "Recommended", label: "Recommended" },
    ];
    const activeTab = ref("Recommended");
    const loading = ref(false);

    const fetchBooks = async (tab) => {
      loading.value = true;
      try {
        let url;
        const userId = authStore.userId;
        if (tab === "Recommended") {
          url = `http://localhost:3000/recomendations/received/${userId}`;
        } else {
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
    </div>
  </div>
</template>
