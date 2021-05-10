<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="Table Simple - Fixed height">
          <TableSimpleFixHeight></TableSimpleFixHeight>
        </BaseCard>

        <BaseCard heading="Table Simple - Fixed header">
          <TableSimpleFixHeader></TableSimpleFixHeader>
        </BaseCard>

        <BaseCard heading="Table Simple - Dense table">
          <TableSimpleDense></TableSimpleDense>
        </BaseCard>

        <BaseCard heading="Table Simple - Dark theme">
          <TableSimpleDarktheme></TableSimpleDarktheme>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TableSimple",

  data: () => ({
    page: {
      title: "Table Simple"
    },
    breadcrumbs: [
      {
        text: "Tables",
        disabled: false,
        to: "#"
      },
      {
        text: "Table Simple",
        disabled: true
      }
    ]
  }),
  components: {
    TableSimpleFixHeight: () => import("./table-data/TableSimpleFixHeight"),
    TableSimpleFixHeader: () => import("./table-data/TableSimpleFixHeader"),
    TableSimpleDense: () => import("./table-data/TableSimpleDense"),
    TableSimpleDarktheme: () => import("./table-data/TableSimpleDarktheme")
  }
};
</script>
