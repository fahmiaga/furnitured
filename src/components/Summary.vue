<template>
  <div class="p-5 bg-gray-200 rounded-md overflow-visible">
    <span class="text-xl font-medium text-gray-700 block pb-3">Summary</span>
    <div class="text-gray-700">Total : ${{ $store.getters.total }}</div>

    <div class="flex justify-center flex-col pt-3">
      <label class="text-xs text-gray-400">Name on Card</label>
      <input
        type="text"
        class="focus:outline-none w-full h-6 bg-gray-200 text-gray-600 placeholder-gray-300 text-sm border-b border-gray-600 py-4"
        placeholder="Giga Tamarashvili"
      />
    </div>
    <div class="flex justify-center flex-col pt-3">
      <label class="text-xs text-gray-400">Card Number</label>
      <input
        type="text"
        class="focus:outline-none w-full h-6 bg-gray-200 text-gray-600 placeholder-gray-300 text-sm border-b border-gray-600 py-4"
        placeholder="**** **** **** ****"
      />
    </div>
    <div class="grid grid-cols-3 gap-2 pt-2 mb-3">
      <div class="col-span-2">
        <label class="text-xs text-gray-400">Expiration Date</label>
        <div class="grid grid-cols-2 gap-2">
          <input
            type="text"
            class="focus:outline-none w-full h-6 bg-gray-200 text-gray-600 placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder="mm"
          />
          <input
            type="text"
            class="focus:outline-none w-full h-6 bg-gray-200 text-gray-600 placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder="yyyy"
          />
        </div>
      </div>
      <div class="">
        <label class="text-xs text-gray-400">CVV</label>
        <input
          type="text"
          class="focus:outline-none w-full h-6 bg-gray-200 text-gray-600 placeholder-gray-300 text-sm border-b border-gray-600 py-4"
          placeholder="XXX"
        />
      </div>
    </div>
    <button
      class="h-12 w-full bg-secondary rounded focus:outline-none text-white hover:bg-primary"
    >
      Check Out
    </button>
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

    // const total = ref(0);

    // onMounted(() => {
    //   carts.value.map((cart) => {
    //     return (total.value += quantity.value * cart.price);
    //   });
    // });

    onMounted(() => {
      store.dispatch("getCart");
    });

    return { carts, quantity };
  },
};
</script>

<style></style>
