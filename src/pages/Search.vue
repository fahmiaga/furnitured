<template>
  <div class="flex md:flex-row flex-col md:items-start items-center px-12 mt-5">
    <div
      class="w-72 shadow-md rounded-lg bg-primary md:h-96 h-48 flex md:items-start items-center justify-center"
    >
      <form
        action=""
        class="flex md:flex-col justify-center md:justify-start md:items-center md:pt-14"
      >
        <div class="mb-5">
          <select
            v-model="category_id"
            class="py-2 rounded-md border"
            @change="filterProduct"
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

        <!-- <button class="bg-secondary px-5 py-2 mt-5 rounded-md text-white">
          Submit
        </button> -->
      </form>
    </div>
    <div class="w-3/4 md:ml-5 md:mt-0 mt-3">
      <div v-if="products.length < 1" class="w-2/4 mx-auto bg-blue-300">
        <img
          src="https://cdn.dribbble.com/users/888330/screenshots/2653750/empty_data_set.png"
          alt="No-data"
          class="w-full"
        />
      </div>
      <div class="w-full grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-3 mt-">
        <div
          class="card mb-3"
          v-for="product in products"
          :key="product.id"
          @click="toDetail(product.id)"
        >
          <img
            :src="
              product.images[0]
                ? `${product.images[0].url}`
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
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import formatRupiah from "../variables/formatRupiah";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const category_id = ref(1);

    const products = computed(() => store.state.product.products);
    const categories = computed(() => store.state.product.categories);

    const filterProduct = () => {
      const keyword = route.query.key;

      router.push({
        path: "search",
        query: { key: keyword, id: category_id.value },
      });
      route.query.id = category_id.value;
      let id = route.query.id;

      store.dispatch("searchProduct", {
        keyword,
        category_id: id,
      });
    };

    // onMounted(() =>
    //   store.dispatch("searchProduct", {
    //     keyword,
    //   })
    // );
    onMounted(() => {
      store.dispatch("getCategory");
    });

    const toDetail = (id) => {
      router.push(`/detail/${id}`);
    };

    return {
      products,
      category_id,
      categories,
      formatRupiah,
      filterProduct,
      toDetail,
    };
  },
};
</script>

<style></style>
