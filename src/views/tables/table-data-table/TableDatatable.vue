<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="Table Datatable - CRUD Actions">
          <DatatablesCRUDActions></DatatablesCRUDActions>
        </BaseCard>

        <BaseCard heading="Table Datatable - Selectable rows">
          <DatatablesSelectableRows></DatatablesSelectableRows>
        </BaseCard>

        <BaseCard heading="Table Datatable - Grouped rows">
          <DatatablesGroupedRows></DatatablesGroupedRows>
        </BaseCard>

        <BaseCard heading="Table Datatable - Sort on multiple columns">
          <DatatablesSortonMultipleColumns></DatatablesSortonMultipleColumns>
        </BaseCard>

        <BaseCard heading="Table Datatable - Search">
          <DatatablesSearch></DatatablesSearch>
        </BaseCard>

        <BaseCard heading="Table Datatable - Remove default header and footer">
          <DatatablesRemoveDefaultHeaderFooter></DatatablesRemoveDefaultHeaderFooter>
        </BaseCard>

        <BaseCard heading="Table Datatable - Loading state">
          <DatatablesLoadingState></DatatablesLoadingState>
        </BaseCard>

        <BaseCard heading="Table Datatable - Dense">
          <DatatablesDense></DatatablesDense>
        </BaseCard>

        <BaseCard heading="Table Datatable - Footer props">
          <DatatablesFooterProps></DatatablesFooterProps>
        </BaseCard>

        <BaseCard heading="Table Datatable - Filterable columns">
          <DatatablesFilterableColumns></DatatablesFilterableColumns>
        </BaseCard>

        <BaseCard heading="Table Datatable - Slots">
          <DatatablesSlots></DatatablesSlots>
        </BaseCard>

        <BaseCard heading="Table Datatable - Simple Checkbox">
          <DatatablesSimpleCheckbox></DatatablesSimpleCheckbox>
        </BaseCard>

        <BaseCard heading="Table Datatable - Expandable rows">
          <DatatablesExpandableRows></DatatablesExpandableRows>
        </BaseCard>

        <BaseCard heading="Table Datatable - Custom filtering">
          <DatatablesCustomFiltering></DatatablesCustomFiltering>
        </BaseCard>

        <BaseCard heading="Table Datatable - Customizing default header">
          <DatatablesCustomizingDefaultHeader></DatatablesCustomizingDefaultHeader>
        </BaseCard>

        <BaseCard heading="Table Datatable - Customizing default rows">
          <DatatablesCustomizingDefaultRows></DatatablesCustomizingDefaultRows>
        </BaseCard>

        <BaseCard heading="Table Datatable - External pagination">
          <DatatablesExternalPagination></DatatablesExternalPagination>
        </BaseCard>

        <BaseCard heading="Table Datatable - External sorting">
          <DatatablesExternalSorting></DatatablesExternalSorting>
        </BaseCard>

        <BaseCard heading="Table Datatable - Paginate and sort server-side">
          <DatatablesPaginateSortServerside></DatatablesPaginateSortServerside>
        </BaseCard>

        <BaseCard heading="Table Datatable - Content Editing">
          <DatatablesContentEditing></DatatablesContentEditing>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TableDatatable",

  data: () => ({
    page: {
      title: "Table Datatable"
    },
    breadcrumbs: [
      {
        text: "Tables",
        disabled: false,
        to: "#"
      },
      {
        text: "Table Datatable",
        disabled: true
      }
    ]
  }),
  components: {
    DatatablesSelectableRows: () =>
      import("./table-data/DatatablesSelectableRows"),
    DatatablesGroupedRows: () => import("./table-data/DatatablesGroupedRows"),
    DatatablesSortonMultipleColumns: () =>
      import("./table-data/DatatablesSortonMultipleColumns"),
    DatatablesSearch: () => import("./table-data/DatatablesSearch"),
    DatatablesRemoveDefaultHeaderFooter: () =>
      import("./table-data/DatatablesRemoveDefaultHeaderFooter"),
    DatatablesLoadingState: () => import("./table-data/DatatablesLoadingState"),
    DatatablesDense: () => import("./table-data/DatatablesDense"),
    DatatablesFooterProps: () => import("./table-data/DatatablesFooterProps"),
    DatatablesFilterableColumns: () =>
      import("./table-data/DatatablesFilterableColumns"),
    DatatablesSlots: () => import("./table-data/DatatablesSlots"),
    DatatablesSimpleCheckbox: () =>
      import("./table-data/DatatablesSimpleCheckbox"),
    DatatablesExpandableRows: () =>
      import("./table-data/DatatablesExpandableRows"),
    DatatablesCustomFiltering: () =>
      import("./table-data/DatatablesCustomFiltering"),
    DatatablesCustomizingDefaultHeader: () =>
      import("./table-data/DatatablesCustomizingDefaultHeader"),
    DatatablesCustomizingDefaultRows: () =>
      import("./table-data/DatatablesCustomizingDefaultRows"),
    DatatablesExternalPagination: () =>
      import("./table-data/DatatablesExternalPagination"),
    DatatablesExternalSorting: () =>
      import("./table-data/DatatablesExternalSorting"),
    DatatablesPaginateSortServerside: () =>
      import("./table-data/DatatablesPaginateSortServerside"),
    DatatablesContentEditing: () =>
      import("./table-data/DatatablesContentEditing"),
    DatatablesCRUDActions: () => import("./table-data/DatatablesCRUDActions")
  }
};
</script>
