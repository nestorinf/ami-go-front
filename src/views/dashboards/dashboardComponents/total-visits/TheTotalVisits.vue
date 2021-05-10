<template>
  <v-card class="mb-7">
    <v-card-text>
      <h3 class="title font-weight-regular">Total Visits</h3>
      <div>
        <App
          :countryData="countryData"
          defaultCountryFillColor="rgb(201, 214, 222)"
          highColor="rgb(201, 214, 222)"
          lowColor="rgb(201, 214, 222)"
          countryStrokeColor="transparent"
          class="total-visits"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import TotalvisitsMap from "./TotalvisitsMap";
import App from "vue-world-map";

export default {
  name: "TheTotalVisits",
  data: () => ({
    countryData: {
      US: 100,
      IN: 200
    }
  }),
  components: {
    App,
    // eslint-disable-next-line vue/no-unused-components
    TotalvisitsMap
  }
};
</script>