<template>
  <v-card class="mb-7">
    <div class="pa-4">
      <h2 class="font-weight-regular title">Product Overview</h2>
    </div>
    <v-card-text class="pa-5">
      <!-- Table -->
      <v-simple-table class="product-table">
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="blue-grey--text text--lighten-2 font-weight-medium subtitle-2 text-left"
              >Customer</th>
              <th
                class="blue-grey--text text--lighten-2 font-weight-medium subtitle-2 text-left"
              >Photo</th>
              <th
                class="blue-grey--text text--lighten-2 font-weight-medium subtitle-2 text-left"
              >Quantity</th>
              <th
                class="blue-grey--text text--lighten-2 font-weight-medium subtitle-2 text-left"
              >Date</th>
              <th
                class="blue-grey--text text--lighten-2 font-weight-medium subtitle-2 text-left"
              >Status</th>
              <th
                class="blue-grey--text text--lighten-2 font-weight-medium subtitle-2 text-left"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in producttable" :key="item.customername">
              <td>
                <h5 class="body-2 font-weight-light text-no-wrap">{{item.customername}}</h5>
              </td>
              <td>
                <img
                  :src="require(`@/assets/images/gallery/${item.avatar}`)"
                  :alt="item.customername"
                  width="75"
                />
              </td>
              <td>
                <h5 class="body-2 font-weight-light">{{item.quantity}}</h5>
              </td>
              <td>
                <h5 class="body-2 font-weight-light text-no-wrap">{{item.date}}</h5>
              </td>
              <td>
                <v-chip class="ma-2" label :class="item.statusbg" small>{{item.status}}</v-chip>
              </td>
              <td class="text-center">
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
  name: "TheProductOverview",
  data: () => ({
    producttable: [
      {
        customername: "Steave Jobs",
        avatar: "chair.jpg",
        quantity: "20",
        date: "10-7-2020",
        statusbg: "success",
        status: "Paid"
      },
      {
        customername: "Varun Dhavan",
        avatar: "chair2.jpg",
        quantity: "25",
        date: "09-7-2020",
        statusbg: "warning",
        status: "Pending"
      },
      {
        customername: "Ritesh Desh",
        avatar: "chair3.jpg",
        quantity: "12",
        date: "08-7-2020",
        statusbg: "success",
        status: "Paid"
      },
      {
        customername: "Hrithik",
        avatar: "chair4.jpg",
        quantity: "18",
        date: "02-7-2020",
        statusbg: "error",
        status: "Failed"
      }
    ]
  }),
  methods: {
    deleteItem(item) {
      const index = this.producttable.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.producttable.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.product-table.theme--light.v-data-table
  tbody
  tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: transparent;
}
</style>