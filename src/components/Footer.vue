<template>
  <footer class="bg-primary text-white">
    <div class="flex flex-col md:flex-row justify-around md:py-16 py-12 px-5">
      <div class="mb-3 md:mb-0">
        <h1 class="text-6xl">Furnitured</h1>
        <h2 class="uppercase text-lg">Headquarters</h2>
        <p>Komp. Taman Setia Budi Indah No.29, Bogor , Jawa Barat</p>
      </div>
      <div class="mb-3 md:mb-0">
        <ul>
          <li class="font-semibold"><h3>Menu</h3></li>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'ListProduct' }">Product</router-link>
          </li>
        </ul>
      </div>
      <div class="mb-3 md:mb-0">
        <ul>
          <li class="font-semibold"><h3>Contact Us</h3></li>
          <li>+6261 787 877</li>
          <li>furnitured.com</li>
          <li>support@furnitured.com</li>
        </ul>
      </div>
      <div>
        <ul>
          <li class="font-semibold">
            <h3>Social Media</h3>
          </li>
          <li class="text-xl">
            <a href=""><i class="fab fa-twitter"></i></a>
            <a href="" class="px-4"><i class="fab fa-facebook-square"></i></a>
            <a href=""><i class="fab fa-instagram"></i></a>
          </li>
        </ul>
      </div>
    </div>

    <p class="text-center">Powered By Furnitured</p>
  </footer>
</template>

<script>
export default {};
</script>

<style></style>
