<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Event Registration</h3>
      <h6
        class="subtitle-2 font-weight-light"
      >This is the event registration form with labels on left and form controls on right in one line. To use add class form-horizontal to the form tag and give class row with form-group.</h6>
    </v-card-text>
    <v-card-text class="pa-5 border-bottom">
      <div class="mt-4">
        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Full Name</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="fname"
              placeholder="Enter Full name"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Title</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="title"
              placeholder="Enter Title here"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Company</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="company"
              placeholder="Enter Company name here"
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
              v-model="email"
              type="email"
              placeholder="Enter Email here"
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
              filled
              background-color="transparent"
              v-model="cno"
              type="tel"
              placeholder="Enter Contact no here"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Existing Customer</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-radio-group v-model="customer" class="mb-0">
              <v-radio label="Yes" color="info" value="yes" class="mt-2"></v-radio>
              <v-radio label="No" color="info" value="no"></v-radio>
            </v-radio-group>
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
  name: "CardEventRegistration",
  data: () => ({
    fname: "",
    cno: "",
    title: "",
    company: "",
    email: "",
    customer: "yes"
  })
};
</script>