<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Issue Tracking</h3>
      <v-alert
        icon="mdi-alert-outline"
        outlined
        text
        type="info"
        class="my-4 caption pa-3"
      >Form Action at left ending of the form.</v-alert>
      <h6
        class="subtitle-2 font-weight-light"
      >To use add form actions on top of the form add a div with .action-form class to ending of the form. To set a side of the button use .text-right or .text-left as per requirement.</h6>
    </v-card-text>
    <v-card-text class="pa-5 border-bottom">
      <form>
        <v-row class="mt-3">
          <v-col cols="12">
            <v-text-field label="Issue Title"></v-text-field>
            <v-text-field label="Opened By"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" lg="6">
            <v-text-field label="Date Opened" type="date"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" lg="6">
            <v-text-field label="Date Fixed" type="date"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select :items="interest" label="Priority" class="mt-0 pt-0"></v-select>
            <v-select :items="budget" label="Status"></v-select>
            <v-textarea counter label="About Project" rows="2" :rules="rules" :value="value"></v-textarea>
          </v-col>
        </v-row>
      </form>
    </v-card-text>
    <div class="pa-5 border-top">
      <v-btn color="info" class="mr-2 text-capitalize">Save</v-btn>
      <v-btn color="black" class="text-capitalize" dark>Cancel</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardIssueTracking",
  data: () => ({
    interest: ["Low", "Medium", "High"],
    budget: ["Started", "Not Started", "Fixed"],
    value: "Message",
    rules: [v => v.length <= 25 || "Max 25 characters"]
  })
};
</script>