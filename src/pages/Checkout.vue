<template>
  <div class="flex md:flex-row flex-col mb-5 px-5">
    <div class="md:w-3/5 w-full px-8 py-5">
      <h1 class="mb-4 text-base font-semibold">Checkout</h1>

      <h2>Sent Address</h2>

      <div
        v-if="addresses[currentIndex]"
        class="text-sm w-full border-b border-t pb-2 mt-2"
      >
        <h4 class="font-semibold my-3">{{ addresses[currentIndex].name }}</h4>
        <p class="font-light">{{ addresses[currentIndex].phone }}</p>
        <p class="font-light">
          {{ addresses[currentIndex].address }},
          {{ addresses[currentIndex].province }},

          {{ addresses[currentIndex].sub_district }} <br />
          {{ addresses[currentIndex].city }},
          {{ addresses[currentIndex].district }},
          {{ addresses[currentIndex].zip_code }}
        </p>
      </div>

      <div v-else><h1>Loading...</h1></div>

      <div class="border-b-8 pt-4 pb-8 flex items-center justify-between">
        <label for="" class="text-lg font-medium w-56">Select Location</label>
        <select
          v-model="recipient_id"
          id=""
          class="w-full mt-3 focus:outline-none"
          @change="setId"
        >
          <option value="o">Select where to send</option>
          <option
            v-for="(address, i) in addresses"
            :value="{ id: address.id, index: i }"
            :key="address.id"
          >
            {{ address.city }}
          </option>
        </select>
      </div>
      <div
        class="border-b-8 mt-4 py-4"
        v-for="(cart, i) in carts"
        :key="cart.id"
      >
        <form action="" class="flex justify-between">
          <div class="flex w-3/6">
            <img
              :src="
                cart.images[0]
                  ? `http://127.0.0.1:8000${cart.images[0].url}`
                  : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
              "
              alt=""
              class="w-16 h-16"
            />
            <div class="ml-8 font-light">
              <p>{{ cart.name }}</p>
              <p>
                {{ cart.quantity }} {{ cart.quantity > 1 ? "items" : "item" }}
              </p>
              <p>{{ formatRupiah(cart.price * cart.quantity) }}</p>
            </div>
          </div>
          <div class="w-3/6 h-28">
            <div class="flex flex-col w-full">
              <label for="">Select Courier</label>
              <div
                class="px-4 py-2 rounded-lg text-white flex items-center justify-around cursor-pointer"
                :class="
                  recipient_id === 0
                    ? 'bg-gray-300 pointer-events-none'
                    : 'bg-secondary'
                "
                @click="
                  modalHandler(true);
                  handleShipping(cart.cart_id, i);
                "
              >
                <p>
                  {{
                    JSON.parse(cart.courier) == 0 ||
                    JSON.parse(cart.courier) == null
                      ? "Click to select"
                      : `${JSON.parse(cart.courier).desc} - ${formatRupiah(
                          JSON.parse(cart.courier).cost
                        )}`
                  }}
                </p>
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
          </div>
        </form>

        <div class="border-t-2 px-20 flex justify-between items-center">
          <h1 class="mt-3 font-bold">Subtotal</h1>
          <h2 class="mt-3 font-semibold">
            {{
              formatRupiah(
                cart.price * cart.quantity + parseInt(cart.shipping_cost)
              )
            }}
          </h2>
        </div>
      </div>
    </div>
    <div
      class="p-5 bg-gray-200 rounded-md overflow-visible h-60 md:w-2/5 w-full mt-5"
    >
      <span class="text-xl font-medium text-gray-700 block pb-3">Summary</span>
      <div class="text-gray-700 font-medium">
        Total : {{ formatRupiah($store.getters.total) }}
      </div>

      <div class="flex items-center mt-5">
        <input type="radio" v-model="payment_method" value="bank_transfer" />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png"
          alt="bca"
          class="w-20 pl-3"
        />
      </div>
      <span class="text-xs text-red-600"
        >we're sorry for now we just serve for bca only</span
      >

      <button
        type="submit"
        class="h-12 w-full mt-9 bg-secondary rounded focus:outline-none text-white hover:bg-primary"
        @click="handleSubmit"
      >
        Check Out
      </button>
    </div>
  </div>

  <!-- Code block starts -->

  <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->
  <div
    class="py-14 h-full w-full overflow-hidden bg-gray-600 bg-opacity-20 transition duration-150 ease-in-out z-10 absolute top-0 bottom-0"
    v-if="modal"
    id="modal"
  >
    <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
      <div
        class="relative py-8 px-5 md:px-10 bg-gray-300 shadow-md rounded border border-gray-400"
      >
        <div class="w-full flex justify-start text-gray-600 mb-3">
          <h1 class="text-xl font-semibold">Shipping Options</h1>
        </div>
        <div v-if="!costs.length < 1">
          <div class="h-96 mb-3 main-shipping">
            <div
              class="relative mb-5 mt-2 bg-gray-50 w-199 py-2 px-3 rounded-md"
              v-for="(cost, i) in costs"
              :key="i"
            >
              <div>
                <h1 class="text-lg font-semibold">{{ cost[0].name }}</h1>
                <div
                  class="border rounded-md px-3 py-2 mt-1 cursor-pointer hover:border-secondary border-l-8"
                  :class="
                    cost_.description === currentCost
                      ? 'border-secondary border-l-8'
                      : ''
                  "
                  v-for="(cost_, i) in cost[0].costs"
                  :key="i"
                  @click="
                    handleCurrentCost(
                      cost_.description,
                      cost_.cost[0].value,
                      cost[0].name
                    )
                  "
                >
                  <div class="flex justify-between">
                    <p>{{ cost_.description }}</p>

                    <p class="text-secondary font-semibold">
                      {{ formatRupiah(cost_.cost[0].value) }}
                    </p>
                  </div>
                  <span class="text-xs text-gray-400"
                    >Arrived estimation in {{ cost_.cost[0].etd }} days</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-start w-full">
            <button
              @click="handleCost"
              class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
            >
              Submit
            </button>
            <button
              class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              @click="
                resetShipping();
                modalHandler(false);
              "
            >
              Cancel
            </button>
          </div>
          <button
            class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            @click="
              resetShipping();
              modalHandler(false);
            "
            aria-label="close modal"
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div v-else>
          <h1>Loading...</h1>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script>
