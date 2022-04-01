<template>
  <div id="login">
    <div id="appLogo">
      <img src="../assets/chefHat.svg" id="logo" alt="Chef's hat logo" />
      <p><b>Recipes for Me</b></p>
    </div>
    <form id="loginForm" @submit.prevent="createAccount">
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
      <div class="form-row pass-valid-row">
        <div class="col-md-10 mb-3">
          <label for="passInput">Verify Password</label>
          <input
            type="password"
            class="form-control"
            id="passVerifyInput"
            v-model="form.verifyPass"
            required
          />
        </div>
      </div>
      <button class="btn btn-success main" type="submit">Sign Up</button>
      <button class="btn btn-danger main" type="button" onclick="reset()">
        Clear
      </button>
      <button class="btn btn-primary main" type="button" @click="goToLogin">
        Already have an account?
      </button>
      <hr />
      <div>
        <a
          class="btn btn-outline-dark google"
          role="button"
          style="text-transform: none"
          @click="loginWithGoogle"
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
import { signup } from "../types/signupForm";
import {
  getAuth,
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

@Component
export default class SignupView extends Vue {
  form: signup = {
    email: "",
    pass: "",
    verifyPass: "",
  };
  show = true;
  auth: Auth | null = null;

  mounted(): void {
    this.auth = getAuth();
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.form.pass === this.form.verifyPass) {
      alert(JSON.stringify(this.form));
    } else {
      alert("Password does not match, try typing it again.");
    }
  }

  reset(event: Event) {
    event.preventDefault();
    // Reset our form values
    this.form.email = "";
    this.form.pass = "";
    this.form.verifyPass = "";
    // Trick to reset/clear native browser form validation state
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }

  goToLogin(event: Event) {
    event.preventDefault();
    this.$router.replace({ path: "/login" });
  }

  createAccount(event: Event): void {
    event.preventDefault();
    if (this.form.pass === this.form.verifyPass) {
      createUserWithEmailAndPassword(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.auth!,
        this.form.email,
        this.form.pass
      )
        .then(async (cr: UserCredential) => {
            await sendEmailVerification(cr.user);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await signOut(this.auth!);
            alert(`An email verification has been sent to ${cr.user.email}`);
            this.$router.push({ path: "/login" });
        })
        .catch((err: Error) => {
          alert(`Unable to create account: ${err}`);
        });
    } else {
      alert("Password does not match, try typing it again.");
    }
  }

  loginWithGoogle(): void {
    const provider = new GoogleAuthProvider();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    signInWithPopup(this.auth!, provider)
    .then(() => {
      this.$router.push({ path: "/home" });
    })
    .catch((err: Error) => {
      alert(`Unable to login with Google: ${err}`);
      //Add better popup UI
    })
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
  color: black;
  background-image: url("../assets/recipe-background.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#loginForm {
  background-color: white;
  border: 3px solid black;
  margin-top: 3%;
  margin-left: 18%;
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
  top: -28%;
  left: 29%;
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
</style>