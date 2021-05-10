<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Form Veevalidate -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <v-list-item-subtitle class="text-wrap">
      <span class="grey--text text--darken-4 font-weight-bold">vee-validate</span> is a template Based Validation Framework for Vue.js.
    </v-list-item-subtitle>
    <div class="mt-4">
      <form>
        <v-text-field
          v-validate="'required|max:10'"
          v-model="name"
          :counter="10"
          :error-messages="errors.collect('name')"
          label="Name"
          data-vv-name="name"
          required
          filled
          background-color="transparent"
        ></v-text-field>
        <v-text-field
          v-validate="'required|email'"
          v-model="email"
          :error-messages="errors.collect('email')"
          label="E-mail"
          data-vv-name="email"
          required
          filled
          background-color="transparent"
        ></v-text-field>
        <v-select
          v-validate="'required'"
          :items="items"
          v-model="select"
          :error-messages="errors.collect('select')"
          label="Select"
          data-vv-name="select"
          required
          filled
          background-color="transparent"
        ></v-select>
        <v-checkbox
          v-validate="'required'"
          v-model="checkbox"
          :error-messages="errors.collect('checkbox')"
          value="1"
          label="Option"
          data-vv-name="checkbox"
          type="checkbox"
          required
          filled
          background-color="transparent"
        ></v-checkbox>

        <v-btn @click="submit" color="success" class="mr-2">submit</v-btn>
        <v-btn @click="clear" color="error">clear</v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "FormVeevalidate",

  data: () => ({
    name: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: null,
    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        name: {
          required: () => "Name can not be empty",
          max: "The name field may not be greater than 10 characters"
          // custom messages
        },
        select: {
          required: "Select field is required"
        }
      }
    }
  }),
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },

  methods: {
    submit() {
      this.$validator.validateAll();
    },
    clear() {
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$validator.reset();
    }
  }
};
</script>