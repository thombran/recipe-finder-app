<template>
  <div id="resultsPage">
    <NavBar />
    <v-row>
        <v-col v-for="(recipe, pos) in recipesJSON.recipes" :key="pos">
            <RecipeCard :recipeInfo="recipe" />
        </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { RecipeResponse } from "@/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import NavBar from "../components/NavBar.vue";
import RecipeCard from "../components/RecipeCard.vue";


@Component({
  components: {
    NavBar,
    RecipeCard
  },
})
export default class SearchResultsView extends Vue {
@Prop()
recipes: string | undefined;

recipesJSON: RecipeResponse | undefined;

beforeMount() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.recipesJSON = JSON.parse(this.recipes!);
}
 
}
</script>

<style scoped>

</style>