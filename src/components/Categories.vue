<template>
  <div class="w-full md:px-20 mt-24 flex flex-col md:flex-row">
    <div class="w-1/4 hidden md:inline-block">
      <h2 class="text-xl font-semibold">
        Our ----- <br />
        Categories
      </h2>
      <div class="text-gray-500 mb-3 pr-2">
        I think about every tree that is cut down, and the power and privilege
        we have to extend its life and to display its beauty in the furniture we
        make.
      </div>
      <router-link
        :to="{ name: 'ListProduct' }"
        class="px-3 py-2 w-22 rounded-full bg-secondary hover:bg-black hover:bg-opacity-20 transition ease-linear duration-100 text-white"
        >View More</router-link
      >
    </div>

    <!-- mobile -->
    <div class="text-center inline-block md:hidden mb-8">
      <h2 class="text-xl font-semibold">Our Categories</h2>
      <div class="text-gray-500 mb-3">
        I think about every tree that is cut down, and the power and privilege
        we have to extend its life and to display its beauty in the furniture we
        make.
      </div>
      <router-link
        :to="{ name: 'ListProduct' }"
        class="px-3 py-2 w-22 rounded-full bg-secondary hover:bg-black hover:bg-opacity-20 transition ease-linear duration-100 text-white"
        >View More</router-link
      >
    </div>

    <div class="w-full">
      <ul class="flex flex-nowrap justify-around md:mb-4 text-gray-500">
        <li v-for="category in categories" :key="category.id">
          <div
            href=""
            class="outline-none hover:border-gray-700 border-transparent hover:border-b-2 hover:border-current cursor-pointer"
            :class="idCat === category.id ? 'border-b-2 border-gray-700' : ''"
            @click="setCategoryId(category.id)"
          >
            {{ category.category_name }}
          </div>
        </li>
      </ul>
      <div class="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-3">
        <div
          class="card"
          v-for="product in productCategories.slice(0, 3)"
          :key="product.id"
          @click="toDetail(product.id)"
        >
          <img
            :src="
              product.images[0]
                ? `${product.images[0].url}`
                : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
            "
            alt="kursi"
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
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatRupiah from "../variables/formatRupiah";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const categories = computed(() => store.state.product.categories);
    const productCategories = computed(
      () => store.state.product.productCategory
    );
    let idCat = ref(1);

    const setCategoryId = async (id) => {
      idCat.value = id;
      await store.dispatch("getProductByCategory", id);
    };
    const toDetail = (id) => {
      router.push(`/detail/${id}`);
    };

    onMounted(async () => {
      await store.dispatch("getCategory");
    });

    onMounted(async () => {
      await store.dispatch("getProductByCategory", idCat.value);
    });

    return {
      categories,
      setCategoryId,
      toDetail,
      idCat,
      productCategories,
      formatRupiah,
    };
  },
};
</script>

<style></style>
