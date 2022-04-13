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
      <v-row>
        <v-col>
          <v-checkbox
            v-model="search.instructions"
            :label="'Want Instructions?'"
            color="success"
            class="check"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="search.recipeInfo"
            :label="'More information about the recipes?'"
            color="success"
            class="check"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="search.nutrition"
            :label="'Want nutrition information?'"
            color="success"
            class="check"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn block color="success" elevation="2" rounded
            >Feeling Lucky?</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "../components/NavBar.vue";
import { cuisineTypes, dietTypes, mealTypes } from "../types";

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
#searchArea{
  position: absolute;
  top: 40%;
  left: 25%;
}
#searchArea /deep/ .check label {
  color:black;
  font-weight: bolder;
}
</style>
