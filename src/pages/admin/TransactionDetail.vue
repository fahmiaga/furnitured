<template>
  <div class="ml-72 mt-8">
    <h1 class="text-4xl font-semibold">Transaction Detail</h1>
    <div class="w-11/12 mt-5 pl-5 py-5 shadow">
      <div v-if="invoices[0]">
        <p>{{ invoices[0].first_name }} {{ invoices[0].last_name }}</p>
        <p class="my-3">{{ invoices[0].email }}</p>
        <p>{{ invoices[0].phone }}</p>
      </div>

      <table class="min-w-max w-full table-auto mt-5">
        <thead>
          <tr
            class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">Name</th>
            <th class="py-3 px-6 text-left">Description</th>
            <th class="py-3 px-6 text-center">Price</th>
            <th class="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr class="border-b border-gray-200 bg-gray-50" v-if="!invoices">
            <td><p>Loading...</p></td>
          </tr>
          <tr
            class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
            v-for="(invoice, i) in invoices"
            :key="i"
          >
            <td class="py-3 px-6 text-left">
              <div class="flex items-center">
                <span class="font-medium">{{ invoice.product_name }}</span>
              </div>
            </td>
            <td class="py-3 px-6 text-left">
              <span
                class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"
                >{{ invoice.description }}</span
              >
            </td>

            <td class="py-3 px-6 text-center">
              <span class="font-semibold">{{
                formatRupiah(invoice.price)
              }}</span>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex item-center justify-center">
                <div
                  class="w-4 mr-2 transform hover:text-secondary cursor-pointer hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import formatRupiah from "../../variables/formatRupiah";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;

    const invoices = computed(() => store.state.product.detailInvoice);

    onMounted(() => {
      store.dispatch("getDetailInvoice", id);
    });

    return { invoices, formatRupiah };
  },
};
</script>

<style></style>
