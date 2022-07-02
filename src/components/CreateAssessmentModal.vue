<template>
  <div>
    <q-btn dense icon="add" color="primary" @click="show = true" />
    <q-dialog v-model="show">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Assessment</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="createAssessment"
            @reset="resetForm"
            class="q-gutter-md"
          >
            <div>
              <label class="text-grey-8">Date</label>
              <div
                class="row q-pa-xs rounded-borders"
                style="border: 1px solid #dddddd"
              >
                <div class="col-9 q-my-auto">
                  {{ formData.date }}
                </div>
                <div class="col-3" align="right">
                  <q-btn col="2" icon="event" round color="primary">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="formData.date"
                        mask="YYYY-MM-DD"
                        :title="formData.date"
                        subtitle="Date of Birth"
                        years-in-month-view
                      >
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </div>
              </div>
            </div>
            <q-select
              outlined
              v-model="formData.class_room"
              :option-label="(item) => `${item.name} ${item.stream || ''}`"
              option-value="id"
              :options="classRooms"
              label="Class"
              emit-value
              map-options
              @update:model-value="onChangeClassRoom"
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
            <q-select
              v-if="!teacher"
              outlined
              v-model="formData.teacher"
              option-label="name"
              option-value="id"
              :options="teachers"
              label="Teacher"
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
  props: {
    teacher: {
      type: Number,
      default: null,
    },
  },
  setup() {
    return {
      show: ref(false),
    };
  },
  data() {
    return {
      teachers: [],
      classRooms: [],
      papers: [],
      formData: {
        date: null,
        teacher: null,
        class_room: null,
        paper: null,
      },
    };
  },
  created() {
    this.getTeachers();
    this.getClassRooms();
    this.getPapers();
    this.formData.teacher = this.teacher;
  },
  watch: {
    teacher(newValue, oldValue) {
      this.formData.teacher = newValue;
    },
  },
  computed: {
    classRoomsUrl() {
      if (this.$userHasGroup("teacher")) {
        var user = this.$getState("user");
        return `teachers/${user.teacher_id}/allocated-class-rooms/`;
      }
      return `/class-rooms/`;
    },
    papersUrl() {
      if (this.$userHasGroup("teacher")) {
        var user = this.$getState("user");
        return `teachers/${user.teacher_id}/allocated-papers/`;
      }
      return `/papers/`;
    },
  },
  methods: {
    createAssessment() {
      this.$setLoading(this, true);
      this.$api.post(`/assessments/`, this.formData).then((response) => {
        this.$emit("addAssessment", response.data);
        this.show = false;
        this.resetForm();
        this.$setLoading(this, false);
      });
    },

    getTeachers() {
      this.$api.get(`/teachers/`).then((response) => {
        this.teachers = response.data;
      });
    },

    getPapers(args = {}) {
      var queryString = this.$buildURLQuery(args);
      this.$api.get(`${this.papersUrl}?${queryString}`).then((response) => {
        this.papers = response.data;
      });
    },

    getClassRooms() {
      this.$api.get(`${this.classRoomsUrl}`).then((response) => {
        this.classRooms = response.data;
      });
    },

    resetForm() {
      this.formData.date = null;
      this.formData.term = null;
      this.formData.class_room = null;
      this.formData.paper = null;
      this.formData.teacher = null;
    },

    onChangeClassRoom(value) {
      this.formData.paper = null;
      var classRoom = this.classRooms.find(
        (classRoom) => classRoom.id == value
      );
      var args = {
        subject__level_group: classRoom.level_detail.level_group,
      };
      this.getPapers(args);
    },
  },
};
</script>

<style>
</style>
