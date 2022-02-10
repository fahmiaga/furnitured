<template>
  <div class="w-3/4 my-10 mx-4 rounded-lg border">
    <form action="" @submit.prevent="handleSubmit">
      <div class="flex">
        <div
          class="w-80 ml-5 mt-5 rounded-md shadow-md mb-5 flex flex-col items-center"
          v-if="user"
        >
          <!-- src="@/assets/img/802043_man_512x512.png" -->
          <img
            v-if="picture"
            v-show="picture"
            :src="picture"
            alt="user-png"
            class="w-36 h-36 mx-6 my-2"
          />
          <img
            v-else
            :src="
              user.picture !== null
                ? `http://127.0.0.1:8000${user.picture}`
                : '@/assets/img/802043_man_512x512.png'
            "
            alt="user-png"
            class="w-36 h-36 mx-6 my-2"
          />

          <div class="flex justify-center">
            <div class="mb-3 w-72">
              <input
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                accept="image/*"
                @change="handleImage"
                id="formFile"
              />
            </div>
          </div>
        </div>

        <div class="ml-10 mt-5" v-else>
          <div
            class="w-36 h-36 bg-gray-200 animate-bounce rounded-lg my-5"
          ></div>
        </div>

        <div class="ml-10 mt-5" v-if="user">
          <p v-if="user === null || user === undefined">Loading</p>
          <p class="font-gray-700 text-lg font-semibold mb-5" v-else>
            {{ user.first_name }} {{ user.last_name }}
          </p>

          <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
          >
            <input
              type="text"
              v-model="user.first_name"
              placeholder=" "
              class="block p-2 w-full text-sm appearance-none focus:outline-none bg-transparent"
            />
            <label
              for="first_name"
              class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-1 -z-1 duration-300 origin-0"
              >First Name</label
            >
          </div>

          <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 my-5"
          >
            <input
              type="text"
              v-model="user.last_name"
              placeholder=" "
              class="block p-2 w-full text-sm appearance-none focus:outline-none bg-transparent"
            />
            <label
              for="last_name"
              class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-1 -z-1 duration-300 origin-0"
              >Last Name</label
            >
          </div>
          <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96"
          >
            <input
              type="number"
              v-model="user.phone"
              placeholder=" "
              class="block p-2 w-full text-sm appearance-none focus:outline-none bg-transparent"
            />
            <label
              for="phone"
              class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-1 -z-1 duration-300 origin-0"
              >Phone</label
            >
          </div>
        </div>

        <div class="ml-10 mt-5" v-else>
          <div class="w-80 h-8 bg-gray-200 animate-bounce rounded-lg"></div>
          <div
            class="w-80 h-8 bg-gray-200 animate-bounce rounded-lg my-5"
          ></div>
          <div class="w-80 h-8 bg-gray-200 animate-bounce rounded-lg"></div>
        </div>
      </div>
      <button
        type="submit"
        class="px-3 w-32 cursor-pointer py-2 ml-72 mb-6 text-white rounded-full bg-secondary hover:bg-black hover:bg-opacity-20 transition ease-linear duration-100"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const user = computed(() => store.state.auth.user);

    const first_name = ref("");
    const last_name = ref("");
    const phone = ref("");
    // const picture = ref(null);
    let imageFile = ref("");
    let picture = ref("");

    onMounted(() => {
      store.dispatch("getUser");
    });

    const handleImage = (e) => {
      if (e.target.files.length === 0) {
        imageFile.value = "";
        picture.value = "";
        return;
      }

      imageFile.value = e.target.files[0];
    };

    watch(imageFile, (imageFile) => {
      if (!imageFile instanceof File) {
        return;
      }
      let fileReader = new FileReader();

      fileReader.readAsDataURL(imageFile);

      fileReader.addEventListener("load", () => {
        picture.value = fileReader.result;
      });
    });

    const handleSubmit = () => {
      const formData = new FormData();
      formData.append("first_name", user.value.first_name);
      formData.append("last_name", user.value.last_name);
      formData.append("phone", user.value.phone);
      formData.append("picture", imageFile.value);

      store.dispatch("updateUser", formData);
    };

    return {
      user,
      first_name,
      last_name,
      phone,
      handleSubmit,
      handleImage,
      picture,
    };
  },
};
</script>

<style></style>
