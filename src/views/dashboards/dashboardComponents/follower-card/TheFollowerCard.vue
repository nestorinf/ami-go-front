<template>
  <v-card>
    <v-card-text class="pa-7">
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
      <v-divider></v-divider>
      <div class="py-5">
        <small class="blue-grey--text text--lighten-2">Email address</small>
        <h6 class="body-2">hannagover@gmail.com</h6>
        <small class="blue-grey--text text--lighten-2 pt-4 d-block">Phone</small>
        <h6 class="body-2">+91 654 784 547</h6>
        <small class="blue-grey--text text--lighten-2 pt-4 d-block">Address</small>
        <h6 class="body-2">71 Pilgrim Avenue Chevy Chase, MD 20815</h6>
      </div>
      <div class="map-box">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470029.1604841957!2d72.29955005258641!3d23.019996818380896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C+Gujarat!5e0!3m2!1sen!2sin!4v1493204785508"
          height="150"
          class="w-100"
          style="border:0"
          allowfullscreen
        ></iframe>
      </div>
      <small class="blue-grey--text text--lighten-2 py-4 d-block">Social Profile</small>

      <v-btn class="mx-2 elevation-0" fab dark small color="light-blue darken-4">
        <i class="fab fa-facebook-f" dark></i>
      </v-btn>
      <v-btn class="mx-2 elevation-0" fab dark small color="light-blue accent-3">
        <i class="fab fa-twitter" dark></i>
      </v-btn>
      <v-btn class="mx-2 elevation-0" fab dark small color="red darken-3">
        <i class="fab fa-youtube" dark></i>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheFollowerCard",
  data: () => ({})
};
</script>