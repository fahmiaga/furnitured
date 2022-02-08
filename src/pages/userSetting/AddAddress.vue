<template>
  <div class="md:w-3/4 w-full my-10 md:mx-4 rounded-lg border px-2 pt-5">
    <form action="" autocomplete="off" @submit.prevent="handleSubmit">
      <div class="flex justify-evenly">
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
        >
          <input
            type="text"
            v-model="recipient"
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
            v-model="province_id"
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
            v-model="address"
            placeholder="Address"
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent mb-3"
          />
        </div>
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 h-12 mb-3"
        >
          <select
            v-model="city_id"
            class="block p-2 w-full text-lg focus:outline-none"
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
            v-model="district"
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
            v-model="sub_district"
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
            v-model="phone"
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
            v-model="zip_code"
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
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const recipient = ref("");
    const address = ref("");
    const province_id = ref(0);
    const city_id = ref(0);
    const phone = ref("");
    const district = ref("");
    const sub_district = ref("");
    const zip_code = ref("");

    const provinces = computed(() => store.state.user.provinces);
    const cities = computed(() => store.state.user.cities);
    const id = ref(0);

    const idHandler = (e) => {
      id.value = e.target.value;
      store.dispatch("getCities", id.value);
    };

    onMounted(() => {
      store.dispatch("getProvinces");
    });

    const handleSubmit = () => {
      store.dispatch("postRecipient", {
        recipient: recipient.value,
        address: address.value,
        province_id: province_id.value,
        city_id: city_id.value,
        phone: phone.value,
        district: district.value,
        sub_district: sub_district.value,
        zip_code: zip_code.value,
      });
    };

    return {
      provinces,
      cities,
      idHandler,
      id,
      recipient,
      address,
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
