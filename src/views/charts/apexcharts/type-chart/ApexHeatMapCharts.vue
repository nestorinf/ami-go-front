<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Heat Map Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="heatmap"
                height="350"
                :options="apexChartData.heatMapChart.chartOptions"
                :series="apexChartData.heatMapChart.series"
              ></vue-apex-charts>
        </div>
    </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../ApexChartsData.js";

export default {
  name: "ApexHeatMapCharts",
  data: () => ({
        heatchart: false,
        apexChartData: apexChartData
  }),
  components: {
    VueApexCharts
  }
};
</script>


