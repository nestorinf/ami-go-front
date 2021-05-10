<template>
  <v-container fluid class="pt-0">
    <v-row no-guuters>
      <v-col cols="12" md="4" class="border-right px-0">
        <!-- Emails -->
        <v-toolbar dense class="elevation-0">
          <v-app-bar-nav-icon @click="toggleSidebar()" class="d-block d-md-none"></v-app-bar-nav-icon>
          <span
            class="ml-2"
            v-if="$route.params.mailType"
          >{{this.$route.params.mailType | uppercase}}</span>
          <span class="ml-2" v-if="$route.params.mailTag">{{this.$route.params.mailTag | uppercase}}</span>
        </v-toolbar>
        <v-divider class="mt-2"></v-divider>
        <!-- Listing of emails -->
        <div v-bar>
          <v-list two-line class="email-list">
            <template v-for="(item, index) in mails">
              <v-list-item
                ripple
                :key="index"
                :to="computeMailPath(item.uuid)"
                @click="toggleDetail()"
              >
                <v-list-item-action class="mr-3">
                  <v-checkbox></v-checkbox>
                </v-list-item-action>
                <v-list-item-avatar class="mr-3">
                  <img :src="item.from.avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.from.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>{{ formatDate(item.created_at) }}</v-list-item-action-text>
                  <v-icon color="warning" v-if="item.type == 'starred'">mdi-star</v-icon>
                  <v-icon color="gray darken-2" v-else>mdi-star-outline</v-icon>
                </v-list-item-action>
              </v-list-item>
              <v-divider :key="'divider' + index"></v-divider>
            </template>
          </v-list>
        </div>
      </v-col>
      <!-- Email Detail -->
      <v-col
        cols="12"
        md="8"
        class="pa-0 email-detail"
        :class="[ istoggle ? 'close-detail' : 'show-detail']"
      >
        <EmailDetail @togglesdetail="toggleDetail" :isSelected="isSelected"></EmailDetail>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import { getMailByType } from "@/views/apps/email/api/mail";
import { getMailByTag } from "@/views/apps/email/api/mail";
Vue.filter("uppercase", function(value) {
  return value.toUpperCase();
});
export default {
  name: "EmailList",
  props: {
    mailType: {
      type: String,
      default: "all"
    },
    mailTag: {
      tag: String
    },
    isSelecteda: {
      type: Boolean
    }
  },
  data: () => ({
    selected: [0],
    istoggle: true,
    isSelected: false
  }),
  computed: {
    mails() {
      if (this.$route.params.mailType) {
        return getMailByType(this.$route.params.mailType);
      } else {
        return getMailByTag(this.$route.params.mailTag);
      }
    }
  },
  components: {
    EmailDetail: () => import("@/views/apps/email/EmailDetail")
  },
  methods: {
    computeMailPath(id) {
      if (this.$route.params.mailType) {
        return {
          path: "/apps/email/" + this.$route.params.mailType + "/0/" + id
        };
      } else {
        return {
          path: "/apps/email/" + "0/" + this.$route.params.mailTag + "/0/" + id
        };
      }
    },

    toggleSidebar() {
      this.$emit("toggles");
    },
    toggleDetail() {
      this.istoggle = !this.istoggle;
      this.isSelected = true;
    },

    formatDate(s) {
      //let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      var d = new Date(s);
      return months[d.getMonth()] + " " + d.getDay();
    }
  },
  mounted() {
    this.$root.$on("clickedSomething", () => {
      this.isSelected = false;
    });
  }
};
</script>
