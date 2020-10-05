import Vue from "vue";
import App from "@/App.vue";
import "@/utils/app/registerServiceWorker";
import router from "@/plugins/router";
import store from "@/plugins/store";
import "@/plugins/icons";

import VueToastify from "vue-toastify";

Vue.use(VueToastify, {
  canTimeout: false,
  position: "top-center",
  type: "info",
  withBackdrop: true,
  theme: "light",
  backdrop: "rgba(0, 0, 0, 0.4)",
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
