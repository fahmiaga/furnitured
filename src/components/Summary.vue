<template>
  <div
    class="p-5 bg-gray-200 rounded-md overflow-visible h-48 md:w-2/5 w-full mt-5"
  >
    <span class="text-xl font-medium text-gray-700 block pb-3">Summary</span>
    <div class="text-gray-700">
      Total : {{ formatRupiah($store.getters.subtotal) }}
    </div>

    <button
      type="submit"
      class="h-12 w-full mt-9 rounded focus:outline-none text-white"
      :class="
        carts.length < 1
          ? 'bg-gray-400 hover:bg-gray-400'
          : 'bg-secondary hover:bg-primary'
      "
      @click="handleSubmit"
      :disabled="carts.length < 1"
    >
      Check Out
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import formatRupiah from "../variables/formatRupiah";
export default {
  setup() {
    const store = useStore();

    const carts = computed(() => store.state.product.carts);
    const handleSubmit = () => {
      store.dispatch("updateCart");
    };

    return { handleSubmit, formatRupiah, carts };
  },
};
</script>

<style></style>
