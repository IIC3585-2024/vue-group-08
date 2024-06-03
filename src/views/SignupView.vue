<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const username = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const errorMessage = ref("");
const terms = ref(false);

const authStore = useAuthStore();
const router = useRouter();

async function handleRegister(event) {
  event.preventDefault();

  if (password.value !== repeatPassword.value) {
    errorMessage.value = "Passwords do not match";
    return;
  }

  try {
    await authStore.register(username.value, email.value, password.value);
    router.push("/");
  } catch (error) {
    errorMessage.value = error.message;
  }
}
</script>

<template>
  <main class="container mx-auto p-4">
    <h1 class="text-2xl mb-4">Register</h1>
    <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
    <form class="max-w-sm mx-auto" @submit.prevent="handleRegister">
      <div class="mb-5">
        <label
          for="username"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your username</label
        >
        <input
          type="text"
          id="username"
          v-model="username"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your username"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your email</label
        >
        <input
          type="email"
          id="email"
          v-model="email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your password</label
        >
        <input
          type="password"
          id="password"
          v-model="password"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="repeat-password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Repeat password</label
        >
        <input
          type="password"
          id="repeat-password"
          v-model="repeatPassword"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            v-model="terms"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          for="terms"
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >I agree with the
          <a href="#" class="text-blue-600 hover:underline dark:text-blue-500"
            >terms and conditions</a
          ></label
        >
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register new account
      </button>
    </form>
  </main>
</template>
