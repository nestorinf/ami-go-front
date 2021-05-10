<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Dount Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="donut"
                height="350"
                :options="apexChartData.donutChart.chartOptions"
                :series="apexChartData.donutChart.series"
              ></vue-apex-charts>
        </div>
    </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../ApexChartsData.js";

export default {
  name: "ApexDonutCharts",
  data: () => ({
        doughnutchart: false,
        apexChartData: apexChartData
  }),
  components: {
    VueApexCharts
  }
};
</script>


