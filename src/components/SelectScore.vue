<script setup>
import { ref, computed } from "vue";

const apiUrl = "http://localhost:3000";

const props = defineProps({
  listElementId: {
    type: Number
  },
  bookScore: {
    type: Number
  },
})

const selectedOption = computed({
  get() {
      if (!props.bookScore){
        return "Select a score";
      }
      else {
        return props.bookScore;
      }
  },
  set(newValue) {
    updateBookScore(newValue);
    return newValue;
  }
})

const listElementId = computed(() => props.listElementId);

const scores = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

async function updateBookScore(newScore){
  try { const response = await fetch(`${apiUrl}/listElements/${listElementId.value}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          score: newScore
        }),
      });
      const data = await response.json();
      console.log(
              "List element updated",
            );
      }
  catch (error){
    console.error("Update score failed", error);
  }
}


</script>

<template>
  <form class="max-w-sm">
    <select
      id="countries"
      v-model="selectedOption"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="Select a score" disabled>Select a score</option>
      <option v-for="score in scores" :value="score" :key="score">
        {{ score }}
      </option>
    </select>
  </form>
</template>
