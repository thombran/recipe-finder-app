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
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../main";
import NavBar from "../components/NavBar.vue";
import ReviewCard from "../components/ReviewCard.vue";
import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";

@Component({
  components: {
    NavBar,
    ReviewCard
  },
})
export default class YourReviewsView extends Vue {
    reviews: Array<Review> = [];

    auth: Auth | null = null;

    beforeMount() {
        this.auth = getAuth();
        onAuthStateChanged(this.auth, async (user: User | null) => {
            if (user) {
            const uid = user.uid;
            const reviewColl: CollectionReference = collection(db, "Reviews");

            const qry = query(reviewColl, where("User", "==", uid));
            getDocs(qry).then((queryRes: QuerySnapshot) => {
                queryRes.docs.forEach((doc: QueryDocumentSnapshot) => {
                    this.reviews.push(doc.data() as Review);
                });
            });
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