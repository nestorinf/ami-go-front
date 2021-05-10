<template>
  <v-card class="mb-7">
    <v-card-text>
      <h3 class="title font-weight-regular">Browser Stats</h3>
      <div class="d-flex align-center pb-3 mt-9">
        <div>
          <img src="@/assets/images/browser/chrome-logo.png" alt="logo" />
        </div>
        <div class="mx-2">Google Chrome</div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-chip class="ma-2" small label color="light-blue lighten-5 info--text">23%</v-chip>
        </div>
      </div>
      <div class="d-flex align-center pt-2 pb-3">
        <div>
          <img src="@/assets/images/browser/firefox-logo.png" alt="logo" />
        </div>
        <div class="mx-2">Mozila Firefox</div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-chip class="ma-2" small label color="light-green lighten-5 success--text">18%</v-chip>
        </div>
      </div>
      <div class="d-flex align-center pt-2 pb-3">
        <div>
          <img src="@/assets/images/browser/safari-logo.png" alt="logo" />
        </div>
        <div class="mx-2">Apple Safari</div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-chip class="ma-2" small label color="deep-purple lighten-5 purple--text">15%</v-chip>
        </div>
      </div>
      <div class="d-flex align-center pt-2 pb-3">
        <div>
          <img src="@/assets/images/browser/internet-logo.png" alt="logo" />
        </div>
        <div class="mx-2">Internet Explorer</div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-chip class="ma-2" small label color="yellow lighten-5 warning--text">16%</v-chip>
        </div>
      </div>
      <div class="d-flex align-center pt-2 pb-3">
        <div>
          <img src="@/assets/images/browser/opera-logo.png" alt="logo" />
        </div>
        <div class="mx-2">Opera mini</div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-chip class="ma-2" small label color="red lighten-5 error--text">10%</v-chip>
        </div>
      </div>
      <div class="d-flex align-center pt-2 pb-3">
        <div>
          <img src="@/assets/images/browser/internet-logo.png" alt="logo" />
        </div>
        <div class="mx-2">Microsoft edge</div>
        <v-spacer></v-spacer>
        <div class="mx-auto">
          <v-chip class="ma-2" small label color="light-blue lighten-5 info--text">35%</v-chip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheBrowserStats",
  data: () => ({})
};
</script>