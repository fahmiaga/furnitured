<template>
  <div class="md:w-1/2 w-full mr-5">
    <div class="flex flex-col">
      <div v-if="product.images">
        <img
          :src="
            product.images[0]
              ? `http://127.0.0.1:8000${product.images[currentImage].url}`
              : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
          "
          alt=""
          class="w-full h-96"
        />
      </div>
      <h2 v-else>Loading...</h2>
    </div>
    <div
      class="h-40 sm:w-full overflow-hidden whitespace-nowrap mt-10 img-navigation"
    >
      <div
        v-for="(image, i) in product.images"
        :key="i"
        class="inline-block w-36 h-32 mt-2 mx-3 cursor-pointer"
        @click="handleImage(i)"
      >
        <img
          :src="`http://127.0.0.1:8000${product.images[i].url}`"
          alt=""
          class="w-36 h-32"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRoute();

    const product = computed(() => store.state.product.product);
    const currentImage = ref(0);

    const id = router.params.id;

    const handleImage = (i) => {
      currentImage.value = i;
    };

    onMounted(async () => {
      store.dispatch("getProduct", id);
    });

    return {
      product,
      handleImage,
      currentImage,
    };
  },
};
</script>

<style scoped>
.img-navigation {
  overflow: hidden;
}

.img-navigation:hover {
  overflow-x: auto;
}

::-webkit-scrollbar-thumb {
  background: #b9b9b9;
  border-radius: 20px;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
</style>
