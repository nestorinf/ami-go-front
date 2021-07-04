<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Lista Referencia
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos los valores de Referencias
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
            <v-col cols="12" lg="12">
            <v-select
              :loading="loadingReferences"
              label="Referencia"
              :items="referencesLists"
              v-model="form.reference_id"
              filled
              required
              :rules="rules.reference_idRule"
              background-color="transparent"
              :error-messages="errorsBags.reference_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.value"
              label="Valor"
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
              label="Valor Alternativo"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.alternative"
            ></v-text-field>
          </v-col>
          
          <!-- <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.json_value"
              label="Json"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.json_value"
            ></v-text-field>
          </v-col> -->

        <v-col cols="12" lg="12">
          <v-textarea
            v-model="form.json_value"
            label="Valor Json"
            auto-grow
            filled
            required
            background-color="transparent"
            :error-messages="errorsBags.json_value"          
            rows="4"
          ></v-textarea>
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
          to="/configuration/reference-list"
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
  name: "RegisterReferenceList",
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
      loadingReferences: false,
      referencesLists: [],
      errorsBags: [],
      form: {
        id: "",
        reference_id: "",
        value: "",
        alternative: "",
        json_value: "",
      },
      rules: {
        reference_idRule: [(v) => !!v || "este campo es obligatorio"],
        valueRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getReferenceLists() {
      return this.$store.state.referenceList.referenceLists;
    },
  },
  methods: {
    ...mapActions({
      createReferenceList: "referenceList/createReferenceList",
      getReferenceListById: "referenceList/getReferenceListById",
      updateReferenceList: "referenceList/updateReferenceList",
      getReferenceData: "reference/getReferenceData",
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
      this.loadingReferences = true;
      const rows = [];
      this.getReferenceData().then((result) => {
        if(result) {
          result.map((element) => {
            rows.push({
              value: element.id,
              text: element.name,
            });
            this.referencesLists = rows;
            
          });

        }
        this.loadingReferences = false;
      }).catch((err) => {
        console.log(err)
        this.loadingReferences = false; 
      });
      if (this.id) {
        this.getReferenceListById(this.id).then((result) => {
          this.form = {
            id: result.id,
            value: result.value,
            reference_id: result.reference_id,
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