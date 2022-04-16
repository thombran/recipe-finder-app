<template>
  <div id="resultsPage">
    <h1>Search Results</h1>
    <v-container id="container">
      <v-row>
        <v-col
          cols="12"
          v-for="(recipe, pos) in recipesJSON.recipes"
          :key="pos"
        >
          <RecipeCard id="cards" :recipeInfo="recipe" :type="type" />
        </v-col>
      </v-row>
    </v-container>
    <NavBar />
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
    RecipeCard,
  },
})
export default class SearchResultsView extends Vue {
  @Prop()
  recipes: string | undefined;

  @Prop()
  type: string | undefined;

  recipesJSON: RecipeResponse | undefined;

  beforeMount() {
    this.recipesJSON = JSON.parse(this.recipes!);
    if (this.type === "search") {
      this.recipesJSON!.recipes = this.recipesJSON!.results; //Results array is different in non-random search
    }
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
  margin-top: 5%;
}
h1 {
  position: absolute;
  top: 0.2%;
  left: 15%;
  color: white;
}
</style>
