<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <TheEarningCard></TheEarningCard>
      </v-col>
      <v-col cols="12" sm="12" lg="8">
        <TheTotalVisits></TheTotalVisits>
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <TheBrowserStats></TheBrowserStats>
      </v-col>
      <v-col cols="12" sm="12" lg="8">
        <TheTotalRevenue></TheTotalRevenue>
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <TheSalesPrediction></TheSalesPrediction>
        <TheSalesDifference></TheSalesDifference>
      </v-col>
      <v-col cols="12" lg="6">
        <TheRecentChats></TheRecentChats>
      </v-col>
      <v-col cols="12" lg="6">
        <TheRecentMessages></TheRecentMessages>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Minimal",
  data: () => ({
    page: {
      title: "Minimal"
    },
    breadcrumbs: [
      {
        text: "Dashboard",
        disabled: false,
        to: "#"
      },
      {
        text: "Minimal",
        disabled: true
      }
    ]
  }),
  components: {
    TheEarningCard: () =>
      import(
        "@/views/dashboards/dashboardComponents/earning-card/TheEarningCard"
      ),
    TheTotalVisits: () =>
      import(
        "@/views/dashboards/dashboardComponents/total-visits/TheTotalVisits"
      ),
    TheBrowserStats: () =>
      import(
        "@/views/dashboards/dashboardComponents/browser-stats/TheBrowserStats"
      ),
    TheTotalRevenue: () =>
      import(
        "@/views/dashboards/dashboardComponents/total-revenue/TheTotalRevenue"
      ),
    TheSalesPrediction: () =>
      import(
        "@/views/dashboards/dashboardComponents/sales-prediction/TheSalesPrediction"
      ),
    TheSalesDifference: () =>
      import(
        "@/views/dashboards/dashboardComponents/sales-difference/TheSalesDifference"
      ),
    TheRecentMessages: () =>
      import(
        "@/views/dashboards/dashboardComponents/recent-messages/TheRecentMessages"
      ),
    TheRecentChats: () =>
      import(
        "@/views/dashboards/dashboardComponents/recent-chats/TheRecentChats"
      )
  }
};
</script>