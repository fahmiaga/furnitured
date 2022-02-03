import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
const url = "http://127.0.0.1:8000/api";

export default {
  state: {
    products: [],
    productCategory: [],
    categories: [],
    carts: [],
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
  },
  actions: {
    async getProducts({ commit }) {
      await axios
        .get(`${url}/product`)
        .then((res) => {
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
          console.log(res.data);
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
          console.log("cart", res);
        })
        .catch((err) => console.log(err));
    },
  },
};
