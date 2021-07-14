<template >
  <div>
    <v-icon small @click="edit(item)" class="mr-2">mdi-pencil</v-icon>
    <v-icon small @click="entities(item)" class="mr-2" v-if="item.type!='all'">mdi-format-list-checks</v-icon>
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
    entities(item) {
      this.$emit("handler-entities", item);
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