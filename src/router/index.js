import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import Dashboard from "../pages/admin/Dashboard.vue";
import Sidebar from "../pages/admin/Sidebar.vue";
import Product from "../pages/admin/Product.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/admin",
    name: "Sidebar",
    component: Sidebar,
    children: [
      {
        path: "products",
        name: "Product",
        component: Product,
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
