<template>
  <div>
    <v-list>
      <v-subheader inset>Animation swipe</v-subheader>
      <draggable :list="list" class="cursor-move">
        <transition-group>
          <v-list-item class="animation" v-for="list in list" :key="list" @click.prevent>
            <v-list-item-avatar class="success lighten-1">
              <v-icon class="white--text">mdi-folder-star</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="list"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </transition-group>
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
<style>
.animation {
  transition: all 0.5s;
}
</style>