<template>
  <div id="login">
    <div>
      <v-alert v-model="alert" dismissible id="alertBox" color="#ffe6b8">
        <h6 v-text="alertText"></h6>
      </v-alert>
    </div>
    <div id="loginBox">
      <img src="../assets/chefHat.svg" id="logo" alt="Chef's hat logo" />
      <p><b>Recipes for Me</b></p>
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
        <button
          class="btn btn-success main"
          type="submit"
          @click="loginWithEmail"
        >
          Login
        </button>
        <button class="btn btn-danger main" type="button" onclick="reset()">
          Clear
        </button>
        <button class="btn btn-primary main" type="button" @click="goToSignup">
          Don't have an account?
        </button>
        <v-dialog v-model="dialog" persistent max-width="350">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="warning" dark v-bind="attrs" v-on="on">
              Reset Password
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5"> Reset Password? </v-card-title>
            <v-text-field
              label="Email"
              v-model="form.emailReset"
              class="dialogText"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="green darken-1" text @click="resetPassword">
                Reset
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { login } from "../types/loginForm";
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

@Component
export default class LoginView extends Vue {
  form: login = {
    email: "",
    pass: "",
    emailReset: "",
  };
  show = true;
  auth: Auth | null = null;
  dialog = false;
  alert = false;
  alertText = "";

  submit(event: Event): void {
    event.preventDefault();
  }

  reset(event: Event): void {
    event.preventDefault();
    // Reset our form values
    this.form.email = "";
    this.form.pass = "";
    this.form.emailReset = "";
    // Trick to reset/clear native browser form validation state
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }

  goToSignup(event: Event): void {
    event.preventDefault();
    this.$router.replace({ path: "/" });
  }

  mounted(): void {
    this.auth = getAuth();
  }

  loginWithEmail(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    signInWithEmailAndPassword(this.auth!, this.form.email, this.form.pass)
      .then(async (cr: UserCredential) => {
        if (cr.user.emailVerified) {
          this.$router.push({ path: "/home" });
        } else {
          this.alertText = "Please verify your email before logging in";
          this.alert = true;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await signOut(this.auth!);
        }
      })
      .catch((err: Error) => {
        this.alertText = `Error logging in ${err}`;
        this.alert = true;
        //Add better popup UI
      });
  }

  loginWithGoogle(): void {
    const provider = new GoogleAuthProvider();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    signInWithPopup(this.auth!, provider)
      .then(() => {
        this.$router.push({ path: "/home" });
      })
      .catch((err: Error) => {
        this.alertText = `Unable to login with Google: ${err}`;
        this.alert = true;
      });
  }

  resetPassword(): void {
    this.dialog = false;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sendPasswordResetEmail(this.auth!, this.form.emailReset)
      .then(() => {
        this.alertText = `A password reset link has been sent to ${this.form.emailReset}`;
        this.alert = true;
      })
      .catch((err: Error) => {
        this.alertText = `Unable to reset password: ${err}`;
        this.alert = true;
      });
  }
}
</script>

<style scoped>
#loginBox{
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  color: black;
  margin-right: 40%;
  margin-top: 2%;
}
#login {
  background-image: url("../assets/recipe-background.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#loginForm {
  background-color: white;
  border: 3px solid black;
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
#logo{
  height: 20%;
  width: 20%;
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
.btn:nth-child(3) {
  margin-left: 2%;
}
.dialogText {
  padding: 1em;
}
.v-alert {
  position: absolute;
  left: 40vw;
  width: 25vw;
  height: 50px;
  top: 0;
}
</style>
