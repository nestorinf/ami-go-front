<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Costo Delivery
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registra el costo del delivery por KM
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.value"
              label="Kilometros"              
              type="number"
              min="1"
              filled
              required
              :rules="rules.valueRule"
              background-color="transparent"
              :error-messages="errorsBags.value"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="">
            <v-text-field
              v-model="form.alternative"
              label="Costo"
              filled
              required
              :rules="rules.alternativeRule"
              background-color="transparent"
              :error-messages="errorsBags.alternative"
            ></v-text-field>
          </v-col>
           <v-col cols="12" lg="6">
            <v-checkbox
              v-model="form.enabled"
              checked
              filled
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
          to="/configuration/delivery-cost"
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
import { mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterDeliveryCost",
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
      errorsBags: [],
      form: {
        id: "",
        value: "",
        alternative: "",
        enabled: true,
      },
      rules: {
        valueRule: [(v) => !!v || "este campo es obligatorio"],
        alternativeRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getDeliveryCosts() {
      return this.$store.state.deliveryCost.deliveryCosts;
    },
  },
  methods: {
    ...mapActions({
      createDeliveryCost: "deliveryCost/createDeliveryCost",
      DeliveryCostById: "deliveryCost/getDeliveryCostById",
      updateDeliveryCost: "deliveryCost/updateDeliveryCost",
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
        this.DeliveryCostById(this.id).then((result) => {
          this.form = {
            id: result.id,
            value: result.value,
            alternative: result.alternative,
            enabled: result.enabled
          };
        });
      }
    },

    create(payload) {
      this.createDeliveryCost(payload)
        .then((result) => {
          if (result) {
            this.$refs.form.resetValidation();        
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
      this.updateDeliveryCost(payload)
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