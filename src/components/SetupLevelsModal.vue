<template>
  <div>
    <q-btn
      label="Setup Levels"
      icon="settings"
      color="primary"
      @click="medium = true"
    />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Setup Levels</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit="setupLevels" @reset="resetForm" class="q-gutter-md">
            <div>
              <p>Select Levels</p>
              <q-checkbox dense v-model="formData.P" label="Primary Level" />
              <q-checkbox dense v-model="formData.O" label="Ordinary Level" />
              <q-checkbox dense v-model="formData.A" label="Advanced Level" />
            </div>

            <div class="flex justify-between">
              <div>
                <q-btn flat color="primary" label="Cancel" v-close-popup />
              </div>
              <q-btn label="okay" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
      formData: {
        P: false,
        O: false,
        A: false,
      },
    };
  },
  created() {},
  methods: {
    setupLevels() {
      this.$setLoading(this, true);
      this.$api
        .post(`/level-groups/levels/setup/`, this.formData)
        .then((response) => {
          this.$setLoading(this, false);
          this.$emit("updateLevelGroups", response.data);
        });
    },

    resetForm() {
      this.formData.P = null;
      this.formData.O = null;
      this.formData.A = null;
    },
  },
};
</script>

<style>
</style>
