<template>
  <div class="md:w-3/4 my-10 mx-4 rounded-lg border">
    <div class="flex justify-between px-14 mt-3">
      <h1 class="text-gray-700 font-semibold">Addresses List</h1>
      <router-link
        to="/setting/add-address"
        class="bg-secondary w-32 text-center h-6 rounded-sm text-white"
        >Add Address</router-link
      >
    </div>

    <div class="px-14 mt-3 pb-4" v-for="address in addresses" :key="address.id">
      <div class="border border-secondary p-2 rounded-md bg-gray-50 relative">
        <h1>{{ address.name }}</h1>
        <h2>{{ address.phone }}</h2>
        <p>
          {{ address.address }} {{ address.sub_district }},
          {{ address.district }}, {{ address.city }},
          {{ address.province }}
        </p>

        <div
          class="font-semibold text-secondary mt-2 cursor-pointer"
          @click="$router.push(`/setting/update-address/${address.id}`)"
        >
          <h1>Update Address</h1>
        </div>
        <div
          class="absolute -top-2 -right-2 cursor-pointer text-red-400"
          @click="handleDelete(address.id)"
        >
          <i class="far fa-times-circle"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";
export default {
  setup() {
    const store = useStore();
    const addresses = computed(() => store.state.user.address);

    onMounted(() => {
      store.dispatch("getAddress");
    });

    const handleDelete = (id) => {
      store.dispatch("deleteAddress", id);
    };

    return { addresses, handleDelete };
  },
};
</script>

<style></style>
