<template>
  <div>
    <q-dialog v-model="loading" persistent>
      <q-spinner-ios color="primary" size="3rem" :thickness="5" />
    </q-dialog>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();

    const loading = computed({
      get: () => $store.state.results.loading,
      set: (val) => {
        $store.commit("results/updateLoadingState", val);
      },
    });

    return {
      loading,
    };
  },

  created() {},
};
</script>
