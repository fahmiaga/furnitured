<template>
  <div class="w-3/5">
    <div class="mt-5 ml-4">
      <h1 class="font-medium text-xl">Shopping Cart</h1>
      <div
        v-for="cart in carts"
        :key="cart.cart_id"
        class="flex justify-between items-center px-6 pt-6"
      >
        <div class="flex items-center">
          <img
            :src="`http://127.0.0.1:8000${cart.images[0].url}`"
            width="60"
            class="rounded-full"
          />
          <div class="flex flex-col ml-3">
            <span class="md:text-md font-medium">{{ cart.name }}</span>
            <span class="text-xs font-light text-gray-400">#41551</span>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div class="pr-8 flex">
            <button
              class="font-semibold text-lg cursor-pointer"
              @click="cart.quantity--"
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
              @click="cart.quantity++"
            >
              +
            </button>
          </div>
          <div class="pr-8 w-12">
            <span class="text-sm font-medium"
              >${{ cart.price * cart.quantity }}</span
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
export default {
  setup() {
    const store = useStore();
    const carts = computed(() => store.state.product.carts);
    const quantity = computed(() => store.state.product.quantity);

    const deleteCart = (id) => {
      //   console.log(id);
      store.dispatch("deleteCart", id);
    };

    onMounted(() => {
      store.dispatch("getCart");
    });

    return { carts, deleteCart, quantity };
  },
};
</script>

<style></style>
