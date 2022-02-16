<template>
  <div
    class="w-full h-full bg-gray-300 absolute opacity-70 top-0 left-0 flex justify-center items-center"
  >
    <div
      class="flex justify-center flex-col items-center bg-white w-199 h-72 rounded-md relative"
    >
      <div
        class="w-28 h-28 bg-green-500 rounded-full flex justify-center items-center absolute -top-14"
      >
        <i class="fa-solid fa-check text-7xl text-gray-50"></i>
      </div>
      <div class="flex flex-col items-center text-lg text-center">
        <h1>Success Booking</h1>
        <p>
          Your order successfully booked, please pay the bill so we can process
          your order
        </p>
      </div>
      <div
        class="w-20 h-10 bg-green-500 text-center leading-10 rounded-md mt-5 hover:bg-green-300 cursor-pointer"
        @click="handleClick"
      >
        <p class="text-white">Ok</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const handleClick = () => {
      router.push("/");
    };

    return {
      handleClick,
    };
  },
};
</script>

<style></style>
