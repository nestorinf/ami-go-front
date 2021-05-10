<template>
  <div>
    <form-wizard
      @on-complete="onComplete"
      @on-loading="setLoading"
      @on-validate="handleValidation"
      @on-error="handleErrorMessage"
      shape="circle"
      color="#1e88e5"
      error-color="#e74c3c"
    >
      <tab-content title="Personal details" :before-change="validateAsync" icon="ti-user">First tab</tab-content>
      <tab-content title="Additional Info" icon="ti-settings">Second tab</tab-content>
      <tab-content title="Last step" icon="ti-check">Third tab</tab-content>

      <div class="loader" v-if="loadingWizard"></div>
      <div v-if="errorMsg">
        <span class="error error--text">{{errorMsg}}</span>
      </div>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  name: "FormWizardValidation",
  data: () => ({
    title: "FormWizardValidation",
    loadingWizard: false,
    errorMsg: null,
    count: 0
  }),
  components: {
    FormWizard,
    TabContent
  },
  methods: {
    onComplete: function() {
      alert("Yay. Done!");
    },
    setLoading: function(value) {
      this.loadingWizard = value;
    },
    handleValidation: function(isValid, tabIndex) {
      console.log("Tab: " + tabIndex + " valid: " + isValid);
    },
    handleErrorMessage: function(errorMsg) {
      this.errorMsg = errorMsg;
    },
    validateAsync: function() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.count < 1) {
            this.count++;
            reject(
              "This is a custom validation error message. Click next again to get rid of the validation"
            );
          } else {
            this.count = 0;
            resolve(true);
          }
        }, 1000);
      });
    }
  }
};
</script>