<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Employee Timing</h3>
      <v-alert
        icon="mdi-alert-outline"
        outlined
        text
        type="info"
        class="my-4 caption pa-3"
      >Form Action at left ending of the form.</v-alert>
      <h6
        class="subtitle-2 font-weight-light"
      >To use add form actions on top of the form add a div with .action-form class to left ending of the form. To set a side of the button use .text-left or .text-right as per requirement.</h6>
    </v-card-text>
    <v-card-text class="pa-5 border-bottom">
      <form>
        <v-row>
          <v-col cols="12">
            <v-textarea label="Employee Name" rows="1" prepend-inner-icon="mdi-account-circle"></v-textarea>
            <v-textarea label="Project Name" rows="1" prepend-inner-icon="mdi-book"></v-textarea>
            <v-text-field label="Date" type="date"></v-text-field>
            <v-textarea label="Rate Per Hour" rows="1" prepend-inner-icon="mdi-currency-usd"></v-textarea>
          </v-col>
          <v-col cols="12" sm="6" lg="6">
            <v-text-field label="Start Time" type="date"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" lg="6">
            <v-text-field label="End Time" type="date"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea counter label="Notes" rows="2" :rules="rules" :value="value"></v-textarea>
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
  name: "CardEmployeeTiming",
  data: () => ({
    value: "Message",
    rules: [v => v.length <= 25 || "Max 25 characters"]
  })
};
</script>