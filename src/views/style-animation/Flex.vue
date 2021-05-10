<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" sm="12">
            <BaseCard heading="Enabling flexbox">
                <FlexEnabling></FlexEnabling>
            </BaseCard>

            <BaseCard heading="Flex direction">
                <FlexDirection></FlexDirection>
            </BaseCard>

            <BaseCard heading="Flex justify">
                <FlexJustify></FlexJustify>
            </BaseCard>

            <BaseCard heading="Flex align">
                <FlexAlign></FlexAlign>
            </BaseCard>

            <BaseCard heading="Flex align self">
                <FlexAlignSelf></FlexAlignSelf>
            </BaseCard>

            <BaseCard heading="Auto margins">
                <FlexAutoMargins></FlexAutoMargins>
            </BaseCard>

            <BaseCard heading="Using align-items">
                <FlexAlignItems></FlexAlignItems>
            </BaseCard>

            <BaseCard heading="Flex wrap">
                <FlexWrap></FlexWrap>
            </BaseCard>

            <BaseCard heading="Flex order">
                <FlexOrder></FlexOrder>
            </BaseCard>

            <BaseCard heading="Flex align content">
                <FlexAlignContent></FlexAlignContent>
            </BaseCard>

            <BaseCard heading="Flex grow and shrink">
                <FlexGrowShrink></FlexGrowShrink>
            </BaseCard>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>

export default {
  name: "Flex",

  data: () => ({
      page: {
        title: "Flex"
      },
      breadcrumbs: [
        {
          text: "Style & Animation",
          disabled: false,
          to: '#'
        },
        {
          text: "Flex",
          disabled: true
        }
      ]
  }),
  components: {
      FlexEnabling: () => import('@/components/vuetifyStyleComponents/flex/FlexEnabling'),
      FlexDirection: () => import('@/components/vuetifyStyleComponents/flex/FlexDirection'),
      FlexJustify: () => import('@/components/vuetifyStyleComponents/flex/FlexJustify'),
      FlexAlign: () => import('@/components/vuetifyStyleComponents/flex/FlexAlign'),
      FlexAlignSelf: () => import('@/components/vuetifyStyleComponents/flex/FlexAlignSelf'),
      FlexAutoMargins: () => import('@/components/vuetifyStyleComponents/flex/FlexAutoMargins'),
      FlexAlignItems: () => import('@/components/vuetifyStyleComponents/flex/FlexAlignItems'),
      FlexWrap: () => import('@/components/vuetifyStyleComponents/flex/FlexWrap'),
      FlexOrder: () => import('@/components/vuetifyStyleComponents/flex/FlexOrder'),
      FlexAlignContent: () => import('@/components/vuetifyStyleComponents/flex/FlexAlignContent'),
      FlexGrowShrink: () => import('@/components/vuetifyStyleComponents/flex/FlexGrowShrink'),
  }
};
</script>
