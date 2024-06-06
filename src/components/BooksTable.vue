<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BooksTable",
  props: {
    books: {
      required: true,
    },
  },
});
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Cover</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Author</th>
          <th scope="col" class="px-6 py-3">Introduction</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="book in books"
          :key="book.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td class="px-6 py-4">
            <img
              v-if="book.id"
              :src="`https://covers.openlibrary.org/b/id/${book.id}-M.jpg`"
              :alt="book.name"
              class="w-32 h-48 object-cover rounded-lg"
            />
          </td>
          <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {{ book.name }}
          </td>
          <td class="px-6 py-4">{{ book.author }}</td>
          <td class="px-6 py-4">{{ book.introduction }}</td>
          <td class="px-6 py-4">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >View</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
