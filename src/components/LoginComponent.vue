/* eslint-disable no-useless-escape */
<template>
  <div id="login">
    <form id="loginForm" @submit.prevent="submit">
      <div class="form-row email-row">
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
      <div class="form-row">
        <div class="col-md-6 mb-3">
          <label for="cityInput">City</label>
          <input
            type="text"
            class="form-control"
            id="cityInput"
            v-model="form.city"
            required
          />
        </div>
        <div class="col-md-3 mb-3">
          <label for="stateInput">State</label>
          <select class="custom-select" id="stateInput" v-model="form.state" required>
            <option selected disabled value="">Choose...</option>
            <option v-for="(u, pos) in states" :key="pos">{{ u }}</option>
          </select>
        </div>
        <div class="col-md-3 mb-3">
          <label for="zipInput">Zip</label>
          <input
            type="number"
            class="form-control"
            id="zipInput"
            v-model="form.zip"
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
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";


@Component
export default class LoginComponent extends Vue {
  form = {
    email: "",
    fName: "",
    lName: "",
    state: "...",
    zip: "",
    agree: false
  };
  show = true;
  // eslint-disable-next-line no-useless-escape
  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

  submit(event: Event) {
    event.preventDefault();
    alert(JSON.stringify(this.form));
  }

  reset(event: Event) {
    event.preventDefault();
    // Reset our form values
    this.form.email = "";
    this.form.fName = "";
    this.form.lName = "";
    this.form.state = "";
    this.form.zip = "";
    this.form.agree = false
    // Trick to reset/clear native browser form validation state
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
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
}
.form-row {
  margin-left: 5%;
  margin-right: 5%;
}
.form-row:first-of-type {
  margin-top: 5%;
}
.btn {
  margin-bottom: 5%;
}
.email-row {
  justify-content: center;
}
</style>