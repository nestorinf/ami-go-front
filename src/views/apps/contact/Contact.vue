<template>
  <v-container fluid class="down-top-padding">
    <v-card class="contact-app">
      <v-row no-gutters>
        <v-col
          cols="12"
          md="3"
          xl="2"
          :class="[ isSidebar ? 'close-email-sidebar border-right' : 'show-email-sidebar border-right']"
        >
          <!-- ====================================== -->
          <!-- Left Sidebar -->
          <!-- ====================================== -->
          <v-card class="contact-sidebar">
            <!-- ====================================== -->
            <!-- Search -->
            <!-- ====================================== -->
            <v-list class="py-0 d-none d-lg-block">
              <v-list-item class="pt-3 pb-3">
                <v-text-field
                  flat
                  hide-details
                  v-model="search"
                  solo
                  background-color="transparent"
                  label="Search Contacts"
                  append-icon="mdi-magnify"
                ></v-text-field>
              </v-list-item>
            </v-list>
            <div class="d-block d-md-none">
              <v-btn color="info" text @click="toggleSide">
                <v-icon small class="mr-2">fas fa-arrow-left</v-icon>Close
              </v-btn>
            </div>
            <v-divider></v-divider>
            <div v-bar>
              <div class="contacts-side">
                <!-- ====================================== -->
                <!-- User profile -->
                <!-- ====================================== -->
                <v-list class="pa-0">
                  <v-list-item class="px-0 d-block text-center">
                    <v-list-item-avatar class="mb-0">
                      <v-img src="@/assets/images/users/1.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>John Smith</v-list-item-title>
                      <v-list-item-subtitle>johnsmith@gmail.com</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <!-- ====================================== -->
                <!-- Contact Headings -->
                <!-- ====================================== -->
                <v-list class="pt-0 mt-7 inner-sidebar">
                  <v-list-item-group single v-model="selected" active-class="info--text">
                    <template v-for="(item, index) in menuItems">
                      <v-list-item
                        @click="activeMenu = item.slug"
                        :class="[item.slug === activeMenu ? 'v-list-item--active info--text' : '']"
                        :key="`${index}-menuitems`"
                      >
                        <v-list-item-icon class="mr-3">
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="9" xl="10">
          <!-- ====================================== -->
          <!-- COntact Room -->
          <!-- ====================================== -->
          <v-card class="contacts-list">
            <v-card-text class="border-bottom pa-0">
              <!-- ====================================== -->
              <!-- Contact Header -->
              <!-- ====================================== -->
              <v-row>
                <v-col cols="12" class="pt-0 pt-lg-3" v-bind:pl-0="$vuetify.breakpoint.smAndDown">
                  <div class="d-block d-lg-none mb-3 border-bottom">
                    <v-text-field
                      flat
                      hide-details
                      v-model="search"
                      solo
                      background-color="transparent"
                      label="Search Contacts"
                      append-icon="mdi-magnify"
                    ></v-text-field>
                  </div>
                  <v-toolbar dense flat>
                    <v-app-bar-nav-icon class="d-block d-lg-none" @click="toggleSidebar()"></v-app-bar-nav-icon>
                    <v-menu transition="slide-y-transition" bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn class small color="primary" dark v-on="on">
                          {{ showBulkActionOptions ? 'Selected' : 'Select' }}
                          <v-icon right small>fas fa-caret-down</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="selectAll">
                          <v-list-item-title>Select All</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="unselectAll">
                          <v-list-item-title>Unselect All</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-btn
                      icon
                      @click="contacts = unselectedContacts"
                      :disabled="!showBulkActionOptions"
                    >
                      <v-icon color="error">mdi-delete</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <!-- ====================================== -->
                    <!-- Add Contact -->
                    <!-- ====================================== -->
                    <v-dialog v-model="dialog" scrollable max-width="600">
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark rounded v-on="on" @click="dialog = !dialog">
                          <v-icon>mdi-plus</v-icon>
                          <span class="d-none d-md-block">Contact</span>
                        </v-btn>
                      </template>
                      <v-card>
                        <div class="d-flex align-center">
                          <v-card-title class>Contact</v-card-title>
                          <div class="ml-auto">
                            <v-btn text color="error" @click="updateContact()" v-if="isEditformMod">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-btn text color="error" @click="dialog=false" v-else>
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </div>
                        </div>

                        <div class="py-6 blue-grey lighten-4 text-center">
                          <v-avatar size="100px" class="grey lighten-4">
                            <v-img
                              :src="require('@/assets/images/users' + form.avatar)"
                              alt="avatar"
                            ></v-img>
                          </v-avatar>
                        </div>
                        <v-divider></v-divider>
                        <v-card-text style="height: 300px;" class="mt-4">
                          <v-text-field
                            :error-messages="fieldErrors('form.first')"
                            @input="$v.form.first.$touch()"
                            @blur="$v.form.first.$touch()"
                            prepend-icon="mdi-account-circle"
                            label="Full Name"
                            v-model="form.first"
                            required
                          ></v-text-field>
                          <v-text-field
                            :error-messages="fieldErrors('form.phone')"
                            @input="$v.form.phone.$touch()"
                            @blur="$v.form.phone.$touch()"
                            prepend-icon="mdi-phone"
                            label="Phone"
                            v-model="form.phone"
                            mask="+#### #### #######"
                            required
                          ></v-text-field>
                          <v-text-field
                            :error-messages="fieldErrors('form.email')"
                            @input="$v.form.email.$touch()"
                            @blur="$v.form.email.$touch()"
                            prepend-icon="mdi-email"
                            v-model="form.email"
                            label="Email"
                          ></v-text-field>
                          <v-text-field
                            prepend-icon="mdi-domain"
                            label="Company"
                            v-model="form.company"
                          ></v-text-field>
                          <v-text-field prepend-icon="mdi-briefcase" label="Job" v-model="form.job"></v-text-field>

                          <v-menu
                            ref="datepicker"
                            :close-on-content-click="false"
                            v-model="datepicker"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                slot="activator"
                                v-model="form.formatedBirthday"
                                label="Birthdate"
                                hint="MM/DD/YYYY format"
                                persistent-hint
                                prepend-icon="mdi-cake-variant"
                                @blur="form.birthdate = parseDate(form.formatedBirthday)"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="form.birthdate"
                              no-title
                              @input="datepicker = false"
                            ></v-date-picker>
                            <!-- <v-date-picker v-model="form.birthdate" no-title @input="datepicker = false"></v-date-picker> -->
                          </v-menu>
                          <v-text-field
                            prepend-icon="mdi-home"
                            label="Address"
                            v-model="form.address"
                          ></v-text-field>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn
                            class="white--text"
                            color="success"
                            @click.native="updateContact()"
                            :disabled="$v.form.$invalid"
                            v-if="isEditformMod"
                          >Save</v-btn>
                          <v-btn
                            class="white--text"
                            color="success"
                            @click.native="createNewContact()"
                            :disabled="$v.form.$invalid"
                            v-else
                          >Add</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- ====================================== -->
                  </v-toolbar>
                </v-col>
              </v-row>
            </v-card-text>
            <!-- ====================================== -->
            <!-- COntacts -->
            <!-- ====================================== -->
            <v-card-text class="contacts pa-0">
              <div v-bar>
                <v-list two-line class="contact-list">
                  <v-list-item-group v-model="contactlist">
                    <v-toolbar flat>
                      <div class="text-center">Name</div>
                      <v-spacer></v-spacer>
                      <div class="text-center d-none d-md-block">Email</div>
                      <v-spacer></v-spacer>
                      <div class="text-center d-none d-md-block">Phone No</div>
                      <v-spacer></v-spacer>
                      <div class="text-center">Action</div>
                    </v-toolbar>
                    <template v-for="(item, index) in listContact">
                      <v-list-item @click="editContact(item)" :key="`${index}-listcontact`">
                        <v-list-item-action>
                          <v-checkbox v-model="item.selected" hide-details></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-avatar>
                          <v-img :src="require('@/assets/images/users' + item.avatar)" />
                        </v-list-item-avatar>
                        <v-list-item-content @click="editContact(item)" class="ml-2">
                          <v-list-item-title>{{ item.first }} {{ item.last }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content @click="() => {}" class="d-none d-lg-block">
                          <v-list-item-title>{{ item.email }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content @click="() => {}" class="d-none d-lg-block">
                          <v-list-item-title>{{ item.phone }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action
                          @click.stop="item.is_important = !item.is_important"
                          class="d-flex align-center"
                        >
                          <v-icon
                            small
                            :color="item.is_important ? 'amber' : ''"
                          >{{ item.is_important ? 'fas fa-star' : 'far fa-star' }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-action @click.stop>
                          <v-icon
                            @click="deleteContactDialogHandler(item)"
                            left
                            color="error"
                          >mdi-delete</v-icon>
                        </v-list-item-action>
                      </v-list-item>

                      <v-divider v-if="index + 1 < listcontact.length" :key="index"></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- ====================================== -->
    <!-- Delete Contact confirmbox -->
    <!-- ====================================== -->
    <v-dialog v-model="confirmBox.deleteContact" max-width="290">
      <v-card class="confirm-box">
        <v-card-title>
          <span>Delete Contact ?</span>
        </v-card-title>
        <v-card-text class="py-2">Are you sure you want to delete the Contact ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click.stop="resetDialog">Cancel</v-btn>

          <v-btn color="error" @click.stop="remove">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import { defaultUserPic, users, authUser } from "./dummyData";
import { filter, findIndex } from "lodash";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";

import { validNumber } from "./validators";
import validationMixin from "./validationMixin";

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      first: { required },
      email: { email },
      phone: {
        required,
        validNumber,
        maxLength: maxLength(15),
        minLength: minLength(7)
      }
    }
  },
  validationMessages: {
    form: {
      first: { required: "Full name is required" },
      email: {
        email: "Email must be valid"
      },
      phone: {
        maxLength: "Max 14 digits",
        minLength: "Min 7 digits",
        validNumber: "Phone number must be a valid number"
      }
    }
  },
  name: "Contact",
  data: () => ({
    dialogm1: "",
    dialog: false,
    search: "",
    // menu2: false,
    // date: new Date().toISOString().substr(0, 10),
    selected: [1],
    contactlist: [1],
    listcontact: [],
    drawerinternal: true,
    activeMenu: "all",
    datepicker: false,
    birthdate: new Date().toISOString().substr(0, 10),
    // Left sidebar list
    menuItems: [
      {
        title: "All Contacts",
        isActive: true,
        slug: "all",
        icon: "mdi-account-multiple"
      },
      {
        title: "Recently Contacts",
        isActive: false,
        slug: "recent",
        icon: "mdi-account-check"
      },
      {
        title: "Important Contacts",
        isActive: false,
        slug: "important",
        icon: "mdi-account-star"
      }
    ],
    form: {
      first: "",
      phone: "",
      email: "",
      company: "",
      avatar: defaultUserPic,
      job: "",
      birthdate: "",
      formatedBirthday: "",
      address: "",
      notes: null,
      is_important: false,
      is_recent: false,
      selected: false
    },
    authUser,
    contacts: [
      {
        first: users[1].firstname,
        email: users[1].email,
        avatar: users[1].avatar,
        phone: users[1].phone,
        company: users[1].company,
        job: users[1].job,
        birthdate: users[1].birthdate,
        address: users[1].address,
        notes: users[1].notes,
        is_important: users[1].is_important,
        is_recent: users[1].is_recent,
        selected: users[1].selected
      },
      {
        first: users[2].firstname,
        email: users[2].email,
        avatar: users[2].avatar,
        phone: users[2].phone,
        company: users[2].company,
        job: users[2].job,
        birthdate: users[2].birthdate,
        address: users[2].address,
        notes: users[2].notes,
        is_important: users[2].is_important,
        is_recent: users[2].is_recent,
        selected: users[2].selected
      },
      {
        first: users[3].firstname,
        email: users[3].email,
        avatar: users[3].avatar,
        phone: users[3].phone,
        company: users[3].company,
        job: users[3].job,
        birthdate: users[3].birthdate,
        address: users[3].address,
        notes: users[3].notes,
        is_important: users[3].is_important,
        is_recent: users[3].is_recent,
        selected: users[3].selected
      },
      {
        first: users[4].firstname,
        email: users[4].email,
        avatar: users[4].avatar,
        phone: users[4].phone,
        company: users[4].company,
        job: users[4].job,
        birthdate: users[4].birthdate,
        address: users[4].address,
        notes: users[4].notes,
        is_important: users[4].is_important,
        is_recent: users[4].is_recent,
        selected: users[4].selected
      },
      {
        first: users[5].firstname,
        email: users[5].email,
        avatar: users[5].avatar,
        phone: users[5].phone,
        company: users[5].company,
        job: users[5].job,
        birthdate: users[5].birthdate,
        address: users[5].address,
        notes: users[5].notes,
        is_important: users[5].is_important,
        is_recent: users[5].is_recent,
        selected: users[5].selected
      }
    ],
    confirmBox: {
      deleteContact: false,
      item: null
    },
    // contactDialog: false,
    isEditformMod: false,
    editIndex: null,
    isCreateformMod: false,
    isSidebar: true,
    istoggle: true
  }),
  methods: {
    toggleSidebar() {
      this.isSidebar = !this.isSidebar;
    },
    toggleSide() {
      this.isSidebar = !this.isSidebar;
    },
    //   Select all checkbox & item
    selectAll() {
      if (this.unselectedContacts) {
        this.unselectedContacts.forEach(element => {
          element.selected = true;
        });
      }
    },
    //   DeSelect all checkbox & item
    unselectAll() {
      if (this.selectedContacts) {
        this.selectedContacts.forEach(element => {
          element.selected = false;
        });
      }
    },
    // Important Contacts
    toggleImportant(item) {
      item.is_important = !item.is_important;
    },
    // Remove Contacts
    remove() {
      let index = this.contacts.indexOf(this.confirmBox.item);
      this.contacts.splice(index, 1);
      this.resetDialog();
    },
    resetDialog() {
      this.confirmBox = {
        deleteContact: false,
        item: null
      };
    },
    deleteContactDialogHandler(item) {
      this.confirmBox = {
        deleteContact: true,
        item
      };
    },
    formatDate(date) {
      if (!date) {
        return null;
      }

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) {
        return null;
      }

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // Reset to the default form
    resetContactForm() {
      this.form = {
        first: "",
        phone: "",
        email: "",
        company: "",
        avatar: "/1-default.jpg",
        job: "",
        birthdate: "",
        formatedBirthday: "",
        address: "",
        notes: null,
        is_important: false,
        is_recent: false,
        selected: false
      };
      this.dialog = false;
      this.isEditformMod = false;
      this.isCreateformMod = false;
      this.editIndex = null;
    },
    // Edit Contact
    editContact(contact) {
      this.form = contact;
      this.isEditformMod = true;
      this.dialog = true;
      this.editIndex = findIndex(
        this.contacts,
        contact => contact === this.form
      );
    },
    // Creat new Contact
    createNewContact() {
      this.isEditformMod = false;
      this.contacts.push(this.form);
      this.resetContactForm();
    },
    // Update Contact
    updateContact() {
      const index = this.editIndex;
      this.contacts[index] = this.form;
      this.resetContactForm();
    }
  },
  computed: {
    //   Filter all Contacts here
    recentlyContacted() {
      return filter(this.contacts, element => element.is_recent);
    },
    importantContacts() {
      return filter(this.contacts, element => element.is_important);
    },
    selectedContacts() {
      return filter(this.contacts, element => element.selected);
    },
    unselectedContacts() {
      return filter(this.contacts, element => !element.selected);
    },
    listContact() {
      let list = this.contacts;
      switch (this.activeMenu) {
        case "recent":
          list = this.recentlyContacted;
          break;

        case "important":
          list = this.importantContacts;
          break;

        default:
          if (this.search) {
            // list = filter(this.contacts, (element) => element.first === this.search || element.last === this.search || element.email === this.search || element.phone === this.search)
            list = this.contacts.filter(contact => {
              return (
                contact.first
                  .toLowerCase()
                  .includes(this.search.toLowerCase()) ||
                contact.email
                  .toLowerCase()
                  .includes(this.search.toLowerCase()) ||
                contact.phone.toLowerCase().includes(this.search.toLowerCase())
              );
            });
          } else {
            list = this.contacts;
          }
          break;
      }
      return list;
    },
    showBulkActionOptions() {
      return this.selectedContacts && this.selectedContacts.length > 0;
    }
  },
  watch: {
    "form.birthdate"() {
      this.form.formatedBirthday = this.formatDate(this.form.birthdate);
    }
  }
};
</script>

<style lang="scss">
  .contacts, .contacts-side{
    overflow:auto;
    min-height:calc(100vh - 250px);
  }
</style>