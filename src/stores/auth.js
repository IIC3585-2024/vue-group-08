import { defineStore } from "pinia";

const apiUrl = "http://localhost:3000";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    loggedIn: JSON.parse(localStorage.getItem("loggedIn") || "false"),
    userId: localStorage.getItem("userId") || null,
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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.userId = data.id;
        this.loggedIn = true;
        localStorage.setItem("userId", this.userId);
        localStorage.setItem("loggedIn", JSON.stringify(this.loggedIn));
      } catch (error) {
        // Handle the error
        console.error("Login failed:", error);
        alert("Usuario o contraseña incorrectos");
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
        localStorage.setItem("loggedIn", JSON.stringify(this.loggedIn));
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
    logout() {
      this.loggedIn = false;
      this.userId = null;
      localStorage.removeItem("userId");
      localStorage.setItem("loggedIn", JSON.stringify(this.loggedIn));
    },
  },
});
