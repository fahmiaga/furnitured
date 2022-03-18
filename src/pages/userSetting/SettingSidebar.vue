<template>
  <div class="flex md:flex-row flex-col">
    <div class="w-full md:w-1/4 md:ml-16 mt-10 mb-10 rounded-lg shadow-lg">
      <div class="flex items-center">
        <div
          v-if="!user"
          class="w-14 h-14 mx-auto mt-10 mb-5 rounded-full bg-gray-200 animate-pulse"
        ></div>
        <img
          v-else
          :src="
            user.picture !== null
              ? `${user.picture}`
              : 'https://www.pinclipart.com/picdir/middle/138-1385107_png-file-user-vector-icon-png-clipart.png'
          "
          alt="user-png"
          class="w-14 h-16 mx-6 my-2"
        />
        <div
          v-if="!user"
          class="h-4 w-36 mt-3 rounded-md bg-gray-200 mr-9"
        ></div>
        <p v-else class="text-gray-700">
          {{ user.first_name }} {{ user.last_name }}
        </p>
      </div>
      <hr class="border-gray-400" />
      <div class="text-gray-700 flex flex-col mt-3">
        <router-link
          to="/setting/edit-profile"
          class="mb-3 w-full h-7 bg-primary pl-3 leading-7"
          >Profile</router-link
        >
        <router-link
          to="/setting/address"
          class="mb-3 w-full h-7 bg-primary pl-3 leading-7"
          >Recipient Address</router-link
        >
      </div>
    </div>
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Footer from "../../components/Footer.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: { Footer },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.auth.user);

    return {
      user,
    };
  },
};
</script>

<style></style>
