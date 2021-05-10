<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col lg="6" cols="12">
        <v-list>
          <v-subheader inset>Branded Companies 1</v-subheader>
          <draggable :list="company1" group="people" class="p-2 cursor-move">
            <v-list-item v-for="listItem in company1" :key="listItem.name" @click.prevent>
              <v-list-item-avatar class="blue lighten-1">
                <v-icon class="white--text">mdi-folder</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="listItem.name"></v-list-item-title>
                <v-list-item-subtitle v-text="listItem.email"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </draggable>
        </v-list>
      </v-col>
      <v-col lg="6" cols="12">
        <v-list>
          <v-subheader inset>Branded Companies 2</v-subheader>
          <draggable :list="company2" group="people" class="p-2 cursor-move">
            <v-list-item v-for="listItem in company2" :key="listItem.name" @click.prevent>
              <v-list-item-avatar class="blue lighten-1">
                <v-icon class="white--text">mdi-folder</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="listItem.name"></v-list-item-title>
                <v-list-item-subtitle v-text="listItem.email"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </draggable>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "DragnDropMultiple",
  data: () => ({
    title: "DragnDropMultiple",
    company1: [
      {
        name: "Quantum Computer Services",
        email: "AOL"
      },
      {
        name: "BackRub ",
        email: "Google"
      },
      {
        name: "Sound of Music ",
        email: "Best Buy"
      },
      {
        name: "Apple Computers",
        email: "Apple, Inc."
      }
    ],
    company2: [
      {
        name: "Research in Motion",
        email: "Blackberry"
      },
      {
        name: "Brad’s Drink",
        email: "Pepsi-Cola"
      },
      {
        name: "Tokyo Tsushin Kogyo",
        email: "Sony"
      },
      {
        name: "Blue Ribbon Sports",
        email: "Starbucks"
      }
    ]
  }),
  components: {
    draggable
  }
};
</script>