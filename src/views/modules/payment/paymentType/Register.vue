<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todas los tipos de pago
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingCommerces"
              label="Comercio"
              :items="commerceList"
              v-model="form.commerce_id"
              filled
              required
              :rules="rules.commerceRule"
              background-color="transparent"
              :error-messages="errorsBags.commerce_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre del tipo de pago"
              required
              filled
              :rules="rules.nameRule"
              background-color="transparent"
              :error-messages="errorsBags.name"
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
        <v-btn
          color="black"
          class="text-capitalize"
          to="/payment/payment-type"
          dark
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
import { mapActions, mapGetters } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
import { handleMessage } from "@/utils";
export default {
  name: "RegisterPaymentType",
  props: {
    id: String,
  },
  components: {
    SnackBar,
  },

  data() {
    return {
      textSnackBar: "",
      titleForm: "Comercio",
      valid: true,
      loadingCommerces: false,
      commerceList: [],
      form: {
        id: "",
        commerce_id: null,
        name: "",
        enabled: false,
      },
      errorsBags: [],

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        commerceRule: [(v) => !!v || "este campo es obligatorio"],
        enabledRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    ...mapGetters({ storePaymentTypes: "paymentType/getPaymentTypes" }),
  },

  methods: {
    ...mapActions({
      createPaymentType: "paymentType/createPaymentType",
      getPaymentTypeById: "paymentType/getPaymentTypeById",
      updatePaymentType: "paymentType/updatePaymentType",
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
      this.loadingCommerces = true;
      const rows = [];
      this.getCommercesData()
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.name,
              });
              this.commerceList = rows;
            });
          }
          this.loadingCommerces = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCommerces = false;
        });
      if (this.id) {
        this.getPaymentTypeById(this.id).then((result) => {
          this.form = {
            id: result.id,
            name: result.name,
            commerce_id: result.commerce_id,
            enabled: result.enabled,
          };
        });
      }
    },

    create(payload) {
      this.createPaymentType(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Guardado existosamente!", 200, this);
            this.$router.push("/payment/payment-type");
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
      this.updatePaymentType(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Actualizado existosamente!", 200, this);
            this.$router.push("/payment/payment-typee");
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