<template>
    <v-container>
        <v-card>
            <v-img :src="review.ReviewImg"></v-img>
            <v-card-title> {{ review.ReviewTitle }} </v-card-title>
            <v-card-subtitle> {{ review.User_Name ? review.User_Name : "Anonymous" }} </v-card-subtitle>
            <v-card-text> {{ review.ReviewText }} </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Vue, Prop } from "vue-property-decorator";
import { Review } from "../types";

@Component
export default class ReviewCard extends Vue {
    @Prop()
    readonly review: Review | undefined;

}
</script>

<style scoped>

</style>
