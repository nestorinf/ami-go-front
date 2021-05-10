<template>
  <v-container class="down-top-padding" fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <!-- ////////// 
          Card 1 
      /////////////-->
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text class="pa-5">
            <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Default Form Wizard</h3>
            <p class="text-muted">
              vue-form-wizard is a vue based component with no external depenendcies which simplifies tab wizard management and for more details click
              <a
                href="https://www.npmjs.com/package/vue-form-wizard"
                target="_blank"
              >here.</a>
            </p>
            <FormWizardIcon></FormWizardIcon>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- ////////// 
          Card 2 
      /////////////-->
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >Form Wizard with Square</h3>
            <FormWizardSquare></FormWizardSquare>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- ////////// 
          Card 3 
      /////////////-->
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >Form Wizard with Tab</h3>
            <FormWizardTab></FormWizardTab>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- ////////// 
          Card 4 
      /////////////-->
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >Form Wizard with Size</h3>
            <FormWizardSize></FormWizardSize>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- ////////// 
          Card 5 
      /////////////-->
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >Form Wizard with Step Index</h3>
            <FormWizardIndex></FormWizardIndex>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- ////////// 
          Card 6 
      /////////////-->
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >Form Wizard with Custom Text</h3>
            <FormWizardCustomText></FormWizardCustomText>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- ////////// 
          Card 7 
      /////////////-->
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >Form Wizard with Title Slot</h3>
            <FormWizardTitleSlot></FormWizardTitleSlot>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- ////////// 
          Card 8 
      /////////////-->
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >Form Wizard with Button Slot</h3>
            <FormWizardButtonSlot></FormWizardButtonSlot>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- ////////// 
          Card 9
      /////////////-->
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >Form Wizard with Call funtion before switch</h3>
            <FormWizardCallFun></FormWizardCallFun>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- ////////// 
          Card 10
      /////////////-->
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >Form Wizard with Validation</h3>
            <FormWizardValidation></FormWizardValidation>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormWizardIcon from "./FormWizardIcon";
import FormWizardSquare from "./FormWizardSquare";
import FormWizardTab from "./FormWizardTab";
import FormWizardSize from "./FormWizardSize";
import FormWizardIndex from "./FormWizardIndex";
import FormWizardCustomText from "./FormWizardCustomText";
import FormWizardTitleSlot from "./FormWizardTitleSlot";
import FormWizardButtonSlot from "./FormWizardButtonSlot";
import FormWizardCallFun from "./FormWizardCallFun";
import FormWizardValidation from "./form-wizard-validation/FormWizardValidation";

export default {
  name: "FormWizard",
  data: () => ({
    title: "FormWizard",
    page: {
      title: "Form Wizard"
    },
    breadcrumbs: [
      {
        text: "Form Layouts",
        disabled: false,
        to: "#"
      },
      {
        text: "Form Wizard",
        disabled: true
      }
    ]
  }),
  components: {
    FormWizardIcon,
    FormWizardSquare,
    FormWizardTab,
    FormWizardSize,
    FormWizardIndex,
    FormWizardCustomText,
    FormWizardTitleSlot,
    FormWizardButtonSlot,
    FormWizardCallFun,
    FormWizardValidation
  }
};
</script>