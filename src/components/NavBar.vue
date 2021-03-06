<template>
  <div class="ma-12 pa-12 nav">
    <v-navigation-drawer id="drawer" fixed permanent left expand-on-hover dark>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              :src="userPhotoURL"
              v-if="userPhotoURL.length > 0"
              width="64"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ userName }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link @click="myAccount">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Account</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="savedRecipes">
          <v-list-item-icon>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Saved Recipes</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="completed">
          <v-list-item-icon>
            <v-icon>mdi-checkbox-marked-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Completed Recipes</v-list-item-title>
        </v-list-item>
        <v-list-group prepend-icon="mdi-message-draw">
          <template v-slot:activator>
            <v-list-item-title>Reviews</v-list-item-title>
          </template>
          <v-list-item link @click="writeReview">
            <v-list-item-title>Write a Review</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="readReviews">
            <v-list-item-title>Read Reviews</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="yourReviews">
            <v-list-item-title>Your Reviews</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item link @click="popular">
          <v-list-item-icon>
            <v-icon>mdi-exclamation-thick</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Popular</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="search">
          <v-list-item-icon>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Search</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Auth, getAuth, User, onAuthStateChanged } from "firebase/auth";

@Component
export default class NavBar extends Vue {
  auth: Auth | null = null;
  userPhotoURL = "";
  userName = "";
  userEmail = "";

  mounted(): void {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user: User | null) => { // Load in user profile info to nav bar
      if (user) {
        this.userPhotoURL =
          `${user.photoURL ??
          "https://bodhicounseling.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-300x300.png"}`;
        this.userName = `${user.displayName ?? "No Name"}`;
        this.userEmail = `${user.email ?? "No Email"}`;
      }
    });
  }

  search(): void {
    this.$router.replace({ path: "/home" });
  }

  async logout(): Promise<void> { // Logout and return to login screen
    this.auth = getAuth();
    await this.auth.signOut().then(() => {
      this.$router.replace({ path: "/login" });
    });
  }

  savedRecipes(): void {
    this.$router.push({ path: "/savedRecipes" });
  }

  myAccount(): void {
    this.$router.push({ path: "/myAccount" });
  }

  completed(): void {
    this.$router.push({ path: "/completedRecipes" });
  }

  popular(): void {
    this.$router.push({ path: "/popularFilter" });
  }

  writeReview(): void {
    this.$router.push({ path: "/writeReview" });
  }

  readReviews(): void {
    this.$router.push({ path: "/readReviews" });
  }

  yourReviews(): void {
    this.$router.push({ path: "yourReviews" });
  }
}
</script>
