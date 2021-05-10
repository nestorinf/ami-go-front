<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-0">
      <v-tabs v-model="tab" color="info">
        <v-tab
          :key="activity"
          class="text-capitalize font-weight-light subtitle-1"
        >
          <v-icon class="d-block d-md-none">mdi-access-point</v-icon>
          <span class="d-none d-md-block">Activity</span>
        </v-tab>
        <v-tab
          :key="profile"
          class="text-capitalize font-weight-light subtitle-1"
        >
          <v-icon class="d-block d-md-none">mdi-account-circle</v-icon>
          <span class="d-none d-md-block">Profile</span>
        </v-tab>
        <v-tab
          :key="settings"
          class="text-capitalize font-weight-light subtitle-1"
        >
          <v-icon class="d-block d-md-none">mdi-cog</v-icon>
          <span class="d-none d-md-block">Settings</span>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- Activity Tabs -->
        <v-tab-item :key="activity">
          <v-card flat>
            <v-card-text>
              <v-timeline :reverse="reverse" dense>
                <v-timeline-item class="align-start" large>
                  <template v-slot:icon>
                    <v-avatar>
                      <img src="@/assets/images/users/1.jpg" />
                    </v-avatar>
                  </template>
                  <v-card class="elevation-0">
                    <v-card-title class="subtitle-1 pa-0">
                      John Doe
                      <span class="subtitle-2 mx-1 font-weight-light"
                        >5 minutes ago</span
                      >
                    </v-card-title>
                    <v-card-text class="px-0">
                      assign a new task
                      <a href="javascript:void(0)">Design weblayout</a>
                    </v-card-text>
                    <v-row>
                      <v-col lg="3" cols="12" sm="3" class="mb-3 mb-md-0">
                        <img
                          src="@/assets/images/big/img1.jpg"
                          alt="user"
                          class="img-fluid rounded"
                        />
                      </v-col>
                      <v-col lg="3" cols="12" sm="3" class="mb-3 mb-md-0">
                        <img
                          src="@/assets/images/big/img2.jpg"
                          alt="user"
                          class="img-fluid rounded"
                        />
                      </v-col>
                      <v-col lg="3" cols="12" sm="3" class="mb-3 mb-md-0">
                        <img
                          src="@/assets/images/big/img3.jpg"
                          alt="user"
                          class="img-fluid rounded"
                        />
                      </v-col>
                      <v-col lg="3" cols="12" sm="3" class="mb-3 mb-md-0">
                        <img
                          src="@/assets/images/big/img4.jpg"
                          alt="user"
                          class="img-fluid rounded bt4"
                        />
                      </v-col>
                    </v-row>
                    <div class="d-md-flex mt-3 text-nowrap">
                      <v-btn
                        text
                        small
                        class="text-capitalize font-weight-regular pa-1"
                        color="red"
                      >
                        <v-icon class="mx-1" small>mdi-heart</v-icon>5 Love
                      </v-btn>
                      <v-btn
                        text
                        small
                        class="text-capitalize font-weight-regular pa-1"
                        color="info"
                      >
                        <v-icon class="mx-1" small
                          >mdi-comment-text-outline</v-icon
                        >2 Comments
                      </v-btn>
                    </div>
                    <v-divider class="my-4"></v-divider>
                  </v-card>
                </v-timeline-item>
                <v-timeline-item class="align-start" large>
                  <template v-slot:icon>
                    <v-avatar>
                      <img src="@/assets/images/users/5.jpg" />
                    </v-avatar>
                  </template>
                  <v-card class="elevation-0">
                    <v-card-title class="subtitle-1 pa-0">
                      Jacky Chain
                      <span class="subtitle-2 mx-1 font-weight-light"
                        >14 minutes ago</span
                      >
                    </v-card-title>
                    <v-row class="mt-4">
                      <v-col lg="3" cols="12" sm="3" class="mb-3 mb-lg-0">
                        <img
                          src="@/assets/images/big/img1.jpg"
                          alt="user"
                          class="img-fluid rounded bt4"
                        />
                      </v-col>
                      <v-col lg="9" cols="12" sm="12">
                        <div class="subtitle-2 font-weight-regular mb-3">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Integer nec odio. Praesent libero. Sed cursus
                          ante.
                        </div>
                        <v-btn depressed color="success">Design Layout</v-btn>
                      </v-col>
                    </v-row>
                    <div class="d-md-flex mt-3 text-nowrap">
                      <v-btn
                        text
                        class="text-capitalize font-weight-regular pa-1"
                        small
                        color="red"
                      >
                        <v-icon class="mx-1" small>mdi-heart</v-icon>5 Love
                      </v-btn>
                      <v-btn
                        text
                        small
                        class="text-capitalize font-weight-regular pa-1"
                        color="info"
                      >
                        <v-icon class="mx-1" small
                          >mdi-comment-text-outline</v-icon
                        >2 Comments
                      </v-btn>
                    </div>
                    <v-divider class="my-4"></v-divider>
                  </v-card>
                </v-timeline-item>
                <v-timeline-item class="align-start" large>
                  <template v-slot:icon>
                    <v-avatar>
                      <img src="@/assets/images/users/3.jpg" />
                    </v-avatar>
                  </template>
                  <v-card class="elevation-0">
                    <v-card-title class="subtitle-1 pa-0">
                      Emma John
                      <span class="subtitle-2 mx-1 font-weight-light"
                        >23 minutes ago</span
                      >
                    </v-card-title>
                    <div class="subtitle-2 font-weight-regular mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer nec odio. Praesent libero. Sed cursus ante dapibus
                      diam. Sed nisi. Nulla quis sem at nibh elementum
                      imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec
                      tellus sed augue semper
                    </div>
                    <v-divider class="mb-4 mt-7"></v-divider>
                  </v-card>
                </v-timeline-item>
                <v-timeline-item class="align-start" large>
                  <template v-slot:icon>
                    <v-avatar>
                      <img src="@/assets/images/users/4.jpg" />
                    </v-avatar>
                  </template>
                  <v-card class="elevation-0">
                    <v-card-title class="subtitle-1 pa-0">
                      Charlotte Smith
                      <span class="subtitle-2 mx-1 font-weight-light"
                        >1 hour ago</span
                      >
                    </v-card-title>
                    <div
                      class="subtitle-2 font-weight-regular mt-4 pa-4 border"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer nec odio. Praesent libero. Sed cursus ante dapibus
                      diam. Sed nisi. Nulla quis sem at nibh elementum
                      imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec
                      tellus sed augue semper
                    </div>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="profile">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col lg="3" cols="12" sm="3" class="border-right">
                      <strong class="font-weight-medium">Full Name</strong>
                      <br />
                      <p class="text-muted">Johnathan Deo</p>
                    </v-col>
                    <v-col lg="3" cols="12" sm="3" class="border-right">
                      <strong class="font-weight-medium">Mobile</strong>
                      <br />
                      <p class="text-muted">(123) 456 7890</p>
                    </v-col>
                    <v-col lg="3" cols="12" sm="3" class="border-right">
                      <strong class="font-weight-medium">Email</strong>
                      <br />
                      <p class="text-muted w-100 text-truncate">
                        johnathan@admin.com
                      </p>
                    </v-col>
                    <v-col lg="3" cols="12" sm="3">
                      <strong class="font-weight-medium">Location</strong>
                      <br />
                      <p class="text-muted">London</p>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <p class="mt-4 border-top pt-4">
                Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                justo. Nullam dictum felis eu pede mollis pretium. Integer
                tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean
                vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                consequat vitae, eleifend ac, enim.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries
              </p>
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
              <h2 class="font-weight-regular mt-4">Skill Set</h2>
              <div class="border-top mt-4 pt-4">
                <h5 class="mt-4 mb-0 body-1">
                  Wordpress
                  <span class="float-right">80%</span>
                </h5>
                <v-progress-linear
                  v-model="valueDeterminate"
                  color="success"
                  rounded
                  class="mt-2"
                ></v-progress-linear>
                <h5 class="mt-4 mb-0 body-1">
                  HTML 5
                  <span class="float-right">90%</span>
                </h5>
                <v-progress-linear
                  v-model="valueDeterminate2"
                  color="warning"
                  rounded
                  class="mt-2"
                ></v-progress-linear>
                <h5 class="mt-4 mb-0 body-1">
                  jQuery
                  <span class="float-right">50%</span>
                </h5>
                <v-progress-linear
                  v-model="valueDeterminate3"
                  color="error"
                  rounded
                  class="mt-2"
                ></v-progress-linear>
                <h5 class="mt-4 mb-0 body-1">
                  Photoshop
                  <span class="float-right">70%</span>
                  <v-progress-linear
                    v-model="valueDeterminate4"
                    color="info"
                    rounded
                    class="mt-2"
                  ></v-progress-linear>
                </h5>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="settings">
          <v-card flat>
            <v-card-text>
              <form>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Full Name"
                      :rules="rules"
                      hide-details="auto"
                      placeholder="Johnathan Doe"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="email"
                      label="Email"
                      :rules="rules"
                      hide-details="auto"
                      placeholder="johnathan@admin.com"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="password"
                      label="Password"
                      :rules="rules"
                      hide-details="auto"
                      placeholder="password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Phone No"
                      :rules="rules"
                      hide-details="auto"
                      placeholder="123 456 7890"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      label="Message"
                      row="2"
                      :rules="rules"
                      hide-details="auto"
                      placeholder
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :rules="rules"
                      v-model="select"
                      :items="items"
                      label="Country"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                <v-btn color="success" class="elevation-0"
                  >Update Profile</v-btn
                >
              </form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheActivityTimeline",
  data: () => ({
    reverse: false,
    tab: null,
    activity: null,
    profile: null,
    settings: null,
    valueDeterminate: 80,
    valueDeterminate2: 90,
    valueDeterminate3: 50,
    valueDeterminate4: 70,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    select: null,
    items: ["India", "United Kingdom", "Africa", "California"],
  }),
  components: {},
};
</script>