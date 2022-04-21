import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LandingView from "../views/LandingView.vue";
import SearchResultsView from "../views/SearchResultsView.vue";
import SavedRecipesView from "../views/SavedRecipesView.vue";
import CompletedRecipesView from "../views/CompletedRecipesView.vue";
import WriteReviewView from "../views/WriteReviewView.vue";
import ReadReviewsView from "../views/ReadReviewsView.vue";
import ProfileView from "../views/ProfileView.vue";
import PopularRecipesView from "../views/PopularRecipesView.vue";
import PopularFilterView from "../views/PopularFilterView.vue";
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
  {
    path: "/searchResults",
    name: "results",
    component: SearchResultsView,
    props: true,
  },
  {
    path: "/savedRecipes",
    name: "saved",
    component: SavedRecipesView
  },
  {
    path: "/myAccount",
    name: "account",
    component: ProfileView
  },
  {
    path: "/completedRecipes",
    name: "completed",
    component: CompletedRecipesView
  },
  {
    path: "/popularFilter",
    component: PopularFilterView
  },
  {
    path: "/popularRecipes",
    name: "popular",
    component: PopularRecipesView,
    props: true
  },
  {
    path: "/writeReview",
    name: "writeAReview",
    component: WriteReviewView
  },
  {
    path: "/readReviews",
    name: "readReviews",
    component: ReadReviewsView
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
