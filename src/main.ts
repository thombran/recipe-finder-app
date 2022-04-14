/* eslint-disable vue/multi-word-component-names */
import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from "./myConfig";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');

