import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import Dashboard from "../pages/admin/Dashboard.vue";
import Sidebar from "../pages/admin/Sidebar.vue";
import Product from "../pages/admin/Product.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import Forbidden from "../pages/error/Forbidden.vue";

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
    path: "/forbidden",
    name: "Forbidden",
    component: Forbidden,
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

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("furnitured-token");
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) next("/login");
  // if (!authRequired && loggedIn) next("/");
  else next();
});

export default router;
