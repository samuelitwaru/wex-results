<template>
  <div>
    <q-btn icon="add" dense color="primary" @click="show = true" />
    <q-dialog v-model="show">
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
            <div class="row">
              <div class="col q-mr-xs">
                <q-input
                  v-model="formData.name"
                  type="text"
                  label="Name"
                  required
                />
              </div>
              <div class="col q-mr-xs">
                <q-input v-model="formData.stream" type="text" label="Stream" />
              </div>
            </div>

            <div class="row">
              <div class="col q-mr-xs">
                <q-select
                  outlined
                  v-model="formData.level"
                  option-label="name"
                  option-value="id"
                  :options="levels"
                  label="Level"
                  emit-value
                  map-options
                  required
                />
              </div>
              <div class="col q-mr-xs">
                <q-select
                  outlined
                  v-model="formData.teacher"
                  option-label="name"
                  option-value="id"
                  :options="teachers"
                  label="Class Teacher"
                  emit-value
                  map-options
                  required
                />
              </div>
            </div>

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
      show: ref(false),
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
  computed: {
    formDataErrors() {
      return this.$store.state.results.formDataErrors;
    },
  },
  methods: {
    createClassRoom() {
      this.$setLoading(this, true);
      this.$api.post(`/class-rooms/`, this.formData).then((response) => {
        if (response) {
          this.$emit("addClassRoom", response.data);
          this.show = false;
          this.resetForm();
        }
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
      this.formData.stream = null;
      this.formData.level = null;
      this.formData.teacher = null;
    },
  },
};
</script>

<style>
</style>
