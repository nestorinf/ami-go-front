<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" lg="8">
        <TheSalesCard></TheSalesCard>
        <TheSalesOverview></TheSalesOverview>
        <v-row>
          <v-col cols="12" lg="6" class="py-0">
            <TheProductSales></TheProductSales>
          </v-col>
          <v-col cols="12" lg="6" class="py-0">
            <TheDownloadCount></TheDownloadCount>
            <TheWeatherCard></TheWeatherCard>
          </v-col>
        </v-row>
        <TheProductOverview></TheProductOverview>
      </v-col>
      <v-col cols="12" lg="4">
        <TheEarnings></TheEarnings>
        <TheDiscountCard></TheDiscountCard>
        <TheMonthlyWinnerCard></TheMonthlyWinnerCard>
        <TheNewItems></TheNewItems>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Ecommerce",

  data: () => ({
    page: {
      title: "Ecommerce"
    },
    breadcrumbs: [
      {
        text: "Dashboard",
        disabled: false,
        to: "#"
      },
      {
        text: "Ecommerce",
        disabled: true
      }
    ]
  }),
  components: {
    TheSalesCard: () =>
      import("@/views/dashboards/dashboardComponents/sales-card/TheSalesCard"),
    TheSalesOverview: () =>
      import(
        "@/views/dashboards/dashboardComponents/sales-overview/TheSalesOverview"
      ),
    TheEarnings: () =>
      import("@/views/dashboards/dashboardComponents/earnings/TheEarnings"),
    TheDiscountCard: () =>
      import(
        "@/views/dashboards/dashboardComponents/discount-card/TheDiscountCard"
      ),
    TheMonthlyWinnerCard: () =>
      import(
        "@/views/dashboards/dashboardComponents/monthly-winner-card/TheMonthlyWinnerCard"
      ),
    TheNewItems: () =>
      import("@/views/dashboards/dashboardComponents/new-items/TheNewItems"),
    TheProductSales: () =>
      import(
        "@/views/dashboards/dashboardComponents/product-sales/TheProductSales"
      ),
    TheDownloadCount: () =>
      import(
        "@/views/dashboards/dashboardComponents/download-count/TheDownloadCount"
      ),
    TheWeatherCard: () =>
      import(
        "@/views/dashboards/dashboardComponents/weather-card/TheWeatherCard"
      ),
    TheProductOverview: () =>
      import(
        "@/views/dashboards/dashboardComponents/product-overview/TheProductOverview"
      )
  }
};
</script>