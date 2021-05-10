<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" class="py-0">
        <ThePieCards></ThePieCards>
      </v-col>
      <v-col cols="12" lg="4" sm="12">
        <TheSalesOverview2></TheSalesOverview2>
      </v-col>
      <v-col cols="12" lg="4" sm="12">
        <TheNewsletterCampaign2></TheNewsletterCampaign2>
      </v-col>
      <v-col cols="12" lg="4" sm="12">
        <TheCurrentVisitors></TheCurrentVisitors>
      </v-col>
      <v-col cols="12" sm="12" lg="8">
        <TheMonthTable></TheMonthTable>
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <TheFullProfileDetailCard></TheFullProfileDetailCard>
      </v-col>
      <v-col cols="12" sm="12" lg="6">
        <TheRecentComments></TheRecentComments>
      </v-col>
      <v-col cols="12" sm="12" lg="6">
        <TheTodoList></TheTodoList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Demographical",

  data: () => ({
    page: {
      title: "Demographical"
    },
    breadcrumbs: [
      {
        text: "Dashboard",
        disabled: false,
        to: "#"
      },
      {
        text: "Demographical",
        disabled: true
      }
    ]
  }),
  components: {
    ThePieCards: () =>
      import("@/views/dashboards/dashboardComponents/pie-cards/ThePieCards"),
    TheSalesOverview2: () =>
      import(
        "@/views/dashboards/dashboardComponents/sales-overview2/TheSalesOverview2"
      ),
    TheNewsletterCampaign2: () =>
      import(
        "@/views/dashboards/dashboardComponents/newsletter-campaign2/TheNewsletterCampaign2"
      ),
    TheCurrentVisitors: () =>
      import(
        "@/views/dashboards/dashboardComponents/current-visitors/TheCurrentVisitors"
      ),
    TheMonthTable: () =>
      import(
        "@/views/dashboards/dashboardComponents/month-table/TheMonthTable"
      ),
    TheFullProfileDetailCard: () =>
      import(
        "@/views/dashboards/dashboardComponents/full-profile-detail-card/TheFullProfileDetailCard"
      ),
    TheRecentComments: () =>
      import(
        "@/views/dashboards/dashboardComponents/recent-comments/TheRecentComments"
      ),
    TheTodoList: () =>
      import("@/views/dashboards/dashboardComponents/todo-list/TheTodoList")
  }
};
</script>