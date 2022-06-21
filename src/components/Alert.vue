<template>
  <div>
    <q-dialog v-model="show">
      <q-card>
        <q-card-section class="row items-center"> {{ msg }} </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Okay" color="primary" v-close-popup autofocus />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();

    const show = computed({
      get: () => $store.state.results.show,
      set: (val) => {
        $store.commit("results/updateAlertState", val);
      },
    });

    const msg = computed({
      get: () => $store.state.results.msg,
      set: (val) => {
        $store.commit("results/updateAlertMsg", val);
      },
    });

    return {
      show,
      msg,
    };
  },

  created() {},
};
</script>
