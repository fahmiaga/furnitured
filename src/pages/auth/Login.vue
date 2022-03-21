<template>
  <!-- component -->
  <div
    class="relative min-h-screen flex justify-center bg-secondary py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover items-center"
    style="
      background-image: url(https://images.unsplash.com/photo-1616464916356-3a777b2b60b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
    "
  >
    <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
    <div class="mt-2 items-center z-10">
      <form
        class="p-14 bg-white max-w-sm mx-auto rounded-xl shadow-xl overflow-hidden space-y-10"
        @submit.prevent="handleLogin"
      >
        <h2 class="text-4xl font-bold text-center text-secondary">Login</h2>
        <div class="text-red-600" v-if="$store.state.auth.status === 400">
          {{ $store.state.auth.errorMessage }}
        </div>
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500"
          :class="$store.state.auth.status === 422 ? hasError : ''"
        >
          <input
            type="email"
            v-model="email"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="email"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >Email</label
          >
        </div>
        <span class="text-sm text-red-600">{{
          $store.state.auth.status === 422
            ? $store.state.auth.errorMessage.email[0]
            : ""
        }}</span>
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500"
          :class="$store.state.auth.status === 422 ? hasError : ''"
        >
          <input
            type="password"
            v-model="password"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="password"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >Password</label
          >
        </div>
        <span class="text-sm text-red-600">{{
          $store.state.auth.status === 422
            ? $store.state.auth.errorMessage.password[0]
            : ""
        }}</span>
        <!-- <div class="block mt-2">
          <a href="" class="text-sm text-gray-600">Forgot Password ?</a>
        </div> -->
        <div class="flex items-center justify-end mt-4 text-sm text-gray-600">
          <div
            @click="toRegister"
            class="underline hover:text-gray-900 cursor-pointer"
          >
            Register!
          </div>
          <button
            class="px-6 py-2 ml-4 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-primary rounded-full text-white bg-secondary"
            type="submit"
            :disabled="isLoading"
          >
            <i class="fas fa-spinner animate-spin" v-if="isLoading"></i>
            <div v-else>Login</div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // const token = localStorage.getItem("furnitured-token");
    const hasError = "border-red-600";

    const email = ref("");
    const password = ref("");
    let isLoading = ref(false);

    const status = computed(() => store.state.auth.status);
    // const status = store.state.auth.status;

    const toRegister = () => {
      router.push("/register");
    };

    const handleLogin = async () => {
      isLoading.value = true;

      await store.dispatch("postLogin", {
        email: email.value,
        password: password.value,
      });
      if (status.value !== 202) {
        isLoading.value = false;
      } else {
        isLoading.value = false;
        router.push(route.query.redirect || "/");
      }
    };

    return {
      handleLogin,
      toRegister,
      email,
      password,
      hasError,
      isLoading,
      status,
    };
  },
};
</script>

<style>
.f-outline input:focus-within ~ label,
.f-outline input:not(:placeholder-shown) ~ label {
  transform: translateY(-1.5rem) translatex(-1rem) scaleX(0.8) scaleY(0.8);
}
</style>
