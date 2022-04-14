<template>
  <v-card>
    <v-img height="250" :src="recipeInfo.image"></v-img>
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
