<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">Sample Basic Forms</h3>
      <h6 class="subtitle-2 font-weight-light">All with vuetify element attributes</h6>
    </v-card-text>
    <v-card-text class="pa-5">
      <v-text-field label="User Name" v-model="uname" placeholder="Enter username"></v-text-field>
      <v-text-field label="Email" type="email" v-model="email" placeholder="Email address"></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        placeholder="Enter password"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-text-field
        v-model="cpassword"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show2 ? 'text' : 'password'"
        name="input-10-1"
        label="Confirm Password"
        placeholder="Enter Confirm password"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-checkbox v-model="checkbox2" class="mt-2" label="Remember me" hide-details></v-checkbox>
      <div class="mt-4">
        <v-btn color="success" class="text-capitalize mr-2">Save</v-btn>
        <v-btn color="black" class="text-capitalize" dark>Cancel</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardSimpleForm",
  data: () => ({
    uname: "",
    email: "",
    password: "",
    cpassword: "",
    show1: false,
    show2: false,
    checkbox2: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  })
};
</script>