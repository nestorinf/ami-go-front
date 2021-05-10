<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" sm="12">
            <BaseCard heading="Block quote">
                <ContentBlockquote></ContentBlockquote>
            </BaseCard>
            <BaseCard heading="Paragraphs">
                <ContentParagraphs></ContentParagraphs>
            </BaseCard>
            <BaseCard heading="Code">
                <ContentCode></ContentCode>
            </BaseCard>
            <BaseCard heading="Variables">
                <ContentVariables></ContentVariables>
            </BaseCard>
            <BaseCard heading="User input">
                <ContentUserInput></ContentUserInput>
            </BaseCard>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>

export default {
  name: "Content",

  data: () => ({
      page: {
        title: "Content"
      },
      breadcrumbs: [
        {
          text: "Style & Animation",
          disabled: false,
          to: '#'
        },
        {
          text: "Content",
          disabled: true
        }
      ]
  }),
  components: {
      ContentBlockquote: () => import('@/components/vuetifyStyleComponents/content/ContentBlockquote'),
      ContentParagraphs: () => import('@/components/vuetifyStyleComponents/content/ContentParagraphs'),
      ContentCode: () => import('@/components/vuetifyStyleComponents/content/ContentCode'),
      ContentVariables: () => import('@/components/vuetifyStyleComponents/content/ContentVariables'),
      ContentUserInput: () => import('@/components/vuetifyStyleComponents/content/ContentUserInput')
  }
};
</script>
