<template>
  <v-container>
    <v-card>
      <v-img :src="review.ReviewImg"></v-img>
      <v-card-title> {{ review.ReviewTitle }} </v-card-title>
      <v-card-subtitle>
        {{ review.User_Name ? review.User_Name : "Anonymous" }}
      </v-card-subtitle>
      <v-container>
          <v-icon :color="liked ? 'pink' : 'grey'" class="like icon">mdi-heart</v-icon>
          <v-btn  class="like" @click="addLike">Like</v-btn>
      </v-container>
      <v-card-text> {{ review.ReviewText }} </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Vue, Prop } from "vue-property-decorator";
import { Review } from "../types";
import { DocumentReference, doc, updateDoc, increment} from "firebase/firestore";
import { db } from "@/main";

@Component
export default class ReviewCard extends Vue {
  @Prop()
  readonly review: Review | undefined;

  liked = false;
  docID = "";
  reviewRef: DocumentReference | undefined;

  mounted() {
      this.docID = this.review!.User + this.review!.RecipeId.toString();
      this.reviewRef = doc(db, "Reviews", this.docID);
  }

  addLike(): void {
      if (this.liked) {
          this.liked = false;
          updateDoc(this.reviewRef!, { Likes: increment(-1) });
      } else {
          this.liked = true;
          updateDoc(this.reviewRef!, { Likes: increment(1) });
      }
  }
}
</script>

<style scoped>
.like {
    float: right;
    top: -80px;
}
.icon {
    margin-left: 8px;
    margin-top: 7px;
}
</style>
