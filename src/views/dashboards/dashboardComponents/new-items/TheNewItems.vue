<template>
  <v-card class="mb-7">
    <div class="pa-4 pb-0">
      <h2 class="font-weight-regular title">New Items</h2>
    </div>
    <div>
      <v-carousel :show-arrows="false" class="product-carousel">
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="require(`@/assets/images/gallery/${item.src}`)"
        ></v-carousel-item>
      </v-carousel>
      <h4 class="py-4 subtitle-1 text-center">Brand New Chair</h4>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "TheNewItems",
  data: () => ({
    items: [
      {
        src: "chair.jpg"
      },
      {
        src: "chair2.jpg"
      },
      {
        src: "chair3.jpg"
      },
      {
        src: "chair4.jpg"
      }
    ]
  })
};
</script>

<style>
.product-carousel .v-image__image--cover {
  background-size: contain;
}
</style>