<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Agrupar Super mercados
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todas las agrupaciones de Super mercados
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.name"
              label="Nombre del Grupo"
              required
              filled
              :rules="rules.nameRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="form.commerce_ids"
              :items="itemCommerces"
              dense
              chips
              small-chips
              label="Super mercados"
              multiple
              solo
              required
              :rules="rules.commerceRules"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" lg="6">
            <v-checkbox
              v-model="form.enabled"
              required
              label="Habilitado"
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
        <v-btn
          color="black"
          class="text-capitalize"
          to="/commerce/commerce-group"
          dark
          >Cancelar</v-btn
        >
      </v-form>
    </v-card-text>

    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";

export default {
  name: "RegisterCommerceGroup",
  props: {
    id: String,
  },
  components: {
    SnackBar,
  },

  data() {
    return {
      textSnackBar: "",
      titleForm: "Agrupar Super mercados",
      valid: true,
      errorsBags: [],
      loadingCommerces: false,
      loadingChild: false,
      itemCommerces: [],

      form: {
        id: "",
        commerce_ids: null,
        name: "",
        enabled: true,
        group_type: "MARKET",
      },

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        commerceRules: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
    this.getCommerceAddressData(1);
  },

  computed: {
    ...mapGetters({
      storeCommerceAddresses: "commerceAddress/getCommerceAddresses",
    }),
  },

  watch: {
    storeCommerceAddresses(data) {
      const rows = [];
      if (data.length > 0) {
        data.map((element) => {
          rows.push({
            text: element.commerce + " - " + element.name,
            value: element.id,
          });
        });
      }
      this.itemCommerces = rows;
    },
  },

  methods: {
    ...mapActions({
      createCommerceGroup: "commerceGroup/createCommerceGroup",
      getCommerceGroupById: "commerceGroup/getCommerceGroupById",
      updateCommerceAddress: "commerceGroup/updateCommerceGroup",
      getCommerceAddressData: "commerceAddress/getCommerceAddressData",
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
      this.loadingCommerces = true;

      if (this.id) {
        this.getCommerceGroupById(this.id).then((result) => {
          this.loadingChild = true;
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createCommerceGroup(payload)
        .then((result) => {
          if (result) {
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
      this.updateCommerceAddress(payload)
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