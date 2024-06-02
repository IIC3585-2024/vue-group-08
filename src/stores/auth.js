import { defineStore } from "pinia";

const apiUrl = "http://localhost:3000";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    loggedIn: false,
    userId: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await fetch(`${apiUrl}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        const data = await response.json();
        this.userId = data.id;
        this.loggedIn = true;
        console.log(
          "Acabo de cambiar el estado de loggedIn a true: ",
          this.loggedIn
        );
      } catch (error) {
        // Handle the error
        console.error("Login failed:", error);
      }
    },
    async register(username, email, password) {
      try {
        await fetch(`${apiUrl}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        });
        this.loggedIn = true;
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
    logout() {
      this.loggedIn = false;
    },
  },
});
