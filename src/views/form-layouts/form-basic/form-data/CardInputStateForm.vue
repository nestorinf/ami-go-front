<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Input groups</h3>
      <h6 class="subtitle-2 font-weight-light">All with vuetify element attributes</h6>
    </v-card-text>
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Color outline Inputs</h3>
      <div class="mt-5">
        <v-text-field
          outlined
          color="success"
          label="Input with Success"
          value="John"
          prepend-inner-icon="mdi-pencil"
        ></v-text-field>
        <v-text-field outlined color="error" value="Smith" label="Error" append-icon="mdi-pencil"></v-text-field>
        <v-text-field
          outlined
          color="warning"
          value="John"
          label="Input with Warning"
          prepend-inner-icon="mdi-pencil"
        ></v-text-field>
        <v-text-field
          outlined
          color="info"
          value="John"
          label="Input with Info"
          append-icon="mdi-pencil"
        ></v-text-field>
        <v-text-field
          outlined
          color="black"
          value="John"
          label="Input with Dark"
          prepend-inner-icon="mdi-pencil"
        ></v-text-field>
      </div>
    </v-card-text>
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Color Single line Inputs</h3>
      <div class="mt-5">
        <v-text-field
          color="success"
          label="Input with Success"
          placeholder="Success"
          persistent-hint
        ></v-text-field>
        <v-text-field color="error" label="Input with Error" placeholder="Error"></v-text-field>
        <v-text-field color="warning" label="Input with Warning" placeholder="Warning"></v-text-field>
        <v-text-field color="black" label="Input with Dark" placeholder="Dark"></v-text-field>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardInputStateForm",
  data: () => ({})
};
</script>