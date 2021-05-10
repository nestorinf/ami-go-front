<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="Images - Contain and Cover">
          <ImagesContainCover></ImagesContainCover>
        </BaseCard>

        <BaseCard heading="Images - Height">
          <ImagesHeight></ImagesHeight>
        </BaseCard>

        <BaseCard heading="Images - Fixed ratio">
          <ImagesFixedRatio></ImagesFixedRatio>
        </BaseCard>

        <BaseCard heading="Images - Placeholder">
          <ImagesPlaceholder></ImagesPlaceholder>
        </BaseCard>

        <BaseCard heading="Images - Gradients">
          <ImagesGradients></ImagesGradients>
        </BaseCard>

        <BaseCard heading="Images - Grid">
          <ImagesGrid></ImagesGrid>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Images",

  data: () => ({
    page: {
      title: "Images"
    },
    breadcrumbs: [
      {
        text: "UI Components",
        disabled: false,
        to: "#"
      },
      {
        text: "Images",
        disabled: true
      }
    ]
  }),
  components: {
    ImagesContainCover: () =>
      import("@/components/vuetifyComponents/images/ImagesContainCover"),
    ImagesHeight: () =>
      import("@/components/vuetifyComponents/images/ImagesHeight"),
    ImagesFixedRatio: () =>
      import("@/components/vuetifyComponents/images/ImagesFixedRatio"),
    ImagesPlaceholder: () =>
      import("@/components/vuetifyComponents/images/ImagesPlaceholder"),
    ImagesGradients: () =>
      import("@/components/vuetifyComponents/images/ImagesGradients"),
    ImagesGrid: () => import("@/components/vuetifyComponents/images/ImagesGrid")
  }
};
</script>
