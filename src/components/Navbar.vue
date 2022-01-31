<template>
  <nav
    class="w-full flex justify-between items-center bg-primary text-white font-medium relative pt-7 md:static md:px-16 md:py-3"
  >
    <div class="pl-7">
      <a href="">
        <h2>Furnitured</h2>
      </a>
    </div>
    <div class="block pr-6 md:hidden">
      <button><i class="fas fa-bars"></i></button>
    </div>

    <ul
      class="md:flex flex-col absolute right-0 hidden top-14 gap-1 md:flex-row md:static"
    >
      <li>
        <a
          href=""
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href=""
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          Product
        </a>
      </li>
      <li>
        <a
          href=""
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          Categories
        </a>
      </li>
      <li>
        <a
          href=""
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          <i class="fas fa-cart-plus"></i>
        </a>
      </li>
      <li>
        <div
          class="dropdown inline-block relative hover:bg-secondary rounded-full transition ease-out duration-500 cursor-pointer"
          v-if="auth"
        >
          <p v-if="user">{{ user.first_name }}</p>
          <i class="fas fa-spinner animate-spin" v-else></i>
          <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
            <li class="">
              <a
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >One</a
              >
            </li>
            <li class="">
              <a
                class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >Two</a
              >
            </li>
            <li class="">
              <div
                class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
                @click="logout"
              >
                Logout
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
</template>

<script>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const auth = localStorage.getItem("furnitured-token");

    const user = computed(() => store.state.auth.user);

    const logout = () => {
      localStorage.removeItem("furnitured-token");
      localStorage.removeItem("user");
      window.location.reload();
      // router.push("/");
    };

    onMounted(() => {
      store.dispatch("getUser");
    });

    const login = () => {
      router.push("/login");
    };

    return {
      logout,
      login,
      auth,
      user,
    };
  },
};
</script>

<style>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
