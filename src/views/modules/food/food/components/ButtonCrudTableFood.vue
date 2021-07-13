<template >
  <div>
    <v-icon small @click="edit(item)" class="mr-2">mdi-pencil</v-icon>
    <v-icon small @click="add_feature(item)" class="mr-2" v-if="item.with_features">mdi-format-list-bulleted-type</v-icon>
    <v-icon small @click="remove(item)">mdi-delete</v-icon>
  </div>
</template>

<script>
export default {
  name: "ButtonCrudTable",
  props: {
    item: Object,
  },

  methods: {
    add_feature(item) {
      this.$emit("handler-add-feature", item);
    },
    edit(item) {
      this.$emit("handler-edit", item);
    },
    remove(item) {
      this.$emit("handler-remove", item);
    },
  },
};
</script>