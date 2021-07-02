<template>
  <v-card class="mb-7">
      <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Dirección Comercio
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todas las direcciones de comercio
      </h6>
    </v-card-text>    
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>   
                <v-col cols="12" lg="12">
                    <v-select
                    :loading="loadingCommerces"
                    label="Comercio"
                    :items="commerceList"
                    v-model="form.commerce_id"
                    filled
                    required
                    :rules="rules.commerceRule"
                    background-color="transparent"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="12">
                    <v-text-field
                    v-model="form.name"
                    label="Dirección"
                    required
                    filled
                    :rules="rules.nameRule"
                    background-color="transparent"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" lg="12" >
                    <GoogleMap :latitude= 13.7013266 :longitude= -89.226622 :title="'Titulo Marcador'" /> 
                </v-col>
                <!-- <v-col cols="6" lg="6">
                    <v-text-field
                    type="email"
                    v-model="form.email"
                    label="Email Comercio"
                    required
                    filled
                    :rules="rules.emailRule"
                    background-color="transparent"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" lg="6">
                    <v-text-field
                    v-model="form.agent"
                    label="Persona Contacto"
                    filled
                    required
                    :rules="rules.agentRule"
                    background-color="transparent"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6">
                    <v-text-field
                    v-model="form.phone"
                    label="Telefono Persona Contacto"
                    filled
                    required
                    :rules="rules.phoneRule"
                    background-color="transparent"
                    ></v-text-field>
                </v-col> -->
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
          to="/commerce/commerce"
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
import GoogleMap from "../../../components/GoogleMap";
export default {
  name: "RegisterCommerceAddress",
  props: {
    id: String,
  },
  components: {
    SnackBar,
    GoogleMap,
  },

  data() {
    return {
      textSnackBar: "",
      titleForm: "Dirección Comercio",
      valid: true,
      loadingCommerces: false,
      commerceList: [],
      form: {
        id: "",
        commerce_id: null,
        name: "",
        agent: "",
        email: "",
        phone: "",
      },

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        commerceRule: [(v) => !!v || "este campo es obligatorio"],
        agentRule: [(v) => !!v || "este campo es obligatorio"],
        phoneRule: [(v) => !!v || "este campo es obligatorio"],
        emailRule: [
          (v) => !!v || "el este campo es obligatorio",
          (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "el email es invalido",
        ],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getComerceAddresses() {
      return this.$store.state.comerceAddress.comerceAddresses;
    },
  },

  methods: {
    ...mapActions({
      createCommerceAddress: "commerceAddress/createCommerceAddress",
      getCommerceAddressById: "commerceAddress/getCommerceAddressById",
      updateCommerceAddress: "commerceAddress/updateCommerceAddress",
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
      this.getCommercesData().then((result) => {
        if(result) {
          result.map((element) => {
            rows.push({
              value: element.id,
              text: element.name,
            });
            this.commerceList = rows;
            
          });

        }
        this.loadingCommerces = false;
      }).catch((err) => {
        console.log(err)
        this.loadingComemrces = false; 
      });
      if (this.id) {
        this.getCommerceAddressById(this.id).then((result) => {
          this.form = {
            id: result.id,
            value: result.value,
            commerce_id: result.commerce_id,
            alternative: result.alternative,
            json_value: result.json_value
          };
        });
      }
    },

    create(payload) {
      this.createReferenceList(payload)
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
      this.updateReferenceList(payload)
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