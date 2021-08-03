<template >
  <div class="d-inline">
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
    remove(item) {
      this.$emit("handler-remove", item);
    },
  },
};
</script>