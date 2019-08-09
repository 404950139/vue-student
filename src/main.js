// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./assets/css/index.css";
import store from "./store";
import api from "./api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import toast from "./tools/model/index.js";
import myCharts from "./tools/echarts/echarts.js";

Vue.use(myCharts);
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$toast = toast;
Vue.prototype.$api = api;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
