<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" sm="12">
            <BaseCard heading="Transitions - Slide X transitions">
                <TransitionsSlideX></TransitionsSlideX>
            </BaseCard>

            <BaseCard heading="Transitions - Slide Y transitions">
                <TransitionsSlideY></TransitionsSlideY>
            </BaseCard>

            <BaseCard heading="Transitions - Scroll X transitions">
                <TransitionsScrollX></TransitionsScrollX>
            </BaseCard>

            <BaseCard heading="Transitions - Scroll Y transitions">
                <TransitionsScrollY></TransitionsScrollY>
            </BaseCard>

            <BaseCard heading="Transitions - Scale transition">
                <TransitionsScale></TransitionsScale>
            </BaseCard>

            <BaseCard heading="Transitions - Fab transition">
                <TransitionsFab></TransitionsFab>
            </BaseCard>

            <BaseCard heading="Transitions - Fade transition">
                <TransitionsFade></TransitionsFade>
            </BaseCard>

            <BaseCard heading="Transitions - Expand transition">
                <TransitionsExpand></TransitionsExpand>
            </BaseCard>

            <BaseCard heading="Transitions - Custom Origin">
                <TransitionsCustomOrigin></TransitionsCustomOrigin>
            </BaseCard>

            <BaseCard heading="Transitions - Todo list">
                <TransitionsTodoList></TransitionsTodoList>
            </BaseCard>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>


export default {
  name: "Transitions",

  data: () => ({
      page: {
        title: "Transitions"
      },
      breadcrumbs: [
        {
          text: "Style & Animation",
          disabled: false,
          to: '#'
        },
        {
          text: "Transitions",
          disabled: true
        }
      ]
  }),
  components: {
      TransitionsSlideX: () => import('@/components/vuetifyStyleComponents/transitions/TransitionsSlideX'),
      TransitionsSlideY: () => import('@/components/vuetifyStyleComponents/transitions/TransitionsSlideY'),
      TransitionsScrollX: () => import('@/components/vuetifyStyleComponents/transitions/TransitionsScrollX'),
      TransitionsScrollY: () => import('@/components/vuetifyStyleComponents/transitions/TransitionsScrollY'),
      TransitionsScale: () => import('@/components/vuetifyStyleComponents/transitions/TransitionsScale'),
      TransitionsFab: () => import('@/components/vuetifyStyleComponents/transitions/TransitionsFab'),
      TransitionsFade: () => import('@/components/vuetifyStyleComponents/transitions/TransitionsFade'),
      TransitionsExpand: () => import('@/components/vuetifyStyleComponents/transitions/TransitionsExpand'),
      TransitionsCustomOrigin: () => import('@/components/vuetifyStyleComponents/transitions/TransitionsCustomOrigin'),
      TransitionsTodoList: () => import('@/components/vuetifyStyleComponents/transitions/TransitionsTodoList')
  }
};
</script>
