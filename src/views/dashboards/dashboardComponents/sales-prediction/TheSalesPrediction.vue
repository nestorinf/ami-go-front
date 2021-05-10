<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 mb-7">
      <h3 class="title font-weight-regular">Sales Prediction</h3>
      <v-row>
        <v-col cols="6">
          <span class="display-1 deep-purple--text text--accent-2 font-weight-regular">$3528</span>
          <h6 class="subtitle-2 font-weight-regular mt-2">10% Increased</h6>
          <h5 class="subtitle-1 text-no-wrap">(150-165 Sales)</h5>
        </v-col>
        <v-col cols="6">
          <div class="overflow-hidden float-right my-3 mr-3" style="height: 70px; width: 150px">
            <vue-apex-charts
              height="200px"
              width="150px"
              :options="SalesPredictionData.predictionChart.chartOptions"
              :series="SalesPredictionData.predictionChart.series"
            ></vue-apex-charts>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import SalesPredictionData from "./SalesPredictionData";

export default {
  name: "TheSalesPrediction",
  data: () => ({
    SalesPredictionData: SalesPredictionData
  }),
  components: {
    VueApexCharts
  }
};
</script>