import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionApi from "@vue/composition-api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit";
//引入全局
// import Global from "./utils/global.js";
//引入自定义全局组件
import "./icons"

Vue.use(ElementUI);
// Vue.use(Global);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;


new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
