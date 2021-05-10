<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12">
        <CardProjectAssign></CardProjectAssign>
        <CardEmployeeProfile></CardEmployeeProfile>
        <CardEmployeeTiming></CardEmployeeTiming>
        <CardEventRegistration></CardEventRegistration>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FLFormHorizontal",
  data: () => ({
    page: {
      title: "Form Horizontal"
    },
    breadcrumbs: [
      {
        text: "Form Layouts",
        disabled: false,
        to: "#"
      },
      {
        text: "Form Horizontal",
        disabled: true
      }
    ]
  }),
  components: {
    CardProjectAssign: () => import("./form-data/CardProjectAssign"),
    CardEmployeeProfile: () => import("./form-data/CardEmployeeProfile"),
    CardEmployeeTiming: () => import("./form-data/CardEmployeeTiming"),
    CardEventRegistration: () => import("./form-data/CardEventRegistration")
  }
};
</script>