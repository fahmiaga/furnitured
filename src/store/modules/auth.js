import axios from "axios";
import router from "../../router";
import { notify } from "@kyvg/vue3-notification";
import { deleteToken } from "../../variables/deleteToken";

const url = "https://furnitured-service.herokuapp.com/api";
// /api

export default {
  state: {
    user: null,
    errorMessage: {},
    status: "",
    test: 0,
    isLoading: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setStatus(state, payload) {
      state.status = payload;
    },
    setErrorMessage(state, payload) {
      state.errorMessage = payload;
    },
    setTes(state, payload) {
      state.test++;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
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
            localStorage.setItem("user", res.data.user.is_admin);
            deleteToken();
            // window.location.replace("/");
            // setTimeout(function () {
            //   localStorage.removeItem("furnitured-token");
            // }, 24 * 60 * 1000);
          }
        })
        .catch((err) => {
          console.log(err.response);
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
            router.push("/login");
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
    async updateUser({ commit, dispatch }, formData) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios
        .post(`${url}/user`, formData, config)
        .then((res) => {
          if (res.status === 200) {
            dispatch("getUser");
            commit("setIsLoading", false);
            notify({
              title: "User profile successfully updated !",
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
