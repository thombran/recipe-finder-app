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
          <v-card-title class="text-h5">
            Reset Password?
          </v-card-title>
            <v-text-field label="Email" v-model="form.emailReset"></v-text-field>
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
    emailReset: ""
  };
  show = true;
  auth: Auth | null = null;
  dialog = false;

  submit(event: Event): void {
    event.preventDefault();
    alert(JSON.stringify(this.form));
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
          alert("Login successful");
          //Add logic to switch to homepage here
        } else {
          alert("You need to verify your email first!");
          //Add better popup UI
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await signOut(this.auth!);
        }
      })
      .catch((err: Error) => {
        alert(`Unable to login: ${err}`);
        //Add better popup UI
      });
  }

  loginWithGoogle(): void {
    const provider = new GoogleAuthProvider();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    signInWithPopup(this.auth!, provider)
      .then(() => {
        alert("Login successful!");
        //Add code to redirect to homepage when made
      })
      .catch((err: Error) => {
        alert(`Unable to login with Google: ${err}`);
        //Add better popup UI
      });
  }

  resetPassword(): void {
    this.dialog = false;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sendPasswordResetEmail(this.auth!, this.form.emailReset)
      .then(() => {
        alert(`A password reset link has been sent to ${this.form.emailReset}`);
        //Implement better popup UI
      })
      .catch((err: Error) => {
        alert(`Unable to reset password: ${err}`);
        //Implement better popup UI
      });
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
  left: 27em;
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
.btn:nth-child(3) {
  margin-left: 2%;
}
</style>