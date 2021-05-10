<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-5 success">
      <div class="d-flex align-center">
        <div class="align-self-center">
          <h1 class="white--text display-1">
            <i class="icon-cloud-download"></i>
          </h1>
        </div>
        <div class="mx-4">
          <h3 class="card-title white--text title font-weight-regular">
            Download Count
          </h3>
          <h6
            class="card-subtitle white--text op-5 subtitle-2 font-weight-regular"
          >
            March 2021
          </h6>
        </div>
      </div>
      <v-row class="mt-2">
        <v-col cols="4" class="d-flex align-center">
          <h2 class="font-weight-light white--text text-nowrap">35487</h2>
        </v-col>
        <v-col cols="8">
          <div class="float-right" v-show="elementVisible">
            <vue-apex-charts
              type="bar"
              height="70px"
              width="150px"
              :options="DownloadChart.DownloadChart.chartOptions"
              :series="DownloadChart.DownloadChart.series"
            ></vue-apex-charts>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import DownloadChart from "./DownloadData";

export default {
  name: "TheDownloadCount",
  data: () => ({
    elementVisible: false,
    DownloadChart: DownloadChart,
  }),
  created() {
    setTimeout(() => (this.elementVisible = true), 10);
  },
  components: {
    VueApexCharts,
  },
};
</script>