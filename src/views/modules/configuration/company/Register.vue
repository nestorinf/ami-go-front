<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Default Form
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        All with vuetify element attributes
      </h6>
    </v-card-text>
    <v-card-text>
      <v-text-field
        v-model="name"
        label="Default Text e.g. 'George deo'"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        type="email"
        v-model="email"
        label="Email e.g. 'example@gmail.com"
        filled
        background-color="transparent"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RegisterCompany",

  data: () => ({
    name: "",
    email: "",
  }),
};
</script>