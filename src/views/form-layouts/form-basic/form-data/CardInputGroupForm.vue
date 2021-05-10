<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Input groups</h3>
      <h6 class="subtitle-2 font-weight-light">All with vuetify element attributes</h6>
    </v-card-text>
    <v-card-text class="pa-5 border-bottom">
      <v-text-field
        filled
        background-color="transparent"
        label="Username"
        prepend-inner-icon="mdi-pencil"
      ></v-text-field>
      <v-text-field
        filled
        background-color="transparent"
        label="Recepaint's name"
        append-icon="mdi-pencil"
      ></v-text-field>
      <v-text-field
        filled
        background-color="transparent"
        label="Username"
        prepend-inner-icon="mdi-currency-usd"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardInputGroupForm",
  data: () => ({})
};
</script>