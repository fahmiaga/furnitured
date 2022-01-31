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
      <a
        href=""
        class="px-3 py-2 w-22 rounded-full bg-secondary hover:bg-orange-200 transition ease-linear duration-500 text-white"
        >View More</a
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

    <div class="w-full grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-3 mt-">
      <div
        class="card mb-3"
        v-for="product in products.slice(0, 3)"
        :key="product.id"
      >
        <div
          class="w-2/4 h-2/5 mx-auto mt-10 rounded-lg bg-gray-200 animate-pulse"
          v-if="products.length < 1"
        ></div>
        <img
          :src="
            product.images[0]
              ? `http://127.0.0.1:8000${product.images[0].url}`
              : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
          "
          :alt="product.name"
          class="w-2/4 h-2/5 mx-auto mt-10"
          v-else
        />
        <div class="flex px-10 items-center mt-5">
          <div class="w-3/4 mt-5">
            <div
              class="h-2 bg-slate-200 rounded animate-pulse bg-gray-200"
              v-if="products.length < 1"
            ></div>
            <h2 class="font-semibold mb-2" v-else>{{ product.name }}</h2>

            <div class="animate-pulse pt-7" v-if="products.length < 1">
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
              <div class="h-2 w-28 mt-3 bg-gray-200"></div>
            </div>

            <p class="md:text-sm" v-else>
              {{ product.description }}
            </p>
          </div>
          <div
            class="rounded-full bg-gray-200 h-10 w-10 animate-pulse"
            v-if="products.length < 1 || products == null"
          ></div>
          <h1 class="pl-8 text-2xl font-medium" v-else>${{ product.price }}</h1>
        </div>
      </div>
      <!-- <div class="card">
        <img
          src="../assets/img/ch26-eg-saebe-natur-flet.png"
          alt="kursi"
          class="w-2/4 h-2/5 mx-auto mt-10"
        />
        <div class="flex px-10 items-center mt-5">
          <div class="w-3/4 mt-5">
            <h2 class="font-semibold mb-2">Oakly Chair</h2>
            <p class="md:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,
              corrupti.
            </p>
          </div>
          <h1 class="pl-8 text-2xl font-medium">$40</h1>
        </div>
      </div>
      <div class="card">
        <img
          src="../assets/img/wooden-chair-500x500.png"
          alt="kursi"
          class="w-2/4 h-2/5 mx-auto mt-10"
        />
        <div class="flex px-10 items-center mt-5">
          <div class="w-3/4 mt-5">
            <h2 class="font-semibold mb-2">Oakly Bench</h2>
            <p class="md:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,
              corrupti.
            </p>
          </div>
          <h1 class="pl-8 text-2xl font-medium">$75</h1>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
export default {
  setup() {
    const store = useStore();

    const products = computed(() => store.state.product.products);

    onMounted(async () => {
      await store.dispatch("getProducts");
    });

    return {
      products,
    };
  },
};
</script>

<style></style>
