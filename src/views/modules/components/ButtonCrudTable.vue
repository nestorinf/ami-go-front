<template >
  <div>
    <v-icon small @click="edit(item)" class="mr-2">mdi-pencil</v-icon>
    <v-icon small @click="remove(item)">mdi-delete</v-icon>
  </div>
</template>

<script>
export default {
  name: "ButtonCrudTable",
  props: {
    item: Array,
  },

  methods: {
    edit(item) {
      console.log(item);
    },
    remove(item) {
      console.log(item);
    },
  },

  mounted() {
    console.log(this.item);
  },
};
</script>