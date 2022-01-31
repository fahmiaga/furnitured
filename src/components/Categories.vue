<template>
  <div class="w-full md:px-20 mt-24 flex flex-col md:flex-row">
    <div class="w-1/4 hidden md:inline-block">
      <h2 class="text-xl font-semibold">
        Our ----- <br />
        Categories
      </h2>
      <div class="text-gray-500 mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quasi
        voluptatibus modi ratione ex explicabo.
      </div>
      <a
        href=""
        class="px-3 py-2 w-22 rounded-full bg-secondary hover:bg-orange-200 transition ease-linear duration-500 text-white"
        >View More</a
      >
    </div>

    <!-- mobile -->
    <div class="text-center inline-block md:hidden mb-8">
      <h2 class="text-xl font-semibold">Our Categories</h2>
      <div class="text-gray-500 mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quasi
        voluptatibus modi ratione ex explicabo.
      </div>
      <a
        href=""
        class="px-3 py-2 w-22 rounded-full bg-secondary hover:bg-orange-200 transition ease-linear duration-500 text-white"
        >View More</a
      >
    </div>

    <div class="w-full">
      <ul class="flex flex-nowrap justify-around md:mb-4 text-gray-500">
        <li>
          <a
            href=""
            class="outline-none hover:border-gray-700 border-transparent border-b-2 hover:border-current"
            >All</a
          >
        </li>
        <li>
          <a
            href=""
            class="outline-none hover:border-gray-700 border-transparent border-b-2 hover:border-current"
            >Table</a
          >
        </li>
        <li>
          <a
            href=""
            class="outline-none hover:border-gray-700 border-transparent border-b-2 hover:border-current"
            >Chair</a
          >
        </li>
        <li>
          <a
            href=""
            class="outline-none hover:border-gray-700 border-transparent border-b-2 hover:border-current"
            >Wardrobe</a
          >
        </li>
        <li>
          <a
            href=""
            class="outline-none hover:border-gray-700 border-transparent border-b-2 hover:border-current"
            >Drawer</a
          >
        </li>
        <li>
          <a
            href=""
            class="outline-none hover:border-gray-700 border-transparent border-b-2 hover:border-current"
            >Mirror</a
          >
        </li>
        <li>
          <a
            href=""
            class="outline-none hover:border-gray-700 border-transparent border-b-2 hover:border-current"
            >Bookshelf</a
          >
        </li>
      </ul>
      <div class="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-3">
        <div class="card">
          <img
            src="../assets/img/bm0488s_oak_oil_cane_front.png"
            alt="kursi"
            class="w-2/4 h-2/5 mx-auto mt-10"
          />
          <div class="flex px-10 items-center mt-5">
            <div class="w-3/4 mt-5">
              <h2 class="font-semibold mb-2">Oakly Table</h2>
              <p class="md:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,
                corrupti.
              </p>
            </div>
            <h1 class="pl-8 text-2xl font-medium">$50</h1>
          </div>
        </div>
        <div class="card my-3 md:mt-0">
          <img
            src="../assets/img/ch26-eg-saebe-natur-flet.png"
            alt="kursi"
            class="w-2/4 h-2/5 mx-auto mt-10"
          />
          <div class="flex px-10 items-center mt-5">
            <div class="w-3/4 mt-5">
              <h2 class="font-semibold mb-2">Oakly Chair</h2>
              <p class="md:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,
                corrupti.
              </p>
            </div>
            <h1 class="pl-8 text-2xl font-medium">$40</h1>
          </div>
        </div>
        <div class="card">
          <img
            src="../assets/img/wooden-chair-500x500.png"
            alt="kursi"
            class="w-2/4 h-2/5 mx-auto mt-10"
          />
          <div class="flex px-10 items-center mt-5">
            <div class="w-3/4 mt-5">
              <h2 class="font-semibold mb-2">Oakly Bench</h2>
              <p class="md:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,
                corrupti.
              </p>
            </div>
            <h1 class="pl-8 text-2xl font-medium">$75</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
