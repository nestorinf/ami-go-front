<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <TheProgressCard></TheProgressCard>
        <TheSalesofAmplePixel></TheSalesofAmplePixel>
      </v-col>
      <v-col cols="12" lg="7">
        <TheMonthlyCount></TheMonthlyCount>
      </v-col>
      <v-col cols="12" lg="5">
        <TheBandwidthUsage></TheBandwidthUsage>
        <TheDownloadCount></TheDownloadCount>
      </v-col>
      <v-col cols="12" lg="7">
        <TheProductAvailibility></TheProductAvailibility>
      </v-col>
      <v-col cols="12" lg="5">
        <TheNotification></TheNotification>
      </v-col>
      <v-col cols="12" lg="8">
        <TheReviews></TheReviews>
      </v-col>
      <v-col cols="12" lg="4">
        <TheVisitSource></TheVisitSource>
      </v-col>
      <v-col cols="12" lg="8">
        <TheExperiences></TheExperiences>
      </v-col>
      <v-col cols="12" lg="4">
        <TheBackgroundProfileCard></TheBackgroundProfileCard>
      </v-col>
      <v-col cols="12" sm="12" lg="8">
        <TheActivityTimeline></TheActivityTimeline>
      </v-col>
      <v-col cols="12" lg="4">
        <TheFollowerCard></TheFollowerCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Overview",
  data: () => ({
    page: {
      title: "Overview"
    },
    breadcrumbs: [
      {
        text: "Dashboard",
        disabled: false,
        to: "#"
      },
      {
        text: "Overview",
        disabled: true
      }
    ]
  }),
  components: {
    TheProgressCard: () =>
      import(
        "@/views/dashboards/dashboardComponents/progress-card/TheProgressCard"
      ),
    TheSalesofAmplePixel: () =>
      import(
        "@/views/dashboards/dashboardComponents/sales-of-ample-pixel/TheSalesofAmplePixel"
      ),
    TheMonthlyCount: () =>
      import(
        "@/views/dashboards/dashboardComponents/monthly-count/TheMonthlyCount"
      ),
    TheBandwidthUsage: () =>
      import(
        "@/views/dashboards/dashboardComponents/bandwidth-usage/TheBandwidthUsage"
      ),
    TheDownloadCount: () =>
      import(
        "@/views/dashboards/dashboardComponents/download-count/TheDownloadCount"
      ),
    TheProductAvailibility: () =>
      import(
        "@/views/dashboards/dashboardComponents/product-availibility/TheProductAvailibility"
      ),
    TheNotification: () =>
      import(
        "@/views/dashboards/dashboardComponents/notification/TheNotification"
      ),
    TheReviews: () =>
      import("@/views/dashboards/dashboardComponents/reviews/TheReviews"),
    TheVisitSource: () =>
      import(
        "@/views/dashboards/dashboardComponents/visit-source/TheVisitSource"
      ),
    TheExperiences: () =>
      import(
        "@/views/dashboards/dashboardComponents/experiences/TheExperiences"
      ),
    TheBackgroundProfileCard: () =>
      import(
        "@/views/dashboards/dashboardComponents/background-profile-card/TheBackgroundProfileCard"
      ),
    TheActivityTimeline: () =>
      import(
        "@/views/dashboards/dashboardComponents/activity-timeline/TheActivityTimeline"
      ),
    TheFollowerCard: () =>
      import(
        "@/views/dashboards/dashboardComponents/follower-card/TheFollowerCard"
      )
  }
};
</script>