<script setup>
import BookCoverImage from "../components/BookCoverImage.vue";

// type Book = {
//   id: string,
//   name: string,
//   introduction: string,
//   author: string,
// };

// const books: Book[] = [
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
  // Add more books as needed
];
</script>

<template>
  <div class="container mx-auto px-4 py-6 mt-24">
    <div
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <div
        v-for="book in books"
        :key="book.id"
        class="border border-gray-300 p-4 rounded-lg flex flex-col items-center bg-white shadow-md dark:bg-gray-800 dark:border-gray-600 dark:shadow-lg"
      >
        <BookCoverImage :src="book.id" :alt="book.name" size="M" />
        <div
          class="flex flex-col items-start mt-2 w-full text-gray-800 dark:text-gray-300"
        >
          <div class="font-bold">{{ book.name }}</div>
          <div class="mt-1">{{ book.introduction }}</div>
          <div class="mt-2 italic text-gray-500 dark:text-gray-400">
            Author: {{ book.author }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
