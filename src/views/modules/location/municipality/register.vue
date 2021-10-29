<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          Municipio
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
          En este formulario se registran todos los municipios
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingDepartment"
              label="Departamento a que pertenece el municipio *"
              :items="departmentList"
              v-model="form.department_id"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.department_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre del municipio *"
              filled
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              v-model="form.code"
              label="Código del Municipio *"
              filled
              background-color="transparent"
              :error-messages="errorsBags.code"
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
        <v-btn
          color="black"
          class="text-capitalize"
          to="/location/municipality"
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
import { mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
import { handleMessage } from "@/utils";
export default {
  name: "RegisterMunicipality",
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
      loadingDepartment: false,
      departmentList: [],
      errorsBags: [],
      form: {
        id: "",
        department_id: "",
        name: "",
        code: "",
      },
    };
  },

  mounted() {
    this.setData();
  },

  methods: {
    ...mapActions({
      createMunicipality: "municipality/createMunicipality",
      getMunicipalityById: "municipality/getMunicipalityById",
      updateMunicipality: "municipality/updateMunicipality",
      getDepartmentsData: "department/getDepartmentsData",
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
      this.loadingDepartment = true;
      const rows = [];
      this.getDepartmentsData().then((result) => {
        result.map((element) => {
          rows.push({
            value: element.id,
            text: element.name,
          });
          this.departmentList = rows;
        });
        this.loadingDepartment = false;
      });
      if (this.id) {
        this.getMunicipalityById(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createMunicipality(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Guardado existosamente!", 200, this);
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
      this.updateMunicipality(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Actualizado existosamente!", 200, this);
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
