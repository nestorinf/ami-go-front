<template>
  <div class="text-center">
    <form-wizard @on-complete="onComplete" color="#1e88e5">
      <h3
        slot="title"
        class="title blue-grey--text text--darken-2 font-weight-regular mb-3"
      >This will replace my whole title</h3>
      <h6 slot="title" class="subtitle-2 font-weight-light">Custom Title Slot</h6>
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
  name: "FormWizardTitleSlot",
  data: () => ({
    title: "FormWizardTitleSlot"
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