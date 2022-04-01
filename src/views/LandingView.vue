<template>
  <div id="landingPage">
    <NavBar />
    <div id="searchDiv">
          <v-container fluid>
            <v-textarea
              label="Search for recipes"
              type="text"
              no-resize
              rows="1"
              :value="value"
              dark
              v-model="search.field"
              outlined
              rounded
              background-color="#363636"
              style="width: 30vw;"
            ></v-textarea>
          </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "../components/NavBar.vue";

@Component({
  components: {
    NavBar,
  },
})
export default class LandingView extends Vue {
  search = {
    field: "",
  };
}
</script>

<style scoped>
#landingPage {
  background-image: url("../assets/landingBackground.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
  color: black;
}
#searchDiv {
  position: absolute;
  top: 50vh;
  right: 40vw;
}
</style>