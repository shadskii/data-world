import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
  ],
});

export default router;
