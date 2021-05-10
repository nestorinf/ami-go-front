<template>
  <div class="pa-5">
    <v-list two-line subheader>
      <draggable class="cursor-move">
        <v-list-item v-for="list in list" :key="list" @click.prevent>
          <v-list-item-avatar class="grey lighten-1 white--text">
            <v-icon>mdi-folder</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="list"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </draggable>
    </v-list>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "DragnDropAnimation",
  data: () => ({
    title: "DragnDropAnimation",
    list: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    ]
  }),
  components: {
    draggable
  }
};
</script>