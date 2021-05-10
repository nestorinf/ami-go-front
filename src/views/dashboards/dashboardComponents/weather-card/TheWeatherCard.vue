<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-0">
      <v-img
        src="@/assets/images/background/weatherbg.jpg"
        class="sundaycard-img-height rounded"
        height="100px"
      ></v-img>
      <div class="px-5 py-1">
        <v-row>
          <v-col cols="8" sm="8" lg="8">
            <div class="d-flex align-center">
              <div>
                <skycon condition="partly-cloudy-day" :width="40" :height="40" />
              </div>
              <div class="ml-3">
                <h1 class="font-weight-light info--text mb-0 display-1">
                  32
                  <sup>0</sup>
                </h1>
                <small class>Sunny Rainy day</small>
              </div>
            </div>
          </v-col>
          <!-- <v-divider vertical></v-divider> -->
          <v-col cols="4" sm="4" lg="4" class="text-center border-left">
            <h1 class="font-weight-light mb-0 display-1">
              25
              <sup>0</sup>
            </h1>
            <small class>Tonight</small>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import VueSkycons from "vue-skycons";

export default {
  name: "TheWeatherCard",
  data: () => ({}),
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VueSkycons
  }
};
</script>