import Footer from "../components/Footer.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref, reactive } from "vue";
import formatRupiah from "../variables/formatRupiah";
import { notify } from "@kyvg/vue3-notification";
export default {
  components: {
    Footer,
  },

  setup() {
    const store = useStore();
    const addresses = computed(() => store.state.user.address);
    const carts = computed(() => store.state.product.carts);
    const costs = computed(() => store.state.product.costs);
    const shippingStatus = computed(() => store.state.product.shippingStatus);
    const currentIndex = ref(0);

    const recipient_id = ref(0);
    const cart_id = ref();

    const service = reactive({ parent_id: [] });

    const currentId = ref("");

    const style = ref("");

    const modal = ref(false);
    const costPrice = ref(0);
    const courier = ref({ name: "", desc: "", cost: "" });

    const currentCost = ref("");
    const payment_method = ref("");

    const handleCurrentCost = (curr, cost, name) => {
      currentCost.value = curr;
      costPrice.value = cost;
      courier.value = {
        name: name,
        desc: curr,
        cost: cost,
      };
      console.log("name =>", courier.value);
    };

    const setId = () => {
      currentIndex.value = recipient_id.value.index;
      store.dispatch("getAddress");
    };

    const handleShipping = (id) => {
      cart_id.value = id;
      store.dispatch("checkShipping", {
        recipient_id: recipient_id.value.id,
        cart_id: id,
      });
      if (shippingStatus.value === 200) {
        currentId.value = id;
      }
    };

    const resetShipping = () => {
      store.dispatch("checkCost", {
        cart_id: cart_id.value,
        cost: 0,
      });
      store.commit("setCost", []);
      currentCost.value = "";
    };

    const handleCost = () => {
      store.dispatch("checkCost", {
        cart_id: cart_id.value,
        cost: costPrice.value,
        courier: courier.value,
      });
      modal.value = false;
    };

    const handleSubmit = () => {
      const avail = carts.value.some((val) => val.shipping_cost == 0);

      if (avail) {
        notify({
          type: "error",
          title: "You have to select courier first !",
        });
      } else {
        store.dispatch("buyProduct", { payment_method: payment_method.value });
      }
    };

    onMounted(() => {
      store.dispatch("getAddress", currentIndex.value);
    });

    function modalHandler(val) {
      modal.value = val;
    }

    return {
      handleSubmit,
      addresses,
      setId,
      currentIndex,
      recipient_id,
      carts,
      cart_id,
      courier,
      costs,
      handleShipping,
      shippingStatus,
      service,
      modalHandler,
      currentId,
      style,
      modal,
      resetShipping,
      currentCost,
      handleCurrentCost,
      costPrice,
      handleCost,
      formatRupiah,
      payment_method,
    };
  },
};
</script>

<style scoped>
.main-shipping {
  overflow: hidden;
}

.main-shipping:hover {
  overflow-y: auto;
}

::-webkit-scrollbar-thumb {
  background: #b9b9b9;
  border-radius: 20px;
}

::-webkit-scrollbar {
  width: 10px;
}
</style>
