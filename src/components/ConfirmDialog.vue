<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="width: 300px">
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="primary" text-color="white" />
        <span class="q-ml-sm">{{ message }}</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          :label="cancelButton"
          color="primary"
          @click="_cancel"
          v-close-popup
        />
        <q-btn
          flat
          :label="okButton"
          color="primary"
          @click="_confirm"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      title: undefined,
      message: undefined,
      okButton: "Okay",
      cancelButton: "Cancel",

      resolvePromise: undefined,
      rejectPromise: undefined,
    };
  },

  methods: {
    show(opts = {}) {
      this.title = opts.title;
      this.message = opts.message;
      this.okButton = opts.okButton;
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton;
      }
      // Once we set our config, we tell the popup modal to open
      this.modal = true;
      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    _confirm() {
      //   this.$refs.popup.close();
      this.resolvePromise(true);
    },

    _cancel() {
      //   this.$refs.popup.close();
      this.resolvePromise(false);
      // Or you can throw an error
      // this.rejectPromise(new Error('User cancelled the dialogue'))
    },
  },
};
</script>

<style>
</style>