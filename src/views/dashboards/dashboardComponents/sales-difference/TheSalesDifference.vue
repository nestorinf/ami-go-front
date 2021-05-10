<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5">
      <h3 class="title font-weight-regular">Sales Difference</h3>
      <v-row class="mt-3">
        <v-col cols="6">
          <span class="display-1 success--text font-weight-light">$4316</span>
          <h6 class="subtitle-2 font-weight-regular mt-2">10% Increased</h6>
          <h5 class="subtitle-1 text-no-wrap">(150-165 Sales)</h5>
        </v-col>
        <v-col cols="6">
          <div class="position-relative float-right mt-n4" style="height: 80px;">
            <vue-apex-charts
              type="donut"
              width="150"
              :options="SalesDifferenceData.differenceChart.chartOptions"
              :series="SalesDifferenceData.differenceChart.series"
            ></vue-apex-charts>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import SalesDifferenceData from "./SalesDifferenceData";

export default {
  name: "TheSalesDifference",
  data: () => ({
    SalesDifferenceData: SalesDifferenceData
  }),
  components: {
    VueApexCharts
  }
};
</script>