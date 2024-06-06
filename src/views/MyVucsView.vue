<script>
import { defineComponent, ref } from "vue";
import BooksTable from "../components/BooksTable.vue";

export default defineComponent({
  components: { BooksTable },
  setup() {
    const books = [
      {
        id: "9780132350884",
        name: "Clean Code",
        introduction:
          "Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees.",
        author: "Robert C. Martin",
      },
      {
        id: "9780201485677",
        name: "Refactoring",
        introduction:
          "As the application of object technology--particularly the Java programming language--has become commonplace, a new problem has emerged to confront the software development community.",
        author: "Martin Fowler",
      },
      {
        id: "9780131103627",
        name: "The C Programming Language",
        introduction:
          "This book is meant to help the reader learn how to program in C.",
        author: "Brian W. Kernighan, Dennis M. Ritchie",
      },
      {
        id: "9780201633610",
        name: "Design Patterns",
        introduction:
          "Capturing a wealth of experience about the design of object-oriented software, four top-notch researchers present a catalog of simple and succinct solutions to commonly occurring design problems.",
        author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
      },
      {
        id: "9780321125217",
        name: "Domain-Driven Design",
        introduction:
          "Explains how to incorporate effective domain modeling into the software development process.",
        author: "Eric Evans",
      },
    ];

    const tabs = [
      { name: "all-books", label: "All Books" },
      { name: "plan-to-read", label: "Plan to read" },
      { name: "dropped", label: "Dropped" },
      { name: "on-hold", label: "On hold" },
      { name: "completed", label: "Completed" },
      { name: "currently-reading", label: "Currently reading" },
    ];

    const activeTab = ref("all-books");

    function setActiveTab(tab: string) {
      activeTab.value = tab;
    }

    return {
      books,
      tabs,
      activeTab,
      setActiveTab,
    };
  },
});
</script>

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
        v-if="activeTab === 'all-books'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="all-books-tab"
      >
        <BooksTable :books="books" />
      </div>
      <div
        v-if="activeTab === 'plan-to-read'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="plan-to-read-tab"
      >
        <BooksTable :books="books" />
      </div>
      <div
        v-if="activeTab === 'dropped'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="dropped-tab"
      >
        <BooksTable :books="books" />
      </div>
      <div
        v-if="activeTab === 'on-hold'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="on-hold-tab"
      >
        <BooksTable :books="books" />
      </div>
      <div
        v-if="activeTab === 'completed'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="completed-tab"
      >
        <BooksTable :books="books" />
      </div>
      <div
        v-if="activeTab === 'currently-reading'"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        aria-labelledby="currently-reading-tab"
      >
        <BooksTable :books="books" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-tab {
  border-bottom: 2px solid #3b82f6;
  color: #3b82f6;
}
</style>
