<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>3D Bubble Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="bubble"
                height="350"
                :options="apexChartData.bubbleChart.chartOptions"
                :series="apexChartData.bubbleChart.series"
              ></vue-apex-charts>
        </div>
    </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../ApexChartsData.js";

export default {
  name: "Apex3DBubbleCharts",
  data: () => ({
        title: "Apexcharts",
        linechart: false,
        apexChartData: apexChartData
  }),
  components: {
    VueApexCharts
  }
};
</script>


