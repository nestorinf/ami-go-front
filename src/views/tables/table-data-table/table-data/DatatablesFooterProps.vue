<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesFooterProps -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <v-list-item-subtitle class="text-wrap">
      The
      <code>v-data-table</code> renders a default footer using the
      <code>v-data-footer</code> component. You can pass props to this component using
      <code>footer-props</code>.
    </v-list-item-subtitle>
    <div class="mt-4">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        item-key="name"
        class="elevation-0 border"
        :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-arrow-collapse-left',
                lastIcon: 'mdi-arrow-collapse-right',
                prevIcon: 'mdi-minus',
                nextIcon: 'mdi-plus'
                }"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatatablesFooterProps",

  data: () => ({
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        value: "name"
      },
      { text: "Category", value: "category" }
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        category: "Ice cream"
      },
      {
        name: "Ice cream sandwich",
        category: "Ice cream"
      },
      {
        name: "Eclair",
        category: "Cookie"
      },
      {
        name: "Cupcake",
        category: "Pastry"
      },
      {
        name: "Gingerbread",
        category: "Cookie"
      },
      {
        name: "Jelly bean",
        category: "Candy"
      },
      {
        name: "Lollipop",
        category: "Candy"
      },
      {
        name: "Honeycomb",
        category: "Toffee"
      },
      {
        name: "Donut",
        category: "Pastry"
      },
      {
        name: "KitKat",
        category: "Candy"
      }
    ]
  })
};
</script>