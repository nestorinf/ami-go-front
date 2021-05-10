<template>
  <v-row>
    <!-- First Card -->
    <v-col cols="12" sm="6" lg="3" class="py-0">
      <v-card class="mb-7">
        <v-card-text>
          <v-row class="d-flex align-center">
            <v-col cols="6">
              <h2 class="font-weight-light headline">324</h2>
              <h5
                class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
              >
                New Clients
              </h5>
            </v-col>
            <v-col cols="6" class="pt-0">
              <div class="position-relative float-right" style="height: 80px">
                <span
                  class="chart-inner-icon text-muted d-flex mt-2 pl-1 pt-1 subtitle-1"
                  >20%</span
                >
                <vue-apex-charts
                  type="donut"
                  width="115"
                  :options="PieCardsData.searchChart.chartOptions"
                  :series="PieCardsData.searchChart.series"
                ></vue-apex-charts>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Second Card -->
    <v-col cols="12" sm="6" lg="3" class="py-0">
      <v-card class="mb-7">
        <v-card-text>
          <v-row class="d-flex align-center">
            <v-col cols="6">
              <h2 class="font-weight-light headline">2376</h2>
              <h5
                class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
              >
                Total Visits
              </h5>
            </v-col>
            <v-col cols="6" class="pt-0">
              <div class="position-relative float-right" style="height: 80px">
                <span
                  class="chart-inner-icon text-muted d-flex mt-2 pl-1 pt-1 subtitle-1"
                  >30%</span
                >
                <vue-apex-charts
                  type="donut"
                  width="115"
                  :options="PieCardsData.referralChart.chartOptions"
                  :series="PieCardsData.referralChart.series"
                ></vue-apex-charts>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Third Card -->
    <v-col cols="12" sm="6" lg="3" class="py-0">
      <v-card class="mb-7">
        <v-card-text>
          <v-row class="d-flex align-center">
            <v-col cols="6">
              <h2 class="font-weight-light headline">1795</h2>
              <h5
                class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
              >
                New Leads
              </h5>
            </v-col>
            <v-col cols="6" class="pt-0">
              <div class="position-relative float-right" style="height: 80px">
                <span
                  class="chart-inner-icon text-muted d-flex mt-2 pl-1 pt-1 subtitle-1"
                  >40%</span
                >
                <vue-apex-charts
                  type="donut"
                  width="115"
                  :options="PieCardsData.socialChart.chartOptions"
                  :series="PieCardsData.socialChart.series"
                ></vue-apex-charts>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Fourth Card -->
    <v-col cols="12" sm="6" lg="3" class="py-0">
      <v-card class="mb-7">
        <v-card-text>
          <v-row class="d-flex align-center">
            <v-col cols="6">
              <h2 class="font-weight-light headline">36870</h2>
              <h5
                class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
              >
                Page Views
              </h5>
            </v-col>
            <v-col cols="6" class="pt-0">
              <div class="position-relative float-right" style="height: 80px">
                <span
                  class="chart-inner-icon text-muted d-flex mt-2 pl-1 pt-1 subtitle-1"
                  >60%</span
                >
                <vue-apex-charts
                  type="donut"
                  width="115"
                  :options="PieCardsData.directChart.chartOptions"
                  :series="PieCardsData.directChart.series"
                ></vue-apex-charts>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import PieCardsData from "./PieCardsData";

export default {
  name: "ThePieCards",
  data: () => ({
    PieCardsData: PieCardsData,
  }),
  components: {
    VueApexCharts,
  },
};
</script>