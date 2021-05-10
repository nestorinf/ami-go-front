<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Radar Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="radar"
                height="300"
                :options="apexChartData.radarChart.chartOptions"
                :series="apexChartData.radarChart.series"
              ></vue-apex-charts>
        </div>
    </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../ApexChartsData.js";

export default {
  name: "ApexRadarCharts",
  data: () => ({
        radarchart: false,
        apexChartData: apexChartData
  }),
  components: {
    VueApexCharts
  }
};
</script>


