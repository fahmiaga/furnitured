<template>
  <div class="w-full flex mt-24 flex-col md:flex-row md:px-20 md:mt-24">
    <div class="w-1/4 hidden md:inline-block">
      <h2 class="text-xl font-semibold">
        Our ----- <br />
        Products
      </h2>
      <div class="text-gray-500 mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quasi
        voluptatibus modi ratione ex explicabo.
      </div>
      <router-link
        :to="{ name: 'ListProduct' }"
        class="px-3 py-2 w-22 rounded-full bg-secondary hover:bg-black hover:bg-opacity-20 transition ease-linear duration-100 text-white"
        >View More</router-link
      >
    </div>

    <!-- mobile -->
    <div class="text-center inline-block md:hidden mt-5 mb-14">
      <h2 class="text-xl font-semibold">Our Products</h2>
      <div class="text-gray-500 mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quasi
        voluptatibus modi ratione ex explicabo.
      </div>
      <a
        href=""
        class="px-3 py-2 w-22 rounded-full bg-secondary hover:bg-orange-200 transition ease-linear duration-500 text-white"
        >View More</a
      >
    </div>

    <div
      class="w-full grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-3 mt-"
      v-if="products.length"
    >
      <div
        class="card mb-3"
        v-for="product in products.slice(0, 3)"
        :key="product.id"
        @click="toDetail(product.id)"
      >
        <img
          :src="
            product.images[0]
              ? `http://127.0.0.1:8000${product.images[0].url}`
              : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
          "
          :alt="product.name"
          class="w-2/4 h-2/5 mx-auto mt-10"
        />
        <div class="flex flex-col px-10 mt-6">
          <h2 class="font-semibold mb-2">
            {{ product.name.substring(0, 40) }}
          </h2>
          <p class="md:text-sm">
            {{ product.description.substring(0, 50) }}
          </p>
          <h1 class="text-lg font-semibold mt-3">
            {{ formatRupiah(product.price) }}
          </h1>
        </div>
      </div>
    </div>

    <div
      class="w-full grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-3 mt-"
      v-else
    >
      <div class="card mb-3">
        <div
          class="w-2/4 h-2/5 mx-auto mt-10 rounded-lg bg-gray-200 animate-pulse"
        ></div>
        <div class="flex px-10 items-center mt-5">
          <div class="w-3/4 mt-5">
            <div
              class="h-2 bg-slate-200 rounded animate-pulse bg-gray-200"
            ></div>
            <div class="animate-pulse pt-7">
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
            </div>
          </div>
          <div
            class="rounded-full bg-gray-200 h-10 w-10 animate-pulse mt-14"
          ></div>
        </div>
      </div>
      <div class="card mb-3">
        <div
          class="w-2/4 h-2/5 mx-auto mt-10 rounded-lg bg-gray-200 animate-pulse"
        ></div>
        <div class="flex px-10 items-center mt-5">
          <div class="w-3/4 mt-5">
            <div
              class="h-2 bg-slate-200 rounded animate-pulse bg-gray-200"
            ></div>
            <div class="animate-pulse pt-7">
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
            </div>
          </div>
          <div
            class="rounded-full bg-gray-200 h-10 w-10 animate-pulse mt-14"
          ></div>
        </div>
      </div>
      <div class="card mb-3">
        <div
          class="w-2/4 h-2/5 mx-auto mt-10 rounded-lg bg-gray-200 animate-pulse"
        ></div>
        <div class="flex px-10 items-center mt-5">
          <div class="w-3/4 mt-5">
            <div
              class="h-2 bg-slate-200 rounded animate-pulse bg-gray-200"
            ></div>
            <div class="animate-pulse pt-7">
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
            </div>
          </div>
          <div
            class="rounded-full bg-gray-200 h-10 w-10 animate-pulse mt-14"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import formatRupiah from "../variables/formatRupiah";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const products = computed(() => store.state.product.products);
    const toDetail = (id) => {
      router.push(`/detail/${id}`);
    };

    onMounted(async () => {
      await store.dispatch("getProducts");
    });

    return {
      products,
      toDetail,
      formatRupiah,
    };
  },
};
</script>

<style></style>
