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
import SettingSidebar from "../pages/userSetting/SettingSidebar.vue";
import EditProfile from "../pages/userSetting/EditProfile.vue";
import UserAddress from "../pages/userSetting/UserAddress.vue";
import AddAddress from "../pages/userSetting/AddAddress.vue";
import UpdateAddress from "../pages/userSetting/UpdateAddress.vue";
import ListProduct from "../pages/ListProduct.vue";
import PaymentSuccess from "../pages/PaymentSuccess.vue";
import AddNewProduct from "../pages/admin/AddNewProduct.vue";
import Checkout from "../pages/Checkout.vue";
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
    path: "/forbidden",
    name: "Forbidden",
    component: Forbidden,
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
        path: "list-product",
        name: "ListProduct",
        component: ListProduct,
      },
      {
        path: "cart",
        name: "Cart",
        component: CartPage,
        meta: { requiresAuth: true },
      },
      {
        path: "checkout",
        name: "Checkout",
        component: Checkout,
        meta: { requiresAuth: true },
      },
      {
        path: "payment-success",
        name: "PaymentSuccess",
        component: PaymentSuccess,
        meta: { requiresAuth: true },
      },
      {
        path: "/setting",
        name: "SettingSidebar",
        component: SettingSidebar,
        meta: { requiresAuth: true },
        children: [
          {
            path: "edit-profile",
            name: "EditProfile",
            component: EditProfile,
            meta: { requiresAuth: true },
          },
          {
            path: "address",
            name: "UserAddress",
            component: UserAddress,
            meta: { requiresAuth: true },
          },
          {
            path: "add-address",
            name: "AddAddress",
            component: AddAddress,
            meta: { requiresAuth: true },
          },
          {
            path: "update-address/:id",
            name: "UpdateAddress",
            component: UpdateAddress,
            meta: { requiresAuth: true },
          },
        ],
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
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: "new-product",
        name: "NewProduct",
        component: AddNewProduct,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let token = localStorage.getItem("furnitured-token") != null;
    if (!token) {
      next({
        path: "/login",
      });
    } else {
      let user = localStorage.getItem("user");
      if (to.matched.some((record) => record.meta.requiresAdmin)) {
        if (user != 1) {
          next({
            name: "Forbidden",
          });
        } else {
          next();
        }
      } else {
        next();
      }
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
