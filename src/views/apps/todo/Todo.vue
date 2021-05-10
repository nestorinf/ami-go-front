<template>
  <v-container fluid class="down-top-padding">
    <!-- -------------------------------------------------------------------------------------
        Todo Room 
    --------------------------------------------------------------------------------------->
    <v-card style="min-height:calc(100vh - 320px);">
      <!-- -------------------------------------------------------------------------------------
       Todo Header
      --------------------------------------------------------------------------------------->
      <v-toolbar flat height="100">
        <div>
          <v-toolbar-title>
            <h3 class="mb-1">Todo List</h3>
          </v-toolbar-title>
          <div class="d-none d-md-block">
            <v-chip class="mr-2" color="red lighten-3" text-color="white">
              <v-avatar left class="error">
                <span>{{ remainingTodos }}</span>
              </v-avatar>Remaining
            </v-chip>
            <v-chip class="mr-2" color="green lighten-3" text-color="white">
              <v-avatar left class="green">
                <span>{{ completedTodos }}</span>
              </v-avatar>Completed
            </v-chip>
          </div>
        </div>
        <v-spacer></v-spacer>

        <v-btn color="info" depressed @click.stop="dialog = true" dark>
          <v-icon>mdi-plus</v-icon>Add Task
        </v-btn>
      </v-toolbar>
      <v-toolbar class="d-block d-md-none blue-grey lighten-4" flat>
        <v-chip class="mr-2" color="red lighten-3" text-color="white">
          <v-avatar left class="error">
            <span>{{ remainingTodos }}</span>
          </v-avatar>Remaining
        </v-chip>
        <v-chip class="mr-2" color="green lighten-3" text-color="white">
          <v-avatar left class="green">
            <span>{{ completedTodos }}</span>
          </v-avatar>Completed
        </v-chip>
      </v-toolbar>
      <v-divider></v-divider>
      <!-- -------------------------------------------------------------------------------------
        Add Task Dialog
      --------------------------------------------------------------------------------------->
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <div class="d-flex pa-2 align-center primary">
            <v-card-title class="headline white--text">Add Task</v-card-title>
            <div class="ml-auto">
              <v-btn icon color="error" @click="dialog = false">
                <v-icon small class="white--text">mdi-window-close</v-icon>
              </v-btn>
            </div>
          </div>

          <v-card-text class="mt-7">
            <form @submit.prevent="create">
              <v-text-field v-model="title" label="Wraite Task Title" outlined required></v-text-field>
              <v-textarea v-model="notes" label="Write Task Notes" outlined></v-textarea>
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="date" outlined label="Due Date" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="date" @input="menu1 = false"></v-date-picker>
              </v-menu>
              <v-btn
                type="submit"
                color="primary"
                :disabled="!isDisabled"
                @click.stop="dialog = false"
              >Submit Task</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- -------------------------------------------------------------------------------------
          End Add Task Dialog
      --------------------------------------------------------------------------------------->
      <!-- -------------------------------------------------------------------------------------
          Todo listing
      --------------------------------------------------------------------------------------->
      <v-card-text class="py-2 px-0">
        <!-- <v-btn color="primary" dark >Add Task</v-btn> -->

        <ul class="common-list pl-0 mt-4">
          <li v-for="(todo, index) in todos" :key="index">
            <v-list-item :key="`${index}-${todo.title}`">
              <v-list-item-action>
                <v-checkbox v-model="todo.done" :color="todo.done && 'grey' || 'primary'"></v-checkbox>
                <template>
                  <div
                    @click="selectodo(index)"
                    :class="todo.done && 'grey--text text-decoration-line' || ''"
                    class="ml-4 text-truncate cursor-pointer"
                    v-text="todo.title"
                  ></div>
                </template>
              </v-list-item-action>
              <v-spacer></v-spacer>

              <v-chip
                small
                label
                class="white--text"
                :class="todo.done && 'green lighten-3 text-decoration-line' || 'red lighten-3'"
              >{{ todo.date }}</v-chip>
              <v-badge
                bordered
                v-if="todo.done"
                offset-x="8"
                offset-y="0"
                color="green"
                icon="mdi-check"
                overlap
              ></v-badge>
              <!-- <div v-text="todo.date"></div> -->
              <!-- <v-scroll-x-transition>
              <v-icon v-if="todo.done" color="success">mdi-check</v-icon>
              </v-scroll-x-transition>-->
            </v-list-item>
          </li>
        </ul>
      </v-card-text>
      <!-- -------------------------------------------------------------------------------------
          End Todo Listing
      --------------------------------------------------------------------------------------->
    </v-card>
    <!-- -------------------------------------------------------------------------------------
            Edit Task Drawer
    --------------------------------------------------------------------------------------->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      class="task-panel"
      width="400px"
      overlay-color="rgba(0,0,0,0.4)"
    >
      <v-toolbar flat small color>
        <v-toolbar-title>
          <v-icon class="mr-2">mdi-table-edit</v-icon>Edit Todo
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon color="error" @click="drawer = false">
          <v-icon small>mdi-window-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <div class="vs-scrollable" v-bar style="height: 510px;">
        <v-list class="px-7 py-0">
          <v-list-item-content v-if="selectedTodo" class="pt-0">
            <v-list-item-title>
              <v-checkbox
                v-model="selectedTodo.done"
                :color="selectedTodo.done && 'grey' || 'primary'"
              >
                <template v-slot:label>
                  <span v-if="selectedTodo.done">Mark As In Complete</span>
                  <span v-else>Mark As Complete</span>
                </template>
              </v-checkbox>
              <v-text-field label="Task" outlined v-model="selectedTodo.title"></v-text-field>
              <h2></h2>
              <v-textarea
                outlined
                name="input-7-4"
                label="Notes"
                rows="3"
                v-model="selectedTodo.notes"
              ></v-textarea>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="selectedTodo.date" outlined label="Due Date" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="selectedTodo.date" @input="menu2 = false"></v-date-picker>
              </v-menu>
              <v-btn color="success" @click="drawer = false">Save</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list>
      </div>
    </v-navigation-drawer>
  </v-container>
