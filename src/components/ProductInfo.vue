<template>
  <div class="flex flex-col md:ml-12">
    <div class="mt-5">
      <h1 class="font-bold text-2xl">{{ product.name }}</h1>
    </div>
    <div class="mt-3 text-gray-600">
      <h3 class="font-semibold text-xl">
        Price &nbsp;&nbsp;&nbsp;
        {{ formatRupiah(product.price * quantity) }}
      </h3>
    </div>
    <div class="mt-3 text-gray-600">
      <h3 class="font-normal text-base">
        Description &nbsp;&nbsp;&nbsp; {{ product.description }}
      </h3>
    </div>
    <div class="mt-3 text-gray-600">
      <h3 class="font-normal text-base">
        Quantity &nbsp;&nbsp;&nbsp;
        <span v-if="product.quantity === 0" class="font-semibold text-red-600"
          >Out of stock</span
        >
        <span v-else class="font-semibold">{{ product.quantity }} pieces</span>
      </h3>
      <div class="flex mt-2">
        <button
          class="border px-3 text-lg"
          @click="decrease"
          :disabled="quantity <= 1"
        >
          -
        </button>
        <input
          type="number"
          class="w-24 border text-center"
          v-model="quantity"
        />
        <button
          class="border px-3 text-lg"
          @click="increase"
          :disabled="quantity >= product.quantity"
        >
          +
        </button>
      </div>
    </div>
    <div class="mt-7">
      <div
        class="w-48 text-center text-white rounded-md"
        :class="
          product.quantity === 0 ? 'bg-gray-400' : 'bg-secondary cursor-pointer'
        "
        :disabled="product.quantity === 0"
        @click="handleCart"
      >
        <i class="fas fa-cart-plus text-2xl py-2"></i> Add To Cart
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import formatRupiah from "../variables/formatRupiah";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const id = route.params.id;
    const token = localStorage.getItem("furnitured-token");
    const user = localStorage.getItem("user");
    const product = computed(() => store.state.product.products);

    const quantity = ref(1);

    const increase = () => {
      quantity.value++;
    };
    const decrease = () => {
      quantity.value--;
    };

    onMounted(async () => {
      store.dispatch("getProduct", id);
    });

    const handleCart = () => {
      if (token) {
        store.dispatch("addToCart", {
          product_id: id,
          user_id: user,
          quantity: quantity.value,
        });
      } else {
        router.push({ name: "Login", query: { redirect: `/detail/${id}` } });
      }
    };

    return {
      handleCart,
      increase,
      decrease,
      quantity,
      product,
      formatRupiah,
    };
  },
};
</script>

<style scope>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
