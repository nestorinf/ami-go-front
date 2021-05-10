<template>
  <v-container fluid>
    <!-- ------------------------------------------------------------------------ -->
    <!-- Email Room -->
    <!-- ------------------------------------------------------------------------ -->
    <v-card class="email-app">
      <v-row no-gutters>
        <!-- ------------------------------------------------------------------------ -->
        <!-- Email Sidebar -->
        <!-- ------------------------------------------------------------------------ -->
        <v-col
          cols="12"
          md="2"
          :class="[ isSidebar ? 'close-email-sidebar border-right' : 'show-email-sidebar border-right']"
        >
          <v-card class="email-sidebar">
            <div class="d-flex align-center">
              <h2 class="pa-4 font-weight-bold">MailBox</h2>
              <div class="ml-auto d-block d-md-none">
                <v-btn color="info" icon @click="toggleSide">
                  <v-icon small>fas fa-arrow-left</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="mb-2 mx-5">
              <!-- ------------------------------------------------------------------------ -->
              <!-- Email Compose -->
              <!-- ------------------------------------------------------------------------ -->
              <EmailCompose></EmailCompose>
              <!-- <v-btn color="primary" block depressed>
                 Compose
              </v-btn>-->
            </div>
            <div v-bar>
              <v-list class="mail-list">
                <template v-for="item in menus">
                  <v-list-item row v-if="item.heading" align-center :key="item.heading">
                    <v-list-item-content>
                      <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
                      <v-divider></v-divider>
                    </v-list-item-content>
                  </v-list-item>
                  <!-- Top level -->
                  <v-list-item
                    v-else
                    :key="item.text"
                    :to="item.to"
                    color="primary"
                    @click="isSelecteda"
                  >
                    <v-list-item-icon v-if="item.icon" class="mr-2">
                      <v-icon :color="item.iconColor" :small="item.iconSize">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                    <v-chip class color="error" v-if="item.chip" label="label" small>{{ item.chip }}</v-chip>
                  </v-list-item>
                </template>
              </v-list>
            </div>
          </v-card>
        </v-col>
        <!-- ------------------------------------------------------------------------ -->
        <!-- Email Listing -->
        <!-- ------------------------------------------------------------------------ -->
        <v-col cols="12" md="10" :class="[ !istoggle ? '' : 'col-md-12']">
          <Emaillist @toggles="toggleSide()"></Emaillist>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { MailMenu } from "@/views/apps/email/api/mail";
export default {
  name: "Email",
  data: () => ({
    drawer: null,
    isSidebar: true,
    menus: MailMenu,
    istoggle: false
  }),
  methods: {
    toggleSide() {
      this.isSidebar = !this.isSidebar;
      this.istoggle = !this.istoggle;
    },
    isSelecteda() {
      this.$root.$emit("clickedSomething");
    }
  },
  components: {
    Emaillist: () => import("@/views/apps/email/EmailList"),
    EmailCompose: () => import("@/views/apps/email/EmailCompose")
  }
};
</script>
<style lang="scss">
  .mail-list{
    overflow:auto;
    max-height:calc(100vh - 295px);
  }
</style>
