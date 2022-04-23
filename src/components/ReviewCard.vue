<template>
  <v-container>
    <v-card>
      <v-img :src="review.ReviewImg"></v-img>
      <v-card-title> {{ review.ReviewTitle }} </v-card-title>
      <v-card-subtitle>
        {{ review.User_Name ? review.User_Name : "Anonymous" }}
      </v-card-subtitle>
      <v-container class="like">
        <v-icon :color="liked ? 'pink' : 'grey'" class="icon">mdi-heart</v-icon>
        <p>{{ likes }}</p>
        <v-btn @click="addLike">Like</v-btn>
      </v-container>
      <v-divider id="divider" />
      <v-card-text> {{ review.ReviewText }} </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Vue, Prop } from "vue-property-decorator";
import { Review } from "../types";
import {
  DocumentReference,
  doc,
  updateDoc,
  increment,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/main";

@Component
export default class ReviewCard extends Vue {
  @Prop()
  readonly review: Review | undefined;

  liked = false;
  docID = "";
  reviewRef: DocumentReference | undefined;
  likes = 0;

  mounted() {
    this.docID = this.review!.User + this.review!.RecipeId.toString();
    const thisDoc: DocumentReference = doc(db, "Reviews", this.docID);
    this.reviewRef = thisDoc;
    this.likes = this.review!.Likes;

    const likeChange = onSnapshot(thisDoc, (doc) => {
      this.likes = doc.data()!.Likes;
    });
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
  display: flex;
  position: relative;
  left: 42%;
  top: -80px;
  justify-content: space-between;
  align-items: center;
  width: 15%;
}
.like p {
  padding-top: 20px;
}
.icon {
  margin-left: 8px;
  margin-top: 7px;
}
#divider {
  margin-top: -2%;
}
</style>
