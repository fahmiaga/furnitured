<template>
  <nav
    class="w-full flex justify-between items-center bg-primary text-white font-medium relative pt-7 md:static md:px-16 md:py-3"
  >
    <div class="pl-7">
      <a href="">
        <h2>Furnitured</h2>
      </a>
    </div>
    <div class="block pr-6 md:hidden">
      <button><i class="fas fa-bars"></i></button>
    </div>

    <ul
      class="md:flex flex-col absolute right-0 hidden top-14 gap-1 md:flex-row md:static"
    >
      <li>
        <a
          href=""
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href=""
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          Product
        </a>
      </li>
      <li>
        <a
          href=""
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          Categories
        </a>
      </li>
      <li>
        <a
          href=""
          class="py-1.5 px-3 hover:bg-secondary rounded-full transition ease-out duration-500"
        >
          <i class="fas fa-cart-plus"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style></style>
