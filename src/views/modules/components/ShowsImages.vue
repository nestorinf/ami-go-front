<template>
  <div>
    <v-row class="pb-10">
      <v-col cols="3" lg="3" v-for="(item, index) in items" :key="index">
        <div  class="imgsPreview" style="">
          <div  class="imageHolder">
            <img  :src="item.imagen" />
            <span             
              class="delete danger" 
              style="color: white"
              @click="deleteImagen(item,index)"
            >
              <svg              
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="icon"
              >
                <path                  
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
    disabled: Boolean,
  },
  components: {},
  methods: {
    deleteImagen(item,index) {
      if(item.id ==undefined){
        this.$emit("delete-imagen-index", index);
      }else{
        this.$emit("delete-imagen", item);
      }
    },
  },
  data: () => ({}),
};
</script>