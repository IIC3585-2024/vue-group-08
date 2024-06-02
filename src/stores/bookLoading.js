// stores/loading.js
import { defineStore } from "pinia";

export const useBookLoadingStore = defineStore({
  id: "loading",
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading(value) {
      this.isLoading = value;
    },
  },
});
