<template>
  <div class="ml-72 mt-8">
    <h1 class="text-2xl font-semibold">Edit Product Form</h1>
    <form action="" @submit.prevent="handleSubmit">
      <div class="w-11/12 h-auto mt-5 pl-5 py-5 shadow">
        <div
          class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
        >
          <input
            type="text"
            v-model="product.name"
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
              v-model="product.price"
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
              v-model="product.weight"
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
              v-model="product.quantity"
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
              v-model="product.description"
              placeholder=" Description"
              class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
            />
          </div>

          <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 h-12 mb-3"
          >
            <select
              v-model="product.category_id"
              class="block p-2 w-full text-lg focus:outline-none"
            >
              <option value="s" disabled>Please choose your categories</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.category_name }}
              </option>
            </select>
          </div>

          <!-- <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 h-12 mb-3"
          >
            <select
              v-model="selected"
              class="block p-2 w-full text-lg focus:outline-none"
            >
              <option value="" class="se">Please choose your categories</option>
              <option :value="id">1</option>
              <option :value="id" selected>2</option>
              <option :value="id">3</option>
            </select>
          </div> -->
        </div>

        <button
          type="submit"
          class="bg-blue-300 px-3 py-2 rounded-md text-gray-600 hover:bg-blue-200"
        >
          Update Product
        </button>
      </div>
    </form>

    <div class="w-11/12 h-auto mt-5 mb-5 pl-5 py-5 shadow flex">
      <div class="w-2/4">
        <form @submit.prevent="handleAddImage">
          <div class="flex flex-col">
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
          </div>

          <template v-if="preview_list.length">
            <div class="grid grid-cols-3 gap-1">
              <div
                v-for="(item, index) in preview_list"
                :key="index"
                class="w-20 h-20 mb-16"
              >
                <img :src="item" class="w-full h-full" />
                <p class="text-xs">file name: {{ image_list[index].name }}</p>
                <p class="text-xs">
                  size: {{ image_list[index].size / 1024 }}KB
                </p>
              </div>
            </div>
          </template>

          <div>
            <button
              type="submit"
              class="bg-blue-300 px-3 py-2 rounded-md text-gray-600 hover:bg-red-200 ml-3"
            >
              Add Image
            </button>
            <button
              class="bg-red-300 px-3 py-2 rounded-md text-gray-600 hover:bg-red-200 ml-3"
              @click="resetImage"
            >
              Reset Image
            </button>
          </div>
        </form>
      </div>

      <div class="w-2/4 grid grid-cols-4 gap-1">
        <div
          v-for="(image, i) in product.images"
          :key="i"
          class="relative mb-4"
        >
          <img :src="`${image.url}`" alt="" class="w-20 h-20 bg-blue-200" />

          <div class="cursor-pointer" @click="deleteImage(image.image_id)">
            <i
              class="fa-solid fa-xmark text-gray-400 font-semibold text-xl absolute right-3 -top-3"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const categories = computed(() => store.state.product.categories);

    const id = route.params.id;

    const product = computed(() => store.state.product.product);

    const name = ref("");
    const price = ref("");
    const description = ref("");
    const weight = ref("");
    const category_id = ref("");
    const quantity = ref("");

    const preview_list = ref([]);
    const image_list = ref([]);

    console.log(product.value);

    onMounted(() => {
      store.dispatch("getProduct", id);
      store.dispatch("getCategory");
    });

    const handleSubmit = () => {
      store.dispatch("putProduct", {
        name: product.value.name,
        price: product.value.price,
        description: product.value.description,
        weight: product.value.weight,
        category_id: product.value.category_id,
        quantity: product.value.quantity,
        id,
      });
    };

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

    const handleAddImage = () => {
      const formData = new FormData();

      for (let i = 0; i < preview_list.value.length; i++) {
        formData.append("image_name[]", image_list.value[i]);
      }

      store.dispatch("postImage", { data: formData, id });
    };

    const deleteImage = (idImage) => {
      store.dispatch("deleteImage", { id, idImage });
    };

    const resetImage = () => {
      preview_list.value = [];
      image_list.value = [];
    };

    return {
      preview_list,
      image_list,
      product,
      name,
      price,
      description,
      categories,
      weight,
      category_id,
      quantity,
      handleSubmit,
      previewMultiImage,
      resetImage,
      deleteImage,
      handleAddImage,
    };
  },
};
</script>

<style></style>
