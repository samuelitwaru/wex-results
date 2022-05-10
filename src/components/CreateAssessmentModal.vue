<template>
  <div>
    <q-btn
      label="New Assessment"
      icon="add"
      color="primary"
      @click="medium = true"
    />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Assessment</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="createAssessment" class="q-gutter-md">
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
            <q-input
              v-model.number="formData.term"
              type="number"
              label="Term"
              required
            />
            <q-select
              outlined
              v-model="formData.class_room"
              :option-label="(item) => `${item.name} ${item.stream}`"
              option-value="id"
              :options="classRooms"
              label="Class"
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
            <q-select
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
  props: ["assessments"],
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
      teachers: [],
      classRooms: [],
      subjects: [],
      formData: {
        date: null,
        teacher: null,
        class_room: null,
        term: null,
        subject: null,
      },
    };
  },
  created() {
    this.getTeachers();
    this.getClassRooms();
    this.getSubjects();
  },
  methods: {
    createAssessment() {
      this.$api.post(`/assessments/`, this.formData).then((response) => {
        this.$emit("addAssessment", response.data);
        this.medium = false;
      });
    },

    getTeachers() {
      this.$api.get(`/teachers/`).then((response) => {
        this.teachers = response.data;
      });
    },

    getSubjects() {
      this.$api.get(`/subjects/`).then((response) => {
        this.subjects = response.data;
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
