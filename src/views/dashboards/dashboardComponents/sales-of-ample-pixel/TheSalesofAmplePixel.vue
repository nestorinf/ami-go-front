<template>
  <v-card class="mb-7">
    <v-row>
      <v-col cols="12" lg="6" sm="4" class="py-0">
        <div class="pa-5">
          <h3 class="text-truncate font-weight-regular">Sales of Ample Vs Pixel</h3>
          <h6
            class="body-2 mb-0 blue-grey--text text--lighten-2 font-weight-light"
          >check the difference of Admin</h6>
        </div>
      </v-col>
      <v-col cols="12" lg="3" sm="4" class="border-right py-0">
        <div class="d-flex align-items-center pa-5">
          <div class="mx-3">
            <h3 class="font-weight-regular">$31568</h3>
            <h5 class="blue-grey--text text--lighten-2 font-weight-regular subtitle-1">Growth</h5>
          </div>
          <v-spacer></v-spacer>
          <div class="ml-auto">
            <v-btn color="success" fab class="elevation-0">
              <v-icon class="subtitle-2">mdi-chart-line</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col cols="12" lg="3" sm="4" class="py-0">
        <div class="d-flex align-items-center py-5 px-sm-5 pa-5">
          <div class>
            <h3 class="font-weight-regular">$15478</h3>
            <h5 class="blue-grey--text text--lighten-2 font-weight-regular subtitle-1">Loss</h5>
          </div>
          <v-spacer></v-spacer>
          <div class="ml-auto">
            <v-btn color="blue-grey darken-3" fab class="elevation-0 white--text">
              <v-icon class="subtitle-2">mdi-chart-bar</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card-text class>
      <vue-apex-charts
        type="area"
        height="350px"
        :options="SalesAmpleChart.SalesAmpleChart.chartOptions"
        :series="SalesAmpleChart.SalesAmpleChart.series"
      ></vue-apex-charts>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import SalesAmpleChart from "./SalesofAmpleData";

export default {
  name: "TheSalesofAmplePixel",
  data: () => ({
    SalesAmpleChart: SalesAmpleChart
  }),
  components: {
    VueApexCharts
  }
};
</script>