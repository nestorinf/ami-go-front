<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5">
      <h2 class="font-weight-regular title">Experiances</h2>
      <v-row class="mt-7">
        <v-col cols="2" sm="2" class="text-left" style="max-width: 90px">
          <img
            src="@/assets/images/browser/photoshop.jpg"
            alt="photoshop"
            class="img-fluid"
          />
        </v-col>
        <v-col cols="10" sm="4" class="align-center d-flex">
          <div>
            <h3 class="font-weight-regular">Photoshop</h3>
            <h6 class="subtitle-2 font-weight-regular">
              Thie is a sample text
            </h6>
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="align-center d-flex">
          <v-progress-linear
            v-model="prg1"
            color="success"
            rounded
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row class="mb-7">
        <v-col cols="2" sm="2" class="text-left" style="max-width: 90px">
          <img
            src="@/assets/images/browser/sketch.jpg"
            alt="photoshop"
            class="img-fluid"
          />
        </v-col>
        <v-col cols="10" sm="4" class="align-center d-flex">
          <div>
            <h3 class="font-weight-regular">Sketch</h3>
            <h6 class="subtitle-2 font-weight-regular">
              Thie is a sample text
            </h6>
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="align-center d-flex">
          <v-progress-linear
            v-model="prg2"
            color="error"
            rounded
          ></v-progress-linear>
        </v-col>
      </v-row>
      <!-- Content -->
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="4" lg="4" class="pb-0">
          <h1 class="display-1 font-weight-regular">5486</h1>
          <h6 class="subtitle-2 font-weight-regular">Projects</h6>
        </v-col>
        <v-col cols="12" sm="4" lg="4" class="pb-0">
          <h1 class="display-1 font-weight-regular">987</h1>
          <h6 class="subtitle-2 font-weight-regular">Winning Entries</h6>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          sm="4"
          class="mt-4 mt-md-0 d-flex align-center justify-center justify-sm-end"
        >
          <v-btn color="success" class="text-capitalize elevation-0"
            >Hire Me</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheExperiences",
  data: () => ({
    prg1: 60,
    prg2: 45,
  }),
};
</script>