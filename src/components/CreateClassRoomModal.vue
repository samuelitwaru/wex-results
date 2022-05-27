<template>
  <div>
    <q-btn icon="add" dense color="primary" @click="medium = true" />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New ClassRoom</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="createClassRoom"
            @reset="resetForm"
            class="q-gutter-md"
          >
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />
            <q-input v-model="formData.stream" type="text" label="Stream" />
            <q-select
              outlined
              v-model="formData.level"
              option-label="name"
              option-value="id"
              :options="levels"
              label="Level"
              emit-value
              map-options
            />
            <q-select
              outlined
              v-model="formData.teacher"
              option-label="name"
              option-value="id"
              :options="teachers"
              label="Class Teacher"
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
  props: ["class_rooms"],
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
      levels: [],
      teachers: [],
      formData: {
        name: null,
        stream: null,
        level: null,
        teacher: null,
      },
    };
  },
  created() {
    this.getLevels();
    this.getTeachers();
  },
  methods: {
    createClassRoom() {
      this.$api.post(`/class-rooms/`, this.formData).then((response) => {
        this.$emit("addClassRoom", response.data);
        this.medium = false;
        this.resetForm();
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
      this.formData.stream = null;
      this.formData.level = null;
      this.formData.teacher = null;
    },
  },
};
</script>

<style>
</style>