</template>


<script>
import todos from "./todos";

export default {
  name: "Todo",
  data: () => ({
    todos: todos,
    title: "",
    notes: "",
    date: "",
    dialog: false,
    menu1: false,
    menu2: false,
    drawer: null,
    selectedTodo: ""
  }),
  methods: {
    selectodo(index) {
      this.drawer = !this.drawer;
      this.selectedTodo = this.todos[index];
    },
    create() {
      this.todos.push({
        done: false,
        title: this.title,
        notes: this.notes,
        date: this.date
      });

      (this.title = ""), (this.notes = ""), (this.date = "");
    }
  },
  computed: {
    completedTodos() {
      return this.todos.filter(todo => todo.done).length;
    },

    remainingTodos() {
      return this.todos.length - this.completedTodos;
    },
    isDisabled() {
      return this.title.length > 0;
    }
  }
};
</script>
<style lang="scss">
.common-list{
  display:block;
  li{
    display: block;
    padding: 10px 0;
    border-bottom:1px solid rgba(0,0,0,0.1); 
    list-style: none;
    .v-list-item__action--stack{
      display: flex;
      flex-direction: row!important;
    }
  }
}

@media (max-width: 767px) {
    .common-list {
        li .v-list-item__action {
            max-width: 200px;
        }
    }
}

.cursor-pointer{
  cursor: pointer;
}
.v-overlay--active{
  z-index: 1!important;
}
.task-panel {
  z-index: 2  ;
  position: fixed;
  
  top: 64px !important;
    &.v-navigation-drawer--close {
        right: -30px;
    }
    .v-navigation-drawer__content {
        max-height: calc(100% - 20px);
    }
}

@media (max-width:991px) {
    .task-panel {
        top: 54px !important;
        .vb-content {
                box-sizing: inherit !important;
        }
    }
}

</style>