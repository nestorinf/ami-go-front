<template>
  <v-container class="down-top-padding" fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text class="pa-5 border-bottom">
            <h3 class="card-title d-flex">Basic Drag & Drop</h3>
          </v-card-text>
          <DragnDropBasic></DragnDropBasic>
        </v-card>
        <v-card class="mb-7">
          <v-card-text class="pa-5">
            <h3 class="card-title d-flex">Custom Drag n Drop</h3>
            <DragnDropCustom></DragnDropCustom>
          </v-card-text>
        </v-card>
        <v-card class="mb-7">
          <v-card-text class="pa-5">
            <h3 class="card-title d-flex">Multiple Drag & Drop</h3>
            <DragnDropMultiple></DragnDropMultiple>
          </v-card-text>
        </v-card>
        <v-card class="mb-7">
          <v-card-text class="pa-5">
            <h3 class="card-title d-flex">Animation Drag & Drop</h3>
            <DragnDropAnimation></DragnDropAnimation>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DragnDropAnimation from "./DragnDropAnimation";
import DragnDropBasic from "./DragnDropBasic";
import DragnDropMultiple from "./DragnDropMultiple";
import DragnDropCustom from "./DragnDropCustom";

export default {
  name: "DragnDrop",
  data: () => ({
    title: "DragnDrop",
    page: {
      title: "Drag n Drop"
    },
    breadcrumbs: [
      {
        text: "Widgets",
        disabled: false,
        to: "#"
      },
      {
        text: "Drag n Drop",
        disabled: true
      }
    ]
  }),
  components: {
    DragnDropAnimation,
    DragnDropBasic,
    DragnDropMultiple,
    DragnDropCustom
  }
};
</script>
