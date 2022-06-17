<template>
  <div>
    <q-btn dense icon="add" color="primary" @click="medium = true" />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Grading System</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="createGradingSystem"
            @reset="resetForm"
            class="q-gutter-md"
          >
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />

            <!-- <q-input
              v-model="formData.description"
              type="text"
              label="Description"
            /> -->

            <q-select
              outlined
              v-model="formData.level_group"
              :option-label="(item) => `${item.full} Level`"
              option-value="id"
              :options="levelGroups"
              label="Level"
              emit-value
              map-options
            />

            <div class="flex justify-between">
              <div>
                <q-btn flat color="primary" label="Cancel" v-close-popup />
              </div>
              <q-btn label="Submit" type="submit" color="primary" />
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
      grading_systems: [],
      levelGroups: [],
      formData: {
        name: null,
        level_group: null,
      },
    };
  },
  created() {
    this.getGradingSystems();
    this.getLevelGroups()
  },
  methods: {
    createGradingSystem() {
      this.$setLoading(this, true);
      this.$api.post(`/grading-systems/`, this.formData).then((response) => {
        this.$emit("addGradingSystem", response.data);
        this.medium = false;
        this.resetForm();
        this.$setLoading(this, false);
      });
    },
    getLevelGroups() {
      this.$api.get(`/level-groups/`).then((response) => {
        this.levelGroups = response.data;
      });
    },
    getGradingSystems() {
      this.$api.get(`/grading-systems/`).then((response) => {
        this.grading_systems = response.data;
      });
    },

    resetForm() {
      this.formData.name = null;
      this.formData.rank = null;
      this.formData.description = null;
    },
  },
};
</script>

<style>
</style>
