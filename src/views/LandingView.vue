<template>
  <div id="landingPage">
    <NavBar />
    <v-container id="searchArea">
      <v-row>
        <v-col>
          <v-container fluid>
            <v-textarea
              label="Search for recipes"
              type="text"
              no-resize
              rows="1"
              dark
              v-model="search.field"
              outlined
              rounded
              background-color="#363636"
              style="width: 50vw"
            ></v-textarea>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-container fluid id="cuisineSelector">
            <v-row>
              <v-col cols="12">
                <v-combobox
                  v-model="search.cuisine"
                  :items="cuisineTypes"
                  label="Cuisine (0 or more)"
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
      <v-row id="switches">
        <v-col>
          <v-switch
            v-model="search.instructions"
            :label="'Want Instructions?'"
            color="success"
            class="switch"
          ></v-switch>
        </v-col>
        <v-col>
          <v-switch
            v-model="search.recipeInfo"
            :label="'More information about the recipes?'"
            color="success"
            class="switch"
          ></v-switch>
        </v-col>
        <v-col>
          <v-switch
            v-model="search.nutrition"
            :label="'Want nutrition information?'"
            color="success"
            class="switch"
          ></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            block
            color="success"
            elevation="2"
            rounded
            @click="randomSearch"
            >Feeling Lucky?</v-btn
          >
        </v-col>
        <v-col>
          <b-btn @click="sendRequest" id="searchBtn">Search</b-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "../components/NavBar.vue";
import { cuisineTypes, dietTypes, mealTypes, RecipeResponse } from "../types";
import axios, { AxiosResponse } from "axios";
import { API_KEY } from "../secrets";

@Component({
  components: {
    NavBar,
  },
})
export default class LandingView extends Vue {
  search = {
    field: "",
    cuisine: "",
    diet: "",
    meal: "",
    instructions: false,
    nutrition: false,
    recipeInfo: false,
  };
  cuisineTypes = cuisineTypes;
  dietTypes = dietTypes;
  mealTypes = mealTypes; // Make meal text all lowercase when calling API

  async sendRequest() {
    const requestParams = {
      ...(this.search.field ? { query: this.search.field } : {}),
      ...(this.search.cuisine
        ? { cuisine: this.search.cuisine.toString() }
        : {}),
      ...(this.search.diet ? { diet: this.search.diet } : {}),
      ...(this.search.meal ? { type: this.search.meal } : {}),
      instructionsRequired: this.search.instructions,
      addRecipeNutrition: this.search.nutrition,
      addRecipeInformation: this.search.recipeInfo,
      apiKey: API_KEY,
    };
    axios
      .get("https://api.spoonacular.com/recipes/complexSearch", {
        params: requestParams,
      })
      .then((response: AxiosResponse) => response.data)
      .then((recipes: RecipeResponse) => {
        this.$router.push({
          name: "results",
          params: { recipes: JSON.stringify(recipes) },
        });
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
  }

  async randomSearch() {
    const requestParams = {
      number: 10,
      apiKey: API_KEY,
    };
    axios
      .get("https://api.spoonacular.com/recipes/random", {
        params: requestParams,
      })
      .then((response: AxiosResponse) => response.data)
      .then((recipes: RecipeResponse) => {
        this.$router.push({
          name: "results",
          params: { recipes: JSON.stringify(recipes) },
        });
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
  }
}
</script>

<style scoped>
#landingPage {
  background-image: url("../assets/landingBackground.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
  color: black;
}
#searchArea {
  position: absolute;
  top: 40%;
  left: 25%;
}
#searchArea /deep/ .switch label {
  color: black;
  font-weight: bold;
}
#searchBtn {
  width: 100%;
  border-radius: 20px;
}
#switches {
  margin-left: 30px;
}
</style>
