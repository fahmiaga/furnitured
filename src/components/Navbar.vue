<template>
  <nav
    class="w-full flex justify-between items-center bg-primary text-white font-medium relative py-5 md:static md:px-16 md:py-3"
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
      <button><i class="fas fa-bars"></i></button>
    </div>

    <ul
      class="md:flex flex-col absolute right-0 hidden top-14 gap-1 md:flex-row md:static"
    >
      <li>
        <router-link
          to="/"
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          Home
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'ListProduct' }"
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          Product
        </router-link>
      </li>
      <!-- <li>
        <router-link
          to="/"
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          Categories
        </router-link>
      </li> -->
      <li>
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
          <p v-if="user">{{ user.first_name }}</p>
          <i class="fas fa-spinner animate-spin" v-else></i>
          <ul
            class="dropdown-menu w-40 absolute right-0 hidden text-gray-700 pt-1 z-50"
          >
            <li class="">
              <a
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                ><i class="fas fa-user-edit mr-3"></i> Admin</a
              >
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
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Footer from "../components/Footer.vue";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const auth = localStorage.getItem("furnitured-token");

    const user = computed(() => store.state.auth.user);
    const carts = computed(() => store.state.product.carts);

    const logout = () => {
      localStorage.removeItem("furnitured-token");
      localStorage.removeItem("user");
      window.location.reload();
      // router.push("/");
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
    };
  },
  components: {
    Footer,
  },
};
</script>

<style>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
