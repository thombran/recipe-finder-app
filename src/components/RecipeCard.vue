<template>
  <v-card dark>
    <v-card-title>{{this.recipeInfo.title}}</v-card-title>
    <v-card-subtitle>Ready In: {{this.recipeInfo.readyInMinutes}} minutes</v-card-subtitle>
    <v-btn outlined id="saveBtn" @click="$emit('saveMeal')">Save</v-btn>
    <v-img height="auto" :src="recipeInfo.image"></v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Recipe } from "../types";

@Component
export default class RecipeCard extends Vue {
  @Prop()
  readonly recipeInfo: Recipe | undefined;

}
</script>

<style scoped></style>
