<template>
  <div>
    <form-wizard
      @on-complete="onComplete"
      color="#1e88e5"
      :title="null"
      :subtitle="null"
      stepSize="sm"
    >
      <tab-content title="Personal details" icon="ti-user">
        <v-row>
          <v-col cols="12" lg="6" sm="6">
            <v-row class="mt-4">
              <v-col
                lg="3"
                sm="4"
                cols="12"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">First Name :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="First Name Here"
                  v-model="project1"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Last Name :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="Last Name Here"
                  v-model="project2"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col lg="6" cols="12" sm="6">
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Email :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  type="email"
                  placeholder="Email Here"
                  v-model="project3"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Contact No :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  type="tel"
                  placeholder="Contact No Here"
                  v-model="project4"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </tab-content>
      <tab-content title="Reuirements" icon="ti-settings">
        <v-row>
          <v-col lg="6" cols="12" sm="6">
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Company :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="Company Name Here"
                  v-model="project5"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Interested In :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-select :items="items" filled v-model="projectselect6" class="mt-0" hide-details></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col lg="6" cols="12" sm="6">
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Budget :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-select :items="items2" filled v-model="projectselect7" class="mt-0" hide-details></v-select>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">About Project :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="About Project Here"
                  v-model="project8"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </tab-content>
      <tab-content title="Last step" icon="ti-check">
        <v-row class="mt-4">
          <v-col lg="2" cols="12" sm="4">
            <label class="text-truncate mb-0">Total Experience :</label>
          </v-col>
          <v-col lg="9" cols="12" sm="8">
            <div class="d-block float-left mt-1">
              <v-radio-group v-model="event6">
                <v-radio label="1 year" value="radio-1"></v-radio>
                <v-radio label="2 year" value="radio-2"></v-radio>
                <v-radio label="3 year" value="radio-3"></v-radio>
                <v-radio label="4 year" value="radio-4"></v-radio>
                <v-radio label="5 year" value="radio-5"></v-radio>
              </v-radio-group>
            </div>
          </v-col>
        </v-row>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  name: "FormWizardIcon",
  data: () => ({
    title: "FormWizardIcon",
    project1: "",
    project2: "",
    project3: "",
    project4: "",
    project5: "",
    projectselect6: 0,
    projectselect7: 0,
    project8: "",
    event6: "",
    items: ["Choose Your option", "Designing", "Development"],
    items2: ["Choose Your option", "Less than $5000", "$5000 to $10000"]
  }),
  methods: {
    onComplete: function() {
      alert("Yay. Done!");
    }
  },
  components: {
    FormWizard,
    TabContent
  }
};
</script>