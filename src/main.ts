/* eslint-disable vue/multi-word-component-names */
import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import  firebaseConfig  from "./myConfig";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

