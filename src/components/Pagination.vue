<template>
  <!-- pagination -->
  <div class="flex mt-3">
    <span class="text-sm"
      >page {{ currentPage }} of {{ $store.state.product.page }}</span
    >
    <div
      class="ml-3 cursor-pointer"
      :class="currentPage <= 1 ? 'hidden' : ''"
      @click="handlePrevPage"
    >
      <i class="fa-solid fa-caret-left"></i>
    </div>
    <div class="mx-3">
      <span
        v-for="(page, i) in $store.getters.page"
        @click="handleClick(page)"
        :key="i"
        class="px-3 mx-1 rounded-full cursor-pointer"
        :class="currentPage === page ? 'bg-gray-200' : ''"
        >{{ page }}</span
      >
    </div>
    <div
      class="cursor-pointer"
      :class="currentPage >= $store.state.product.page ? 'hidden' : ''"
      @click="handleNextPage"
    >
      <i class="fa-solid fa-caret-right"></i>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    data: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const store = useStore();
    const page = ref(1);
    const currentPage = ref(1);

    const handleNextPage = () => {
      page.value++;
      store.dispatch(props.data, page.value);
      currentPage.value = page.value;
    };
    const handlePrevPage = () => {
      page.value--;
      store.dispatch(props.data, page.value);
      currentPage.value = page.value;
    };

    const handleClick = (value) => {
      currentPage.value = value;
      store.dispatch(props.data, value);
    };

    return {
      currentPage,
      handleClick,
      handleNextPage,
      handlePrevPage,
    };
  },
};
</script>

<style></style>
