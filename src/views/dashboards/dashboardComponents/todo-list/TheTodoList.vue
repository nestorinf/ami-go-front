<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-5">
      <div class="d-sm-flex align-center">
        <div>
          <h3 class="title font-weight-regular">To do List</h3>
          <h6 class="subtitle-2 font-weight-light">List of your next task to complete</h6>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-chip class="ma-2" color="info">
            <i class="mr-2 ti-pencil"></i>
            <span class="mr-2">Total Tasks:</span>
            <v-fade-transition leave-absolute>
              <span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
            </v-fade-transition>
          </v-chip>
        </div>
      </div>
    </v-card-text>
    <div class="blue lighten-4 px-3">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="task" label="Add new tasks from here" @keydown.enter="create">
            <v-fade-transition v-slot:append>
              <i class="ti-plus" v-if="task" @click="create"></i>
            </v-fade-transition>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="pb-4" align="center">
        <strong class="mx-4 info--text font-weight-medium">Remaining: {{ remainingTasks }}</strong>

        <v-divider vertical></v-divider>

        <strong class="mx-4 success--text font-weight-medium">Completed: {{ completedTasks }}</strong>

        <v-spacer></v-spacer>

        <v-progress-circular :value="progress" color="warning" class="mx-2"></v-progress-circular>
      </v-row>
    </div>

    <v-card-text class="pa-0">
      <v-card v-if="tasks.length > 0" class="elevation-0 vs-scrollable" v-bar style="height:400px">
        <v-slide-y-transition class="py-0" group>
          <template v-for="(task, i) in tasks">
            <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

            <v-list-item :key="`${i}-${task.text}`" class="d-block py-3">
              <div class="d-flex align-center">
                <v-list-item-action>
                  <v-checkbox v-model="task.done" :color="task.done && 'grey' || 'success'">
                    <template v-slot:label>
                      <div
                        :class="task.done && 'grey--text text-decoration-line' || ''"
                        class="ml-4"
                        v-text="task.text"
                      ></div>
                      <div class="ml-1">
                        <v-chip
                          small
                          label
                          class="display-none"
                          :class="[task.badgebg, task.badgedisplay]"
                        >{{ task.badgetext }}</v-chip>
                      </div>
                    </template>
                  </v-checkbox>
                </v-list-item-action>

                <v-spacer></v-spacer>

                <v-scroll-x-transition>
                  <v-icon v-if="task.done" color="success">mdi-check</v-icon>
                </v-scroll-x-transition>
              </div>

              <div :class="[task.assigntoperson]">
                <div class="assignedto d-flex ml-7 pl-2">
                  <div
                    class="mr-2"
                    v-for="tagbtn in task.tagbtns"
                    :tagbtn="tagbtn"
                    :key="tagbtn.tagbtntitle"
                  >
                    <v-chip pill v-on.prevent>
                      <v-avatar left>
                        <v-img :src="require('@/assets/images/users/' + [tagbtn.userimg])"></v-img>
                      </v-avatar>
                      {{ tagbtn.username }}
                    </v-chip>
                  </div>
                </div>
              </div>
              <span
                :class="[task.date]"
                class="ml-10 blue-grey--text text--lighten-2"
              >{{ task.datetext }}</span>
            </v-list-item>
          </template>
        </v-slide-y-transition>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheTodoList",
  data: () => ({
    tasks: [
      {
        done: false,
        text: "Schedule meeting with",
        assigntoperson: "display-block",
        tagbtns: [
          {
            userimg: "1.jpg",
            username: "Steave"
          },
          {
            userimg: "2.jpg",
            username: "Jessica"
          }
        ],
        badgedisplay: "display-none",
        badgebg: "",
        badgetext: ""
      },
      {
        done: false,
        text: "Give Purchase report to",
        badgedisplay: "display-block",
        badgebg: "error",
        badgetext: "Today",
        assigntoperson: "display-block",
        tagbtns: [
          {
            userimg: "4.jpg",
            username: "John"
          }
        ]
      },
      {
        done: false,
        text: "Book flight for holiday",
        badgedisplay: "display-none",
        assigntoperson: "display-none",
        date: "display-block",
        datetext: "26 jun 2017"
      },
      {
        done: false,
        text: "Forward all tasks",
        badgedisplay: "display-block",
        badgebg: "warning",
        badgetext: "2 Weeks",
        assigntoperson: "display-none",
        date: "display-block",
        datetext: "26 jun 2017"
      },
      {
        done: false,
        text: "Send payment today",
        badgedisplay: "display-none",
        assigntoperson: "display-block",
        tagbtns: [
          {
            userimg: "1.jpg",
            username: "Steave"
          },
          {
            userimg: "2.jpg",
            username: "Jessica"
          }
        ],
        date: "display-none"
      }
    ],
    task: null
  }),
  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    }
  },
  methods: {
    create() {
      this.tasks.push({
        done: false,
        text: this.task
      });

      this.task = null;
    }
  }
};
</script>

<style scoped>
.display-none {
  display: none;
}
.display-block {
  display: block;
}
</style>