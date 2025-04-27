import { createRouter, createWebHistory } from "vue-router";
import ChatApp from "../views/ChatApp.vue";
import Login from "../views/Login.vue";
import Create from "../views/CreateAccount.vue";

const routes = [
  {
    path: "/",
    name: "ChatApp",
    component: ChatApp,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/auth/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
