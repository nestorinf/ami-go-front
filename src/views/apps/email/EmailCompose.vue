<template>
  <!-- ------------------------------------------------------------------------ -->
  <!-- Email Dialog -->
  <!-- ------------------------------------------------------------------------ -->
  <div>
    <v-dialog v-model="dialog" max-width="650">
      <template v-slot:activator="{ on }">
        <v-btn
          color="info"
          class="text-capitalize font-weight-regular"
          block
          depressed
          dark
          v-on="on"
        >Compose</v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="d-flex align-center pa-3">
            <h3>Compose Mail</h3>
            <div class="ml-auto">
              <v-btn text color="error" @click="dialog = !dialog">close</v-btn>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="pa-3">
            <!-- ------------------------------------------------------------------------ -->
            <!-- Email Compose Form -->
            <!-- ------------------------------------------------------------------------ -->
            <form>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field label="To" v-model="to" filled background-color="transparent"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Subject"
                    v-model="subject"
                    filled
                    background-color="transparent"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="CC" v-model="cc" filled background-color="transparent"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-file-input
                    filled
                    background-color="transparent"
                    chips
                    multiple
                    label="Upload files"
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Type a message"
                    v-model="message"
                    filled
                    rows="3"
                    background-color="transparent"
                  ></v-textarea>
                </v-col>
              </v-row>
              <div class="text-right">
                <v-btn color="info">
                  Send
                  <v-icon small class="ml-2">mdi-send</v-icon>
                </v-btn>
              </div>
            </form>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "EmailCompose",
  data: () => ({
    message: "",
    cc: "",
    subject: "",
    to: "",
    selected: [],
    isClass: true,
    close: "",
    dialog: false
  })
};
</script>
