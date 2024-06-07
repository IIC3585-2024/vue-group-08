<template>
  <!-- Modal toggle -->
  <button
    @click="openRecomendationModal"
    class="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
  >
    <span> Recommend to</span>
    <svg
      class="w-6 h-6 text-gray-800 dark:text-white me-2"
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
        d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"
      />
    </svg>
  </button>

  <!-- Main modal -->
  <div
    v-if="isOpen"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
  >
    <div
      class="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
    >
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Select users to recommend to
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <ul
            class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownSearchButton"
          >
            <li v-for="user in users" :key="user.id">
              <div
                class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  :id="'checkbox-item-' + user.id"
                  type="checkbox"
                  :checked="user.id === selectedUserId"
                  @click="toggleUserSelection(user.id)"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  :for="'checkbox-item-' + user.id"
                  class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >{{ user.username }}</label
                >
              </div>
            </li>
          </ul>

          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your recommendation</label
          >
          <textarea
            id="message"
            rows="4"
            v-model="recommendation"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="confirm"
          >
            Confirm
          </button>
          <button
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            @click="closeModal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useAuthStore } from "../stores/auth";

const props = defineProps({
  bookKey: {
    type: String,
    required: true,
  },
});

const authStore = useAuthStore();
const userId = computed(() => authStore.userId);
const apiUrl = "http://localhost:3000";

const isOpen = ref(false);
const selectedUserId = ref(null);

const users = ref([]);
const recommendation = ref("");

const bookKey = computed(() => getBookId(props.bookKey));

function getBookId(bookKey) {
  return bookKey.split("/").pop();
}

async function openRecomendationModal(){
  users.value = await getAllUsers();
  toggleModal();
}

async function getAllUsers(){
  try {
    const response = await fetch(`${apiUrl}/users/getAll`);
    const data = await response.json();
    return data.users;
  }
  catch (error){
    console.error("Get all users failed", error);
  }
}

function toggleModal() {
  isOpen.value = !isOpen.value;
}

function closeModal() {
  isOpen.value = false;
}

function toggleUserSelection(userId) {
  this.selectedUserId = this.selectedUserId === userId ? null : userId;
}

async function confirm() {
  try {
    const response = await fetch(`${apiUrl}/recomendations`, {
      method: "POST",
      headers: {
          "Content-type": "application/json",
      },
      body: JSON.stringify({
        userWhoRecomendsId: authStore.userId,
        userWhoGetsRecomendedId: selectedUserId.value,
        content: recommendation.value,
        key: bookKey.value
      })
    });
    const data = await response.json();
    console.log("Recomendation created");
  }
  catch (error) {
    console.error("Failed to create recomendation", error);
  }
  finally {
    closeModal();
  }

}
</script>
