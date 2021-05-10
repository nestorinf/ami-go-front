<template>
  <v-container fluid class="down-top-padding">
    <v-card>
      <v-card-text class="pa-5">
        <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="id"
          class="contact-listing-app"
          :search="search"
        >
          <template v-slot:top>
            <v-toolbar flat class="mb-8">
              <v-row>
                <v-col cols="12" lg="6">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Contacts"
                    filled
                    background-color="transparent"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="700">
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2 text-capitalize"
                    v-on="on"
                  >
                    <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>New
                    Contact
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="pa-4 info">
                    <span class="title white--text">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            outlined
                            hide-details
                            v-model="editedItem.id"
                            label="Id"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            outlined
                            hide-details
                            v-model="editedItem.userinfo"
                            label="User info"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            outlined
                            hide-details
                            v-model="editedItem.usermail"
                            label="User email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            outlined
                            hide-details
                            v-model="editedItem.phone"
                            label="Phone"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            outlined
                            hide-details
                            v-model="editedItem.jdate"
                            label="Joining Date"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            outlined
                            hide-details
                            v-model="editedItem.role"
                            label="Role"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" dark @click="close">Cancel</v-btn>
                    <v-btn color="success" dark @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.id="{ item }">
            <v-chip pill>{{ item.id }}</v-chip>
          </template>
          <template v-slot:item.userinfo="{ item }">
            <div class="d-flex align-center">
              <div>
                <v-img
                  :src="require(`@/assets/images/users/${item.avatar}`)"
                  width="45px"
                  class="rounded-circle img-fluid"
                ></v-img>
              </div>

              <div class="ml-5">
                <h4>{{ item.userinfo }}</h4>
                <span class="subtitle-2 d-block font-weight-regular">{{
                  item.usermail
                }}</span>
              </div>
            </div>
          </template>
          <template v-slot:item.role="{ item }">
            <v-chip :color="item.rolestatus" label>{{ item.role }}</v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2 info--text" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small class="error--text" @click="deleteItem(item)"
              >mdi-delete</v-icon
            >
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ContactList",
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "User Info", value: "userinfo" },
      { text: "Phone", value: "phone" },
      { text: "Joining Date", value: "jdate" },
      { text: "Role", value: "role" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      avatar: "1.jpg",
      userinfo: "",
      usermail: "",
      phone: "",
      jdate: "",
      role: "",
    },
    defaultItem: {
      id: "",
      avatar: "1.jpg",
      userinfo: "",
      usermail: "",
      phone: "",
      jdate: "",
      role: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Contact" : "Edit Contact";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          id: "#123",
          avatar: "1.jpg",
          userinfo: "Hanna Gover",
          usermail: "hgover@gmail.com",
          phone: "+123 456 789",
          jdate: "12-10-2014",
          role: "Designer",
          rolestatus: "cyan lighten-3",
        },
        {
          id: "#452",
          avatar: "2.jpg",
          userinfo: "Daniel Kristeen",
          usermail: "hgover@gmail.com",
          phone: "+234 456 789",
          jdate: "10-09-2014",
          role: "Developer",
          rolestatus: "light-blue lighten-3",
        },
        {
          id: "#565",
          avatar: "3.jpg",
          userinfo: "Julian Josephs",
          usermail: "hgover@gmail.com",
          phone: "+345 456 789",
          jdate: "01-10-2013",
          role: "Accountant",
          rolestatus: "teal lighten-3",
        },
        {
          id: "#785",
          avatar: "4.jpg",
          userinfo: "Jan Petrovic",
          usermail: "hgover@gmail.com",
          phone: "+456 456 789",
          jdate: "02-10-2017",
          role: "Designer",
          rolestatus: "green lighten-3",
        },
        {
          id: "#564",
          avatar: "5.jpg",
          userinfo: "Leanne Graham",
          usermail: "hgover@gmail.com",
          phone: "+567 456 789",
          jdate: "10-9-2015",
          role: "HR",
          rolestatus: "deep-purple lighten-2",
        },
        {
          id: "#980",
          avatar: "6.jpg",
          userinfo: "Mrs. Dennis Schulist",
          usermail: "hgover@gmail.com",
          phone: "+678 456 789",
          jdate: "10-5-2013",
          role: "Designer",
          rolestatus: "indigo lighten-2",
        },
        {
          id: "#521",
          avatar: "7.jpg",
          userinfo: "Kurtis Weissnat",
          usermail: "hgover@gmail.com",
          phone: "+123 456 789",
          jdate: "05-10-2012",
          role: "Manager",
          rolestatus: "blue lighten-2",
        },
        {
          id: "#450",
          avatar: "8.jpg",
          userinfo: "Nicholas Runolfsdottir V",
          usermail: "hgover@gmail.com",
          phone: "+234 456 789",
          jdate: "11-10-2014",
          role: "Chairman",
          rolestatus: "red lighten-3",
        },
        {
          id: "#212",
          avatar: "d1.jpg",
          userinfo: "Glenna Reichert",
          usermail: "hgover@gmail.com",
          phone: "+345 456 789",
          jdate: "12-5-2017",
          role: "Designer",
          rolestatus: "indigo lighten-4",
        },
        {
          id: "#152",
          avatar: "d2.jpg",
          userinfo: "Clementina DuBuque",
          usermail: "hgover@gmail.com",
          phone: "+456 456 789",
          jdate: "18-5-2009",
          role: "Developer",
          rolestatus: "indigo lighten-4",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
