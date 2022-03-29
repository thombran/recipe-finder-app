<template>
  <footer id="appFooter">
    
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppFooter extends Vue {}
</script>
  
<style scoped>
#appFooter {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: lightgreen;
  color: black;
  text-align: center;
  height: 40px;
}
</style>