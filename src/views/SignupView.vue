/* eslint-disable no-useless-escape */
<template>
  <div id="login">
    <div id="appLogo">
      <img src="../assets/chefHat.svg" id="logo" alt="Chef's hat logo">
      <p><b>Recipes for Me</b></p>
    </div>
    <form id="loginForm" @submit.prevent="submit">
      <div class="form-row email-row">
        <label><b>Create a new account</b></label>
        <div class="col-md-10 mb-3">
          <label for="emailInput">Email</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            v-model="form.email"
            required
            />
          </div>
        </div>
        <div class="form-row pass-row">
        <div class="col-md-10 mb-3">
          <label for="passInput">Password</label>
          <input
            type="password"
            class="form-control"
            id="passInput"
            v-model="form.pass"
            required
            />
          </div>
        </div>
      <div class="form-row">
        <div class="col-md-6 mb-3">
          <label for="fNameInput">First name</label>
          <input
            type="text"
            class="form-control"
            id="fNameInput"
            v-model="form.fName"
            required
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="lNameInput">Last name</label>
          <input
            type="text"
            class="form-control"
            id="lNameInput"
            v-model="form.lName"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value= ""
            id="agreeCheck"
            v-model="form.agree"
            required
          />
          <label class="form-check-label" for="agreeCheck">
            Agree to terms and conditions
          </label>
        </div>
      </div>
      <button class="btn btn-success"  type="submit">Sign Up</button>
      <button class="btn btn-danger" type="button" onclick="reset()">Reset</button>
      <div>
        <a class="btn btn-outline-dark" role="button" style="text-transform:none">
          <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
        Login with Google
        </a>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { signup } from '../types/signupForm';


@Component
export default class SignupView extends Vue {
  form: signup = {
    email: "",
    pass: "",
    fName: "",
    lName: "",
    agree: false
  };
  show = true;

  submit(event: Event) {
    event.preventDefault();
    alert(JSON.stringify(this.form));
  }

  reset(event: Event) {
    event.preventDefault();
    // Reset our form values
    this.form.email = "";
    this.form.pass = "";
    this.form.fName = "";
    this.form.lName = "";
    this.form.agree = false
    // Trick to reset/clear native browser form validation state
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }
}
</script>

<style>
#app {
  background-image: url('../assets/recipe-background.jpg');
 -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#login {
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  margin-left: 18%;
  color: black;
}
#loginForm {
  background-color: white;
  border: 3px solid black;
  padding-left: 1%;
  padding-right: 1%;
}
.form-row:first-of-type {
  margin-top: 5%;
}
.btn {
  margin-bottom: 5%;
}
.email-row, .pass-row {
  justify-content: center;
}
#appLogo {
  position: relative;
  top: -28em;
  left: 25em;
  width: 250px;
  height: auto;
}
p:first-of-type {
  margin-top: 1em;
  font-size: 2em;
  color: white;
}
p:nth-of-type(1) {
  border-bottom: 1px solid black;
}

</style>