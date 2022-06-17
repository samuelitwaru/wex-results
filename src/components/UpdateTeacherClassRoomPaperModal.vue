<template>
  <div style="display: inline">
    <q-btn
      color="primary"
      icon-right="edit"
      @click="updateTeacherClassRoomPaperModal = true"
      no-caps
      flat
      dense
    />

    <q-dialog v-model="updateTeacherClassRoomPaperModal">
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
              :option-label="(item) => `${item.name} ${item.stream || ''}`"
              option-value="id"
              :options="classRooms"
              label="Class Room"
              emit-value
              map-options
            />

            <q-select
              outlined
              v-model="formData.paper"
              :option-label="(item) => `${item.subject_name}/${item.number}`"
              option-value="id"
              :options="papers"
              label="Subject Paper"
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
  props: ["teacherClassRoomPaper", "teacher"],
  setup() {
    return {
      updateTeacherClassRoomPaperModal: ref(false),
    };
  },
  data() {
    return {
      classRooms: [],
      papers: [],
      formData: {
        class_room: this.teacherClassRoomPaper.class_room,
        paper: this.teacherClassRoomPaper.paper,
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
      this.$api.get(`/papers/`).then((response) => {
        this.papers = response.data;
      });
    },
    updateClassRoomSubject() {
      this.formData.teacher = this.teacher.id;
      console.log(this.formData);
      this.$api
        .put(
          `/teacher-class-room-papers/${this.teacherClassRoomPaper.id}/`,
          this.formData
        )
        .then((response) => {
          this.$emit("replaceTeacherClassRoomPaper", response.data);
          this.updateTeacherClassRoomPaperModal = false;
        });
    },
  },
};
</script>

<style>
</style>
