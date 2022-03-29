<template>
  <div id="app">
    <AppHeader/>
    <LoginComponent/>
    <AppFooter/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  AppFooter  from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import LoginComponent from './components/LoginComponent.vue';

@Component({
  components: {
    AppHeader,
    AppFooter,
    LoginComponent
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
