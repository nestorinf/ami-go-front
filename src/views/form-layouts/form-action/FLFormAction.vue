<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" lg="6">
        <CardProjectAssign></CardProjectAssign>
      </v-col>
      <v-col cols="12" lg="6">
        <CardEmployeeProfile></CardEmployeeProfile>
      </v-col>
      <v-col cols="12" lg="6">
        <CardDonation></CardDonation>
      </v-col>
      <v-col cols="12" lg="6">
        <CardComplaintForm></CardComplaintForm>
      </v-col>
      <v-col cols="12" lg="6">
        <CardEmployeeTiming></CardEmployeeTiming>
      </v-col>
      <v-col cols="12" lg="6">
        <CardIssueTracking></CardIssueTracking>
      </v-col>
      <v-col cols="12">
          <CardEventRegistration></CardEventRegistration>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FLFormAction",
  data: () => ({
    page: {
      title: "Form Action"
    },
    breadcrumbs: [
      {
        text: "Form Layouts",
        disabled: false,
        to: "#"
      },
      {
        text: "Form Action",
        disabled: true
      }
    ]
  }),
  components: {
    CardProjectAssign: () => import("./form-data/CardProjectAssign"),
    CardEmployeeProfile: () => import("./form-data/CardEmployeeProfile"),
    CardDonation: () => import("./form-data/CardDonation"),
    CardComplaintForm: () => import("./form-data/CardComplaintForm"),
    CardEmployeeTiming: () => import("./form-data/CardEmployeeTiming"),
    CardIssueTracking: () => import("./form-data/CardIssueTracking"),
    CardEventRegistration: () => import("./form-data/CardEventRegistration"),
  }
};
</script>