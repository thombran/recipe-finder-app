import Vue from 'vue';
import VueRouter, { RouteConfig } from "vue-router";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LandingView from "../views/LandingView.vue";

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
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;