<template>
    <v-container fluid class="down-top-padding">
        <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        <v-row  v-show="elementVisible">
            <v-col cols="12" sm="12" lg="6">
                <ApexLineCharts></ApexLineCharts>
            </v-col>
            <v-col cols="12" sm="12" lg="6">
                <ApexColumnCharts></ApexColumnCharts>
            </v-col>
            <v-col cols="12" sm="12" lg="6">
                <ApexLineAreaCharts></ApexLineAreaCharts>
            </v-col>
            <v-col cols="12" sm="12" lg="6">
                <ApexBarCharts></ApexBarCharts>
            </v-col>
            <v-col cols="12" sm="12">
                <ApexCandlestickCharts></ApexCandlestickCharts>
            </v-col>
            <v-col cols="12" sm="12">
                <ApexMixedCharts></ApexMixedCharts>
            </v-col>
            <v-col cols="12" sm="12" lg="6">
                <Apex3DBubbleCharts></Apex3DBubbleCharts>
            </v-col>
            <v-col cols="12" sm="12" lg="6">
                <ApexScatterCharts></ApexScatterCharts>
            </v-col>

            <v-col cols="12" sm="12">
                <ApexHeatMapCharts></ApexHeatMapCharts>
            </v-col>

            <v-col cols="12" sm="12" lg="6">
                <ApexDonutCharts></ApexDonutCharts>
            </v-col>

            <v-col cols="12" sm="12" lg="6">
                <ApexPieCharts></ApexPieCharts>
            </v-col>

            <v-col cols="12" sm="12" lg="6">
                <ApexRadialBarCharts></ApexRadialBarCharts>
            </v-col>

            <v-col cols="12" sm="12" lg="6">
                <ApexRadarCharts></ApexRadarCharts>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
  name: "ApexCharts",
  
  data: () => ({
      page: {
        title: "ApexCharts"
      },
      elementVisible: false,
      breadcrumbs: [
        {
          text: "Charts",
          disabled: false,
          to: '#'
        },
        {
          text: "ApexCharts",
          disabled: true
        }
      ],
      
  }),
  created() {
            setTimeout(() => this.elementVisible = true, 1000)
        },
  methods: {
     
  },
  components: {
    ApexLineCharts: () => import('./type-chart/ApexLineCharts'),
    ApexColumnCharts: () => import('./type-chart/ApexColumnCharts'),
    ApexLineAreaCharts: () => import('./type-chart/ApexLineAreaCharts'),
    ApexBarCharts: () => import('./type-chart/ApexBarCharts'),
    ApexCandlestickCharts: () => import('./type-chart/ApexCandlestickCharts'),
    ApexMixedCharts: () => import('./type-chart/ApexMixedCharts'),
    Apex3DBubbleCharts: () => import('./type-chart/Apex3DBubbleCharts'),
    ApexHeatMapCharts: () => import('./type-chart/ApexHeatMapCharts'),
    ApexDonutCharts: () => import('./type-chart/ApexDonutCharts'),
    ApexPieCharts: () => import('./type-chart/ApexPieCharts'),
    ApexRadialBarCharts: () => import('./type-chart/ApexRadialBarCharts'),
    ApexRadarCharts: () => import('./type-chart/ApexRadarCharts'),
    ApexScatterCharts: () => import('./type-chart/ApexScatterCharts')
  }
};
</script>

<style>

</style>
