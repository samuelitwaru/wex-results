<template>
  <div>
    <q-btn
      label="New Level"
      icon="add"
      color="primary"
      @click="medium = true"
    />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Level</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit="createLevel" @reset="resetForm" class="q-gutter-md">
            <q-input
              v-model="formData.rank"
              type="number"
              label="Rank"
              required
            />
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />

            <q-input
              v-model="formData.description"
              type="text"
              label="Description"
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
      levels: [],
      formData: {
        name: "",
        rank: "",
        description: "",
      },
    };
  },
  created() {
    this.getLevels();
    this.getTeachers();
  },
  methods: {
    createLevel() {
      this.$setLoading(this, true);
      this.$api.post(`/levels/`, this.formData).then((response) => {
        this.$emit("addLevel", response.data);
        this.medium = false;
        this.resetForm();
        this.$setLoading(this, false);
      });
    },

    getLevels() {
      this.$api.get(`/levels/`).then((response) => {
        this.levels = response.data;
      });
    },

    getTeachers() {
      this.$api.get(`/teachers/`).then((response) => {
        this.teachers = response.data;
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
