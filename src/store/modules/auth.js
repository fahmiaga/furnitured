import axios from "axios";

const url = "http://127.0.0.1:8000/api";

export default {
  state: {
    user: null,
    errorMessage: {},
    status: "",
    test: 0,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setStatus(state, payload) {
      state.status = payload;
      console.log("status state change:", state.status);
    },
    setErrorMessage(state, payload) {
      state.errorMessage = payload;
      console.log("errorMessage state change:", state.errorMessage);
    },
    setTes(state, payload) {
      state.test++;
    },
  },
  actions: {
    async postLogin({ commit }, { email, password }) {
      await axios
        .post(`${url}/login`, { email, password })
        .then((res) => {
          if (res.data.token) {
            commit("setStatus", res.status);
            localStorage.setItem("furnitured-token", res.data.token);
            window.location.replace("/");
          }
        })
        .catch((err) => {
          if (err.response.status === 422) {
            commit("setErrorMessage", err.response.data.error);
          } else {
            commit("setErrorMessage", err.response.data.message);
          }
          commit("setStatus", err.response.status);
        });

      commit("setUser", { email, password });
    },

    async postRegister({ commit }, { name, email, password }) {
      await axios
        .post(`${url}/register`, { name, email, password })
        .then((res) => {
          if (res.status === 201) {
            window.location.replace("/login");
          }

          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data.error);
          commit("setErrorMessage", err.response.data.error);
          //commit("setError", err.response.status);
        });
    },
  },
};
