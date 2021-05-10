<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Mixed Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="line"
                height="350"
                :options="apexChartData.mixedChart.chartOptions"
                :series="apexChartData.mixedChart.series"
              ></vue-apex-charts>
        </div>
    </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../ApexChartsData.js";

export default {
  name: "ApexMixedCharts",
  data: () => ({
        mixedchart: false,
        apexChartData: apexChartData
  }),
  components: {
    VueApexCharts
  }
};
</script>


