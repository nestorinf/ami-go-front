<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Radial Bar Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="radialBar"
                height="350"
                :options="apexChartData.radialBarChart.chartOptions"
                :series="apexChartData.radialBarChart.series"
              ></vue-apex-charts>
        </div>
    </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../ApexChartsData.js";

export default {
  name: "ApexRadialBarCharts",
  data: () => ({
        radialchart: false,
        apexChartData: apexChartData
  }),
  components: {
    VueApexCharts
  }
};
</script>


