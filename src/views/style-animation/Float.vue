<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" sm="12">
            <BaseCard heading="Float - Classes">
                <FloatClasses></FloatClasses>
            </BaseCard>

            <BaseCard heading="Float  - Responsive">
                <FloatResponsive></FloatResponsive>
            </BaseCard>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>

export default {
  name: "Float",

  data: () => ({
      page: {
        title: "Float"
      },
      breadcrumbs: [
        {
          text: "Style & Animation",
          disabled: false,
          to: '#'
        },
        {
          text: "Float",
          disabled: true
        }
      ]
  }),
  components: {
      FloatClasses: () => import('@/components/vuetifyStyleComponents/float/FloatClasses'),
      FloatResponsive: () => import('@/components/vuetifyStyleComponents/float/FloatResponsive'),
  }
};
</script>
