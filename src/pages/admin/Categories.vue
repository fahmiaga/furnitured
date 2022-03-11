<template>
  <div class="ml-72 mt-8">
    <h1 class="text-4xl font-semibold">Categories</h1>
    <div class="w-11/12 mt-5 pl-5 py-5 shadow">
      <button
        @click="isOpen = true"
        class="bg-blue-300 px-3 py-2 mb-7 rounded-md text-gray-600 hover:bg-blue-200"
      >
        <i class="fa-solid fa-plus"></i> Add New Category
      </button>

      <div v-if="isOpen">
        <div class="flex items-center">
          <div
            class="f-outline px-2 relative border rounded-lg focus-within:border-gray-500 w-96 mb-3"
          >
            <input
              type="text"
              v-model="category_name"
              placeholder=" "
              class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
            />
            <label
              for="name"
              class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0"
              >Name</label
            >
          </div>

          <div class="pl-4 cursor-pointer" @click="isOpen = false">
            <i class="fa-solid fa-xmark text-2xl"></i>
          </div>
        </div>
        <button
          @click="handleAdd"
          class="bg-blue-300 px-3 py-2 mb-7 rounded-md text-gray-600 hover:bg-blue-200"
        >
          <i class="fa-solid fa-plus"></i> Submit
        </button>
      </div>

      <table class="min-w-max w-full table-auto">
        <thead>
          <tr
            class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">Name</th>
            <th class="py-3 px-6 text-center">action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr class="border-b border-gray-200 bg-gray-50" v-if="!categories">
            <td><p>Loading...</p></td>
          </tr>
          <tr
            class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
            v-for="category in categories"
            :key="category.id"
          >
            <td class="py-3 px-6 text-left">
              <div class="flex items-center">
                <span>{{ category.category_name }}</span>
              </div>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex item-center justify-center">
                <div
                  class="w-4 mr-2 transform hover:text-secondary cursor-pointer hover:scale-110"
                  @click="handleEdit(category.category_name, category.id)"
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <div
                  class="w-4 mr-2 transform hover:text-secondary cursor-pointer hover:scale-110"
                  @click="handleDelete(category.id)"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const isOpen = ref(false);
    const isEdit = ref(false);
    const idCate = ref(0);

    const categories = computed(() => store.state.product.categories);

    const category_name = ref("");

    const handleAdd = () => {
      if (isEdit.value) {
        store.dispatch("putCategory", {
          category_name: category_name.value,
          id: idCate.value,
        });
      } else {
        store.dispatch("postCategory", {
          category_name: category_name.value,
        });
      }
      category_name.value = "";
    };

    const handleDelete = (id) => {
      store.dispatch("deleteCategory", id);
    };

    const handleEdit = (value, id) => {
      idCate.value = id;
      category_name.value = value;
      isOpen.value = true;
      isEdit.value = true;
    };

    onMounted(() => {
      store.dispatch("getCategory");
    });

    return {
      categories,
      isOpen,
      handleAdd,
      handleDelete,
      category_name,
      handleEdit,
    };
  },
};
</script>

<style></style>
