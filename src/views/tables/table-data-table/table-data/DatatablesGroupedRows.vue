<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesGroupedRows -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <v-list-item-subtitle class="text-wrap">
      Using the
      <code>group-by</code> and
      <code>group-desc</code> props you can group rows on an item property. The
      <code>show-group-by</code> prop will show a group button in the default header.
    </v-list-item-subtitle>
    <div class="mt-4">
      <v-data-table
        :headers="headers"
        :items="desserts"
        item-key="name"
        group-by="category"
        class="elevation-0 border"
        show-group-by
      ></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatatablesGroupedRows",

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