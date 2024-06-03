// stores/loading.js
import { defineStore } from "pinia";

export const useBookLoadingStore = defineStore({
  id: "loading",
  state: () => ({
    isLoading: false,
    key: null,
  }),
  actions: {
    setLoading(key, value) {
      this.isLoading = value;
      this.key = key;
    },
  },
});
