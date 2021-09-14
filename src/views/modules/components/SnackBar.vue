<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" top right app>
      {{ text }}
      <v-btn
        class="text-right"
        color="info"
        max-width="20"
        text
        @click="snackbar = false"
      >
        X
      </v-btn>
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