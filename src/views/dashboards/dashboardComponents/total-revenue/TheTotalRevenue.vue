<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5">
      <div class="d-md-flex align-center">
        <div>
          <h3 class="title font-weight-regular">Total Revenue</h3>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <div class="d-flex align-center text-truncate text-nowrap">
            <div class="d-flex align-center px-2">
              <span>
                <span class="subtitle-2 error--text">
                  <i class="fa fa-circle mr-2"></i>
                </span>
                <span class="font-weight-regular blue-grey--text text--lighten-2 mr-2">2015</span>
              </span>
            </div>
            <div class="d-flex align-center px-2">
              <span>
                <span class="subtitle-2 success--text">
                  <i class="fa fa-circle mr-2"></i>
                </span>
                <span class="font-weight-regular blue-grey--text text--lighten-2 mr-2">2020</span>
              </span>
            </div>
            <div class="d-flex align-center px-2">
              <span>
                <span class="subtitle-2 info--text">
                  <i class="fa fa-circle mr-2"></i>
                </span>
                <span class="font-weight-regular blue-grey--text text--lighten-2 mr-2">2025</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <vue-apex-charts
        class="mt-6"
        type="bar"
        height="316px"
        :options="RevenueChart.RevenueChart.chartOptions"
        :series="RevenueChart.RevenueChart.series"
      ></vue-apex-charts>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import RevenueChart from "./TotalRevenueData";

export default {
  name: "TheTotalRevenue",
  data: () => ({
    RevenueChart: RevenueChart
  }),
  components: {
    VueApexCharts
  }
};
</script>