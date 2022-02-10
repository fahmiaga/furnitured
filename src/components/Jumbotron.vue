<template>
  <div
    class="w-full h-72 bg-primary text-white font-medium flex flex-col items-center md:flex-row md:justify-between md:px-36 md:items-baseline"
  >
    <div class="w-full pt-6 text-center md:w-1/2 md:text-left">
      <h1 class="uppercase text-2xl font-semibold mb-2.5">
        Discover <br />
        Best Furniture <br />
        for your house
      </h1>
      <p class="mb-10 text-xs md:px-0 px-9">
        Change the look of your house, change the perspective of others, leave
        lorem ipsum due cars to page in to yours lorem ipsum it to us we'll not
        disappoint you.
      </p>
      <div
        @click="handleScroll"
        class="px-3 cursor-pointer py-2 w-22 rounded-full bg-secondary hover:bg-black hover:bg-opacity-5 transition ease-linear duration-100 hidden md:inline-block"
      >
        View More
      </div>
    </div>
    <div class="w-full md:w-1/2 relative">
      <img
        src="../assets/img/jumbotron-desk.png"
        alt="desk"
        class="md:w-4/5 md:right-0 md:-top-14 right-36 -top-5 w-48 absolute"
      />
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const handleScroll = () => {
      window.scrollTo(440, 440);
    };
    console.log("scroll =>", window.scrollY);
    return { handleScroll };
  },
};
</script>

<style></style>
