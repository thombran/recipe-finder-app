<template>
  <div id="resultsPage">
    <h1>Write a Review</h1>
    <v-container id="recipeName">
      <v-select
        :items="titles"
        label="Which Recipe?"
        solo
        v-model="selectedRecipe"
      ></v-select>
    </v-container>
    <v-container id="reviewSection">
      <v-textarea
        auto-grow
        label="Write your Review!"
        background-color="white"
        outlined
        rounded
        row-height="50"
        clearable
        v-model="reviewText"
      ></v-textarea>
      <v-btn id="sendBtn" color="success" @click="saveReview"
        >Share Your Review!</v-btn
      >
      <v-file-input
        id="photo"
        v-model="userPhoto"
        accept="image/*"
        label="Upload a photo"
        prepend-icon="mdi-camera"
        @change="fileChange"
        color="white"
        background-color="white"
        chips
        light
      ></v-file-input>
    </v-container>
    <v-container>
      <v-img :src="usrImage"></v-img>
    </v-container>
    <NavBar />
  </div>
</template>

<script lang="ts">
import { Recipe, RecipeResponse } from "@/types";
import { Component, Vue } from "vue-property-decorator";
import { Auth, onAuthStateChanged, getAuth, User } from "firebase/auth";
import {
  collection,
  getDocs,
  DocumentReference,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../main";
import axios, { AxiosResponse } from "axios";
import { API_KEY } from "../secrets";
import NavBar from "../components/NavBar.vue";
import RecipeCard from "../components/RecipeCard.vue";
import * as imageConversion from "image-conversion";

@Component({
  components: {
    NavBar,
    RecipeCard,
  },
})
export default class WriteReviewView extends Vue {
  recipesJSON: RecipeResponse = { recipes: [], results: [], length: 0 };
  titles: Array<string> = [];
  selectedRecipe = "";
  reviewText = "";
  userPhoto: any = null;
  usrImage: any = null;

  auth: Auth | null = null;

  beforeMount() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        const uid = user.uid;
        getDocs(collection(db, "Users", uid, "savedRecipes")).then(
          (snapshot) => {
            snapshot.forEach((doc) => {
              const nextRecipe = doc.data() as Recipe;
              this.recipesJSON?.recipes.push(nextRecipe);
            });
            this.recipesJSON.length = snapshot.size;
            this.titles = this.recipesJSON.recipes.map((recipe) => {
              return recipe.title;
            });
          }
        );
      }
    });
  }

  createImage(file: Blob): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.usrImage = e.target!.result;
    };
    reader.readAsDataURL(file);
  }

  async fileChange(file: Blob): Promise<void> {
    if (!file) {
      return;
    }
    file = await imageConversion.compressAccurately(file, 500); // Compress blob data down to specific size before uploading
    this.createImage(file);
  }

  saveReview(): void {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user && this.selectedRecipe != "") {
        const name = user.displayName ? user.displayName : null;
        const selectedRecipe = this.recipesJSON.recipes.find(
          (recipe) => recipe.title == this.selectedRecipe
        );
        const docName = user.uid.toString() + selectedRecipe?.id;
        const reviewDoc: DocumentReference = doc(db, "Reviews", docName);
        if (!this.usrImage) { // If user didn't upload their own image, retrieve it from Spoonacular DB
          // Ger recipe image if user did not provide one
          const url = `https://api.spoonacular.com/recipes/${
            selectedRecipe!.id
          }/information`;
          axios
            .get(url, { params: { apiKey: API_KEY } })
            .then((res: AxiosResponse) => res.data)
            .then((recipe: Recipe) => {
              this.usrImage = recipe.image;
              const doc = {
                ReviewTitle: this.selectedRecipe,
                ReviewText: this.reviewText,
                ReviewImg: this.usrImage,
                Likes: 0,
                User: user.uid,
                User_Name: name,
                RecipeId: selectedRecipe?.id,
              };
              setDoc(reviewDoc, doc)
                .then(() => {
                  window.alert("Successfully uploaded review!");
                })
                .catch((err: Error) => {
                  window.alert(err.message);
                })
                .finally(() => {
                  this.selectedRecipe = "";
                  this.usrImage = null;
                  this.userPhoto = null;
                  this.reviewText = "";
                });
            });
        } else {
          setDoc(reviewDoc, {
            ReviewTitle: this.selectedRecipe,
            ReviewText: this.reviewText,
            ReviewImg: this.usrImage,
            Likes: 0,
            User: user.uid,
            User_Name: name,
            RecipeId: selectedRecipe?.id,
          })
            .then(() => {
              window.alert("Successfully uploaded review!");
            })
            .catch((err: Error) => {
              window.alert(err.message);
            })
            .finally(() => {
              this.selectedRecipe = "";
              this.usrImage = null;
              this.userPhoto = null;
              this.reviewText = "";
            });
        }
      } else {
        window.alert("Select a recipe first!");
      }
    });
  }
}
</script>

<style scoped>
#resultsPage {
  background-image: url("../assets/searchWood.jpg");
  -webkit-background-size: auto;
  -moz-background-size: auto;
  -o-background-size: auto;
  background-size: auto;
  background-repeat: repeat;
  min-height: 100vh;
  color: black;
}
#recipeName {
  margin-top: 5%;
}
#sendBtn {
  float: right;
  margin-top: 13px;
  margin-left: 10px;
}
#photo {
  float: left;
}
h1 {
  position: absolute;
  top: 2%;
  left: 15%;
  color: white;
}
</style>
