<template>
  <v-card class="recipe">
    <v-card-title>{{ this.recipeInfo.title }}</v-card-title>
    <v-card-subtitle
      >Ready In: {{ this.recipeInfo.readyInMinutes }} minutes</v-card-subtitle
    >
    <v-card-subtitle id="bottomSub"
      >Servings: {{ this.recipeInfo.servings }}</v-card-subtitle
    >
    <v-img height="auto" :src="recipeInfo.image"></v-img>
    <v-btn outlined block id="saveBtn" @click="saveRecipe">Save</v-btn>
    <v-expansion-panels popout>
      <v-expansion-panel>
        <v-expansion-panel-header>Instructions</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card>
            <v-card-text
              v-html="parseInstructions(recipeInfo.analyzedInstructions)"
            ></v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Ingredients</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card>
            <v-card-text
              v-html="parseIngredients(recipeInfo.nutrition)"
            ></v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { InstructionSet, NutritionInfo } from "../types/RecipeResponse";
import { Auth, getAuth, User, onAuthStateChanged } from "firebase/auth";
import { db } from "../main";
import { DocumentReference, doc, setDoc } from "firebase/firestore";

import { Recipe } from "../types";

@Component
export default class RecipeCard extends Vue {
  @Prop()
  readonly recipeInfo: Recipe | undefined;

  auth: Auth | null = null;

  saveRecipe() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        const uid = user.uid;
        const savedRecipeDocument: DocumentReference = doc(
          db,
          "Users",
          uid,
          "savedRecipes",
          this.recipeInfo!.id.toString()
        );
        setDoc(savedRecipeDocument, this.recipeInfo).then(() => {
          window.alert("Successfully saved recipe!");
        });
      }
    });
  }

  parseInstructions(instructions: Array<InstructionSet>) {
    let returnString = "";
    for (let i = 0; i < instructions[0].steps.length; i++) {
      const currStep = instructions[0].steps[i];
      returnString += `<h6>Step: ${currStep.number}</h6><br/>Equipment: <br /><ul>`;
      for (let equipment of currStep.equipment) {
        returnString += `<li>${equipment.name}</li>`;
      }
      returnString += "</ul><br />Ingredients: <br /><ul>";
      for (let ingredient of currStep.ingredients) {
        returnString += `<li>${ingredient.name}</li>`;
      }
      returnString += `</ul><br /><p><strong>${currStep.step}</strong></p>`;
    }
    return returnString;
  }

  parseIngredients(nutrition: NutritionInfo) {
    let returnString = "<ol>";
    for (let ingredient of nutrition.ingredients) {
      returnString += `<li>${(ingredient.amount * this.recipeInfo!.servings).toFixed(1)} ${ingredient.unit} of ${ingredient.name}</li>`;
    }
    returnString += "</ol>";
    return returnString;
  }
}
</script>

<style scoped>
.recipe > img {
  height: max-content;
  width: auto;
}
#bottomSub {
  margin-top: -30px;
}
</style>
