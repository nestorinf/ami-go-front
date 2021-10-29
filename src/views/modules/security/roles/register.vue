<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}
        </h3>
        <v-col>
          <v-alert
            border="left"
            colored-border
            type="error"
            dense
            dismissible
            width="xl"
            mode
          >
            Los Campos con <strong>*</strong> son obligatorios
          </v-alert>
        </v-col>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todas los roles
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre *"
              required
              filled
              :rules="rules.nameRule"
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.slug"
              label="Slug *"
              required
              filled
              :rules="rules.slugRule"
              background-color="transparent"
              :error-messages="errorsBags.slug"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-checkbox
              v-model="form.enabled"
              required
              label="Habilitado"
              :error-messages="errorsBags.enabled"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-btn
          color="success"
          @click="save"
          :disabled="!valid"
          submit
          class="text-capitalize mr-2"
          >Guardar</v-btn
        >
        <v-btn color="black" class="text-capitalize" to="/security/roles" dark
          >Cancelar</v-btn
        >
      </v-card-text>
    </v-form>
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
import { handleMessage } from "@/utils";
export default {
  name: "RegisterRole",
  props: {
    id: String,
  },
  components: {
    SnackBar,
  },

  data() {
    return {
      textSnackBar: "",
      titleForm: "Roles",
      valid: true,
      form: {
        id: "",
        name: "",
        slug: "",
        enabled: false,
      },
      errorsBags: [],

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        slugRule: [(v) => !!v || "este campo es obligatorio"],
        enabledRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  methods: {
    ...mapActions({
      createRole: "role/createRole",
      getRoleById: "role/getRoleById",
      updateRole: "role/updateRole",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        if (this.id) {
          this.update(payload);
        } else {
          this.create(payload);
        }
      }
    },
    setData() {
      if (this.id) {
        this.getRoleById(this.id).then((result) => {
          this.form = {
            id: result.id,
            name: result.name,
            slug: result.slug,
            enabled: result.enabled,
          };
        });
      }
    },

    create(payload) {
      this.createRole(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Guardado existosamente!", 200, this);
            this.$router.push("/security/roles");
          }
        })
        .catch((err) => {
          const {
            data: { message },
            status,
          } = err.response;
          handleMessage(message, status, this);
        });
    },

    update(payload) {
      this.updateRole(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Actualizado existosamente!", 200, this);
            this.$router.push("/security/roles");
          }
        })
        .catch((err) => {
          const {
            data: { message },
            status,
          } = err.response;
          handleMessage(message, status, this);
        });
    },
  },
};
</script>