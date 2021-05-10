<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3
        class="title blue-grey--text text--darken-2 font-weight-regular"
      >Sample Form with the right Icons</h3>
      <h6 class="subtitle-2 font-weight-light">All with vuetify element attributes</h6>
    </v-card-text>
    <v-card-text class="pa-5 border-bottom">
      <v-text-field outlined label="User Name" placeholder="Username" append-icon="mdi-account"></v-text-field>
      <v-text-field outlined label="Email address" placeholder="Email" append-icon="mdi-email"></v-text-field>
      <v-text-field outlined label="Password" placeholder="Password" append-icon="mdi-lock"></v-text-field>
      <v-text-field
        outlined
        label="Confirm Password"
        placeholder="Confirm Password"
        append-icon="mdi-lock"
        hide-details
      ></v-text-field>
      <v-checkbox label="Remember me" hide-details></v-checkbox>
      <div class="mt-4">
        <v-btn color="success" class="text-capitalize mr-2">Save</v-btn>
        <v-btn color="black" class="text-capitalize" dark>Cancel</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardSampleFormwithRightIcons",
  data: () => ({})
};
</script>