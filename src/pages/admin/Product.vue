<template>
  <div class="ml-72 mt-8">
    <h1 class="text-4xl font-semibold">Products</h1>
    <div class="w-11/12 mt-5 pl-5 py-5 shadow">
      <button
        @click="$router.push('/admin/new-product')"
        class="bg-blue-300 px-3 py-2 rounded-md text-gray-600 hover:bg-blue-200"
      >
        <i class="fa-solid fa-plus"></i> Add New Product
      </button>
      <!-- table -->

      <div class="overflow-x-auto">
        <div class="w-full lg:w-11/12">
          <div class="bg-white shadow-md rounded my-3">
            <table class="min-w-max w-full table-auto">
              <thead>
                <tr
                  class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
                >
                  <th class="py-3 px-6 text-left">Name</th>
                  <th class="py-3 px-6 text-left">Price</th>
                  <th class="py-3 px-6 text-center">Images</th>
                  <th class="py-3 px-6 text-center">Quantity</th>
                  <th class="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm font-light">
                <tr
                  class="border-b border-gray-200 bg-gray-50"
                  v-if="!products"
                >
                  <td><p>Loading...</p></td>
                </tr>
                <tr
                  class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                  v-for="product in products"
                  :key="product.id"
                >
                  <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                      <div class="mr-2">
                        <img
                          class="w-6 h-6"
                          :src="
                            product.images[0]
                              ? `http://127.0.0.1:8000${product.images[0].url}`
                              : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
                          "
                          :alt="product.name"
                        />
                      </div>
                      <span class="font-medium">{{ product.name }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                      <span>{{ formatRupiah(product.price) }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-6 text-center">
                    <div class="flex items-center justify-center">
                      <img
                        v-for="(image, i) in product.images"
                        class="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                        :src="`http://127.0.0.1:8000${product.images[i].url}`"
                        :alt="`picture ${i}`"
                        :key="i"
                      />
                    </div>
                  </td>
                  <td class="py-3 px-6 text-center">
                    <span
                      class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"
                      >{{ product.quantity }}</span
                    >
                  </td>
                  <td class="py-3 px-6 text-center">
                    <div class="flex item-center justify-center">
                      <div
                        class="w-4 mr-2 transform hover:text-secondary cursor-pointer hover:scale-110"
                        @click="handleDetail(product.id)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      <div
                        class="w-4 mr-2 transform hover:text-secondary cursor-pointer hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </div>
                      <div
                        class="w-4 mr-2 transform hover:text-secondary cursor-pointer hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- end table -->
      <Pagination data="getProducts" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import Pagination from "../../components/Pagination.vue";

import { useStore } from "vuex";
import formatRupiah from "../../variables/formatRupiah";
export default {
  components: {
    Pagination,
  },

  setup() {
    const store = useStore();
    const products = computed(() => store.state.product.products);

    const handleDetail = (id) => {
      store.commit("setIdProduct", id);
      store.commit("setModal", true);
    };

    onMounted(() => {
      store.dispatch("getProducts");
    });

    return {
      products,
      formatRupiah,
      handleDetail,
    };
  },
};
</script>

<style></style>
