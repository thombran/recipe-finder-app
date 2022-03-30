<template>
  <div id="login">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="w-25 border border-dark rounded bg-light">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        class="text-dark"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" class="text-dark" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success" id="submitButton">Submit</b-button>
      <b-button type="reset" variant="danger" id="resetButton">Reset</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  BForm,
  BCard,
  BFormGroup,
  BButton,
  BFormInput,
} from "bootstrap-vue";

@Component({
  components: {
    BForm,
    BCard,
    BFormGroup,
    BButton,
    BFormInput
  }
})
export default class LoginComponent extends Vue {
  form = {
    email: "",
    name: "",
  };
  show = true;

  onSubmit(event: Event) {
    event.preventDefault();
    alert(JSON.stringify(this.form));
  }

  onReset(event: Event) {
    event.preventDefault();
    // Reset our form values
    this.form.email = "";
    this.form.name = "";
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
  margin-left: 10%;
}
#input-group-1 {
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
}
#input-group-2 {
  margin-bottom: 5%;
  margin-left: 5%;
  margin-right: 5%;
}
#resetButton, #submitButton {
  margin-bottom: 5%;
}
</style>