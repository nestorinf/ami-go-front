<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" top right>
      {{ text }}
      <v-btn color="info" text @click="snackbar = false"> Cerrar </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "SnackBar",
  data: () => ({ timeout: 2000, snackbar: false }),
  props: {
    text: String,
  },
  methods: {
    changeStatusSnackbar(value) {
      this.snackbar = value;
    },
  },
};
</script>