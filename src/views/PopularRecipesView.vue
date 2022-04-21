<template>
  <div id="popularPage">
    <h1>Popular Recipes</h1>
    <v-container id="resultsArea">
      <v-row>
        <v-col
          cols="12"
          v-for="(recipe, pos) in recipesJSON.recipes"
          :key="pos"
        >
          <RecipeCard id="cards" :recipeInfo="recipe" :type="type" :save="true"/>
        </v-col>
      </v-row>
    </v-container>
    <NavBar />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Vue, Prop } from "vue-property-decorator";
import NavBar from "../components/NavBar.vue";
import RecipeCard from "../components/RecipeCard.vue";
import { RecipeResponse } from "../types";

@Component({
  components: {
    NavBar,
    RecipeCard,
  },
})
export default class PopularReceipesView extends Vue {
  @Prop()
  recipes: string | undefined;

  @Prop()
  type: string | undefined;

  recipesJSON: RecipeResponse | undefined;

  beforeMount() {
    this.recipesJSON = JSON.parse(this.recipes!);
    if (this.type === "popular") {
      this.recipesJSON!.recipes = this.recipesJSON!.results;
    }
  }
}
</script>

<style scoped>
#popularPage {
  background-image: url("../assets/searchWood.jpg");
  -webkit-background-size: auto;
  -moz-background-size: auto;
  -o-background-size: auto;
  background-size: auto;
  background-repeat: repeat;
  min-height: 100vh;
  color: black;
}
#filterArea, #filterBtn {
  margin-top: 5%;
}
h1 {
  position: absolute;
  top: 0.2%;
  left: 15%;
  color: white;
}
</style>
