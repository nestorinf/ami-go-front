<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-5">
      <h3 class="title font-weight-regular">Recent Comments</h3>
      <h6 class="subtitle-2 font-weight-light">Latest Comments on users from Material</h6>
    </v-card-text>
    <v-card-text class="pa-0">
      <div class="d-md-flex align-items-center">
        <div v-bar class="vs-scrollable w-100" style="height:550px">
          <div>
            <div
              class="comment-widgets position-relative"
              v-for="comment in comments"
              :comment="comment"
              :key="comment.commenttitle"
            >
              <!-- Comment Row -->
              <div class="d-flex flex-row comment-row mt-0 pa-3" :class="[comment.activeClass]">
                <div class="pa-2">
                  <img
                    :src="require('@/assets/images/users'+ comment.img)"
                    alt="user"
                    width="50"
                    class="rounded-circle"
                  />
                </div>
                <div class="comment-text w-100 pa-3">
                  <h3 class="font-weight-regular">{{ comment.username }}</h3>
                  <span class="d-block my-2 subtitle-2 font-weight-regular">{{ comment.desc }}</span>
                  <div class="comment-footer">
                    <span class="text-muted mr-2">{{ comment.date }}</span>
                    <v-chip class="ma-2" :class="[comment.badgebg]" small label>{{ comment.status }}</v-chip>
                    <span class="action-icons">
                      <a href="javascript:void(0)" class="pl-2 align-middle">
                        <i class="ti-pencil-alt"></i>
                      </a>
                      <a href="javascript:void(0)" class="pl-2 align-middle">
                        <i class="ti-check"></i>
                      </a>
                      <a href="javascript:void(0)" class="pl-2 align-middle text-danger">
                        <i class="ti-heart"></i>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheRecentComments",
  props: {
    comment: Object
  },
  data: () => ({
    comments: [
      {
        img: "/1.jpg",
        activeClass: "",
        username: "James Anderson",
        desc:
          "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
        date: "April 14, 2016",
        badgebg: "info",
        status: "Pending"
      },
      {
        img: "/2.jpg",
        activeClass: "active",
        username: "Michael Jorden",
        desc:
          "Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.",
        date: "April 14, 2016",
        badgebg: "success",
        status: "Approved"
      },
      {
        img: "/3.jpg",
        activeClass: "",
        username: "Johnathan Doeting",
        desc:
          "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
        date: "April 14, 2016",
        badgebg: "error",
        status: "Rejected"
      },
      {
        img: "/4.jpg",
        activeClass: "",
        username: "James Anderson",
        desc:
          "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
        date: "April 14, 2016",
        badgebg: "info",
        status: "Pending"
      }
    ]
  })
};
</script>