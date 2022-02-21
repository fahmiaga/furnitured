<template>
  <div class="flex md:flex-row flex-col px-12 mt-5">
    <div class="w-72 shadow-md rounded-lg bg-primary h-96">
      <div class="pt-3 pb-6 flex items-center">
        <ul class="font-medium text-base text-white w-full">
          <li
            class="mt-5 pl-10 cursor-pointer hover:bg-secondary"
            :class="idCat === 0 ? 'bg-secondary' : ''"
            @click="setCategoryId(0)"
          >
            <div>All</div>
          </li>
          <li
            class="mt-5 pl-10 cursor-pointer hover:bg-secondary"
            :class="idCat === category.id ? 'bg-secondary' : ''"
            v-for="category in categories"
            :key="category.id"
            @click="setCategoryId(category.id)"
          >
            <div>{{ category.category_name }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-3/4 md:ml-5 md:mt-0 mt-3">
      <div
        class="w-full grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-3 mt-"
        v-if="idCat === 0"
      >
        <div
          class="card mb-3"
          v-for="product in listProducts.flat()"
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
            <h2 class="font-semibold mb-2">{{ product.name }}</h2>
            <p class="md:text-sm">
              {{ product.description }}
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
        <div
          class="card mb-3"
          v-for="product in products"
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
            <h2 class="font-semibold mb-2">{{ product.name }}</h2>
            <p class="md:text-sm">
              {{ product.description }}
            </p>
            <h1 class="text-lg font-semibold mt-3">
              {{ formatRupiah(product.price) }}
            </h1>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <div
          class="mx-auto my-5 text-white px-3 cursor-pointer py-2 w-22 rounded-full bg-secondary hover:bg-black hover:bg-opacity-30 transition ease-linear duration-100 hidden md:inline-block"
          @click="handleMore"
        >
          View More
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Footer from "../components/Footer.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatRupiah from "../variables/formatRupiah";
export default {
  components: { Footer },
  setup() {
    const store = useStore();
    const router = useRouter();
    const categories = computed(() => store.state.product.categories);
    const products = computed(() => store.state.product.productCategory);
    const listProducts = computed(() => store.state.product.listProducts);
    const prd = computed(() => store.state.product.products);
    const currentPage = ref(1);

    let idCat = ref(1);

    const setCategoryId = async (id) => {
      idCat.value = id;
      if (id !== 0) {
        await store.dispatch("getProductByCategory", id);
      } else {
        store.dispatch("getProducts");
      }
    };

    console.log("list =>", listProducts.value);

    onMounted(() => {
      store.dispatch("getCategory");
    });

    const toDetail = (id) => {
      router.push(`/detail/${id}`);
    };

    const handleMore = () => {
      currentPage.value++;
      store.dispatch("getProducts", currentPage.value);
    };

    onMounted(async () => {
      await store.dispatch("getProductByCategory", idCat.value);
    });

    return {
      categories,
      setCategoryId,
      products,
      toDetail,
      idCat,
      prd,
      formatRupiah,
      handleMore,
      listProducts,
    };
  },
};
</script>

<style></style>
