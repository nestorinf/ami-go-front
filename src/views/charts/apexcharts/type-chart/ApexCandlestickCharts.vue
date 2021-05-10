<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Candle Stick Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="candlestick"
                height="350"
                :options="apexChartData.candlestickChart.chartOptions"
                :series="apexChartData.candlestickChart.series"
              ></vue-apex-charts>
        </div>
    </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../ApexChartsData.js";

export default {
  name: "ApexCandlestickCharts",
  data: () => ({
        caldlechart: false,
        apexChartData: apexChartData
  }),
  components: {
    VueApexCharts
  }
};
</script>


