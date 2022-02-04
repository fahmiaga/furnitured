<template>
  <div class="flex w-full md:flex-row flex-col px-12 my-3">
    <Cart />
    <Summary />
  </div>
  <Footer />
</template>

<script>
import Cart from "../components/Cart.vue";
import Summary from "../components/Summary.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Cart,
    Summary,
    Footer,
  },
};
</script>

<style></style>
