<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesLoadingState -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <v-list-item-subtitle class="text-wrap">
      You can use the
      <code>loading</code> prop to indicate that data in the table is currently loading. If there is no data in the table, a loading message will also be displayed. This message can be customized using the
      <code>loading-text</code> prop or the
      <code>loading</code> slot.
    </v-list-item-subtitle>
    <div class="mt-4">
      <v-data-table
        item-key="name"
        class="elevation-0 border"
        loading
        loading-text="Loading... Please wait"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatatablesLoadingState",

  data: () => ({})
};
</script>