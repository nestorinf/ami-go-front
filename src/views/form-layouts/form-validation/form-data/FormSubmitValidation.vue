<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Form Submit Validation -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <v-list-item-subtitle class="text-wrap">
      The
      <code>v-form</code> component has
      <span class="grey--text text--darken-4 font-weight-bold">three</span> functions that can be accessed by setting a ref on the component. A ref allows us to access internal methods on a component, for example,
      <code>v-form ref="form"</code>.
      <span class="grey--text text--darken-4 font-weight-bold">this.$refs.form.validate()</span> will validate all inputs and return if they are all valid or not.
      <span
        class="grey--text text--darken-4 font-weight-bold"
      >this.$refs.form.reset()</span> will clear all inputs and reset their validation errors.
      <span
        class="grey--text text--darken-4 font-weight-bold"
      >this.$refs.form.resetValidation()</span> will only reset input validation and not alter their state.
    </v-list-item-subtitle>
    <div class="mt-4">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          filled
          background-color="transparent"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          filled
          background-color="transparent"
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Item"
          required
          filled
          background-color="transparent"
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

        <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

        <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormSubmitValidation",

  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>