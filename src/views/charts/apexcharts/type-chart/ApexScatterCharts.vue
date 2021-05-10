<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Scatter Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="scatter"
                height="350"
                :options="apexChartData.scatterChart.chartOptions"
                :series="apexChartData.scatterChart.series"
              ></vue-apex-charts>
        </div>
    </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../ApexChartsData.js";

export default {
  name: "ApexScatterCharts",
  data: () => ({
        scatterchart: false,
        apexChartData: apexChartData
  }),
  components: {
    VueApexCharts
  }
};
</script>


