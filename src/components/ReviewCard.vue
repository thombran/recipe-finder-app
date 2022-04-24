<template>
  <v-container>
    <v-card>
      <v-img :src="review.ReviewImg"></v-img>
      <v-btn block outlined color="red" v-if="currUser" @click="deleteReview"
        >Delete Review</v-btn
      >
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
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/main";
import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";

@Component
export default class ReviewCard extends Vue {
  @Prop()
  readonly review: Review | undefined;

  @Prop()
  readonly currUser: boolean | undefined; // Determines if currently logged in user "owns" this review

  auth: Auth | undefined;

  liked = false;
  docID = "";
  reviewRef: DocumentReference | undefined;
  likes = 0;

  mounted() {
    this.docID = this.review!.User + this.review!.RecipeId.toString();
    const thisDoc: DocumentReference = doc(db, "Reviews", this.docID);
    this.reviewRef = thisDoc;
    this.likes = this.review!.Likes;

    onSnapshot(thisDoc, (docChange) => {
        this.likes = docChange.data()!.Likes; // Listen for changes in review likes from DB
    });
  }

  addLike(): void { // Automatically increment/decrement database likes of this review when btn clicked
    if (this.liked) {
      this.liked = false;
      updateDoc(this.reviewRef!, { Likes: increment(-1) });
    } else {
      this.liked = true;
      updateDoc(this.reviewRef!, { Likes: increment(1) });
    }
  }

  deleteReview(): void {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        const uid = user.uid;
        const docID = uid.toString() + this.review?.RecipeId;
        const userReview: DocumentReference = doc(db, "Reviews", docID);
        deleteDoc(userReview)
          .then(() => {
            this.$destroy();
            this.$el.parentNode!.removeChild(this.$el); // Remove from DOM
            window.alert("Successfully deleted your review");
          })
          .catch((err: Error) => {
            window.alert(err.message);
          });
      }
    });
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
