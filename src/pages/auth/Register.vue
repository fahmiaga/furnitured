<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-secondary py-12 px-4 sm:px-6 lg:px-8 bg-hero-pattern bg-no-repeat bg-cover"
  >
    <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
    <div class="mt-2 items-center z-10">
      <form
        class="p-14 bg-white max-w-sm mx-auto rounded-xl shadow-xl overflow-hidden space-y-10"
        @submit.prevent="handleRegister"
      >
        <h2 class="text-4xl font-bold text-center text-secondary">Register</h2>
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500"
          :class="
            $store.state.auth.errorMessage.first_name ? 'border-red-600' : ''
          "
        >
          <input
            type="text"
            v-model="first_name"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="password"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >First Name</label
          >
        </div>
        <span class="text-sm text-red-600">{{
          $store.state.auth.errorMessage.first_name
            ? $store.state.auth.errorMessage.first_name[0]
            : ""
        }}</span>
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500"
          :class="
            $store.state.auth.errorMessage.last_name ? 'border-red-600' : ''
          "
        >
          <input
            type="text"
            v-model="last_name"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="password"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >Last Name</label
          >
        </div>
        <span class="text-sm text-red-600">{{
          $store.state.auth.errorMessage.last_name
            ? $store.state.auth.errorMessage.last_name[0]
            : ""
        }}</span>
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500"
          :class="$store.state.auth.errorMessage.phone ? 'border-red-600' : ''"
        >
          <input
            type="text"
            v-model="phone"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="password"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >Phone</label
          >
        </div>
        <span class="text-sm text-red-600">{{
          $store.state.auth.errorMessage.phone
            ? $store.state.auth.errorMessage.phone[0]
            : ""
        }}</span>

        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500"
          :class="$store.state.auth.errorMessage.email ? 'border-red-600' : ''"
        >
          <input
            type="email"
            v-model="email"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="password"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >Email</label
          >
        </div>
        <span class="text-sm text-red-600">{{
          $store.state.auth.errorMessage.email
            ? $store.state.auth.errorMessage.email[0]
            : ""
        }}</span>

        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500"
          :class="
            $store.state.auth.errorMessage.password ? 'border-red-600' : ''
          "
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
          $store.state.auth.errorMessage.password
            ? $store.state.auth.errorMessage.password[0]
            : ""
        }}</span>

        <!-- <div class="block mt-2">
          <a href="" class="text-sm text-gray-600">Forgot Password ?</a>
        </div> -->
        <div class="flex items-center justify-end mt-4 text-sm text-gray-600">
          <div
            @click="toLogin"
            class="underline hover:text-gray-900 cursor-pointer"
            href="/login"
          >
            Login!
          </div>
          <button
            class="px-6 py-2 ml-4 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-primary rounded-full text-white bg-secondary"
            type="submit"
            :disabled="isLoading"
          >
            <i class="fas fa-spinner animate-spin" v-if="isLoading"></i>
            <div v-else>Register</div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const first_name = ref("");
    const last_name = ref("");
    const phone = ref("");
    const email = ref("");
    const password = ref("");
    let isLoading = ref(false);

    const status = computed(() => store.state.auth.status);

    const toLogin = () => {
      router.push("/login");
    };

    const handleRegister = async () => {
      isLoading.value = true;

      if (status !== 202) {
        isLoading.value = false;
      }

      await store.dispatch("postRegister", {
        first_name: first_name.value,
        last_name: last_name.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
      });
    };

    return {
      first_name,
      last_name,
      phone,
      email,
      password,
      isLoading,
      status,
      toLogin,
      handleRegister,
    };
  },
};
</script>

<style></style>
