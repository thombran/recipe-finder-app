import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LandingView from "../views/LandingView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: LandingView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, _, next) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (to.name !== "signup" && to.name !== "login" && !user) {
        next({ name: "login" });
      } else {
          next();
      }
    });
});

export default router;
