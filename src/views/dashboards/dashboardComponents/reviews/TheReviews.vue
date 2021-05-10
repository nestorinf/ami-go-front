<template>
  <v-card class="mb-7">
    <v-row>
      <v-col cols="12" lg="6" sm="6" class="py-0">
        <div class="pa-5">
          <h3 class="title font-weight-regular">Reviews</h3>
          <h2 class="font-weight-light mt-5 display-1">31560</h2>
          <h6
            class="font-weight-light subtitle-2 blue-grey--text text--lighten-2"
          >April the product got 234 reviews</h6>
          <div class="image-box mt-4 mb-4 d-flex">
            <v-tooltip top v-for="review in reviews" :review="review" :key="review.reviewtitle">
              <template v-slot:activator="{ on }">
                <a href="javascript:void(0)" class="mr-2" v-on="on">
                  <img
                    :src="require('@/assets/images/users'+ review.img)"
                    alt="user"
                    class="rounded-circle"
                    width="45"
                  />
                </a>
              </template>
              <span>{{review.tooltiptext}}</span>
            </v-tooltip>
          </div>
          <v-btn color="success" class="body-2 elevation-1 text-capitalize">Read Reviews</v-btn>
        </div>
      </v-col>
      <v-col cols="12" lg="6" sm="6" class="py-0 pl-0 border-left">
        <div class="pa-5">
          <!-- first -->
          <div class="mb-9 mt-5">
            <div class="d-flex align-center">
              <v-icon class="display-2 blue-grey--text text--lighten-2">mdi-emoticon-cool</v-icon>
              <div class="ml-3">
                <h2 class="font-weight-regular lh-22 title">Positive Reviews</h2>
                <span class="subtitle-2 font-weight-light">25547 Reviews</span>
              </div>
            </div>
            <v-progress-linear rounded v-model="review1" color="success" class="mt-3"></v-progress-linear>
          </div>
          <!-- second -->
          <div class="mb-9">
            <div class="d-flex align-center">
              <v-icon class="display-2 blue-grey--text text--lighten-2">mdi-emoticon-sad</v-icon>
              <div class="ml-3">
                <h2 class="font-weight-regular lh-22 title">Negative Reviews</h2>
                <span class="subtitle-2 font-weight-light">5547 Reviews</span>
              </div>
            </div>
            <v-progress-linear rounded v-model="review2" color="error" class="mt-3"></v-progress-linear>
          </div>
          <!-- third -->
          <div class="mb-5">
            <div class="d-flex align-center">
              <v-icon class="display-2 blue-grey--text text--lighten-2">mdi-emoticon-neutral</v-icon>
              <div class="ml-3">
                <h2 class="font-weight-regular lh-22 title">Neutral Reviews</h2>
                <span class="subtitle-2 font-weight-light">547 Reviews</span>
              </div>
            </div>
            <v-progress-linear rounded v-model="review3" color="deep-purple accent-2" class="mt-3"></v-progress-linear>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "TheReviews",
  data: () => ({
    reviews: [
      {
        tooltiptext: "Simmons",
        img: "/1.jpg"
      },
      {
        tooltiptext: "Fitz",
        img: "/2.jpg"
      },
      {
        tooltiptext: "Phil",
        img: "/3.jpg"
      },
      {
        tooltiptext: "Melinda",
        img: "/4.jpg"
      }
    ],
    review1: 47,
    review2: 33,
    review3: 20
  })
};
</script>