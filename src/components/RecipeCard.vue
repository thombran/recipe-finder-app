<template>
  <v-card dark class="recipe">
    <v-card-title>{{ this.recipeInfo.title }}</v-card-title>
    <v-card-subtitle
      >Ready In: {{ this.recipeInfo.readyInMinutes }} minutes</v-card-subtitle
    >
    <v-btn outlined id="saveBtn" @click="saveRecipe">Save</v-btn>
    <v-img height="auto" :src="recipeInfo.image"></v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
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
}
</script>

<style scoped>
.recipe > img {
  height: max-content;
  width: auto;
}
</style>
