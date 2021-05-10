<template>
  <v-card flat class="mb-7 mt-7">
    <v-card-text class="pa-5">
      <div class="blog-image mt-n12 mb-3 pb-1">
        <img
          src="@/assets/images/big/img1.jpg"
          alt="img"
          class="img-fluid rounded w-100 blog-img-height"
        />
      </div>
      <h3 class="title font-weight-regular lh-22">Business development new rules for 2020</h3>
      <v-chip class="mt-2" label small color="success">Technology</v-chip>
      <p class="mt-4 mb-2 font-weight-light">
        Lorem ipsum dolor sit amet, this is a consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut. sed do eiusmod tempor incididunt ut
      </p>
      <div class="d-flex align-center">
        <div>
          <v-btn color="info" text class="font-weight-light pa-0">Read More</v-btn>
        </div>
        <v-spacer></v-spacer>
        <div>
          <div class="d-flex">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <a href="javascript:void(0)" class="link mx-2" v-on="on">
                  <v-icon class="subtitle-2">mdi-heart-outline</v-icon>
                </a>
              </template>
              <span>Likes</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <a href="javascript:void(0)" class="link" v-on="on">
                  <v-icon class="subtitle-2">mdi-share-variant</v-icon>
                </a>
              </template>
              <span>Share</span>
            </v-tooltip>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheBusinessCard",
  data: () => ({}),
  components: {}
};
</script>