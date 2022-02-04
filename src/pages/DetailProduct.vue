<template>
  <div class="flex w-full md:flex-row flex-col px-12 my-3">
    <Gallery />
    <ProductInfo />
    <!-- <div class="w-6/12 h-28 bg-gray-800">gallery</div> -->
    <!-- <div class="w-6/12 h-28 bg-red-800">cart</div> -->
  </div>
  <Footer />
</template>

<script>
import Gallery from "../components/Gallery.vue";
import ProductInfo from "../components/ProductInfo.vue";
import Footer from "../components/Footer.vue";
export default {
  components: { Gallery, ProductInfo, Footer },
};
</script>

<style></style>
