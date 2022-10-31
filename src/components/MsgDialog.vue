<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm">{{ msg }}</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Submit" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      confirm: true,
    };
  },
  computed: {
    dialog() {
      return this.$store.state.showMsgDialog;
    },
    title() {
      return this.$store.state.msgDialogTitle;
    },
    msg() {
      return this.$store.state.msgDialogMsg;
    },
    action() {
      return this.$store.state.msgDialogAction;
    },
  },
};
</script>

<style></style>
