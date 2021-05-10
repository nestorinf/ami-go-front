<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" sm="12">
            <BaseCard heading="Spacing - How it works">
                <SpacingHowWorks></SpacingHowWorks>
            </BaseCard>

            <BaseCard heading="Spacing  - Horizontal">
                <SpacingHorizontal></SpacingHorizontal>
            </BaseCard>

            <BaseCard heading="Spacing  - Negative margin">
                <SpacingNegativeMargin></SpacingNegativeMargin>
            </BaseCard>

            <BaseCard heading="Spacing  - With breakpoints">
                <SpacingBreakpoints></SpacingBreakpoints>
            </BaseCard>

            <BaseCard heading="Spacing  - How it works">
                <SpacingBreakpointsHowWorks></SpacingBreakpointsHowWorks>
            </BaseCard>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>

export default {
  name: "Spacing",

  data: () => ({
      page: {
        title: "Spacing"
      },
      breadcrumbs: [
        {
          text: "Style & Animation",
          disabled: false,
          to: '#'
        },
        {
          text: "Spacing",
          disabled: true
        }
      ]
  }),
  components: {
      SpacingHowWorks: () => import('@/components/vuetifyStyleComponents/spacing/SpacingHowWorks'),
      SpacingHorizontal: () => import('@/components/vuetifyStyleComponents/spacing/SpacingHorizontal'),
      SpacingNegativeMargin: () => import('@/components/vuetifyStyleComponents/spacing/SpacingNegativeMargin'),
      SpacingBreakpoints: () => import('@/components/vuetifyStyleComponents/spacing/SpacingBreakpoints'),
      SpacingBreakpointsHowWorks: () => import('@/components/vuetifyStyleComponents/spacing/SpacingBreakpointsHowWorks')
  }
};
</script>
