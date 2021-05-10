<template>
  <v-card class="mb-7">
    <div class="pa-4">
      <h2 class="font-weight-regular title">Monthly Wineer</h2>
    </div>
    <div class="pa-4">
      <div class="d-flex justify-center mt-3">
        <div class="text-center">
          <img
            src="@/assets/images/users/5.jpg"
            alt="user"
            width="150px"
            class="img-fluid rounded-circle shadow-sm"
          />
          <h4 class="mt-2 title font-weight-regular">Hanna Gover</h4>
          <h6 class="subtitle-2 font-weight-light">Accoubts Manager Amix corp</h6>
        </div>
      </div>
      <v-row class="justify-center text-center pb-4">
        <v-col cols="4" sm="4" lg="4">
          <v-btn text color="info" small>
            <v-icon small>icon-people</v-icon>
            <span class="font-weight-regular mx-1">254</span>
          </v-btn>
        </v-col>
        <v-col cols="4" sm="4" lg="4">
          <v-btn text color="success" small>
            <v-icon small>icon-picture</v-icon>
            <span class="font-weight-regular mx-1">54</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "TheMonthlyWinnerCard",
  data: () => ({})
};
</script>