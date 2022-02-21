<template>
  <div class="md:w-3/5 w-full md:mb-0 mb-5">
    <div class="mt-5 ml-4">
      <h1 class="font-medium text-xl">Shopping Cart</h1>

      <div v-if="carts.length < 1">
        <img
          src="https://www.valeorx.com/static/media/empty-cart.60e68bfd.png"
          alt="empty-cart"
          width="500"
        />
      </div>

      <div
        v-for="cart in carts"
        :key="cart.cart_id"
        class="flex justify-between items-center w-full md:px-6 pt-6"
      >
        <div class="flex items-center md:mr-0 mr-10">
          <img
            :src="
              cart.images[0]
                ? `http://127.0.0.1:8000${cart.images[0].url}`
                : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
            "
            width="60"
            class="rounded-full"
          />
          <div class="flex flex-col ml-3">
            <span class="md:text-md font-medium">{{ cart.name }}</span>
            <span class="text-xs font-light text-gray-400">#41551</span>
          </div>
        </div>
        <div class="flex md:justify-evenly justify-between items-center w-96">
          <div class="flex">
            <button
              class="font-semibold text-lg cursor-pointer"
              @click="
                cart.quantity--;
                handleIncrement(cart.quantity);
              "
              :disabled="cart.quantity <= 1"
            >
              -
            </button>
            <input
              type="text"
              class="focus:outline-none bg-gray-100 border h-6 w-10 text-center rounded text-sm px-2 mx-2"
              v-model="cart.quantity"
            />
            <button
              class="font-semibold text-lg cursor-pointer"
              @click="
                cart.quantity++;
                handleDecrement(cart.quantity);
              "
            >
              +
            </button>
          </div>
          <div class="pr-8 md:w-32 w-24">
            <span class="text-sm font-medium">
              {{ formatRupiah(cart.price * cart.quantity) }}</span
            >
          </div>
          <div
            class="font-bold cursor-pointer"
            @click="deleteCart(cart.cart_id)"
          >
            <i class="fa fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import formatRupiah from "../variables/formatRupiah";
export default {
  setup() {
    const store = useStore();
    const carts = computed(() => store.state.product.carts);
    const quantity = computed(() => store.state.product.quantity);
    const currentQuantity = ref(0);

    const deleteCart = (id) => {
      //   console.log(id);
      store.dispatch("deleteCart", id);
    };

    onMounted(() => {
      store.dispatch("getCart");
    });

    const handleIncrement = (qty) => {
      currentQuantity.value = qty;
    };
    const handleDecrement = (qty) => {
      currentQuantity.value = qty;
    };

    return {
      carts,
      deleteCart,
      quantity,
      formatRupiah,
      handleIncrement,
      handleDecrement,
      currentQuantity,
    };
  },
};
</script>

<style></style>
