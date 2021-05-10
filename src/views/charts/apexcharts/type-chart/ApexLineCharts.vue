<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Line Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="line"
                height="350"
                :options="apexChartData.lineChartSimple.chartOptions"
                :series="apexChartData.lineChartSimple.series"
              ></vue-apex-charts>
        </div>
    </v-card>
    
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import apexChartData from "../ApexChartsData.js";

export default {
  name: "ApexLineCharts",
  data: () => ({
        
        apexChartData: apexChartData
  }),
  components: {
    VueApexCharts
  }
};
</script>


