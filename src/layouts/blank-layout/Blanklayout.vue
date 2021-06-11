<template>
  <v-app id="inspire">
    <!-- ---------------------------------- -->
    <!--- Vertical Header part -->
    <!-- ---------------------------------- -->
    <VerticalHeader v-model="expandOnHover"></VerticalHeader>
    <!-- ---------------------------------- -->
    <!--- Horizontal Header part -->
    <!-- ---------------------------------- -->
    <!-- <HorizontalHeader v-else></HorizontalHeader> -->

    <v-main>
      <v-container fluid class="page-wrapper">
        <div class="error-box">
          <div class="py-12">
            <div class="text-center">
              <h1 class="error-title error--text">404</h1>
              <h3 class="text-uppercase error-subtitle">PAGE NOT FOUND !</h3>
              <p class="text-muted mt-4 mb-4">
                YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
              </p>
              <v-btn color="info" href="/home">Go to Home</v-btn>
            </div>
          </div>
        </div>
      </v-container>
      <router-view />
    </v-main>
    <!-- ---------------------------------- -->
    <!--- Vertical Sidebar  part -->
    <!-- ---------------------------------- -->
    <VerticalSidebar :expand-on-hover.sync="expandOnHover"></VerticalSidebar>

    <!--- Vertical Footer part -->
    <!-- ---------------------------------- -->
    <Footer></Footer>
  </v-app>
</template>

<script>
import VerticalHeader from "../full-layout/vertical-header/VerticalHeader";
// import HorizontalSidebar from "./horizontal-sidebar/HorizontalSidebar";
import VerticalSidebar from "../full-layout/vertical-sidebar/VerticalSidebar";
import Footer from "../full-layout/footer/Footer";
export default {
  name: "Blanklayout",

  components: {
    VerticalHeader,
    VerticalSidebar,
    Footer,
  },
  data() {
    return {
      expandOnHover: false,
    };
  },
};
</script>

<style lang="scss">
.error-title {
  font-size: 210px;
  font-weight: 900;

  line-height: 210px;
}

@media (max-width: 991px) {
  .error-title {
    font-size: 120px;
    line-height: 120px;
  }
}

@media (max-width: 767px) {
  .error-title {
    font-size: 40px;
    line-height: 40px;
  }
}
</style>