import Vue from "vue";
import Vuex from "vuex";
import App from "./app";
import Login from "./login";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        App,
        Login
    }
});
