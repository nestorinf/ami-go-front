<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" sm="12">
            <BaseCard heading="Display">
                <DisplayDefault></DisplayDefault>
            </BaseCard>
            <BaseCard heading="Visibility">
                <DisplayVisibility></DisplayVisibility>
            </BaseCard>
            <BaseCard heading="Display in print">
                <DisplayinPrint></DisplayinPrint>
            </BaseCard>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>

export default {
  name: "Display",

  data: () => ({
      page: {
        title: "Display"
      },
      breadcrumbs: [
        {
          text: "Style & Animation",
          disabled: false,
          to: '#'
        },
        {
          text: "Display",
          disabled: true
        }
      ]
  }),
  components: {
      DisplayDefault: () => import('@/components/vuetifyStyleComponents/display/DisplayDefault'),
      DisplayVisibility: () => import('@/components/vuetifyStyleComponents/display/DisplayVisibility'),
      DisplayinPrint: () => import('@/components/vuetifyStyleComponents/display/DisplayinPrint')
  }
};
</script>
