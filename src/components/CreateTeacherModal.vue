<template>
  <div>
    <q-btn dense icon="add" color="primary" @click="medium = true" />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Teacher</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="createTeacher" @reset="restForm" class="q-gutter-md">
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
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
  props: ["teachers"],
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
      classRooms: [],
      formData: {
        name: "",
      },
    };
  },
  created() {
    this.getClassRooms();
  },
  methods: {
    createTeacher() {
      this.$api.post(`/teachers/`, this.formData).then((response) => {
        this.$emit("addTeacher", response.data);
        this.medium = false;
        this.resetForm();
      });
    },

    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = response.data;
      });
    },

    resetForm() {
      this.formData.name = null;
    },
  },
};
</script>

<style>
</style>
