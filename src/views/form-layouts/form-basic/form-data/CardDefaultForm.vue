<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Default Form</h3>
      <h6 class="subtitle-2 font-weight-light">All with vuetify element attributes</h6>
    </v-card-text>
    <v-card-text>
      <v-text-field
        v-model="dtext"
        label="Default Text e.g. 'George deo'"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        type="email"
        v-model="emailtext"
        label="Email e.g. 'example@gmail.com"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        v-model="password"
        filled
        background-color="transparent"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-text-field
        v-model="placetext"
        label="Placeholder"
        placeholder="Enter Placeholder"
        filled
        background-color="transparent"
      ></v-text-field>
      <v-textarea
        filled
        name="input-7-4"
        rows="3"
        label="Textarea"
        value
        background-color="transparent"
      ></v-textarea>
      <v-text-field
        v-model="disableinput"
        label="Disabled Input"
        disabled
        filled
        background-color="transparent"
      ></v-text-field>
      <v-row>
        <v-col cols="12" lg="6">
          <v-checkbox
            v-model="checkbox1"
            class="mt-2"
            label="Check this custom checkbox"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox2"
            class="mt-2"
            label="Check this custom checkbox"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox3"
            class="mt-2"
            label="Check this custom checkbox"
            hide-details
          ></v-checkbox>
          <div class="mt-8">
            <v-switch v-model="switch1" inset label="Toggle this switch element" hide-details></v-switch>
            <v-switch v-model="switch2" disabled inset label="Disabled switch element" hide-details></v-switch>
          </div>
        </v-col>
        <v-col cols="12" lg="6">
          <v-radio-group v-model="radios" :mandatory="false">
            <v-radio label="Toggle this custom radio" value="radio1"></v-radio>
            <v-radio label="Toggle this custom radio" value="radio2"></v-radio>
            <v-radio label="Toggle this custom radio" value="radio3"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <div class="mt-4">
        <v-select :items="items" filled label="Input Select" background-color="transparent"></v-select>
        <v-text-field
          label="Helping text"
          filled
          background-color="transparent"
          placeholder="Helping text"
          hint="A block of help text that breaks onto a new line and may extend beyond one line."
          persistent-hint
        ></v-text-field>
      </div>
      <v-btn class="text-capitalize mt-5 element-0" color="success">Submit</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardDefaultForm",
  data: () => ({
    dtext: "George deo",
    emailtext: "",
    password: "",
    placetext: "",
    disableinput: "",
    checkbox1: "",
    checkbox2: "",
    checkbox3: "",
    show1: false,
    radios: "radio1",
    switch1: true,
    switch2: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    items: ["IT", "Blade Runner", "Thor"]
  })
};
</script>