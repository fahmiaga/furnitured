import axios from "axios";

const url = "http://127.0.0.1:8000/api";

export default {
  state: {
    products: [],
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload;
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
  },
};
