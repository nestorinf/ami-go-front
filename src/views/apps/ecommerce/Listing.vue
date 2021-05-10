<template>
  <v-container fluid class="down-top-padding">
    <v-card class="contact-app">
      <!-- ALGOLIA Search -->
      <ais-instant-search
        index-name="demo_ecommerce"
        :search-client="searchClient"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            md="3"
            xl="2"
            :class="[
              isSidebar
                ? 'close-email-sidebar border-right'
                : 'show-email-sidebar border-right',
            ]"
          >
            <!-- ALGOLIA Left Panel -->
            <v-card class="left-panel contact-sidebar elevation-0">
              <v-card-text class="border-bottom">
                <div class="d-block d-md-none">
                  <v-btn color="primary" text @click="toggleSide">
                    <v-icon small class="mr-2">fas fa-arrow-left</v-icon>Close
                  </v-btn>
                </div>
                <v-btn block color="primary" dark>
                  <ais-clear-refinements />
                </v-btn>
              </v-card-text>
              <v-card-text>
                <h2 class="title">Brands</h2>
                <ais-refinement-list
                  attribute="brand"
                  class="mt-3"
                  searchable
                />
                <h2 class="title mt-5 border-top pt-5">Price sort</h2>
                <ais-numeric-menu
                  attribute="price"
                  :items="[
                    { label: 'All' },
                    { label: '<= 10$', end: 10 },
                    { label: '10$ - 100$', start: 10, end: 100 },
                    { label: '100$ - 500$', start: 100, end: 500 },
                    { label: '>= 500$', start: 500 },
                  ]"
                >
                </ais-numeric-menu>

                <ais-configure :hitsPerPage="12" />
              </v-card-text>
              <div class="text-center mt-5">
                <img src="@/assets/images/algolia.png" width="100" />
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="9" xl="10">
            <div class="right-panel">
              <v-card-text class="p-15">
                <v-app-bar-nav-icon
                  class="d-block d-lg-none"
                  @click="toggleSidebar()"
                ></v-app-bar-nav-icon>
                <ais-search-box />
              </v-card-text>
              <v-card-text class="border-top">
                <v-row>
                  <v-col cols="12">
                    <ais-hits class="row">
                      <div
                        slot="item"
                        class="mb-5 col-12 border-bottom pa-5 d-flex flex-wrap flex-sm-nowrap justify-center justify-sm-left"
                        slot-scope="{ item }"
                      >
                        <div class="text-center mr-5">
                          <img
                            :src="item.image"
                            align="left"
                            :alt="item.name"
                            class=""
                          />
                          <div
                            class="hit-price info--text mt-3 font-weight-medium text-truncate"
                          >
                            $ {{ item.price }}
                          </div>
                        </div>
                        <div class="mt-4 mt-sm-0">
                          <h2 class="title">{{ item.name }}</h2>
                          <div class="hit-name subtitle-2">
                            <ais-highlight
                              attribute="name"
                              :hit="item"
                            ></ais-highlight>
                          </div>

                          <div class="d-flex mt-4">
                            <v-btn depressed color="primary">
                              Add to cart
                            </v-btn>
                            <v-btn icon color="red" class="ml-4">
                              <v-icon>mdi-heart</v-icon>
                            </v-btn>
                          </div>

                          <!-- <div class="hit-description subtitle-2">
                            <ais-highlight
                              attribute="description"
                              :hit="item"
                            ></ais-highlight>
                          </div> -->
                        </div>
                      </div>
                    </ais-hits>
                  </v-col>
                </v-row>
                <ais-pagination />
              </v-card-text>
            </div>
          </v-col>
        </v-row>
      </ais-instant-search>
    </v-card>
  </v-container>
</template>
<script>
import algoliasearch from "algoliasearch/lite";
// import "instantsearch.css/themes/algolia-min.css";

export default {
  data() {
    return {
      searchClient: algoliasearch(
        "B1G2GM9NG0",
        "aadef574be1f9252bb48d4ea09b5cfe5"
      ),
      isSidebar: true,
      istoggle: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebar = !this.isSidebar;
    },
    toggleSide() {
      this.isSidebar = !this.isSidebar;
    },
  },
};
</script>
<style lang="css">
.ais-RefinementList-list,
.ais-NumericMenu-list {
  list-style: none;
  padding-left: 0 !important;
  margin-top: 15px;
}

.ais-RefinementList-list .ais-RefinementList-item,
.ais-NumericMenu-list .ais-NumericMenu-item {
  padding: 6px 0;
}

.ais-RefinementList-labelText,
.ais-NumericMenu-labelText {
  margin-left: 8px;
  font-size: 16px;
}

.ais-RefinementList-label {
  display: flex;
  align-items: flex-start;
}

.ais-RefinementList-count {
  padding: 2px 12px;
  background: #eceff1;
  color: #121212 !important;
  border-radius: 12px;
  font-weight: 600;
  margin-left: auto;
}

.ais-SearchBox-input {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #54667a;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.ais-SearchBox-input:focus {
  outline: none;
}

.ais-SearchBox-form {
  position: relative;
}

.ais-SearchBox-submit {
  padding: 7px 10px;
  background: #1e88e5;
  position: absolute;
  right: 0;
  top: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.ais-SearchBox-submit svg {
  fill: #fff;
}

.p-15 {
  padding: 15px !important;
}

.ais-SearchBox-reset {
  position: absolute;
  right: 30px;
  top: 0;
  padding: 8px 10px;
}
.ais-SearchBox-reset:focus {
  outline: none;
}

.ais-SearchBox-reset svg {
  fill: red;
}

.ais-Hits-list {
  padding-left: 0 !important;
  list-style: none;
  margin: 0 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 0;
}

.hit-price {
  background: #bbdefb;
  display: inline-block;
  padding: 4px 9px;
  border-radius: 23px;
  margin-bottom: 10px;
  line-height: normal;
  margin-top: 5px;
  font-size: 15px;
}

.ais-Pagination-list {
  padding-left: 0 !important;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ais-Pagination-item {
  padding: 6px 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.ais-Pagination-item.ais-Pagination-item--firstPage {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

/* @media (min-width: 1600px) { */
li.ais-Hits-item {
  width: 50%;
  float: left;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
/* } */

@media (min-width: 1900px) {
  li.ais-Hits-item {
    width: 33.33%;
    float: left;
  }
}
</style>