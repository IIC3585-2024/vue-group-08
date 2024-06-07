<script setup>
import { computed, ref, watch, defineEmits } from "vue";
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
  },
  listElementId: {
    type: Number
  }
});

const apiUrl = "http://localhost:3000";

const authStore = useAuthStore();
const userId = computed(() => authStore.userId);
const isAdded = ref(false);

const bookState = ref("");

const emit = defineEmits(["addToList"]);


const selectedOption = computed({
  get() {
    if (isAdded.value){
      return "Reading";
    }
    else {
      return props.bookState;
    }
  },
  set(newValue) {
    updateBookState(newValue);
    return newValue;
  }
})


const bookInList = computed(() => {
  if (isAdded.value){
    return true;
  }
  else{
    return props.userHasBook;
  }
});

let newListElementId;

const listElementId = computed(() => {
  if (isAdded.value){
    return newListElementId;
  }
  else{
    return props.listElementId;
  }
});



async function handleClick() {
  const bookId = getBookId(props.bookKey);
  await addBookToUserList(bookId);
  emit("addToList");
  ;
} 

async function updateBookState(newState){
  try { const response = await fetch(`${apiUrl}/listElements/${listElementId.value}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          state: newState
        }),
      });
      const data = await response.json();
      console.log(
              "List element updated",
            );
      }
  catch (error){
    console.error("Update state failed", error);
  }
}

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
        newListElementId = data.id;
        isAdded.value = true;
        console.log(
          "Add to list succesfull ",
        );
      } catch (error) {
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
        v-model="selectedOption"
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="Plan To Read">Plan to read</option>
        <option value="Reading">Reading</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On-Hold</option>
        <option value="Dropped">Dropped</option>
      </select>
    </form>
  </div>
</template>
