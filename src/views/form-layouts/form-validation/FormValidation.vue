<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="Form - Validation with submit & clear">
          <FormSubmitValidation></FormSubmitValidation>
        </BaseCard>

        <BaseCard heading="Form - Vuelidate">
          <FormVuelidate></FormVuelidate>
        </BaseCard>

        <BaseCard heading="Form - Vee-validate">
          <FormVeevalidate></FormVeevalidate>
        </BaseCard>

        <BaseCard heading="Form - Creating rules">
          <FormCreateRules></FormCreateRules>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FormValidation",

  data: () => ({
    page: {
      title: "FormValidation"
    },
    breadcrumbs: [
      {
        text: "Form Layouts",
        disabled: false,
        to: "#"
      },
      {
        text: "FormValidation",
        disabled: true
      }
    ]
  }),
  components: {
    FormCreateRules: () => import("./form-data/FormCreateRules"),
    FormSubmitValidation: () => import("./form-data/FormSubmitValidation"),
    FormVuelidate: () => import("./form-data/FormVuelidate"),
    FormVeevalidate: () => import("./form-data/FormVeevalidate")
  }
};
</script>
