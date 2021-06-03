<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline"
          >Esta seguro de realizar esta accion?</v-card-title
        >
        <v-card-text>{{ message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="accept">Aceptar</v-btn>
          <v-btn color="error" text @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  name: "DialogConfirm",
  props: {
    message: String,
  },
  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    changeStateDialog(value) {
      this.dialog = value;
    },
    accept() {
      this.$emit("handler-dialog-confirm");
    },
  },
};
</script>