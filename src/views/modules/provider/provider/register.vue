<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Proveedor
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos los proveedores
      </h6>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="12" lg="6">
          <v-text-field
            v-model="name"
            label="Nombre"
            filled
            background-color="transparent"
          ></v-text-field>
        </v-col>
        <v-col cols="6" lg="6">
          <v-text-field
            type="email"
            v-model="email"
            label="Email"
            filled
            background-color="transparent"
          ></v-text-field>
        </v-col>
        <v-col cols="6" lg="6">
          <v-text-field
            v-model="agent"
            label="Agente"
            filled
            background-color="transparent"
          ></v-text-field>
        </v-col>
        <v-col cols="6" lg="6">
          <v-text-field
            v-model="code"
            label="Codigo"
            filled
            background-color="transparent"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field
            v-model="phone"
            label="Telefono"
            filled
            background-color="transparent"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="success" class="text-capitalize mr-2">Guardar</v-btn>
      <v-btn color="black" class="text-capitalize" to="/provider/provider" dark
        >Cancelar</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RegisterProvider",

  data: () => ({
    name: "",
    email: "",
    agent: "",
    code: "",
    phone: "",
  }),
};
</script>