import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import router from "../../router";
const url = "http://127.0.0.1:8000/api";

export default {
  state: {
    products: [],
    productCategory: [],
    categories: [],
    carts: [],
    quantity: 0,
    costs: [],
    shippingStatus: 0,
    listProducts: [],
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
      console.log("carts =>", state.carts);
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
    // setListProducts(state, payload) {
    //   state.listProducts.push(res.data.data);
    // },
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
  },
  actions: {
    async getProducts({ state, commit }, currentPage) {
      await axios
        .get(`${url}/product?page=${currentPage}`)
        .then((res) => {
          state.listProducts.push(res.data.data);
          commit("setProduct", res.data.data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getProduct({ commit }, id) {
      await axios
        .get(`${url}/product/${id}`)
        .then((res) => {
          commit("setProduct", res.data.data);
        })
        .catch((err) => {
          console.log(err);
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
          console.log(res);
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
          console.log("shipping check => ", res.data);
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
          console.log("payment => ", res);
          if (res.status === 200) {
            dispatch("getCart");
            router.push("/payment-success");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
