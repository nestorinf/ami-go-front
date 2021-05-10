<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Employee Timing</h3>
      <h6
        class="subtitle-2 font-weight-light"
      >This is the employee timing form with labels on left and form controls on right in one line. To use add class form-horizontal to the form tag and give class row with form-group.</h6>
    </v-card-text>
    <v-card-text class="pa-5 border-bottom">
      <div class="mt-4">
        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Employee Name</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="ename"
              placeholder="Enter Employee name"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Project Name</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="pname"
              placeholder="Enter Project name"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Date</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="date"
              type="date"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Rate Per Hour</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="rate"
              placeholder="Enter Rate Per Hour"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Start Time</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="stime"
              type="time"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>End Time</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="etime"
              type="time"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Notes</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              filled
              background-color="transparent"
              v-model="notes"
              placeholder="Notes here"
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
  name: "CardEmployeeTiming",
  data: () => ({
    ename: "",
    pname: "",
    date: "",
    rate: "",
    stime: "",
    etime: "",
    notes: ""
  })
};
</script>