<template>
    <v-container fluid class="down-top-padding">
        <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        <v-row>
            <v-col cols="12" sm="12" lg="8">
                <TheSalesOverview></TheSalesOverview>
            </v-col>
            <v-col cols="12" sm="12" lg="4">
                <TheOurVisitors></TheOurVisitors>
            </v-col>
            <v-col cols="12" sm="12" lg="4">
                <TheBusinessCard></TheBusinessCard>
            </v-col>
            <v-col cols="12" sm="12" lg="8">
                <TheNewsletterCampaign></TheNewsletterCampaign>
            </v-col>
            <v-col cols="12" sm="12" lg="4">
                <TheBandwidthUsage></TheBandwidthUsage>
            </v-col>
            <v-col cols="12" sm="12" lg="4">
                <TheDownloadCount></TheDownloadCount>
            </v-col>
            <v-col cols="12" sm="12" lg="4">
                <TheWeatherCard></TheWeatherCard>
            </v-col>
            <v-col cols="12" sm="12" lg="4">
                <TheProfileCard></TheProfileCard>
                <TheMyContacts></TheMyContacts>
            </v-col>
            <v-col cols="12" sm="12" lg="8">
                <TheActivityTimeline></TheActivityTimeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
  name: "Analytical",

  data: () => ({
      page: {
        title: "Analytical"
      },
      breadcrumbs: [
        {
          text: "Dashboard",
          disabled: false,
          to: '#'
        },
        {
          text: "Analytical",
          disabled: true
        }
      ]
  }),
  components: {
      TheSalesOverview: () => import('@/views/dashboards/dashboardComponents/sales-overview/TheSalesOverview'),
      TheOurVisitors: () => import('@/views/dashboards/dashboardComponents/our-visitors/TheOurVisitors'),
      TheBusinessCard: () => import('@/views/dashboards/dashboardComponents/business-card/TheBusinessCard'),
      TheNewsletterCampaign: () => import('@/views/dashboards/dashboardComponents/newsletter-campaign/TheNewsletterCampaign'),
      TheBandwidthUsage: () => import('@/views/dashboards/dashboardComponents/bandwidth-usage/TheBandwidthUsage'),
      TheDownloadCount: () => import('@/views/dashboards/dashboardComponents/download-count/TheDownloadCount'),
      TheWeatherCard: () => import('@/views/dashboards/dashboardComponents/weather-card/TheWeatherCard'),
      TheProfileCard: () => import('@/views/dashboards/dashboardComponents/profile-card/TheProfileCard'),
      TheMyContacts: () => import('@/views/dashboards/dashboardComponents/my-contacts/TheMyContacts'),
      TheActivityTimeline: () => import('@/views/dashboards/dashboardComponents/activity-timeline/TheActivityTimeline'),
  }
};

</script>