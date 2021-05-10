<template>
  <v-container fluid class="pa-0 mail-reply" id="mailReply">
    <!-- ------------------------------------------------------------------------ -->
    <!-- Email Detail Card -->
    <!-- ------------------------------------------------------------------------ -->
    <v-card class="mail-reply--layout" v-if="isSelected">
      <!-- Detail Header -->
      <v-toolbar class="elevation-0">
        <v-btn icon @click="toggleMailListing()" class="d-block d-md-none">
          <v-icon small>fas fa-arrow-left</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="warning" v-if="mail.type == 'starred'">mdi-star</v-icon>
          <v-icon color="gray darken-2" v-else>mdi-star-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <!-- tags -->
        <v-chip v-if="mail.tag === 'Social'" color="primary" label text-color="white">
          <v-icon left>mdi-label</v-icon>
          {{mail.tag}}
        </v-chip>
        <v-chip v-if="mail.tag === 'Work'" color="warning" label text-color="white">
          <v-icon left>mdi-label</v-icon>
          {{mail.tag}}
        </v-chip>
        <v-chip v-if="mail.tag === 'Promotion'" color="success" label text-color="white">
          <v-icon left>mdi-label</v-icon>
          {{mail.tag}}
        </v-chip>
        <v-chip v-if="mail.tag === 'Personal'" color="error" label text-color="white">
          <v-icon left>mdi-label</v-icon>
          {{mail.tag}}
        </v-chip>
        <!-- tags -->
      </v-toolbar>
      <!-- End Detail header -->
      <div class="pa-5">
        <h3>{{ mail.title }}</h3>
      </div>
      <v-divider class></v-divider>
      <v-toolbar-title class="pa-4 pt-6">
        <v-avatar size="32">
          <img :src="mail.from.avatar" />
        </v-avatar>
        <span class="ml-2 font-16">{{ mail.from.name }}</span>
      </v-toolbar-title>
      <!-- Email Detail -->
      <div v-bar>
        <v-card-text class="pa-4 mail-reply-content">
          <div class>
            <div class="layout column">
              <h3 class="headline">Hi Donathan,</h3>
              <div class="text--secondary mail-content my-4" v-html="mail.content"></div>
              <h4>
                {{ mail.from.name }},
                <br />Thanks
              </h4>
              <v-divider class="my-4"></v-divider>
              <v-card>
                <v-card-text class="pa-0">
                  <v-text-field class counter placeholder="Your reply here" full-width multi-line></v-text-field>
                </v-card-text>
                <v-toolbar dense class="elevation-0">
                  <v-btn icon>
                    <v-icon>mdi-attachment</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-link</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-camera</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </v-toolbar>
              </v-card>
            </div>
          </div>
        </v-card-text>
      </div>
    </v-card>
    <!-- When email is not selected -->
    <v-card v-else class="selectmailbox">
      <div class="text-center">
        <span class="display-4">
          <v-icon color="primary" x-large>far fa-envelope-open</v-icon>
        </span>
        <h2>Select Mail</h2>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { getMailById } from "@/views/apps/email/api/mail";
import { MailMenu } from "@/views/apps/email/api/mail";
export default {
  name: "EmailDetail",
  props: {
    isSelected: {
      type: Boolean
    }
  },
  data: () => ({
    items: MailMenu
  }),
  computed: {
    mail() {
      return getMailById(this.$route.params.uuid);
    }
  },
  components: {},
  methods: {
    formatDate(s) {
      return new Date(s).toLocaleDateString();
    },
    toggleMailListing() {
      this.$emit("togglesdetail");
    }
  }
};
</script>
<style lang="scss">
  .mail-content{
    white-space: pre-line;
  }
  .mail-reply-content{
    max-height:calc(100vh - 400px);
    overflow:auto; 
  }
  .mail-reply{
    height:100%;
  }
</style>