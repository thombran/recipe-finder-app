<template>
  <div id="resultsPage">
    <NavBar />
    <h1>Search Results</h1>
    <v-row id="results">
        <v-col id="cards" v-for="(recipe, pos) in recipesJSON.recipes" :key="pos">
            <RecipeCard :recipeInfo="recipe" :v-on:saveMeal="saveRecipe(recipe.title)" />
        </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { RecipeResponse } from "@/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import NavBar from "../components/NavBar.vue";
import RecipeCard from "../components/RecipeCard.vue";


@Component({
  components: {
    NavBar,
    RecipeCard
  },
})
export default class SearchResultsView extends Vue {
  @Prop()
  recipes: string | undefined;

  recipesJSON: RecipeResponse | undefined;

  beforeMount() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.recipesJSON = JSON.parse(this.recipes!);
  }

  saveRecipe(recipeName: string) {
    console.log("Recipe saved:", recipeName);
  }
 
}
</script>

<style scoped>
#resultsPage {
  background-image: url("../assets/landingBackground.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
  color: black;
}
#results {
  position: absolute;
  top: 10%;
  left: 10%;
  right: 10%;
}
h1 {
  position: absolute;
  top: 2.5%;
  left: 10%;
}
</style>