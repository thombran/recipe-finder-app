<template>
  <div id="resultsPage">
    <h1>Saved Recipes</h1>
    <v-container id="container">
      <v-row>
        <v-col
          v-for="(recipe, pos) in recipesJSON.recipes"
          :key="pos"
        >
          <RecipeCard id="cards" :recipeInfo="recipe" :type="recipe.type" :save="false" :isCompleted="recipe.isCompleted" />
        </v-col>
      </v-row>
    </v-container>
    <NavBar />
  </div>
</template>

<script lang="ts">
import { Recipe, RecipeResponse } from "@/types";
import { Component, Vue } from "vue-property-decorator";
import { Auth, onAuthStateChanged, getAuth, User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";
import NavBar from "../components/NavBar.vue";
import RecipeCard from "../components/RecipeCard.vue";

@Component({
  components: {
    NavBar,
    RecipeCard,
  },
})
export default class SavedRecipesView extends Vue {
  recipesJSON: RecipeResponse = { recipes: [], results: [], length: 0 };

  auth: Auth | null = null;

  beforeMount() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        const uid = user.uid;
        getDocs(collection(db, "Users", uid, "savedRecipes")).then(
          (snapshot) => {
            snapshot.forEach((doc) => {
                const nextRecipe = doc.data() as Recipe;
                this.recipesJSON?.recipes.push(nextRecipe);
            });
            this.recipesJSON.length = snapshot.size;
          }
        );
      }
    });
  }
}
</script>

<style scoped>
#resultsPage {
  background-image: url("../assets/searchWood.jpg");
  -webkit-background-size: auto;
  -moz-background-size: auto;
  -o-background-size: auto;
  background-size: auto;
  background-repeat: repeat;
  min-height: 100vh;
  color: black;
}
#container {
  margin-top: 75px;
}
h1 {
  position: absolute;
  top: 25px;
  left: 15%;
  color: white;
}
</style>
