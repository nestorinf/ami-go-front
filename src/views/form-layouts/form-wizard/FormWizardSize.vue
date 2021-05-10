<template>
  <div class="text-center">
    <v-chip color="info" class="ma-2">Size with xs</v-chip>
    <form-wizard
      @on-complete="onComplete"
      color="#1e88e5"
      :title="null"
      :subtitle="null"
      step-size="sm"
    >
      <tab-content title="Personal details" icon="ti-user">
        <span class="font-weight-bold">My first tab content</span>
      </tab-content>
      <tab-content title="Reuirements" icon="ti-settings">
        <span class="font-weight-bold">My second tab content</span>
      </tab-content>
      <tab-content title="Last step" icon="ti-check">
        <span class="font-weight-bold">Yuhuuu! This seems pretty damn simple</span>
      </tab-content>
    </form-wizard>
    <v-divider></v-divider>
    <v-chip color="info" class="ma-2">Size with sm</v-chip>
    <form-wizard
      @on-complete="onComplete"
      color="#1e88e5"
      :title="null"
      :subtitle="null"
      step-size="sm"
    >
      <tab-content title="Personal details" icon="ti-user">
        <span class="font-weight-bold">My first tab content</span>
      </tab-content>
      <tab-content title="Reuirements" icon="ti-settings">
        <span class="font-weight-bold">My second tab content</span>
      </tab-content>
      <tab-content title="Last step" icon="ti-check">
        <span class="font-weight-bold">Yuhuuu! This seems pretty damn simple</span>
      </tab-content>
    </form-wizard>
    <v-divider></v-divider>
    <v-chip color="info" class="ma-2">Size with md</v-chip>
    <form-wizard
      @on-complete="onComplete"
      color="#1e88e5"
      :title="null"
      :subtitle="null"
      step-size="md"
    >
      <tab-content title="Personal details" icon="ti-user">
        <span class="font-weight-bold">My first tab content</span>
      </tab-content>
      <tab-content title="Reuirements" icon="ti-settings">
        <span class="font-weight-bold">My second tab content</span>
      </tab-content>
      <tab-content title="Last step" icon="ti-check">
        <span class="font-weight-bold">Yuhuuu! This seems pretty damn simple</span>
      </tab-content>
    </form-wizard>
    <v-divider></v-divider>
    <v-chip color="info" class="ma-2">Size with lg</v-chip>
    <form-wizard
      @on-complete="onComplete"
      color="#1e88e5"
      :title="null"
      :subtitle="null"
      step-size="lg"
    >
      <tab-content title="Personal details" icon="ti-user">
        <span class="font-weight-bold">My first tab content</span>
      </tab-content>
      <tab-content title="Reuirements" icon="ti-settings">
        <span class="font-weight-bold">My second tab content</span>
      </tab-content>
      <tab-content title="Last step" icon="ti-check">
        <span class="font-weight-bold">Yuhuuu! This seems pretty damn simple</span>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  name: "FormWizardSize",
  data: () => ({
    title: "FormWizardSize"
  }),
  components: {
    FormWizard,
    TabContent
  },
  methods: {
    onComplete: function() {
      alert("Yay. Done!");
    }
  }
};
</script>