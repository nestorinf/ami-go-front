<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" sm="12">
            <BaseCard heading="Typography - Font sizes">
                <TypographyFontSize></TypographyFontSize>
            </BaseCard>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>

export default {
  name: "Typography",

  data: () => ({
      page: {
        title: "Typography"
      },
      breadcrumbs: [
        {
          text: "Style & Animation",
          disabled: false,
          to: '#'
        },
        {
          text: "Typography",
          disabled: true
        }
      ]
  }),
  components: {
      TypographyFontSize : () => import('@/components/vuetifyStyleComponents/typography/TypographyFontSize'),
  }
};
</script>
