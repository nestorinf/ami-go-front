<template >
  <div>
    
    <v-icon small @click="edit(item)" class="mr-2">{{item.enabled?'mdi-eye-off':'mdi-eye'}}</v-icon>
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
    edit(item) {
      this.$emit("handler-edit", item);
    },
    remove(item) {
      this.$emit("handler-remove", item);
    },
  },
};
</script>