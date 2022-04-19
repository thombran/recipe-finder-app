<template>
  <div id="resultsPage">
    <h1>Read User Reviews</h1>
        <ReviewCard v-for="(review, pos) in reviews" :key="pos" :review="review" class="review" />
    <NavBar />
  </div>
</template>

<script lang="ts">
import { Review } from "@/types";
import { Component, Vue } from "vue-property-decorator";

import {
  collection,
  getDocs,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../main";
import NavBar from "../components/NavBar.vue";
import ReviewCard from "../components/ReviewCard.vue";

@Component({
  components: {
    NavBar,
    ReviewCard
  },
})
export default class ReadReviewsView extends Vue {
    reviews: Array<Review> = [];

    beforeMount() {
        const reviewColl: CollectionReference = collection(db, "Reviews");
        getDocs(reviewColl).then((snapshot) => {
            snapshot.forEach((review) => {
                const currReview: Review = review.data() as Review;
                this.reviews.push(currReview);
            });
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
