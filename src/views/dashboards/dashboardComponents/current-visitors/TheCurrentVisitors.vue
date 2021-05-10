<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-5">
      <div class="d-md-flex align-items-center">
        <div>
          <h3 class="title font-weight-regular">Current Visitors</h3>
          <h6 class="subtitle-2 font-weight-light">Different Devices Used to Visit</h6>
        </div>
      </div>
      <div class="mt-4" style="height: 256px;">
        <App
          :countryData="countryData"
          defaultCountryFillColor="rgb(201, 214, 222)"
          highColor="rgb(201, 214, 222)"
          lowColor="rgb(201, 214, 222)"
          countryStrokeColor="transparent"
        />
      </div>
      <CurrentVisitorsMap></CurrentVisitorsMap>
      <v-divider></v-divider>
      <div class="d-flex align-center justify-center pt-4 pb-2">
        <div class="d-flex align-center px-2">
          <span class="success--text">
            <span class="overline">
              <i class="fa fa-circle mr-2"></i>
            </span>
            <span class="font-weight-regular mr-1">Valley</span>
          </span>
        </div>
        <div class="d-flex align-center px-2">
          <span class="info--text">
            <span class="overline">
              <i class="fa fa-circle mr-2"></i>
            </span>
            <span class="font-weight-regular mr-1">Newyork</span>
          </span>
        </div>
        <div class="d-flex align-center px-2">
          <span class="error--text">
            <span class="overline">
              <i class="fa fa-circle mr-2"></i>
            </span>
            <span class="font-weight-regular mr-1">Kansas</span>
          </span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import CurrentVisitorsMap from "./CurrentVisitorsMap";
import App from "vue-world-map";

export default {
  name: "TheCurrentVisitors",
  data: () => ({
    countryData: {
      US: 100,
      IN: 200
    }
  }),
  components: {
    App,
    CurrentVisitorsMap
  }
};
</script>