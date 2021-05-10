<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 pb-3">
      <h3 class="title font-weight-regular">Notification</h3>
    </v-card-text>
    <div class="vs-scrollable" v-bar style="height: 380px">
      <v-list>
        <v-list-item
          v-for="(item, i) in messages"
          :key="i"
          @click="href"
          class="px-1"
        >
          <v-list-item-title>
            <div class="d-flex align-center py-3">
              <div class="mx-3">
                <v-btn
                  class="mx-2 elevation-0"
                  fab
                  dark
                  height="45"
                  width="45"
                  :color="item.btncolor"
                >
                  <v-icon dark class="body-2">{{ item.icon }}</v-icon>
                </v-btn>
              </div>
              <div>
                <h4 class="font-weight-regular">{{ item.title }}</h4>
                <span
                  class="text--secondary caption text-truncate descpart d-block truncate-text"
                  >{{ item.desc }}</span
                >
                <span
                  class="text--secondary caption text-truncate descpart d-block truncate-text"
                  >{{ item.time }}</span
                >
              </div>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "TheNotification",
  data: () => ({
    messages: [
      {
        title: "You have 3 new messages",
        btncolor: "deep-purple accent-2",
        icon: "mdi-email",
        desc: "Daniel Kristeen, Hanna Giover, Jeffry Brown",
        time: "9:30 AM",
      },
      {
        title: "Newsfeed available",
        btncolor: "error",
        icon: "mdi-earth",
        desc: "Todays headlines : Breakdancing Grandma Proves ..",
        time: "3:30 PM",
      },
      {
        title: "2 Invoices to pay",
        btncolor: "success",
        icon: "mdi-currency-usd",
        desc: "$3500 from Krishnan, $2000 from Akhil",
        time: "8:15 AM",
      },
      {
        title: "15 New comments",
        btncolor: "info",
        icon: "mdi-comment-check-outline",
        desc: "Jhonny : Hey this stuff is awesome and how can i ..",
        time: "5:30 PM",
      },
      {
        title: "You have 3 new files",
        btncolor: "blue-grey darken-4",
        icon: "mdi-file",
        desc: "Daniel Kristeen, Hanna Giover, Jeffry Brown",
        time: "9:30 AM",
      },
      {
        title: "New updates are available",
        btncolor: "warning",
        icon: "mdi-alert",
        desc: "Todays headlines : Breakdancing Grandma Proves ..",
        time: "3:30 PM",
      },
    ],
    href() {
      return undefined;
    },
  }),
};
</script>