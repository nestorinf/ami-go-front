<template>

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