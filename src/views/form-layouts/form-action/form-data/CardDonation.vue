<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <div class="d-flex align-start">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Donation</h3>
        <div class="ml-auto">
          <v-text-field label="Search" single-line class="mt-0 pt-0"></v-text-field>
        </div>
      </div>

      <v-alert
        icon="mdi-alert-outline"
        outlined
        text
        type="info"
        class="my-4 caption pa-3"
      >Form Action at center align of the form</v-alert>
      <h6
        class="subtitle-2 font-weight-light"
      >To use add form actions on top of the form add a div with .action-form class to the ending of the form. To set a side of the button use .text-center as per requirement.</h6>
      <v-row class="mt-3">
        <v-col cols="12">
          <v-text-field label="Full Name"></v-text-field>
          <v-text-field label="Email"></v-text-field>
          <v-text-field label="Contact no"></v-text-field>
          <v-text-field label="Donation Type"></v-text-field>
          <v-textarea class="mx-2" label="Amount" rows="1" prepend-inner-icon="mdi-currency-usd"></v-textarea>
          <v-textarea counter label="Comments" rows="2" :rules="rules" :value="value"></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <div class="pa-5 border-top text-center">
      <v-btn color="info" class="mr-2 text-capitalize">Save</v-btn>
      <v-btn color="black" class="text-capitalize" dark>Cancel</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardDonation",
  data: () => ({
    value: "Message",
    rules: [v => v.length <= 25 || "Max 25 characters"]
  })
};
</script>