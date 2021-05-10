<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12">
        <CardGeneralForm></CardGeneralForm>
        <CardDefaultForm></CardDefaultForm>
        <CardSampleForm></CardSampleForm>
        <CardDefaultBasicForm></CardDefaultBasicForm>
        <CardInputGroupForm></CardInputGroupForm>
        <CardInputStateForm></CardInputStateForm>
        <CardDisabledForm></CardDisabledForm>
        <CardSimpleForm></CardSimpleForm>
      </v-col>
      <v-col cols="12" sm="6">
        <CardSampleFormwithIcons></CardSampleFormwithIcons>
      </v-col>
      <v-col cols="12" sm="6">
        <CardSampleFormwithRightIcons></CardSampleFormwithRightIcons>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FLFormBasic",
  data: () => ({
    page: {
      title: "Form Basic"
    },
    breadcrumbs: [
      {
        text: "Form Layouts",
        disabled: false,
        to: "#"
      },
      {
        text: "Form Basic",
        disabled: true
      }
    ]
  }),
  components: {
    CardGeneralForm: () => import("./form-data/CardGeneralForm"),
    CardDefaultForm: () => import("./form-data/CardDefaultForm"),
    CardSampleForm: () => import("./form-data/CardSampleForm"),
    CardDefaultBasicForm: () => import("./form-data/CardDefaultBasicForm"),
    CardInputGroupForm: () => import("./form-data/CardInputGroupForm"),
    CardInputStateForm: () => import("./form-data/CardInputStateForm"),
    CardDisabledForm: () => import("./form-data/CardDisabledForm"),
    CardSimpleForm: () => import("./form-data/CardSimpleForm"),
    CardSampleFormwithIcons: () =>
      import("./form-data/CardSampleFormwithIcons"),
    CardSampleFormwithRightIcons: () =>
      import("./form-data/CardSampleFormwithRightIcons")
  }
};
</script>