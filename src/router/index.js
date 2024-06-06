import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookView from "../views/BookView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import MyVucsView from "../views/MyVucsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/:bookKey",
      name: "book",
      component: BookView,
      meta: { requiresAuth: true },
    },
    {
      path: "/myVucs",
      name: "myVucs",
      component: MyVucsView,
    },
  ],
});

// // Navigation Guard
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   if (to.meta.requiresAuth && !authStore.loggedIn) {
//     next({ name: "login" });
//   } else {
//     next();
//   }
// });

export default router;
