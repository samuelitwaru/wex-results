<template>
  <div>
    <q-btn
      label="New Teacher"
      icon="add"
      color="primary"
      @click="medium = true"
    />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Teacher</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="createTeacher" class="q-gutter-md">
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />
            <!-- <q-select
              outlined
              v-model="formData.class_rooms"
              option-label="name"
              option-value="id"
              :options="classRooms"
              label="Class Room"
              emit-value
              map-options
              multiple
            /> -->

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
      small: ref(false),
      medium: ref(false),
      fullWidth: ref(false),
      fullHeight: ref(false),
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
      console.log(this.formData);
      this.$api.post(`/teachers/`, this.formData).then((response) => {
        this.$emit("addTeacher", response.data);
        this.medium = false;
      });
    },

    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = response.data;
      });
    },
  },
};
</script>

<style>
</style>
