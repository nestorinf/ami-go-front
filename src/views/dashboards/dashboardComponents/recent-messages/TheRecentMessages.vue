<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5">
      <h3 class="title font-weight-regular">Recent Comments</h3>
      <v-list>
        <v-list-item v-for="(item, i) in messages" :key="i" @click="href" class="px-2">
          <v-list-item-title>
            <div class="d-flex align-center py-3">
              <div class="mx-3">
                <v-badge bordered bottom :color="item.avatarstatus" dot offset-x="10" offset-y="10">
                  <v-avatar>
                    <img
                      :src="'https://www.wrappixel.com/demos/admin-templates/materialpro-bootstrap-latest/material-pro/src/assets/images/users/' + item.avatar + '.jpg'"
                      :alt="item.title"
                    />
                  </v-avatar>
                </v-badge>
              </div>
              <div>
                <h4 class="font-weight-regular">{{ item.title }}</h4>
                <span class="text--secondary caption descpart d-block truncate-text">{{item.desc}}</span>
              </div>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheRecentMessages",
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
      },
      {
        title: "Stephen Robots",
        avatar: "6",
        avatarstatus: "success",
        desc: "stephen@wrappixel.com"
      },
      {
        title: "John Smith",
        avatar: "5",
        avatarstatus: "error",
        desc: "smith1987@gmail.com"
      }
    ],
    href() {
      return undefined;
    }
  })
};
</script>