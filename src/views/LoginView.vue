<template>
  <div id="login">
    <div id="appLogo">
      <img src="../assets/chefHat.svg" id="logo" alt="Chef's hat logo" />
      <p><b>Recipes for Me</b></p>
    </div>
    <form id="loginForm" @submit.prevent="submit">
      <div class="form-row email-row">
        <label><b>Login to your account</b></label>
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
      <button class="btn btn-success main" type="submit">Login</button>
      <button class="btn btn-danger main" type="button" onclick="reset()">
        Clear
      </button>
      <button class="btn btn-primary main" type="button" @click="goToSignup">
        Don't have an account?
      </button>
      <hr />
      <div>
        <a
          class="btn btn-outline-dark google"
          role="button"
          style="text-transform: none"
        >
          <img
            width="20px"
            style="margin-bottom: 3px; margin-right: 5px"
            alt="Google sign-in"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          />
          Login with Google
        </a>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { login } from "../types/loginForm";

@Component
export default class LoginView extends Vue {
  form: login= {
    email: "",
    pass: "",
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
    // Trick to reset/clear native browser form validation state
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }

  goToSignup(event: Event) {
      event.preventDefault();
      this.$router.replace({ path: "/" });
  }
}
</script>

<style scoped>
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
  margin-top: 3%;
  padding-left: 1%;
  padding-right: 1%;
}
.form-row:first-of-type {
  margin-top: 5%;
}
.btn {
  margin-bottom: 5%;
}
.email-row,
.pass-row,
.pass-valid-row {
  justify-content: center;
}
#appLogo {
  position: relative;
  top: -23em;
  left: 22.5em;
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
.main {
  margin-right: 1em;
}
button:first-of-type {
  margin-left: 5%;
}
</style>