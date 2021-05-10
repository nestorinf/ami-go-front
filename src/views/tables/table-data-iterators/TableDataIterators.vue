<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="TableDataIterators - Slots">
          <TableDataIteratorsSlots></TableDataIteratorsSlots>
        </BaseCard>

        <BaseCard heading="TableDataIterators - Expand">
          <TableDataIteratorsExpand></TableDataIteratorsExpand>
        </BaseCard>

        <BaseCard heading="TableDataIterators - Filter">
          <TableDataIteratorsFilter></TableDataIteratorsFilter>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TableDataIterators",

  data: () => ({
    page: {
      title: "Table DataIterators"
    },
    breadcrumbs: [
      {
        text: "Tables",
        disabled: false,
        to: "#"
      },
      {
        text: "Table DataIterators",
        disabled: true
      }
    ]
  }),
  components: {
    TableDataIteratorsSlots: () =>
      import("./table-data/TableDataIteratorsSlots"),
    TableDataIteratorsExpand: () =>
      import("./table-data/TableDataIteratorsExpand"),
    TableDataIteratorsFilter: () =>
      import("./table-data/TableDataIteratorsFilter")
  }
};
</script>
