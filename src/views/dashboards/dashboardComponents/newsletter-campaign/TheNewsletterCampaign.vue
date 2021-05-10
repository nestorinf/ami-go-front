<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-5">
      <div class="d-md-flex align-center">
        <div>
          <h3 class="title font-weight-regular">Newsletter Campaign</h3>
          <h6 class="subtitle-2 font-weight-light">
            Overview of Newsletter Campaign
          </h6>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <div class="d-md-flex align-center text-truncate text-nowrap">
            <div class="d-flex align-center px-2">
              <span class="success--text">
                <span class="overline">
                  <i class="fa fa-circle mx-2"></i>
                </span>
                <span class="font-weight-regular">Open Rate</span>
              </span>
            </div>
            <div class="d-flex align-center px-2">
              <span class="info--text">
                <span class="overline">
                  <i class="fa fa-circle mx-2"></i>
                </span>
                <span class="font-weight-regular">Recurring Payments</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style="max-height: 300px"
        class="mt-5 mt-md-0"
        v-show="elementVisible"
      >
        <vue-apex-charts
          type="area"
          height="285"
          :options="apexChartData.lineAreaChartSpline.chartOptions"
          :series="apexChartData.lineAreaChartSpline.series"
        ></vue-apex-charts>
      </div>
      <v-row class="text-center justify-center">
        <v-col cols="6" sm="4" class="text-truncate">
          <h1 class="mb-0 font-weight-light display-1">5098</h1>
          <small class>Total Sent</small>
        </v-col>
        <v-col cols="6" sm="4" class="text-truncate">
          <h1 class="mb-0 font-weight-light display-1">4156</h1>
          <small class>Mail Open Rate</small>
        </v-col>
        <v-col cols="6" sm="4" class="text-truncate">
          <h1 class="mb-0 font-weight-light display-1">1369</h1>
          <small class>Click Rate</small>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../../../charts/apexcharts/ApexChartsData";

export default {
  name: "TheNewsletterCampaign",
  data: () => ({
    elementVisible: false,
    apexChartData: apexChartData,
  }),
  created() {
    setTimeout(() => (this.elementVisible = true), 10);
  },
  components: {
    VueApexCharts,
  },
};
</script>