<template>
  <div id="popularPage">
    <h1>Popular Recipes</h1>
    <v-container id="container">
      <v-row>
        <v-col
          cols="12"
          v-for="(recipe, pos) in recipesJSON.recipes"
          :key="pos"
        >
          <RecipeCard id="cards" :recipeInfo="recipe"/>
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

  recipesJSON: RecipeResponse | null = null;

  beforeMount() {
    this.recipesJSON = JSON.parse(this.recipes!);
    this.recipesJSON!.recipes = this.recipesJSON!.results;
    console.log(this.recipesJSON!.recipes);
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
