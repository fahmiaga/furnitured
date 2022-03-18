<template>
  <nav
    class="w-full flex justify-between items-center bg-primary text-white font-medium py-5 md:static md:px-16 md:py-3"
  >
    <div class="pl-7 md:block hidden">
      <router-link to="/">
        <h2>Furnitured</h2>
      </router-link>
    </div>

    <div class="flex justify-center pl-6">
      <div class="md:w-96 xl:w-96">
        <div class="input-group relative flex items-stretch w-full">
          <input
            v-model="product"
            type="search"
            class="form-control relative flex-auto min-w-0 block w- md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-400 focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon3"
          />
          <button
            class="btn inline-block px-3 border bg-secondary border-gray-300 text-white font-semibold text-lg leading-tight uppercase rounded-r-lg hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            type="button"
            id="button-addon3"
            @click="filterProduct"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="sm:hidden block">
      <div v-if="carts === undefined">
        <i class="fas fa-cart-plus"></i>
      </div>
      <router-link
        to="/cart"
        class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        v-else
      >
        <i class="fas fa-cart-plus relative">
          <span
            v-if="carts.length > 0"
            class="bg-red-600 text-xxs p-1 rounded-full absolute -top-3 -right-2"
            >{{ carts.length }}
          </span>
        </i>
        <!-- <span>0</span> -->
      </router-link>
    </div>

    <div class="block pr-6 md:hidden">
      <button @click="handleClick(true)"><i class="fas fa-bars"></i></button>
    </div>

    <ul class="md:flex md:flex-row md:static hidden">
      <li>
        <router-link
          to="/"
          class="py-1.5 px-3 mx-2 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          Home
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'ListProduct' }"
          class="py-1.5 px-3 mx-2 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          Product
        </router-link>
      </li>
      <li>
        <div v-if="carts === undefined">
          <i class="fas fa-cart-plus"></i>
        </div>
        <router-link
          to="/cart"
          class="py-1.5 px-3 mx-2 hover:bg-secondary rounded-full transition ease-out duration-500"
          v-else
        >
          <i class="fas fa-cart-plus relative">
            <span
              v-if="carts.length > 0"
              class="bg-red-600 text-xxs p-1 rounded-full absolute -top-3 -right-2"
              >{{ carts.length }}</span
            >
          </i>
        </router-link>
      </li>
      <li>
        <div
          class="dropdown inline-block relative hover:bg-secondary rounded-full transition ease-out duration-500 cursor-pointer"
          v-if="auth"
        >
          <p v-if="user" class="px-3 mx-2">{{ user.first_name }}</p>
          <i class="fas fa-spinner animate-spin" v-else></i>
          <ul
            class="dropdown-menu w-40 absolute right-0 hidden text-gray-700 pt-1 z-50"
          >
            <li class="" v-if="user">
              <router-link
                to="/admin/dashboard"
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                v-if="user.is_admin === 1"
                ><i class="fas fa-user-edit mr-3"></i> Admin
              </router-link>
            </li>
            <li class="">
              <router-link
                class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                to="/setting/edit-profile"
                ><i class="fas fa-user-cog mr-3"></i> Setting</router-link
              >
            </li>
            <li class="">
              <div
                class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
                @click="logout"
              >
                <i class="fas fa-sign-out-alt mr-3"></i> Logout
              </div>
            </li>
          </ul>
        </div>
        <a
          class="py-1.5 px-3 ml-2 hover:bg-secondary rounded-full transition ease-out duration-500 cursor-pointer"
          v-else
          @click="login"
        >
          Login
        </a>
      </li>
    </ul>
    <ul
      class="md:hidden md:h-auto w-60 h-screen absolute top-0 right-0 z-10 flex flex-col items-center justify-items-start bg-primary transition duration-300"
      :class="
        slideMenu ? 'transform translate-x-0' : 'transform translate-x-full'
      "
    >
      <li class="mb-3 mt-6 ml-40 cursor-pointer" @click="handleClick(false)">
        <i class="fa-solid fa-xmark"></i>
      </li>
      <li class="pb-5">
        <router-link
          to="/"
          class="py-1.5 px-3 mb-11 hover:bg-secondary rounded-full transition ease-out duration-500"
          @click="handleClick(false)"
        >
          Home
        </router-link>
      </li>
      <li class="pb-5">
        <router-link
          :to="{ name: 'ListProduct' }"
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
          @click="handleClick(false)"
        >
          Product
        </router-link>
      </li>
      <li class="pb-5">
        <div v-if="carts === undefined">
          <i class="fas fa-cart-plus"></i>
        </div>
        <router-link
          to="/cart"
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
          v-else
          @click="handleClick(false)"
        >
          <i class="fas fa-cart-plus relative">
            <span
              v-if="carts.length > 0"
              class="bg-red-600 text-xxs p-1 rounded-full absolute -top-3 -right-2"
              >{{ carts.length }}</span
            >
          </i>
        </router-link>
      </li>
      <li class="pb-5">
        <div
          class="dropdown inline-block relative hover:bg-secondary rounded-full transition ease-out duration-500 cursor-pointer"
          v-if="auth"
        >
          <p v-if="user">{{ user.first_name }}</p>
          <i class="fas fa-spinner animate-spin" v-else></i>
          <ul
            class="dropdown-menu w-40 absolute right-0 hidden text-gray-700 pt-1 z-50"
          >
            <li class="" v-if="user">
              <router-link
                to="/admin/dashboard"
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                v-if="user.is_admin === 1"
                ><i class="fas fa-user-edit mr-3"></i> Admin
              </router-link>
            </li>
            <li class="">
              <router-link
                class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                to="/setting/edit-profile"
                @click="handleClick(false)"
                ><i class="fas fa-user-cog mr-3"></i> Setting</router-link
              >
            </li>
            <li class="">
              <div
                class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
                @click="logout"
              >
                <i class="fas fa-sign-out-alt mr-3"></i> Logout
              </div>
            </li>
          </ul>
        </div>
        <a
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500 cursor-pointer"
          v-else
          @click="login"
        >
          Login
        </a>
      </li>
    </ul>
  </nav>

  <router-view />
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { deleteInterval } from "../variables/deleteToken";
import Footer from "../components/Footer.vue";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const auth = localStorage.getItem("furnitured-token");

    const user = computed(() => store.state.auth.user);
    const carts = computed(() => store.state.product.carts);

    const product = ref("");

    const slideMenu = ref(false);

    const handleClick = (val) => {
      slideMenu.value = val;
    };

    const logout = () => {
      localStorage.removeItem("furnitured-token");
      localStorage.removeItem("user");
      deleteInterval();
      window.location.reload();
      // router.push("/");
    };

    const filterProduct = () => {
      store.dispatch("searchProduct", {
        keyword: product.value,
      });

      router.push({
        path: "search",
        query: { key: product.value },
      });
    };

    onMounted(() => {
      store.dispatch("getUser");
    });

    onMounted(() => {
      store.dispatch("getCart");
    });

    const login = () => {
      router.push("/login");
    };

    return {
      logout,
      login,
      auth,
      user,
      carts,
      handleClick,
      filterProduct,
      slideMenu,
      product,
    };
  },
  components: {
    Footer,
  },
};
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
.router-link-exact-active {
  background-color: #c4a187;
}
</style>
