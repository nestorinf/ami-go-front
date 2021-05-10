<template>
  <v-row>
    <v-col
      cols="12"
      lg="3"
      sm="6"
      v-for="revenuecard in revenuecards"
      :revenuecard="revenuecard"
      :key="revenuecard.revenuecardtitle"
      class="py-0 mb-7"
    >
      <v-card>
        <v-card-text class="pa-5">
          <div class="d-flex align-center">
            <v-btn
              :class="[revenuecard.iconcolor]"
              class="elevation-0"
              fab
              dark
            >
              <v-icon>{{ revenuecard.icon }}</v-icon>
            </v-btn>
            <div class="ml-2 mr-1">
              <h2 class="headline font-weight-light">
                {{ revenuecard.number }}
              </h2>
              <h5 class="subtitle-2 font-weight-regular">
                {{ revenuecard.title }}
              </h5>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TheRevenueCards",
  data: () => ({
    revenuecards: [
      {
        title: "Total Revenue",
        iconcolor: "info",
        icon: "ti-wallet",
        number: "$3249",
      },
      {
        title: "Online Revenue",
        iconcolor: "warning",
        icon: "mdi-cellphone-link",
        number: "$2376",
      },
      {
        title: "Offline Revenue",
        iconcolor: "deep-purple accent-2",
        icon: "mdi-cart-outline",
        number: "$1795",
      },
      {
        title: "Ad. Expense",
        iconcolor: "error",
        icon: "mdi-bullseye",
        number: "$687",
      },
    ],
  }),
};
</script>