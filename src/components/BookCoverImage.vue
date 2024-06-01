<template>
  <div class="relative">
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <!-- Loading spinner or skeleton -->
      <svg
        class="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-1.764c2.206 0 4-1.794 4-4h-4v4zm-1.938-5.47l1.22 1.22A5.975 5.975 0 0013 7.236v-4c3.313 0 6 2.687 6 6h-4c0-1.15-.414-2.205-1.098-3.03z"
        ></path>
      </svg>
    </div>
    <img
      :src="`https://covers.openlibrary.org/b/isbn/${src}-${size}.jpg`"
      :alt="alt"
      @load="handleLoad"
      @error="handleError"
      :class="{ hidden: loading, 'block w-full h-auto': !loading }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "M",
    },
  },
  setup() {
    const loading = ref(true);

    function handleLoad() {
      loading.value = false;
    }

    function handleError() {
      loading.value = false;
      console.error("Failed to load image:", this.src);
    }

    return {
      loading,
      handleLoad,
      handleError,
    };
  },
});
</script>

<style scoped>
.hidden {
  display: none;
}
.block {
  display: block;
}
.w-full {
  width: 100%;
}
.h-auto {
  height: auto;
}
</style>
