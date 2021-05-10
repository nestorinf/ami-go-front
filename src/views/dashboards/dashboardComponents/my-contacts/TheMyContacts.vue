<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-0">
      <div class="info pa-4">
        <h3 class="white--text title font-weight-regular">My Contacts</h3>
        <h6 class="white--text mb-0 op-5 subtitle-2 font-weight-light">Checkout my contacts here</h6>
        <v-btn color="success" fab dark class="float-right mt-n5 elevation-0 mr-4">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>

      <div class="pa-4">
        <v-list>
          <v-list-item v-for="(item, i) in messages" :key="i" @click="href">
            <v-list-item-title>
              <div class="d-flex align-center py-3">
                <div class="mr-3">
                  <v-badge
                    bordered
                    bottom
                    :color="item.avatarstatus"
                    dot
                    offset-x="10"
                    offset-y="10"
                  >
                    <v-avatar>
                      <img
                        :src="'https://www.wrappixel.com/demos/admin-templates/materialpro-bootstrap-latest/material-pro/src/assets/images/users/' + item.avatar + '.jpg'"
                        :alt="item.title"
                      />
                    </v-avatar>
                  </v-badge>
                </div>
                <div class="mx-3">
                  <h4 class="font-weight-medium">{{ item.title }}</h4>
                  <span class="text--secondary caption descpart d-block truncate-text">{{item.desc}}</span>
                </div>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheMyContacts",
  data: () => ({
    messages: [
      {
        title: "Pavan Kumar",
        avatar: "1",
        avatarstatus: "success",
        desc: "info@wrappixel.com"
      },
      {
        title: "Sonu Nigam",
        avatar: "2",
        avatarstatus: "error",
        desc: "pamela1987@gmail.com"
      },
      {
        title: "Arijit singh",
        avatar: "3",
        avatarstatus: "warning",
        desc: "cruise1298.fiplip@gmail.com"
      },
      {
        title: "Pavan Kumar",
        avatar: "4",
        avatarstatus: "success",
        desc: "kat@gmail.com"
      }
    ],
    href() {
      return undefined;
    }
  }),
  components: {}
};
</script>