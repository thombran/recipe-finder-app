<template>
  <div class="flex-no-wrap justify-space-between">
    <v-card class="recipe mx-auto" max-width="100vw" fluid id="card">
      <v-card-title>{{ this.recipeInfo.title }}</v-card-title>
      <v-card-subtitle
        >Ready In: {{ this.recipeInfo.readyInMinutes }} minutes</v-card-subtitle
      >
      <v-card-subtitle id="bottomSub"
        >Servings: {{ this.recipeInfo.servings }}</v-card-subtitle
      >
      <v-img :src="recipeInfo.image"></v-img>
      <v-btn outlined block id="saveBtn" v-if="save" @click="saveRecipe"
        >Save</v-btn
      >
      <b-btn outlined block id="deleteBtn" v-else @click="deleteRecipe"
        >Delete</b-btn
      >
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Instructions</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{
              this.type === "random"
                ? this.recipeInfo.instructions
                : this.parseInstructions(this.recipeInfo.analyzedInstructions)
            }}
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Ingredients</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ this.parseIngredients(this.recipeInfo) }}
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Equipment</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ this.parseEquipment(this.recipeInfo.analyzedInstructions) }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Vue, Prop } from "vue-property-decorator";
import { InstructionSet } from "../types/RecipeResponse";
import { Auth, getAuth, User, onAuthStateChanged } from "firebase/auth";
import { db } from "../main";
import { DocumentReference, doc, setDoc, deleteDoc } from "firebase/firestore";

import { Recipe } from "../types";

@Component
export default class RecipeCard extends Vue {
  @Prop()
  readonly recipeInfo: Recipe | undefined;

  @Prop()
  readonly type: string | undefined;

  @Prop()
  readonly save: boolean | undefined;

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
        setDoc(savedRecipeDocument, {
          type: this.type,
          ...this.recipeInfo,
        }).then(() => {
          window.alert("Successfully saved recipe!");
        });
      }
    });
  }

  parseInstructions(instructions: Array<InstructionSet>) {
    let returnString = "";
    for (let i = 0; i < instructions[0].steps.length; i++) {
      const currStep = instructions[0].steps[i];
      returnString += `Step ${currStep.number}. `;
      returnString += `${currStep.step} `;
    }
    return returnString;
  }

  parseIngredients(recipe: Recipe) {
    let returnString = "";
    if (this.type === "search") {
      const nutrition = recipe.nutrition;
      for (let ingredient of nutrition.ingredients) {
        returnString += `- ${(
          ingredient.amount * this.recipeInfo!.servings
        ).toFixed(1)} ${ingredient.unit} of ${ingredient.name}\r\n`;
      }
    } else {
      const ingredients = recipe.extendedIngredients;
      for (let ingredient of ingredients) {
        returnString += `- ${ingredient.amount} ${ingredient.measures.us.unitLong} of ${ingredient.name}\r\n`;
      }
    }
    return returnString;
  }

  parseEquipment(instructions: Array<InstructionSet>) {
    let returnString = "";
    for (let i = 0; i < instructions[0].steps.length; i++) {
      const currStep = instructions[0].steps[i];
      for (let equipment of currStep.equipment) {
        returnString += `${equipment.name}, `;
      }
    }
    return returnString;
  }

  deleteRecipe(): void {
    const cardElement = document.querySelector("#card");
    if (cardElement) {
      cardElement.remove();
      this.auth = getAuth();
      onAuthStateChanged(this.auth, (user: User | null) => {
        if (user) {
          const uid = user.uid;
          const recipeDoc: DocumentReference = doc(
            db,
            "Users",
            uid,
            "savedRecipes",
            this.recipeInfo!.id.toString()
          );
          deleteDoc(recipeDoc)
            .then(() => {
              window.alert(
                `Successfully deleted recipe: ${this.recipeInfo?.title}.`
              );
            })
            .catch((err: Error) => {
              window.alert(
                `Could not delete recipe from user data: ${err.message}`
              );
            });
        }
      });
    }
  }
}
</script>

<style scoped>
#bottomSub {
  margin-top: -30px;
}
</style>
