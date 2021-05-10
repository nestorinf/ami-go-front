<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-5">
      <h3 class="title font-weight-regular">Newsletter Campaign</h3>
      <h6 class="subtitle-2 font-weight-light">
        Overview of Newsletter Campaign
      </h6>
      <div style="max-height: 300px" class="mt-5" v-show="elementVisible">
        <vue-apex-charts
          type="area"
          height="255"
          :options="apexChartData.lineAreaChartSpline.chartOptions"
          :series="apexChartData.lineAreaChartSpline.series"
        ></vue-apex-charts>
      </div>
      <div
        class="d-flex align-center justify-center text-truncate text-nowrap mt-2"
      >
        <div class="d-flex align-center px-2">
          <span class="success--text">
            <span class="overline">
              <i class="fa fa-circle mr-2"></i>
            </span>
            <span class="font-weight-regular mr-1">Open Rate</span>
          </span>
        </div>
        <div class="d-flex align-center px-2">
          <span class="info--text">
            <span class="overline">
              <i class="fa fa-circle mr-2"></i>
            </span>
            <span class="font-weight-regular mr-1">Recurring</span>
          </span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../../../charts/apexcharts/ApexChartsData";

export default {
  name: "TheNewsletterCampaign2",
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