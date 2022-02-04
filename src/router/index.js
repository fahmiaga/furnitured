import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import DetailProduct from "../pages/DetailProduct.vue";
import Dashboard from "../pages/admin/Dashboard.vue";
import Sidebar from "../pages/admin/Sidebar.vue";
import Product from "../pages/admin/Product.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import Forbidden from "../pages/error/Forbidden.vue";
import CartPage from "../pages/CartPage.vue";
import Navbar from "../components/Navbar.vue";

const routes = [
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
    path: "/",
    name: "Navbar",
    component: Navbar,
    children: [
      {
        path: "/",
        name: "LandingPage",
        component: LandingPage,
      },
      {
        path: "detail/:id",
        name: "DetailProduct",
        component: DetailProduct,
      },
      {
        path: "forbidden",
        name: "Forbidden",
        component: Forbidden,
      },
      {
        path: "cart",
        name: "Cart",
        component: CartPage,
        meta: { requiresAuth: true },
      },
    ],
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
        meta: { requiresAuth: true },
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let isAuthenticate = localStorage.getItem("furnitured-token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticate) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ["/login", "/register", "/", "/detail/:id"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("furnitured-token");
//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) next("/login");
//   // if (!authRequired && loggedIn) next("/");
//   else next();
// });

export default router;
