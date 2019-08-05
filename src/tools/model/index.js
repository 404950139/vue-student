import Vue from "vue";
import toast from "./index.vue";

const Toast = Vue.extend(toast);

const createToast = (duration, msg, type) => {
  const app = new Toast({
    el: document.createElement("div"),
    data: {
      showClass: true,
      over: true,
      msg,
      type
    }
  });
  document.body.appendChild(app.$el);
  setTimeout(_ => {
    app.showClass = false;
  }, 1700);
  setTimeout(_ => {
    app.over = false;
  }, duration);
};

export default createToast;
