<template>
  <v-card class="position-relative profile-card mb-7">
    <img
      src="@/assets/images/background/socialbg.jpg"
      class="img-fluid rounded bt4 profile-img w-100"
    />
    <div class="card-img-overlay d-flex social-profile rounded align-center justify-center">
      <div class="text-center">
        <img src="@/assets/images/users/1.jpg" alt="user" class="rounded-circle" width="100" />
        <h4 class="white--text font-weight-regular">James Anderson</h4>
        <h6 class="white--text op-5 font-weight-regular">@jamesandre</h6>
        <p class="white--text font-weight-light">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
          do eiusmod tempor incididunt
        </p>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "TheBackgroundProfileCard",
  data: () => ({})
};
</script>