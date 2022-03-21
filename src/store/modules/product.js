import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import router from "../../router";
import Swal from "sweetalert2";
const url = "https://furnitured-service.herokuapp.com/api";

export default {
  state: {
    products: [],
    product: [],
    productCategory: [],
    categories: [],
    carts: [],
    quantity: 0,
    costs: [],
    shippingStatus: 0,
    listProducts: [],
    page: 0,
    modal: false,
    idProduct: 0,
    invoice: [],
    detailInvoice: [],
    isLoading: false,
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload;
    },
    setCategory(state, payload) {
      state.categories = payload;
    },
    setProductCategory(state, payload) {
      state.productCategory = payload;
    },
    setCart(state, payload) {
      state.carts = payload;
    },
    setQuantity(state, payload) {
      state.quantity = payload;
    },
    setCost(state, payload) {
      state.costs = payload;
    },
    setShippingStatus(state, payload) {
      state.shippingStatus = payload;
    },
    setPage(state, payload) {
      state.page = payload;
    },
    setModal(state, value) {
      state.modal = value;
    },
    setIdProduct(state, value) {
      state.idProduct = value;
    },
    getProduct(state, payload) {
      state.product = payload;
    },
    setInvoice(state, payload) {
      state.invoice = payload;
    },
    setDetailInvoice(state, payload) {
      state.detailInvoice = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  getters: {
    subtotal: (state) => {
      return state.carts.reduce(
        (acc, val) => acc + val.quantity * val.price,
        0
      );
    },
    total: (state) => {
      return state.carts.reduce(
        (acc, val) =>
          acc + val.quantity * val.price + parseInt(val.shipping_cost),
        0
      );
    },
    carts: (state) => state.carts,

    page: (state) => {
      let totalPage = [];
      for (let i = 0; i < state.page; i++) {
        totalPage.push(i + 1);
      }
      return totalPage;
    },
  },
  actions: {
    async getProducts({ state, commit }, currentPage) {
      await axios
        .get(`${url}/product?page=${currentPage}`)
        .then((res) => {
          if (res.status === 200) {
            commit("setPage", res.data.totalPage);
            commit("setProduct", res.data.data.reverse());

            if (
              !state.listProducts.some((val) => val.id === res.data.data[0].id)
            ) {
              state.listProducts.push(...res.data.data);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getProduct({ commit }, id) {
      await axios
        .get(`${url}/product/${id}`)
        .then((res) => {
          // commit("setProduct", res.data.data);
          commit("getProduct", res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async postProduct({ commit }, formData) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .post(`${url}/product`, formData, config)
        .then((res) => {
          if (res.status === 201) {
            commit("setIsLoading", false);
            router.push("/admin/products");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }

          // commit("setProduct", res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async putProduct(
      { commit },
      { name, price, description, weight, category_id, quantity, id }
    ) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios
        .put(
          `${url}/product/${id}`,
          { name, price, description, weight, category_id, quantity },
          config
        )
        .then((res) => {
          router.push("/admin/products");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
          // commit("setProduct", res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async deleteProduct({ dispatch }, id) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${url}/product/${id}`, config)
            .then((res) => {
              dispatch("getProducts");
              Swal.fire("Deleted!", "Product been deleted.", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },

    async postImage({ dispatch }, { data, id }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .post(`${url}/image/${id}`, data, config)
        .then((res) => {
          dispatch("getProduct", id);
          Swal.fire("Success!", "Image has been added.", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async deleteImage({ dispatch }, { id, idImage }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${url}/image/${idImage}`, config)
            .then((res) => {
              dispatch("getProduct", id);
              Swal.fire("Deleted!", "Image been deleted.", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },

    async getCategory({ commit }) {
      await axios
        .get(`${url}/category`)
        .then((res) => {
          commit("setCategory", res.data.data);
        })
        .catch((err) => {});
    },
    async postCategory({ dispatch, commit }, { category_name }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .post(`${url}/category`, { category_name }, config)
        .then((res) => {
          dispatch("getCategory");
          // commit("setCategory", res.data.data);
        })
        .catch((err) => {});
    },
    async putCategory({ dispatch, commit }, { category_name, id }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .put(`${url}/category/${id}`, { category_name }, config)
        .then((res) => {
          dispatch("getCategory");
          // commit("setCategory", res.data.data);
        })
        .catch((err) => {});
    },
    async deleteCategory({ dispatch, commit }, id) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .delete(`${url}/category/${id}`, config)
        .then((res) => {
          dispatch("getCategory");
          // commit("setCategory", res.data.data);
        })
        .catch((err) => {});
    },

    async getProductByCategory({ commit }, id) {
      await axios
        .get(`${url}/product/category/${id}`)
        .then((res) => {
          commit("setProductCategory", res.data.data);
        })
        .catch((err) => {});
    },

    async addToCart({ commit, dispatch }, { product_id, user_id, quantity }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .post(`${url}/cart`, { product_id, user_id, quantity }, config)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            dispatch("getCart", config);
            notify({
              title: "Cart successfully updated",
            });
          }
        })
        .catch((err) => console.log(err));
    },
    async getCart({ commit }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .get(`${url}/cart`, config)
        .then((res) => {
          commit("setCart", res.data.data);
        })
        .catch((err) => console.log(err));
    },
    async deleteCart({ commit, dispatch }, id) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .delete(`${url}/cart/${id}`, config)
        .then((res) => {
          // commit("setCart", res.data.data);
          dispatch("getCart", config);
          notify({
            title: "Cart successfully deleted",
          });
        })
        .catch((err) => console.log(err));
    },
    async updateCart({ dispatch, getters }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios
        .post(`${url}/order/checkorder`, getters.carts, config)
        .then((res) => {
          if (res.status === 200) {
            router.push("/checkout");
            dispatch("getCart", config);
          }
        })
        .catch((err) => console.log(err));
    },
    async checkShipping({ commit }, { recipient_id, cart_id }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios
        .post(`${url}/recipient/shipping`, { recipient_id, cart_id }, config)
        .then((res) => {
          if (res.status === 200) {
            commit("setCost", res.data);
            commit("setShippingStatus", res.status);
          }
        })
        .catch((err) => console.log(err));
    },
    async checkCost({ commit, dispatch }, { cart_id, cost, courier }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios
        .post(`${url}/recipient/check-cost`, { cart_id, cost, courier }, config)
        .then((res) => {
          if (res.status === 200) {
            dispatch("getCart");
            // commit("setCost", res.data);
            // commit("setShippingStatus", res.status);
          }
        })
        .catch((err) => console.log(err));
    },

    buyProduct({ commit, dispatch }, { payment_method }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .post(`${url}/payment/product`, { payment_method }, config)
        .then((res) => {
          console.log(res.data.result.va_numbers);
          if (res.status === 200) {
            dispatch("getCart");
            router.push("/payment-success");
          }
        })
        .catch((err) => console.log(err));
    },

    getInvoices({ commit }, currentPage) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .get(`${url}/invoice?page=${currentPage}`, config)
        .then((res) => {
          if (res.status === 200) {
            commit("setPage", res.data.data.last_page);
            commit("setInvoice", res.data.data.data.reverse());
          }
        })
        .catch((err) => console.log(err));
    },
    getDetailInvoice({ commit }, id) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .get(`${url}/order/${id}`, config)
        .then((res) => {
          if (res.status === 200) {
            commit("setDetailInvoice", res.data.data);
          }
        })
        .catch((err) => console.log(err));
    },
    searchProduct({ commit }, { keyword, category_id }) {
      let tempId = category_id;

      if (category_id === undefined) {
        tempId = "";
      }

      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .get(`${url}/product-filter?name=${keyword}&id=${tempId}`, config)
        .then((res) => {
          if (res.status === 200) {
            commit("setProduct", res.data.data);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
