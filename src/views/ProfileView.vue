<template>
  <div id="profilePage">
    <NavBar />
    <h1>My Account</h1>
    <v-container id="accountInfo">
      <v-row>
        <v-col>Account Name</v-col>
        <v-col>{{userName}}</v-col>
      </v-row>
      <v-row>
        <v-col>Account Email</v-col>
        <v-col>{{userEmail}}</v-col>
      </v-row>
    </v-container>
    <v-container id="buttons">
      <v-btn @click="logout">Logout</v-btn>
      <v-btn color="red" @click="deleteAccount">Delete Account</v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "../components/NavBar.vue";
import { Auth, getAuth, User, onAuthStateChanged, deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../main";

@Component({
  components: {
    NavBar,
  },
})
export default class ProfileView extends Vue {
  auth: Auth | null = null;
  userPhotoURL = "";
  userName = "";
  userEmail = "";

  mounted(): void {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.userPhotoURL = user.photoURL ?? "https://bodhicounseling.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-300x300.png";
        this.userName = `${user.displayName ?? "No Name"}`;
        this.userEmail = `${user.email ?? "No Email"}`;
      }
    });
  }

  async logout(): Promise<void> {
    this.auth = getAuth();
    await this.auth.signOut().then(() => { this.$router.replace({ path: "/login" })});
  }

  deleteAccount(): void {
    const delAccount = window.confirm("Would you like to delete this account?");
    if (delAccount) {
      this.auth = getAuth();
      onAuthStateChanged(this.auth, (user: User | null) => {
        if (user) {
          const uid = user.uid;
          // deleteDoc(doc(db, "Users", uid));
          deleteUser(user).then(() => { this.$router.replace({ path: "/login" })});
        }
      });
    }
  }
}
</script>

<style scoped>
#profilePage {
  background-image: url("../assets/searchWood.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
  color: white;
}
h1 {
  position: absolute;
  top: 2%;
  left: 15%;
}
#buttons button {
  margin: 10px;
}
</style>
