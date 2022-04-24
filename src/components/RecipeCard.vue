<template>
  <div class="flex-no-wrap justify-space-between">
    <v-card class="recipe mx-auto" max-width="50vw" fluid id="card" dark>
      <v-card-title id="title">{{ this.recipeInfo.title }}</v-card-title>
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
      <template v-else>
        <template v-if="isCompleted">
          <v-btn
            color="red"
            outlined
            block
            id="removeCompleted"
            @click="removeCompleted"
            >Mark Incomplete</v-btn
          >
        </template>
        <template v-else>
          <v-btn outlined block id="deleteBtn" @click="deleteRecipe"
            >Delete</v-btn
          >
          <v-btn
            outlined
            block
            id="completedBtn"
            color="success"
            @click="markCompleted"
            >Mark as Completed</v-btn
          >
        </template>
      </template>
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
        <v-expansion-panel v-if="type === 'search'">
          <v-expansion-panel-header
            >Nutrition Breakdown</v-expansion-panel-header
          >
          <v-expansion-panel-content id="expansion-canvas" eager>
            <canvas id="canvas" width="400" height="400"></canvas>
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
import { Auth, getAuth } from "firebase/auth";
import { db } from "../main";
import { DocumentReference, doc, setDoc, deleteDoc } from "firebase/firestore";
import { Chart, ChartItem, registerables } from "chart.js";

import { Recipe } from "../types";

@Component
export default class RecipeCard extends Vue {
  @Prop()
  readonly recipeInfo: Recipe | undefined;

  @Prop()
  readonly type: string | undefined; // Response object has different properties depending on search type

  @Prop()
  readonly save: boolean | undefined; // Whether the user has saved this recipe

  @Prop()
  readonly isCompleted: boolean | undefined; // Whether the recipe has been marked as completed by the user

  auth: Auth | null = null;
  nutritionChart: Chart | undefined;

  mounted() {
    if (this.type === "search") {
      // Random query does not provide info to create these graphs
      const labels: Array<string> = [];
      const amounts: Array<number> = [];
      this.recipeInfo?.nutrition.nutrients.forEach((ingredient) => {
        if (ingredient.name !== "Calories" && ingredient.unit !== "IU") { // Irrelevant ingredients in list that should be discarded
          labels.push(ingredient.name);
          amounts.push(this.convertUnits(ingredient.unit, ingredient.amount)!);
        }
      });

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Nutrition Breakdown",
            data: amounts,
            hoverOffset: 2,
            backgroundColor: this.poolColors(labels.length), // Assign random colors
            borderWidth: 1,
          },
        ],
      };

      Chart.register(...registerables); //Necessary for chart.js components to load
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      canvas.id = "canvas" + this.recipeInfo!.id; // If this line is not set, canvas is only set for first recipe in results
      const ctx: ChartItem = canvas.getContext("2d") as ChartItem;
      let chartStatus = Chart.getChart("canvas" + this.recipeInfo!.id);

      if (chartStatus != undefined) {
        chartStatus.destroy(); // Necessary to create new chart objects using this method
      }

      this.nutritionChart = new Chart(ctx, { // Creating the dropdown chart of nutrition info in the UI
        type: "doughnut",
        data: data,
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (item: any) => `${item.label}: ${item.parsed} g`, // Update the doughnut chart sections to display units
              },
            },
          },
        },
      });
    }
  }

  markCompleted(): void {
    this.auth = getAuth();
    const user = this.auth.currentUser;
    if (user) {
      const uid = user.uid;
      const completedRecipeDocument: DocumentReference = doc( // Add completed recipe to user collection
        db,
        "Users",
        uid,
        "completedRecipes",
        this.recipeInfo!.id.toString()
      );
      setDoc(completedRecipeDocument, {
        type: this.type, // Save the type for when it is loaded on the "saved" page of the site
        ...this.recipeInfo,
      }).then(() => {
        window.alert("Added recipe to completed list");
      });
    }
  }

  saveRecipe() {
    this.auth = getAuth();
    const user = this.auth.currentUser;
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
  }

/**
 * Helper method to return a paragraph string of instructions to be used in the UI dropdown
 */
  parseInstructions(instructions: Array<InstructionSet>) {
    let returnString = "";
    for (let i = 0; i < instructions[0].steps.length; i++) {
      const currStep = instructions[0].steps[i];
      returnString += `Step ${currStep.number}. `;
      returnString += `${currStep.step} `;
    }
    return returnString;
  }

/**
 * Helper method to return the list of ingredients in a list format
 */
  parseIngredients(recipe: Recipe) {
    let returnString = "";
    if (this.type === "search" || this.type === "popular") {
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

/**
 * Helper function to return the list of equipment needed for the recipe
 */
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
    this.$destroy();
    this.$el.parentNode!.removeChild(this.$el); // Remove recipe card element from the DOM
    this.auth = getAuth();
    const user = this.auth.currentUser;
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
  }

  removeCompleted(): void {
    this.$destroy();
    this.$el.parentNode!.removeChild(this.$el);

    this.auth = getAuth();
    const user = this.auth.currentUser;
    if (user) {
      const uid = user.uid;
      const recipeDoc: DocumentReference = doc(
        db,
        "Users",
        uid,
        "completedRecipes",
        this.recipeInfo!.id.toString()
      );
      deleteDoc(recipeDoc)
        .then(() => {
          window.alert(
            `Successfully marked recipe as incomplete: ${this.recipeInfo?.title}.`
          );
        })
        .catch((err: Error) => {
          window.alert(
            `Could not remove recipe from completed recipe data: ${err.message}`
          );
        });
    }
  }

/**
 * Not all of the ingredients are listed in grams as returned from the API - so convert all ingredients to grams
 */
  convertUnits(unit: string, amount: number) {
    if (unit === "g") {
      return amount;
    } else if (unit === "mg") {
      return amount / 1000;
    } else if (unit === "µg") {
      return amount / 1000000;
    } else {
      return null;
    }
  }

/**
 * Helper function to create random colors for the chart component
 */
  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.5)";
  }

/**
 * Create groups/arrays of colors to be used in the chart
 */
  poolColors(a: number) {
    var pool = [];
    for (let i = 0; i < a; i++) {
      pool.push(this.dynamicColors());
    }
    return pool;
  }
}
</script>

<style scoped>
#bottomSub {
  margin-top: -30px;
}
</style>
