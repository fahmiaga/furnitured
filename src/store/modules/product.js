import axios from "axios";

const url = "http://127.0.0.1:8000/api";

export default {
  state: {
    products: [],
    productCategory: [],
    categories: [],
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
  },
};
