<template>
  <div>
    <v-row class="justify-center d-flex">
      <v-col lg="4" cols="12">
        <h4 class="title blue-grey--text text--darken-2 mt-4 mb-3">List 1</h4>
        <draggable :list="customlist1" group="custom" class="cursor-move todo-cards">
          <v-card v-for="(clist, index) in customlist1" :key="index" class="mb-5">
            <v-card-text class="pa-5">
              <div class="d-flex align-center">
                <h5 class="body-1 blue-grey--text text--darken-2">{{ clist.todotitle }}</h5>
                <div class="ml-auto">
                  <v-btn icon dark color="error" :class="clist.badgeactive" class="elevation-0">
                    <v-icon dark class>mdi-heart</v-icon>
                  </v-btn>
                </div>
              </div>

              <p class="subtitle-2 font-weight-light mb-0">{{ clist.todosubtitle }}</p>
            </v-card-text>
          </v-card>
        </draggable>
      </v-col>
      <v-col lg="4" cols="12">
        <h4 class="title blue-grey--text text--darken-2 mt-4 mb-3">List 2</h4>
        <draggable :list="customlist2" group="custom" class="cursor-move progress-cards">
          <v-card v-for="(clist, index) in customlist2" :key="index" class="mb-5">
            <v-card-text>
              <div class="d-flex align-center">
                <h5 class="body-1 blue-grey--text text--darken-2">{{ clist.todotitle }}</h5>
                <div class="ml-auto">
                  <v-btn icon dark color="error" :class="clist.badgeactive" class="elevation-0">
                    <v-icon dark class>mdi-heart</v-icon>
                  </v-btn>
                </div>
              </div>
              <p class="subtitle-2 font-weight-light mb-0">{{ clist.todosubtitle }}</p>
            </v-card-text>
          </v-card>
        </draggable>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "DragnDropCustom",
  data: () => ({
    title: "DragnDropCustom",
    customlist1: [
      {
        todotitle: "Book a Ticket",
        todosubtitle:
          "Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.",
        badgeactive: "d-none"
      },
      {
        todotitle: "Launch new template ",
        todosubtitle:
          "Integer posuere erat a ante vene natis.Blandit tempus porttitor aasfs.",
        badgeactive: ""
      },
      {
        todotitle: "Task review",
        todosubtitle:
          "Commodo luctus, nisi erat porttitor. Integer posuere erat a ante venenatis.",
        badgeactive: "d-none"
      },
      {
        todotitle: "Website Design",
        todosubtitle:
          "Dapibus ac facilisis in, egestas eget quam.Blandit tempus porttitor aasfs.",
        badgeactive: ""
      }
    ],
    customlist2: [
      {
        todotitle: "Book London Tickets",
        todosubtitle:
          "Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.",
        badgeactive: ""
      },
      {
        todotitle: "Launch new template ",
        todosubtitle:
          "Integer posuere erat a ante vene natis.Blandit tempus porttitor aasfs.",
        badgeactive: "d-none"
      },
      {
        todotitle: "Task review",
        todosubtitle:
          "Commodo luctus, nisi erat porttitor. Integer posuere erat a ante venenatis.",
        badgeactive: "d-none"
      },
      {
        todotitle: "Website Design",
        todosubtitle:
          "Dapibus ac facilisis in, egestas eget quam.Blandit tempus porttitor aasfs.",
        badgeactive: "d-none"
      }
    ]
  }),
  components: {
    draggable
  }
};
</script>