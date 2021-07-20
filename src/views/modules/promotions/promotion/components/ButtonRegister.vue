<template>
  <div class="my-2">
    <v-btn color="success" :to="path" depressed>{{ title }}</v-btn>
  </div>
</template>

<script>
export default {
  name: "ButtonRegister",
  props: {
    title: String,
    path: String,
  },
};
</script>