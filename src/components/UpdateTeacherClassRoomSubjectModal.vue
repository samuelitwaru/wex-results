<template>
  <div style="display: inline">
    <q-btn
      color="primary"
      icon-right="edit"
      @click="updateTeacherClassRoomSubjectModal = true"
      no-caps
      flat
      dense
    />

    <q-dialog v-model="updateTeacherClassRoomSubjectModal">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">
            Update Class Subject Allocation for "{{ teacher.name }}"
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="updateClassRoomSubject" class="q-gutter-md">
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
  props: ["teacherClassRoomSubject", "teacher"],
  setup() {
    return {
      updateTeacherClassRoomSubjectModal: ref(false),
    };
  },
  data() {
    return {
      classRooms: [],
      subjects: [],
      formData: {
        class_room: this.teacherClassRoomSubject.class_room,
        subject: this.teacherClassRoomSubject.subject,
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
    updateClassRoomSubject() {
      this.formData.teacher = this.teacher.id;
      console.log(this.formData);
      this.$api
        .put(
          `/teacher-class-room-subjects/${this.teacherClassRoomSubject.id}/`,
          this.formData
        )
        .then((response) => {
          this.$emit("replaceTeacherClassRoomSubject", response.data);
          this.updateTeacherClassRoomSubjectModal = false;
        });
    },
  },
};
</script>

<style>
</style>