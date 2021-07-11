<template>
  <div>
    <v-row class="pb-10">
          <v-col cols="2" lg="2" v-for="(item, index) in items" :key="index">
            <div data-v-69bb59a3="" class="imgsPreview" style="">
              <div data-v-69bb59a3="" class="imageHolder">
                <img
                  data-v-69bb59a3=""
                  :src="item.imagen"
                />
                <span data-v-69bb59a3="" class="delete" style="color: white"
                >
                <svg
                    @click="deleteImagen(item)"
                    data-v-69bb59a3=""
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="icon"
                  >
                    <path
                      data-v-69bb59a3=""
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path></svg
                ></span>
              </div>
            </div>
          </v-col>
        </v-row>
  </div>
</template>


<script>
export default {
  name: "DataTable",
  props: {
    items: Array,
  },
  components: {
  },
  methods: {
    deleteImagen(item) {
      this.$emit("delete-imagen", item.id);
    },
  },
  data: () => ({
  }),
};
</script>