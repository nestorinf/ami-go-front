<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Disabled Form</h3>
      <h6 class="subtitle-2 font-weight-light">All with vuetify element attributes</h6>
    </v-card-text>
    <v-card-text class="pa-5">
      <v-text-field label="Disabled input" disabled filled></v-text-field>
      <v-select :items="items" filled label="Input Select" disabled></v-select>
      <v-checkbox
        v-model="checkbox2"
        class="mt-2"
        label="Check this custom checkbox"
        hide-details
        disabled
      ></v-checkbox>
      <v-btn color="info" class="text-capitalize mt-4" disabled>Save</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardDisabledForm",
  data: () => ({
    items: ["IT", "Blade Runner", "Thor"],
    checkbox2: false
  })
};
</script>