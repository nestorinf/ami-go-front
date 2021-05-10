<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" sm="12">
            <BaseCard heading="Programmatic Scrolling">
                
            </BaseCard>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
// import ProgrammaticScrolling from "@/components/vuetifyStyleComponents/scroll/ProgrammaticScrolling";


export default {
  name: "ProgrammaticScrolling",

  data: () => ({
      page: {
        title: "ProgrammaticScrolling"
      },
      breadcrumbs: [
        {
          text: "Style & Animation",
          disabled: false,
          to: '#'
        },
        {
          text: "ProgrammaticScrolling",
          disabled: true
        }
      ]
  }),
  components: {
    //   ProgrammaticScrolling,
  }
};
</script>
