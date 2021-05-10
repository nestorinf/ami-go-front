<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Project Assigning</h3>
      <h6
        class="subtitle-2 font-weight-light"
      >This is the basic horizontal form with labels on left and form controls on right in one line. To use add class form-horizontal to the form tag and give class row with form-group.</h6>
    </v-card-text>
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Personal Info</h3>
      <div class="mt-4">
        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>First Name</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="fname"
              placeholder="Enter First Name"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Last Name</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="lname"
              placeholder="Enter Last name"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Email</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="etext"
              placeholder="Enter Email"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Contact No</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              type="tel"
              filled
              background-color="transparent"
              v-model="contactno"
              placeholder="Enter Contact No"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Requirements</h3>
      <div class="mt-4">
        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Company</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="cname"
              placeholder="Enter Company Name"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Interested In</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-select :items="interest" filled background-color="transparent" hide-details></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Budget</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-select :items="budget" filled background-color="transparent" hide-details></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>About Project</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="cname"
              placeholder="Enter About Project"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <div class="pa-5 text-right">
      <v-btn color="success" class="text-capitalize mr-2">Save</v-btn>
      <v-btn color="black" class="text-capitalize" dark>Cancel</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardSimpleForm",
  data: () => ({
    fname: "",
    lname: "",
    Email: "",
    etext: "",
    contactno: "",
    cname: "",
    interest: ["Choose your option", "Designing", "Development", "Hacking"],
    budget: [
      "Choose your option",
      "Less than $5000",
      "$5000 to $10000",
      "$10000 to %15000"
    ]
  })
};
</script>