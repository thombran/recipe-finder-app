<template>
  <div id="landingPage">
    <NavBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import  NavBar  from "../components/NavBar.vue";


@Component({
  components: {
    NavBar,
  }
})
export default class LandingView extends Vue {
    
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
</style>