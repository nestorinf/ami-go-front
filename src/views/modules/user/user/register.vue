<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          Usuario
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todos los usuarios
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingCommerce"
              label="Comercio a que pertenece el usuario"
              :items="commerceList"
              v-model="form.commerce_id"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.commerce_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre del Usuario"
              required
              filled
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              type="email"
              v-model="form.email"
              label="Email del Usuario"
              required
              filled
              background-color="transparent"
              :error-messages="errorsBags.email"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              type="password"
              v-model="form.password"
              label="Contraseña del Usuario (dejar en blanco para conservar)"
              filled
              background-color="transparent"
              autocomplete="new-password"
              :error-messages="errorsBags.password"
            ></v-text-field>
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
        <v-btn color="black" class="text-capitalize" to="/user/user" dark
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
export default {
  name: "RegisterUser",
  props: {
    id: String,
  },
  components: {
    SnackBar,
  },

  data() {
    return {
      textSnackBar: "",
      valid: true,
      loadingCommerce: false,
      commerceList: [],
      errorsBags: [],
      form: {
        id: "",
        commerce_id: "",
        name: "",
        email: "",
        password: "",
      },
    };
  },

  mounted() {
    this.setData();
  },

  methods: {
    ...mapActions({
      createUser: "user/createUser",
      getUserById: "user/getUserById",
      updateUser: "user/updateUser",
      getCommercesData: "commerce/getCommercesData",
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
      this.loadingCommerce = true;
      const rows = [];
      this.getCommercesData().then((result) => {
        result.map((element) => {
          rows.push({
            value: element.id,
            text: element.name,
          });
          this.commerceList = rows;
        });
          this.loadingCommerce = false;
      });
      if (this.id) {
        this.getUserById(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createUser(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
          }
        })
        .catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    update(payload) {
      this.updateUser(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
          }
        })
        .catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },
  },
};
</script>
