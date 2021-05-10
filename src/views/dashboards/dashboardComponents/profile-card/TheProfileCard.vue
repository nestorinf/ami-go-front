<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-0">
      <img
        src="@/assets/images/background/profile-bg.jpg"
        class="img-fluid rounded-top bt4 w-100 profile-bg-height"
      />
      <div class="p-4 mt-n12 text-center">
        <div class="d-flex justify-center mt-n5">
          <img
            src="@/assets/images/users/4.jpg"
            alt="user"
            width="128px"
            class="img-fluid rounded-circle elevation-1"
          />
        </div>
        <h2 class="mb-0 mt-4 font-weight-regular">Angela Dominic</h2>
        <p class="font-weight-light">Web Designer &amp; Developer</p>
        <v-btn
          rounded
          color="deep-purple accent-2"
          dark
          x-large
          class="text-capitalize font-weight-regular px-7"
        >Follow</v-btn>
        <v-row class="mt-4 pb-4">
          <v-col cols="4">
            <h2 class="mb-0 font-weight-light">1099</h2>
            <small class>Articles</small>
          </v-col>
          <v-col cols="4">
            <h2 class="mb-0 font-weight-light">23,469</h2>
            <small class>Followers</small>
          </v-col>
          <v-col cols="4">
            <h2 class="mb-0 font-weight-light">6035</h2>
            <small class>Following</small>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheProfileCard",
  data: () => ({}),
  components: {}
};
</script>