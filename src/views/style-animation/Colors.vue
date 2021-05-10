<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Material colors</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>
        <ColorsMaterial></ColorsMaterial>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Colors",

  data: () => ({
    page: {
      title: "Colors"
    },
    breadcrumbs: [
      {
        text: "Style & Animation",
        disabled: false,
        to: "#"
      },
      {
        text: "Colors",
        disabled: true
      }
    ]
  }),
  components: {
    ColorsMaterial: () =>
      import("@/components/vuetifyStyleComponents/colors/ColorsMaterial")
  }
};
</script>
