<template>
  <div class="ml-72 mt-8">
    <h1 class="text-2xl font-semibold">New Product Form</h1>
    <form action="" @submit.prevent="handleSubmit">
      <div class="w-11/12 h-auto mt-5 pl-5 py-5 shadow">
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
        >
          <input
            type="text"
            v-model="name"
            placeholder=" "
            class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="name"
            class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
            >Name</label
          >
        </div>

        <div class="flex">
          <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-64 mb-3"
          >
            <input
              type="number"
              v-model="price"
              placeholder=" "
              class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
            />
            <label
              for="price"
              class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
              >Price</label
            >
          </div>
          <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-40 mb-3 mx-4"
          >
            <input
              type="number"
              v-model="weight"
              placeholder=" "
              class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
            />
            <label
              for="weight"
              class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
              >Weight</label
            >
          </div>
          <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-40 mb-3"
          >
            <input
              type="number"
              v-model="quantity"
              placeholder=" "
              class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
            />
            <label
              for="quantity"
              class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
              >Quantity</label
            >
          </div>
        </div>

        <div class="flex">
          <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3 mr-3"
          >
            <textarea
              type="text"
              v-model="description"
              placeholder=" Description"
              class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
            />
          </div>

          <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 h-12 mb-3"
          >
            <select
              v-model="category_id"
              class="block p-2 w-full text-lg focus:outline-none"
            >
              <option disabled>Please choose your categories</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.category_name }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex items-center">
          <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
          >
            <input
              type="file"
              placeholder=" "
              class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
              accept="image/*"
              multiple="multiple"
              @change="previewMultiImage"
            />
            <label
              for="image"
              class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
              >Image</label
            >
          </div>

          <button
            class="bg-red-300 px-3 py-2 rounded-md text-gray-600 hover:bg-red-200 ml-3"
            @click="resetImage"
          >
            Reset Image
          </button>
        </div>

        <template v-if="preview_list.length">
          <div class="grid grid-cols-4 gap-4">
            <div
              v-for="(item, index) in preview_list"
              :key="index"
              class="w-44 h-44 mr-3 mb-16"
            >
              <img :src="item" class="w-full h-full" />
              <p class="text-xs">file name: {{ image_list[index].name }}</p>
              <p class="text-xs">size: {{ image_list[index].size / 1024 }}KB</p>
            </div>
          </div>
        </template>

        <button
          type="submit"
          class="bg-blue-300 px-3 py-2 rounded-md text-gray-600 hover:bg-blue-200"
        >
          Add Product
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const categories = computed(() => store.state.product.categories);

    const preview_list = ref([]);
    const image_list = ref([]);

    const name = ref("");
    const price = ref("");
    const description = ref("");
    const weight = ref("");
    const category_id = ref("");
    const quantity = ref("");

    const previewMultiImage = function (event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            preview_list.value.push(e.target.result);
          };
          image_list.value.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    };

    onMounted(() => {
      store.dispatch("getCategory");
    });

    const handleSubmit = () => {
      const formData = new FormData();

      formData.append("name", name.value);
      formData.append("price", price.value);
      formData.append("description", description.value);
      formData.append("weight", weight.value);
      formData.append("category_id", category_id.value);
      formData.append("quantity", quantity.value);

      for (let i = 0; i < preview_list.value.length; i++) {
        formData.append("image_name[]", image_list.value[i]);
      }
      // formData.append("image_name[]", image_list.value);

      store.dispatch("postProduct", formData);
    };

    const resetImage = () => {
      preview_list.value = [];
      image_list.value = [];
    };

    return {
      handleSubmit,
      previewMultiImage,
      preview_list,
      image_list,
      resetImage,
      name,
      price,
      weight,
      quantity,
      category_id,
      description,
      categories,
    };
  },
};
</script>

<style scoped>
.router-link-exact-active {
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
}
</style>
