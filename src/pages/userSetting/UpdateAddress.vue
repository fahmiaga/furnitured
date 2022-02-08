<template>
  <div class="md:w-3/4 w-full my-10 md:mx-4 rounded-lg border px-2 pt-5">
    <form action="" autocomplete="off" @submit.prevent="handleSubmit">
      <div class="flex justify-evenly">
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
        >
          <input
            type="text"
            v-model="addresses.recipient"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="recipient"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >Recipient</label
          >
        </div>
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
        >
          <select
            v-model="addresses.province_id"
            class="block p-2 w-full text-lg focus:outline-none"
            @change="idHandler($event)"
          >
            <option disabled value="">Please choose your province</option>
            <option
              :value="province.province_id"
              v-for="province in provinces"
              :key="province.id"
            >
              {{ province.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-evenly">
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
        >
          <textarea
            type="text"
            v-model="addresses.address"
            placeholder="Address"
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent mb-3"
          />
        </div>
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 h-12 mb-3"
        >
          <select
            v-model="addresses.city_id"
            class="block p-2 w-full text-lg focus:outline-none"
            :disabled="provinces < 1"
          >
            <option disabled value="">Please choose your province</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-evenly">
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
        >
          <input
            type="text"
            v-model="addresses.district"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="district"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >District</label
          >
        </div>
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
        >
          <input
            type="text"
            v-model="addresses.sub_district"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="sub_district"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >Sub District</label
          >
        </div>
      </div>
      <div class="flex justify-evenly">
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
        >
          <input
            type="number"
            v-model="addresses.phone"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="phone"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >Phone</label
          >
        </div>
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
        >
          <input
            type="number"
            v-model="addresses.zip_code"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="zip_code"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >Zip Code</label
          >
        </div>
      </div>

      <button
        type="submit"
        class="w-28 h-8 mb-5 ml-14 text-white rounded-lg bg-secondary"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const idAddress = route.params.id;
    const addresses = computed(() => store.state.user.address);
    const id = ref(0);
    const provinces = computed(() => store.state.user.provinces);

    const cities = computed(() => store.state.user.cities);

    // const recipient = ref(addresses.value.recipient);
    // const address = ref(addresses.value.address);
    // const province_id = ref(addresses.value.province_id);
    // const city_id = ref(addresses.value.city_id);
    // const phone = ref(addresses.value.phone);
    // const district = ref(addresses.value.district);
    // const sub_district = ref(addresses.value.sub_district);
    // const zip_code = ref(addresses.value.zip_code);

    const recipient = ref("");
    const address = ref("");
    const province_id = ref("");
    const city_id = ref("");
    const phone = ref("");
    const district = ref("");
    const sub_district = ref("");
    const zip_code = ref("");

    const idHandler = (e) => {
      id.value = e.target.value;
      store.dispatch("getCities", id.value);
    };

    onMounted(() => {
      store.dispatch("getProvinces");
    });

    onMounted(() => {
      store.dispatch("getAddressById", idAddress);
    });

    const handleSubmit = () => {
      console.log("id==>", { recipient: addresses.value.recipient });
      store.dispatch("putRecipient", {
        recipient: addresses.value.recipient,
        address: addresses.value.address,
        province_id: addresses.value.province_id,
        city_id: addresses.value.city_id,
        phone: addresses.value.phone,
        district: addresses.value.district,
        sub_district: addresses.value.sub_district,
        zip_code: addresses.value.zip_code,
        id: idAddress,
      });
    };

    return {
      address,
      provinces,
      cities,
      idHandler,
      addresses,
      recipient,
      province_id,
      city_id,
      phone,
      district,
      sub_district,
      zip_code,
      handleSubmit,
    };
  },
};
</script>

<style></style>
