<template>
  <div>
    <q-btn icon="add" color="primary" @click="medium = true" />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">
            New Class Subject Allocation for "{{ teacher.name }}"
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="createTeacherClassRoomSubject" class="q-gutter-md">
            <q-select
              outlined
              v-model="formData.class_room"
              option-label="name"
              option-value="id"
              :options="classRooms"
              label="Class Room"
              emit-value
              map-options
            />

            <q-select
              outlined
              v-model="formData.subject"
              option-label="name"
              option-value="id"
              :options="subjects"
              label="Subject"
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
  props: ["teacher"],
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
      classRooms: [],
      subjects: [],
      formData: {
        class_room: "",
        subject: "",
      },
    };
  },
  created() {
    this.getClassRooms();
    this.getSubjects();
  },
  methods: {
    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = response.data;
      });
    },
    getSubjects() {
      this.$api.get(`/subjects/`).then((response) => {
        this.subjects = response.data;
      });
    },
    createTeacherClassRoomSubject() {
      this.formData.teacher = this.teacher.id;
      console.log(this.formData);
      this.$api
        .post(`/teacher-class-room-subjects/`, this.formData)
        .then((response) => {
          this.$emit("addTeacherClassRoomSubject", response.data);
          this.medium = false;
        });
    },
  },
};
</script>

<style>
</style>