import { createStore } from "vuex";
import product from "./modules/product";
import auth from "./modules/auth";

const store = createStore({
  modules: {
    product,
    auth,
  },
});

export default store;
