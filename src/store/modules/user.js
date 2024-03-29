import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
const url = "http://127.0.0.1:8000/api";
import router from "../../router";

export default {
  state: {
    provinces: [],
    cities: [],
    address: [],
    status: 0,
  },
  mutations: {
    setProvince (state, payload) {
      state.provinces = payload;
    },
    setCity (state, payload) {
      state.cities = payload;
    },
    setAddress (state, payload) {
      state.address = payload;
    },
  },

  actions: {
    async getProvinces ({ commit }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .get(`${url}/province`, config)
        .then((res) => {
          commit("setProvince", res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getCities ({ commit }, id) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .get(`${url}/city/${id}`, config)
        .then((res) => {
          commit("setCity", res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async postRecipient (
      { dispatch },
      {
        recipient,
        address,
        province_id,
        city_id,
        phone,
        district,
        sub_district,
        zip_code,
      }
    ) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios
        .post(
          `${url}/recipient`,
          {
            recipient,
            address,
            province_id,
            city_id,
            phone,
            district,
            sub_district,
            zip_code,
          },
          config
        )
        .then((res) => {
          dispatch("getAddress", config);
          if (res.status === 201) {
            notify({
              title: "Address successfully added !",
            });
            router.push("/setting/address");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async putRecipient (
      { dispatch },
      {
        recipient,
        address,
        province_id,
        city_id,
        phone,
        district,
        sub_district,
        zip_code,
        id,
      }
    ) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios
        .put(
          `${url}/recipient/${id}`,
          {
            recipient,
            address,
            province_id,
            city_id,
            phone,
            district,
            sub_district,
            zip_code,
          },
          config
        )
        .then((res) => {
          dispatch("getAddress", config);
          if (res.status === 200) {
            notify({
              title: "Address successfully updated !",
            });
            router.push("/setting/address");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getAddress ({ commit }) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .get(`${url}/recipient`, config)
        .then((res) => {
          commit("setAddress", res.data.data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getAddressById ({ dispatch, commit }, id) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .get(`${url}/recipient/${id}`, config)
        .then((res) => {
          commit("setAddress", res.data.data);
          if (res.status === 200) {
            dispatch("getCities", res.data.data.province_id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async deleteAddress ({ commit, dispatch }, id) {
      const token = localStorage.getItem("furnitured-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .delete(`${url}/recipient/${id}`, config)
        .then((res) => {
          if (res.status === 200) {
            dispatch("getAddress", config);
            notify({
              title: "Address successfully deleted !",
            });
          }
          // commit("setAddress", res.data.data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
