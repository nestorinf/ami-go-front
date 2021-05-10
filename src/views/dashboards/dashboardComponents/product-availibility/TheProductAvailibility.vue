<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5">
      <div class="d-sm-flex align-center">
        <div>
          <h2 class="font-weight-regular title">Products Availability</h2>
          <h6 class="body-2 mb-1 subtitle-2 font-weight-light">March 2021</h6>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto mt-4 mt-md-0">
          <div style="width:150px">
            <v-select
              class="pt-0 mt-0"
              v-model="select"
              :items="items"
              item-text="state"
              item-value="abbr"
              label="Select"
              persistent-hint
              return-object
              single-line
            ></v-select>
          </div>
        </div>
      </div>
      <!-- Table -->
      <v-simple-table class="month-table mt-5">
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="blue-grey--text text--lighten-2 font-weight-medium subtitle-2 text-left"
              >Product</th>
              <th
                class="blue-grey--text text--lighten-2 font-weight-medium subtitle-2 text-left"
              >Description</th>
              <th
                class="blue-grey--text text--lighten-2 font-weight-medium subtitle-2 text-left"
              >Quantity</th>
              <th
                class="blue-grey--text text--lighten-2 font-weight-medium subtitle-2 text-left"
              >Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in monthtable"
              :key="item.leadname"
              :class="item.activestate"
              class="month-item"
            >
              <td>
                <v-btn
                  class="mx-2 elevation-0"
                  fab
                  dark
                  small
                  height="45"
                  width="45"
                  :color="item.btnbg"
                >
                  <span class="body-2">
                    <i dark class="ti-shopping-cart"></i>
                  </span>
                </v-btn>
              </td>
              <td>
                <h6 class="subtitle-2 text-no-wrap">{{item.title}}</h6>
                <small class="blue-grey--text text--lighten-2 font-weight-light">{{item.subtext}}</small>
              </td>
              <td>
                <h5 class="subtitle-1 font-weight-regular">{{item.quantity}}</h5>
              </td>
              <td>
                <h5 class="subtitle-1 font-weight-regular">{{item.price}}</h5>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheProductAvailibility",
  data: () => ({
    select: { state: "Electronics", abbr: "FL" },
    items: [
      { state: "Electronics", abbr: "FL" },
      { state: "Kichen", abbr: "GA" },
      { state: "Crocory", abbr: "NE" },
      { state: "Wooden", abbr: "CA" }
    ],
    monthtable: [
      {
        btnbg: "info",
        title: "Apple iPhone 6 Space Grey, 16 GB",
        subtext: "Product id : MI5457",
        quantity: "357",
        price: "$435"
      },
      {
        btnbg: "success",
        title: "Fossil Marshall For Men Black watch",
        subtext: "Product id : MI5457",
        quantity: "400",
        price: "$198"
      },
      {
        btnbg: "error",
        title: "Sony Bravia 80cm - 32 HD Ready LED TV",
        subtext: "Product id : MI5457",
        quantity: "485",
        price: "$450"
      },
      {
        btnbg: "deep-purple accent-2",
        title: "Panasonic P75 Champagne Gold, 8 GB",
        subtext: "Product id : MI5457",
        quantity: "5100",
        price: "$145"
      }
    ]
  })
};
</script>