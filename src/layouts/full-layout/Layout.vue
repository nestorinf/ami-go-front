<template>
  <v-app id="inspire" :class="{ horizontalstyle: setHorizontalLayout }">
    <!-- ---------------------------------- -->
    <!--- Vertical Header part -->
    <!-- ---------------------------------- -->
    <VerticalHeader
      v-if="!setHorizontalLayout"
      v-model="expandOnHover"
    ></VerticalHeader>
    <!-- ---------------------------------- -->
    <!--- Horizontal Header part -->
    <!-- ---------------------------------- -->
    <HorizontalHeader v-else></HorizontalHeader>

    <v-main>
      <v-container fluid class="page-wrapper">
        <router-view />
        <v-btn
          bottom
          color="success"
          dark
          fab
          fixed
          right
          @click.stop="setCustomizerDrawer(!Customizer_drawer)"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-container>
    </v-main>
    <!-- ---------------------------------- -->
    <!--- Vertical Sidebar  part -->
    <!-- ---------------------------------- -->
    <VerticalSidebar
      v-if="!setHorizontalLayout"
      :expand-on-hover.sync="expandOnHover"
    ></VerticalSidebar>
    <!-- ---------------------------------- -->
    <!--- Horizontal Sidebar part -->
    <!-- ---------------------------------- -->
    <HorizontalSidebar v-else></HorizontalSidebar>
    <!-- ---------------------------------- -->
    <!--- Customizer part -->
    <!-- ---------------------------------- -->
    <Customizer v-model="expandOnHover"></Customizer>
    <!-- ---------------------------------- -->
    <!--- Vertical Footer part -->
    <!-- ---------------------------------- -->
    <Footer v-if="!setHorizontalLayout"></Footer>
    <!-- ---------------------------------- -->
    <!--- Horizontal Footer part -->
    <!-- ---------------------------------- -->
    <HorizontalFooter v-else></HorizontalFooter>
  </v-app>
</template>

<script>
import HorizontalHeader from "./horizontal-header/HorizontalHeader";
import VerticalHeader from "./vertical-header/VerticalHeader";
import HorizontalSidebar from "./horizontal-sidebar/HorizontalSidebar";
import VerticalSidebar from "./vertical-sidebar/VerticalSidebar";
import Footer from "./footer/Footer";
import HorizontalFooter from "./horizontal-footer/HorizontalFooter";
import Customizer from "./customizer/Customizer";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Layout",

  components: {
    HorizontalHeader,
    VerticalHeader,
    HorizontalSidebar,
    VerticalSidebar,
    Footer,
    HorizontalFooter,
    Customizer,
  },

  props: {
    source: String,
  },
  data: () => ({
    expandOnHover: false,
  }),
  computed: {
    ...mapState(["Customizer_drawer", "setHorizontalLayout"]),
  },

  methods: {
    ...mapMutations({
      setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER",
    }),
  },
};
</script>

<style>
</style>