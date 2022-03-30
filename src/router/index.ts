import Vue from 'vue';
import VueRouter, { RouteConfig } from "vue-router";
import SignupView from "../views/SignupView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "signup",
        component: SignupView,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;