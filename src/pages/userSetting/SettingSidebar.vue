<template>
  <div class="flex md:flex-row flex-col">
    <div class="w-full md:w-1/4 md:ml-16 mt-10 mb-10 rounded-lg shadow-lg">
      <div class="flex items-center">
        <img
          src="@/assets/img/802043_man_512x512.png"
          alt="user-png"
          class="w-16 h-16 mx-6 my-2"
        />
        <p class="text-gray-700">Fahmi</p>
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
export default {
  components: { Footer },
};
</script>

<style></style>
