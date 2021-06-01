<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Tipo de Comercio
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos los Tipos de Comercio
      </h6>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="12" lg="12">
          <v-text-field
            v-model="name"
            label="Nombre"
            filled
            background-color="transparent"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="12">
          <v-text-field
            v-model="description"
            label="Descripcion"
            filled
            background-color="transparent"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="success" class="text-capitalize mr-2">Guardar</v-btn>
      <v-btn
        color="black"
        class="text-capitalize"
        to="/configuration/commerce-type"
        dark
        >Cancelar</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RegisterCompany",

  data: () => ({
    name: "",
    description: "",
  }),
};
</script>