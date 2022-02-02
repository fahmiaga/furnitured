<template>
  <!-- <Navbar /> -->
  <Jumbotron />
  <Product />
  <Categories />
  <Hero />
  <Footer />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Jumbotron from "../components/Jumbotron.vue";
import Product from "../components/Product.vue";
import Categories from "../components/Categories.vue";
import Hero from "../components/Hero.vue";
import Footer from "../components/Footer.vue";
export default {
  components: { Navbar, Jumbotron, Product, Categories, Hero, Footer },
  setup() {},
};
</script>

<style></style>
