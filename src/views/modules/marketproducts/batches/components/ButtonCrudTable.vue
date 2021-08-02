<template >
  <div  class="d-inline-flex">
    <v-icon small @click="edit(item)" class="mr-2">mdi-pencil</v-icon>    
    <v-icon small @click="detail(item)" class="mr-2">mdi-format-list-checks</v-icon>
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
    detail(item) {
      this.$emit("handler-detail", item);
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