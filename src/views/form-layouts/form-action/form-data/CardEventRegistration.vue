<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <div class="d-flex align-start">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Event Registration</h3>
      </div>

      <v-alert
        icon="mdi-alert-outline"
        outlined
        text
        type="info"
        class="my-4 caption pa-3"
      >Form Action at mulitple space top,bottom and left,right.</v-alert>
      <h6
        class="subtitle-2 font-weight-light"
      >To use add class .action-form at which side you want to add buttons.</h6>
      <v-row class="mt-3">
        <v-col cols="12">
          <v-text-field label="Full Name"></v-text-field>
          <v-text-field label="Title"></v-text-field>
          <v-text-field label="Company Name"></v-text-field>
          <v-text-field label="Email"></v-text-field>
          <v-text-field label="Contact no"></v-text-field>
          <v-radio-group v-model="ex7" column class="mb-0">
            <label>Existing Customer</label>
            <v-radio label="Yes" color="info" value="yes" class="mt-2"></v-radio>
            <v-radio label="No" color="info" value="no"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-card-text>
    <div class="pa-5 border-top">
      <v-btn color="info" class="mr-2 text-capitalize">Save</v-btn>
      <v-btn color="black" class="text-capitalize" dark>Cancel</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardEventRegistration",
  data: () => ({
    ex7: "red"
  })
};
</script>