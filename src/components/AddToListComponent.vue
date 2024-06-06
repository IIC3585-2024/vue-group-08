<script setup>
import { computed, ref, watch } from "vue";
import { useAuthStore } from "../stores/auth";

const props = defineProps({
  bookKey: {
    type: String,
    required: true,
  },
  bookState: {
    type: String,
    required: true
  },
  userHasBook: {
    type: Boolean,
    required: true
  }
});

const apiUrl = "http://localhost:3000";

const authStore = useAuthStore();
const userId = computed(() => authStore.userId);
const isAdded = ref(false);

const bookInList = computed(() => {
  if (isAdded.value){
    return true;
  }
  else{
    return props.userHasBook;
  }
});

const bookState = computed(() => props.bookState);


async function handleClick() {
  const bookId = getBookId(props.bookKey);
  await addBookToUserList(bookId);
  ;
} 

// watch(props.userHasBook, () => bookInList.value = props.userHasBook);


async function addBookToUserList(bookId){
  try {
        const response = await fetch(`${apiUrl}/listElements`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          userId: authStore.userId,
          key: bookId
        }),
        });
        const data = await response.json();
        isAdded.value = true;
        console.log(
          "Add to list succesfull ",
        );
      } catch (error) {
        // Handle the error
        console.error("Add to list failed", error);
      }
}

function getBookId(bookKey) {
  return bookKey.split("/").pop();
}
</script>

<template>
  <div>
    <button
      v-if="!bookInList"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="handleClick()"
    >
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14m-7 7V5"
        />
      </svg>
      Add to list
    </button>
    <form v-if="bookInList" class="max-w-sm mx-auto">
      <select
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="PTR" selected>Plan to read</option>
        <option value="RE">Reading</option>
        <option value="CMP">Completed</option>
        <option value="OH">On-Hold</option>
        <option value="DP">Dropped</option>
      </select>
    </form>
  </div>
</template>
