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
          console.log(res);
          if (res.data.token) {
            commit("setStatus", res.status);
            localStorage.setItem("furnitured-token", res.data.token);
            localStorage.setItem("user", res.data.user.id);
            // window.location.replace("/");
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
    },

    async postRegister(
      { commit },
      { first_name, last_name, phone, email, password }
    ) {
      await axios
        .post(`${url}/register`, {
          first_name,
          last_name,
          phone,
          email,
          password,
        })
        .then((res) => {
          if (res.status === 201) {
            window.location.replace("/login");
          }
        })
        .catch((err) => {
          console.log(err.response.data.error);
          commit("setErrorMessage", err.response.data.error);
          //commit("setError", err.response.status);
        });
    },
    async getUser({ commit }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .get(`${url}/user`, config)
        .then((res) => {
          commit("setUser", res.data.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
