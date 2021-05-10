<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesCustomizingDefaultRows -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <v-list-item-subtitle class="text-wrap">
      You can use the dynamic slots
      <code>item.name</code> to customize only certain columns.
      <code>name</code> is the name of the
      <code>value</code> property in the corresponding header item sent to
      <code>headers</code>. So to customize the calories column we're using the
      <code>item.calories</code> slot.
    </v-list-item-subtitle>
    <div class="mt-4">
      <v-data-table :headers="headers" :items="desserts" class="border">
        <template v-slot:item.calories="{ item }">
          <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatatablesCustomizingDefaultRows",

  data: () => ({
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" }
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%"
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%"
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%"
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%"
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%"
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%"
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%"
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%"
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%"
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%"
      }
    ]
  }),
  methods: {
    getColor(calories) {
      if (calories > 400) return "error";
      else if (calories > 200) return "warning";
      else return "success";
    }
  }
};
</script>