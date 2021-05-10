<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Column Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="bar"
                height="350"
                :options="apexChartData.columnChart.chartOptions"
                :series="apexChartData.columnChart.series"
              ></vue-apex-charts>
        </div>
    </v-card>
    
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../ApexChartsData.js";

export default {
  name: "ApexColumnCharts",
  data: () => ({
        columnchart: false,
        apexChartData: apexChartData
  }),
  components: {
    VueApexCharts
  }
};
</script>


