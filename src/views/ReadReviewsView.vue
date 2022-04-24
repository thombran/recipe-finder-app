<template>
  <div id="resultsPage">
    <h1>Read User Reviews</h1>
    <ReviewCard
      v-for="(review, pos) in reviews"
      :key="pos"
      :review="review"
      class="review"
    />
    <NavBar />
  </div>
</template>

<script lang="ts">
import { Review } from "@/types";
import { Component, Vue } from "vue-property-decorator";

import {
  collection,
  CollectionReference,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../main";
import NavBar from "../components/NavBar.vue";
import ReviewCard from "../components/ReviewCard.vue";

@Component({
  components: {
    NavBar,
    ReviewCard,
  },
})
export default class ReadReviewsView extends Vue {
  reviews: Array<Review> = [];

  beforeMount() {
    const reviewColl: CollectionReference = collection(db, "Reviews");
    onSnapshot(reviewColl, (change: QuerySnapshot) => {
      for (let reviewChange of change.docChanges()) {
        if (reviewChange.type === "added") { // If DB collection has new item added, add to current page
          const newDoc = reviewChange.doc.data();
          this.$set(this.reviews, this.reviews.length, newDoc);
          this.reviews.sort((a: Review, b: Review) => { // Sort by most popular first -> descending
            return b.Likes - a.Likes;
          });
        }
        if (reviewChange.type === "removed") { // Remove review from page if another user deletes their review
          const deleteDoc = reviewChange.doc.data();
          this.reviews.splice(this.reviews.indexOf(deleteDoc as Review), 1);
        }
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
h1 {
  position: absolute;
  top: 2%;
  left: 15%;
  color: white;
}
.review:first-of-type {
  margin-top: 5%;
}
</style>
