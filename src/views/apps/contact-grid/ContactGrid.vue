<template>
  <v-container fluid class="down-top-padding">
    <v-card class="mb-7">
      <v-card-text class="pa-5">
        <v-row justify="space-between">
          <v-col cols="12" lg="4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search Contacts"
              filled
              background-color="transparent"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" class="justify-end align-center d-flex">
            <v-dialog v-model="dialog" persistent max-width="700px">
              <template v-slot:activator="{ on }">
                <v-btn color="info" v-on="on">New Contact</v-btn>
              </template>
              <v-card>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card-title>
                    <span class="headline">New Contact</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" lg="6">
                          <v-text-field
                            label="Full name"
                            :rules="fnameRules"
                            v-model="contactname"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" lg="6">
                          <v-text-field
                            type="tel"
                            label="Contact no"
                            :rules="contactRules"
                            :counter="10"
                            v-model="phone"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" lg="6">
                          <v-text-field
                            label="Role"
                            :rules="roleRules"
                            v-model="role"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <v-text-field
                            type="number"
                            label="Twitter Followers"
                            v-model="twitterfollowers"
                            :rules="tfRules"
                            :counter="5"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" lg="6">
                          <v-text-field
                            type="number"
                            label="Instagram Followers"
                            v-model="instafollowers"
                            :rules="ifRules"
                            :counter="5"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" lg="6">
                          <v-text-field
                            type="number"
                            label="Facebook Followers"
                            v-model="fbfollowers"
                            :rules="fbRules"
                            :counter="5"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            label="Address"
                            rows="3"
                            :rules="addressRules"
                            :counter="300"
                            v-model="address"
                            outlined
                            required
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="dialog = false">Close</v-btn>
                    <v-btn color="success" @click="addContact">Save</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row justify="center">
      <v-col cols="12" sm="6" lg="4" v-for="(contactgrid, index) in contactgrids" :key="index">
        <v-card class="mb-7">
          <v-card-text class="pa-5 text-center">
            <img
              :src="require('@/assets/images/users'+ contactgrid.img)"
              alt="user"
              class="rounded-circle"
              width="100"
            />
            <h4 class="title mt-3 mb-0">{{ contactgrid.contactname }}</h4>
            <small class="subtitle-2 font-weight-regular">{{ contactgrid.role }}</small>
            <div class="mt-3">
              <v-btn depressed small color="primary" class="mr-2">Chat</v-btn>
              <v-btn depressed small color="success">Follow</v-btn>
            </div>
            <div class="mt-3 pt-3">
              <address class="subtitle-2 font-weight-regular">{{ contactgrid.address }}</address>
            </div>
          </v-card-text>

          <div class="pa-3 blue lighten-4 text-center">
            <i class="mdi mdi-cellphone-iphone mr-2"></i>
            {{ contactgrid.phone }}
          </div>
          <v-card-text class="px-4 py-3">
            <v-row>
              <v-col cols="4" class="text-left">
                <v-chip pill>
                  <v-avatar left>
                    <v-btn color="blue lighten-1" class="white--text">
                      <v-icon small>mdi-twitter</v-icon>
                    </v-btn>
                  </v-avatar>
                  {{ contactgrid.twitterfollowers }}
                </v-chip>
              </v-col>
              <v-col cols="4" class="text-center">
                <v-chip pill>
                  <v-avatar left>
                    <v-btn color="pink darken-1" class="white--text">
                      <v-icon small>mdi-instagram</v-icon>
                    </v-btn>
                  </v-avatar>
                  {{ contactgrid.instafollowers }}
                </v-chip>
              </v-col>
              <v-col cols="4" class="text-right">
                <v-chip pill>
                  <v-avatar left>
                    <v-btn color="indigo darken-3" class="white--text">
                      <v-icon small>mdi-facebook</v-icon>
                    </v-btn>
                  </v-avatar>
                  {{ contactgrid.fbfollowers }}
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: "ContactGrid",
  data: () => ({
    valid: true,
    dialog: false,
    search: "",
    contactname: "",
    phone: "",
    role: "",
    img: "/1.jpg",
    address: "",
    twitterfollowers: "",
    instafollowers: "",
    fbfollowers: "",
    contactfilter: [
      {
        phone: "(123) 456 789",
        img: "/1.jpg",
        contactname: "Hanna Gover",
        role: "Designer",
        address: " 2289 5th Ave, Suite 600 San Francisco New York, NY, 10037 ",
        instafollowers: "12",
        twitterfollowers: "20",
        fbfollowers: "21"
      },
      {
        phone: "(234) 456 789",
        img: "/2.jpg",
        contactname: "Daniel Kristeen",
        role: "Developer",
        address: " 55 E 11th St #1OTH, Suite 600 New York, NY, 10003 ",
        instafollowers: "12",
        twitterfollowers: "20",
        fbfollowers: "21"
      },
      {
        phone: "(345) 456 789",
        img: "/3.jpg",
        contactname: "Julian Josephs",
        role: "Accountant",
        address: " 36 W 138th St, San Francisco New York, NY, 10037 ",
        instafollowers: "12",
        twitterfollowers: "20",
        fbfollowers: "21"
      },
      {
        phone: "(456) 456 789",
        img: "/4.jpg",
        contactname: "Jan Petrovic",
        role: "Designer",
        address: " 2289 5th Ave, Suite 600 San Francisco New York, NY, 10037 ",
        instafollowers: "12",
        twitterfollowers: "20",
        fbfollowers: "21"
      },
      {
        phone: "(567) 456 789",
        img: "/5.jpg",
        contactname: "Leanne Graham",
        role: "HR",
        address: " 425 5th Ave, San Francisco New York, NY, 10016 ",
        instafollowers: "12",
        twitterfollowers: "20",
        fbfollowers: "21"
      },
      {
        phone: "(678) 456 789",
        img: "/6.jpg",
        contactname: "Mrs. Dennis Schulist",
        role: "Designer",
        address: " 17 Stuyvesant Walk, Suite 600 New York, NY, 10009 ",
        instafollowers: "12",
        twitterfollowers: "20",
        fbfollowers: "21"
      },
      {
        phone: "(123) 456 789",
        img: "/1.jpg",
        contactname: "Kurtis Weissnat",
        role: "Manager",
        address: " 2289 5th Ave, Suite 600 San Francisco New York, NY, 10037 ",
        instafollowers: "12",
        twitterfollowers: "20",
        fbfollowers: "21"
      },
      {
        phone: "(234) 456 789",
        img: "/2.jpg",
        contactname: "Nicholas Runolfsdottir V",
        role: "Chairman",
        address: " 425 5th Ave, San Francisco New York, NY, 10016 ",
        instafollowers: "12",
        twitterfollowers: "20",
        fbfollowers: "21"
      },
      {
        phone: "(345) 456 789",
        img: "/3.jpg",
        contactname: "Glenna Reichert",
        role: "Designer",
        address: " 2289 5th Ave, Suite 600 San Francisco New York, NY, 10037 ",
        instafollowers: "12",
        twitterfollowers: "20",
        fbfollowers: "21"
      },
      {
        phone: "(456) 456 789",
        img: "/4.jpg",
        contactname: "Clementina DuBuque",
        role: "Developer",
        address: " 55 E 11th St #1OTH, Suite 600 New York, NY, 10003 ",
        instafollowers: "12",
        twitterfollowers: "20",
        fbfollowers: "21"
      }
    ],
    fnameRules: [v => !!v || "Name is required"],
    addressRules: [
      v => !!v || "Address is required",
      v => (v && v.length <= 300) || "Address must be less than 10 characters"
    ],
    ifRules: [
      v => !!v || "Please fill this field",
      v => (v && v.length <= 5) || "This must be less than 5 characters"
    ],
    tfRules: [
      v => !!v || "Please fill this field",
      v => (v && v.length <= 5) || "This must be less than 10 characters"
    ],
    fbRules: [
      v => !!v || "Please fill this field",
      v => (v && v.length <= 5) || "This must be less than 10 characters"
    ],
    roleRules: [v => !!v || "Role is required"],
    contactRules: [
      v => !!v || "Contact is required",
      v => (v && v.length == 10) || "Contact must be 10 digits"
    ]
  }),
  methods: {
    addContact() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        const contact = {
          contactname: this.contactname,
          phone: this.phone,
          role: this.role,
          img: this.img,
          address: this.address,
          twitterfollowers: this.twitterfollowers,
          instafollowers: this.instafollowers,
          fbfollowers: this.fbfollowers
        };
        this.contactfilter.unshift(contact);
        this.phone = "";
        this.contactname = "";
        this.role = "";
        this.img = "";
        this.address = "";
        this.twitterfollowers = "";
        this.instafollowers = "";
        this.fbfollowers = "";
      }
    }
  },
  computed: {
    events() {
      return this.$store.state.contactEvents;
    },
    validName() {
      return this.contactname.length > 0;
    },
    contactgrids() {
      return this.contactfilter.filter(
        contactgrid =>
          contactgrid.contactname
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          contactgrid.role.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>