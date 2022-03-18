<template>
  <div>
    <div
      class="w-full h-screen z-10 bg-bgTransparent fixed top-0 left-0 flex items-center"
    >
      <div class="w-3/4 h-4/5 mx-auto bg-white relative rounded-md">
        <div
          class="absolute w-7 h-7 top-0 right-0 cursor-pointer"
          @click="handleClose"
        >
          <i class="fa-solid fa-xmark text-gray-600 font-semibold text-xl"></i>
        </div>
        <div class="mt-6 mb-2 ml-6">
          <h1 class="font-semibold text-xl">{{ product.name }}</h1>
        </div>
        <div class="w-full flex">
          <div class="w-2/4 ml-2">
            <div v-if="product.images < 1" class="ml-5 mt-10 w-52">
              <p>No image available !</p>
            </div>
            <div class="w-full grid grid-cols-3 gap-3" v-else>
              <div
                v-for="image in product.images"
                :key="image.image_id"
                class="cursor-pointer transform hover:scale-105"
                @click="handleModal(image.url)"
              >
                <img
                  :src="`${image.url}`"
                  alt=""
                  class="w-36 h-28 rounded-md border-2"
                />
              </div>
            </div>
          </div>

          <div class="w-2/4 px-3">
            <div class="mb-3">
              <label class="font-semibold text-sm text-gray-400"
                >Description</label
              >
              <p>{{ product.description }}</p>
            </div>
            <div class="mb-3">
              <label class="font-semibold text-sm text-gray-400">Price</label>
              <p>{{ formatRupiah(product.price) }}</p>
            </div>
            <div class="mb-3">
              <label class="font-semibold text-sm text-gray-400"
                >Quantity</label
              >
              <p>{{ product.quantity }}</p>
            </div>
            <div class="mb-3">
              <label class="font-semibold text-sm text-gray-400">Weight</label>
              <p>{{ product.weight }} gram</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- picture modal -->
  <div
    class="w-full h-full absolute top-0 right-0 z-20 bg-bgTransparent"
    v-if="isModalOpen"
  >
    <div class="w-2/4 mx-auto mt-6 relative">
      <div
        class="cursor-pointer w-7 h-7 z-30 absolute right-0"
        @click="handleModalClose"
      >
        <i class="fa-solid fa-xmark text-gray-400 font-semibold text-xl"></i>
      </div>
      <img :src="`${imagePreview}`" alt="" class="w-full h-3/4" />
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

    const product = computed(() => store.state.product.product);
    const id = computed(() => store.state.product.idProduct);
    const modal = computed(() => store.state.product.modal);
    const isModalOpen = ref(false);
    const imagePreview = ref("");

    onMounted(() => {
      store.dispatch("getProduct", id.value);
    });

    const handleModal = (image) => {
      isModalOpen.value = true;
      imagePreview.value = image;
      console.log("modal =>", imagePreview.value);
    };

    const handleClose = () => {
      store.commit("setModal", false);
    };

    const handleModalClose = () => {
      isModalOpen.value = false;
    };

    return {
      handleClose,
      product,
      modal,
      isModalOpen,
      handleModal,
      imagePreview,
      handleModalClose,
      formatRupiah,
    };
  },
};
</script>

<style></style>
