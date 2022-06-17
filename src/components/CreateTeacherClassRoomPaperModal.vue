<template>
  <div>
    <q-btn icon="add" flat color="primary" dense @click="medium = true" />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">
            New Class Subject Allocation for "{{ teacher.name }}"
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="createTeacherClassRoomPaper"
            @reset="resetForm"
            class="q-gutter-md"
          >
            <q-select
              outlined
              v-model="formData.class_room"
              :option-label="(item) => `${item.name} ${item.stream || ''}`"
              option-value="id"
              :options="classRooms"
              label="Class"
              emit-value
              map-options
              required
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
              required
            />

            <!-- <div v-if="formData.subject">
              <strong>Select papers that apply</strong>
              <q-option-group
                v-model="formData.papers"
                :options="paperOptions"
                type="checkbox"
                checked
                required
              />
            </div> -->

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
      papers: [],
      // paperOptions: [],
      formData: {
        class_room: null,
        paper: null,
      },
    };
  },
  computed: {},
  created() {
    this.getClassRooms();
    this.getPapers();
  },
  methods: {
    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = response.data;
      });
    },
    getPapers() {
      this.$api.get(`/papers/`).then((response) => {
        this.papers = response.data;
      });
    },
    createTeacherClassRoomPaper() {
      this.formData.teacher = this.teacher.id;
      this.$api
        .post(`/teacher-class-room-papers/`, this.formData)
        .then((response) => {
          this.$emit("addTeacherClassRoomPaper", response.data);
          this.medium = false;
          this.resetForm();
        });
    },

    setPaperOptions(val) {
      this.paperOptions = [{ label: "hello", value: "1" }];
      var subject = this.subjects.find((subject) => subject.id == val);
      this.formData.papers = [];
      this.paperOptions = subject.papers.map((paper) => {
        paper.label = `${paper.subject_name}/${paper.number}`;
        paper.value = paper.id;
        this.formData.papers.push(paper.value);
        return paper;
      });
    },

    resetForm() {
      this.formData.class_room = null;
      this.formData.paper = null;
      // this.formData.papers = [];
    },
  },
};
</script>

<style>
</style>
