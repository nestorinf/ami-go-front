<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" sm="12">
            <BaseCard heading="Dynamic Elevation">
                <ElevationDynamic></ElevationDynamic>
            </BaseCard>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>

export default {
  name: "Elevation",

  data: () => ({
      page: {
        title: "Elevation"
      },
      breadcrumbs: [
        {
          text: "Style & Animation",
          disabled: false,
          to: '#'
        },
        {
          text: "Elevation",
          disabled: true
        }
      ]
  }),
  components: {
      ElevationDynamic: () => import('@/components/vuetifyStyleComponents/elevation/ElevationDynamic')
  }
};
</script>
