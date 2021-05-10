<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5">
      <div class="d-flex align-start">
        <div>
          <h2 class="font-weight-regular title">Visit Source</h2>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <div style="width:120px">
            <v-select
              class="pt-0 mt-0"
              v-model="select"
              :items="items"
              item-text="state"
              item-value="abbr"
              label="Select"
              persistent-hint
              return-object
              single-line
            ></v-select>
          </div>
        </div>
      </div>
      <vue-apex-charts
        type="donut"
        height="230px"
        :options="VisitChart.VisitChart.chartOptions"
        :series="VisitChart.VisitChart.series"
      ></vue-apex-charts>
      <div class="d-flex align-center justify-center pt-4">
        <div class="d-flex align-center px-2">
          <span>
            <span class="subtitle-2 success--text">
              <i class="fa fa-circle mr-2"></i>
            </span>
            <span class="font-weight-regular blue-grey--text text--lighten-2 mr-1">Mobile</span>
          </span>
        </div>
        <div class="d-flex align-center px-2">
          <span>
            <span class="subtitle-2 deep-purple--text text--accent-2">
              <i class="fa fa-circle mr-2"></i>
            </span>
            <span class="font-weight-regular blue-grey--text text--lighten-2 mr-1">Desktop</span>
          </span>
        </div>
        <div class="d-flex align-center px-2">
          <span>
            <span class="subtitle-2 error--text">
              <i class="fa fa-circle mr-2"></i>
            </span>
            <span class="font-weight-regular blue-grey--text text--lighten-2 mr-1">Tablet</span>
          </span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
import VisitChart from "./VisitSourceData";

export default {
  name: "TheVisitSource",
  data: () => ({
    select: { state: "January", abbr: "FL" },
    items: [
      { state: "January", abbr: "FL" },
      { state: "February", abbr: "GA" },
      { state: "March", abbr: "NE" },
      { state: "April", abbr: "CA" }
    ],
    VisitChart: VisitChart
  }),
  components: {
    VueApexCharts
  }
};
</script>