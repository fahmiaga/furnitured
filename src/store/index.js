import { createStore } from "vuex";
import product from "./modules/product";
import auth from "./modules/auth";
import user from "./modules/user";

const store = createStore({
  modules: {
    product,
    auth,
    user,
  },
});

export default store;
