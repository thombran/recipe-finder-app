<template>
  <div id="popularPage">
    <h1>Popular Recipes</h1>
    <v-container id="filterArea">
      <v-row>
        <v-col>
          <v-container fluid id="cuisineSelector">
            <v-row>
              <v-col cols="12">
                <v-combobox
                  v-model="search.cuisine"
                  :items="cuisineTypes"
                  label="Cuisine"
                  multiple
                  outlined
                  dense
                  rounded
                  background-color="orange"
                  color="white"
                ></v-combobox>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col>
          <v-container fluid id="dietSelector">
            <v-row>
              <v-col cols="12">
                <v-combobox
                  v-model="search.diet"
                  :items="dietTypes"
                  label="Diet"
                  outlined
                  dense
                  rounded
                  background-color="orange"
                  color="white"
                ></v-combobox>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col>
          <v-container fluid id="mealSelector">
            <v-row>
              <v-col cols="12">
                <v-combobox
                  v-model="search.meal"
                  :items="mealTypes"
                  label="Meal Type"
                  multiple
                  outlined
                  dense
                  rounded
                  background-color="orange"
                  color="white"
                ></v-combobox>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <!-- <v-col aria-colspan="2"></v-col> -->
        <v-col>
          <v-btn color="success" @click="filter" id="filterBtn">Filter</v-btn>
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
import { cuisineTypes, dietTypes, mealTypes, RecipeResponse } from "../types";
import axios, { AxiosResponse } from "axios";
import { API_KEY } from "../secrets";

@Component({
  components: {
    NavBar,
    RecipeCard,
  },
})
export default class PopularFilterView extends Vue {
  search = {
    cuisine: "",
    diet: "",
    meal: "",
    instructions: false,
    nutrition: false,
    recipeInfo: false,
  };
  cuisineTypes = cuisineTypes;
  dietTypes = dietTypes;
  mealTypes = mealTypes;

  async filter() {
    const requestParams = {
      ...(this.search.cuisine
        ? { cuisine: this.search.cuisine.toString() }
        : {}),
      ...(this.search.diet ? { diet: this.search.diet } : {}),
      ...(this.search.meal ? { type: this.search.meal } : {}),
      sort: "popularity",
      apiKey: API_KEY,
      instructionsRequired: true,
      addRecipeNutrition: true,
      addRecipeInformation: true,
    };
    axios
      .get("https://api.spoonacular.com/recipes/complexSearch", {
        params: requestParams
      })
      .then((response: AxiosResponse) => response.data)
      .then((recipes: RecipeResponse) => {
        this.$router.replace({
          name: "popular",
          params: { recipes: JSON.stringify(recipes), type: "popular" }
        });
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
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
#filterArea {
  margin-top: 25%;
}
#filterBtn {
  margin-left: 45%;
}
h1 {
  position: absolute;
  top: 2%;
  left: 15%;
  color: white;
}
</style>
