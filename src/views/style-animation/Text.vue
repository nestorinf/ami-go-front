<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" sm="12">
            <BaseCard heading="Text - Text alignment">
                <TextAlignment></TextAlignment>
            </BaseCard>

            <BaseCard heading="Text  - Text wrapping and overflow">
                <TextWrappingOverflow></TextWrappingOverflow>
            </BaseCard>

            <BaseCard heading="Text  - Text transform">
                <TextTransform></TextTransform>
            </BaseCard>

            <BaseCard heading="Text  - Font weights and italics">
                <TextFontweightsItalics></TextFontweightsItalics>
            </BaseCard>

            <BaseCard heading="Text  - Text opacity">
                <Textopacity></Textopacity>
            </BaseCard>

            <BaseCard heading="Text  - RTL Alignment">
                <TextRTLAlignment></TextRTLAlignment>
            </BaseCard>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>

export default {
  name: "Text",

  data: () => ({
      page: {
        title: "Text"
      },
      breadcrumbs: [
        {
          text: "Style & Animation",
          disabled: false,
          to: '#'
        },
        {
          text: "Text",
          disabled: true
        }
      ]
  }),
  components: {
      TextAlignment: () => import('@/components/vuetifyStyleComponents/text/TextAlignment'),
      TextWrappingOverflow: () => import('@/components/vuetifyStyleComponents/text/TextWrappingOverflow'),
      TextTransform: () => import('@/components/vuetifyStyleComponents/text/TextTransform'),
      TextFontweightsItalics: () => import('@/components/vuetifyStyleComponents/text/TextFontweightsItalics'),
      Textopacity: () => import('@/components/vuetifyStyleComponents/text/Textopacity'),
      TextRTLAlignment: () => import('@/components/vuetifyStyleComponents/text/TextRTLAlignment')
  }
};
</script>
