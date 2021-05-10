<template>
  <v-row>
    <v-col cols="12" sm="12" lg="3" class="py-0">
      <v-card class="text-center mb-7">
        <v-card-text class="pa-5">
          <h3 class="font-weight-regular">Unique Visit</h3>
          <div class="mt-3">
            <div style="width: 90px;margin: 0 auto;">
              <vue-apex-charts
                type="bar"
                height="65px"
                :options="VisitChart.SparkA.chartOptions"
                :series="VisitChart.SparkA.series"
              ></vue-apex-charts>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <div class="pa-2 text-center">
          <h4 class="mb-0 font-weight-regular">
            <i class="ti-angle-up success--text"></i> 12456
          </h4>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" lg="3" class="py-0">
      <v-card class="text-center mb-7">
        <v-card-text class="pa-5">
          <h3 class="font-weight-regular">Total Visit</h3>
          <div class="mt-3">
            <div style="width: 90px;margin: 0 auto;">
              <vue-apex-charts
                type="bar"
                height="65px"
                :options="VisitChart.SparkB.chartOptions"
                :series="VisitChart.SparkB.series"
              ></vue-apex-charts>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <div class="pa-2 text-center">
          <h4 class="mb-0 font-weight-regular">
            <i class="ti-angle-up success--text"></i> 456
          </h4>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" lg="3" class="py-0">
      <v-card class="text-center mb-7">
        <v-card-text class="pa-5">
          <h3 class="font-weight-regular">Bounce rate</h3>
          <div class="mt-3">
            <div style="width: 90px;margin: 0 auto;">
              <vue-apex-charts
                type="bar"
                height="65px"
                :options="VisitChart.SparkC.chartOptions"
                :series="VisitChart.SparkC.series"
              ></vue-apex-charts>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <div class="pa-2 text-center">
          <h4 class="mb-0 font-weight-regular">
            <i class="ti-angle-up success--text"></i> 12456
          </h4>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" lg="3" class="py-0">
      <v-card class="text-center mb-7">
        <v-card-text class="pa-5">
          <h3 class="font-weight-regular">Page Views</h3>
          <div class="mt-3">
            <div style="width: 90px;margin: 0 auto;">
              <vue-apex-charts
                type="bar"
                height="65px"
                :options="VisitChart.SparkD.chartOptions"
                :series="VisitChart.SparkD.series"
              ></vue-apex-charts>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <div class="pa-2 text-center">
          <h4 class="mb-0 font-weight-regular">
            <i class="ti-angle-up success--text"></i> 456
          </h4>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import VisitChart from "./EarningCardData";

export default {
  name: "TheEarningCard",
  data: () => ({
    VisitChart: VisitChart
  }),
  components: {
    VueApexCharts
  }
};
</script>