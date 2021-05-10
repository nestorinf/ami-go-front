<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-5">
      <h3 class="title font-weight-regular">Sales Overview</h3>
      <h6 class="subtitle-2 font-weight-light">Ample Admin Vs Pixel Admin</h6>

      <div v-show="elementVisible">
        <vue-apex-charts
          type="bar"
          height="284px"
          :options="SalesoverChart.SalesoverChart.chartOptions"
          :series="SalesoverChart.SalesoverChart.series"
        ></vue-apex-charts>
      </div>
      <div class="d-flex align-center justify-center">
        <div class="d-flex align-center px-2">
          <span class="success--text">
            <span class="overline">
              <i class="fa fa-circle mr-2"></i>
            </span>
            <span class="font-weight-regular mr-1">Ample</span>
          </span>
        </div>
        <div class="d-flex align-center px-2">
          <span class="info--text">
            <span class="overline">
              <i class="fa fa-circle mr-2"></i>
            </span>
            <span class="font-weight-regular mr-1">Pixel</span>
          </span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import SalesoverChart from "./SalesOverviewData2";

export default {
  name: "TheSalesOverview2",
  data: () => ({
    SalesoverChart: SalesoverChart,
    elementVisible: false,
  }),
  created() {
    setTimeout(() => (this.elementVisible = true), 10);
  },
  components: {
    VueApexCharts,
  },
};
</script>