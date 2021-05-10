<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="Combobox - Multiple combobox">
          <ComboboxMultiple></ComboboxMultiple>
        </BaseCard>

        <BaseCard heading="Combobox - Dense">
          <ComboboxDense></ComboboxDense>
        </BaseCard>

        <BaseCard heading="Combobox - No data with chips">
          <ComboboxNodatachips></ComboboxNodatachips>
        </BaseCard>

        <BaseCard heading="Combobox - Advanced custom options">
          <ComboboxAdvancedOptions></ComboboxAdvancedOptions>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FECombobox",

  data: () => ({
    page: {
      title: "Combobox"
    },
    breadcrumbs: [
      {
        text: "Form Elements",
        disabled: false,
        to: "#"
      },
      {
        text: "Combobox",
        disabled: true
      }
    ]
  }),
  components: {
    ComboboxMultiple: () =>
      import("@/components/vuetifyComponents/combobox/ComboboxMultiple"),
    ComboboxDense: () =>
      import("@/components/vuetifyComponents/combobox/ComboboxDense"),
    ComboboxNodatachips: () =>
      import("@/components/vuetifyComponents/combobox/ComboboxNodatachips"),
    ComboboxAdvancedOptions: () =>
      import("@/components/vuetifyComponents/combobox/ComboboxAdvancedOptions")
  }
};
</script>
