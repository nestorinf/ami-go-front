<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" class="py-0">
        <TheRevenueCards></TheRevenueCards>
      </v-col>
      <v-col cols="12" lg="4">
        <TheBandwidthUsage></TheBandwidthUsage>
        <TheDownloadCount></TheDownloadCount>
      </v-col>
      <v-col cols="12" lg="4">
        <TheOurVisitors></TheOurVisitors>
      </v-col>
      <v-col cols="12" lg="4">
        <TheCurrentVisitors></TheCurrentVisitors>
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <TheBusinessCard></TheBusinessCard>
      </v-col>
      <v-col cols="12" sm="12" lg="8">
        <TheNewsletterCampaign></TheNewsletterCampaign>
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
  name: "Classic",

  data: () => ({
    page: {
      title: "Classic"
    },
    breadcrumbs: [
      {
        text: "Dashboard",
        disabled: false,
        to: "#"
      },
      {
        text: "Classic",
        disabled: true
      }
    ]
  }),
  components: {
    TheRevenueCards: () =>
      import(
        "@/views/dashboards/dashboardComponents/revenue-cards/TheRevenueCards"
      ),
    TheBandwidthUsage: () =>
      import(
        "@/views/dashboards/dashboardComponents/bandwidth-usage/TheBandwidthUsage"
      ),
    TheDownloadCount: () =>
      import(
        "@/views/dashboards/dashboardComponents/download-count/TheDownloadCount"
      ),
    TheOurVisitors: () =>
      import(
        "@/views/dashboards/dashboardComponents/our-visitors/TheOurVisitors"
      ),
    TheCurrentVisitors: () =>
      import(
        "@/views/dashboards/dashboardComponents/current-visitors/TheCurrentVisitors"
      ),
    TheBusinessCard: () =>
      import(
        "@/views/dashboards/dashboardComponents/business-card/TheBusinessCard"
      ),
    TheNewsletterCampaign: () =>
      import(
        "@/views/dashboards/dashboardComponents/newsletter-campaign/TheNewsletterCampaign"
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