<template>
  <q-page class="flex-center">
    <q-card class="my-card" flat>
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            src="~/assets/string.png"
            :ratio="1"
            style="width: 120px; hieght: 120px"
          />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Results App</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Entity</div>
          <div class="text-caption text-grey">Location</div>
        </q-card-section>
      </q-card-section>

      <q-separator />
      <div class="row q-pa-sm">
        <div v-if="currentPeriod" class="col-12">
          <div class="text-h6">Academic Period</div>
          <q-card class="my-card" flat bordered>
            <q-card-section>
              <div class="text-h6">{{ currentPeriod.name }}</div>
              <div class="text-subtitle2">
                <div class="row">
                  <div class="col-4">
                    <small>Starts</small> <br />
                    <div>{{ currentPeriod.start }}</div>
                  </div>
                  <div class="col-4">
                    <small>Ends</small> <br />
                    <div>{{ currentPeriod.start }}</div>
                  </div>
                  <div class="col-4">
                    <small>Duration</small> <br />
                    <div>{{ duration }}</div>
                  </div>
                </div>

                <q-card-section align="right">
                  <update-period-modal
                    :period="currentPeriod"
                    @updatePeriod="periods[0] = $event"
                  />
                </q-card-section>

                <q-separator spaced />

                <div class="row">
                  <div class="col-6">
                    <small>Levels</small> <br />
                    <router-link to="levels">
                      <div>{{ levelCount }} level(s)</div>
                    </router-link>
                  </div>
                  <div class="col-6">
                    <small>Teachers</small> <br />
                    <router-link to="teachers">
                      <div>{{ teacherCount }} teacher(s)</div>
                    </router-link>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <small>Class rooms</small> <br />
                    <router-link to="class-rooms">
                      <div>{{ classRoomCount }} class room(s)</div>
                    </router-link>
                  </div>
                  <div class="col-6">
                    <small>Subjects</small> <br />
                    <router-link to="subjects">
                      <div>{{ subjectCount }} subject(s)</div>
                    </router-link>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <small>Students</small> <br />
                    <router-link to="levels">
                      <div>{{ studentCount }} student(s)</div>
                    </router-link>
                  </div>
                  <div class="col-6">
                    <small>Grading systems</small> <br />
                    <router-link to="grading-systems">
                      <div>{{ gradingSystemCount }} grading system(s)</div>
                    </router-link>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <small>Assessments</small> <br />
                    <router-link to="assessments">
                      <div>{{ assessmentCount }} assessment(s)</div>
                    </router-link>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div v-else class="col-12">
          <create-period-modal />
        </div>

        <div class="col-12"></div>
      </div>

      <q-card-actions> </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import CreatePeriodModal from "src/components/CreatePeriodModal.vue";
import UpdatePeriodModal from "src/components/UpdatePeriodModal.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { CreatePeriodModal, UpdatePeriodModal },
  name: "IndexPage",

  data() {
    return {
      periods: [],
      levelCount: 0,
      teacherCount: 0,
      classRoomCount: 0,
      subjectCount: 0,
      studentCount: 0,
      gradingSystemCount: 0,
      assessmentCount: 0,
    };
  },
  created() {
    this.getPeriods();
    this.getModelCounts();
  },
  computed: {
    currentPeriod() {
      if (this.periods.length) {
        var period = this.periods[0];
        this.getPeriodAssessments(period);
        return period;
      }
      return null;
    },
    duration() {
      var diff =
        new Date(this.currentPeriod.stop) - new Date(this.currentPeriod.start);
      return `${diff / 1000 / 60 / 60 / 24} days`;
    },
  },
  methods: {
    getPeriods() {
      this.$api.get(`/periods/`).then((response) => {
        this.periods = response.data;
      });
    },
    getPeriodAssessments(period) {
      if (period) {
        this.$api.get(`/assessments/?period=${period.id}`).then((response) => {
          this.assessmentCount = response.data.length;
        });
      }
    },
    getModelCounts() {
      this.$api.get(`/levels/count/`).then((response) => {
        this.levelCount = response.data.count;
      });
      this.$api.get(`/teachers/count/`).then((response) => {
        this.teacherCount = response.data.count;
      });
      this.$api.get(`/class-rooms/count/`).then((response) => {
        this.classRoomCount = response.data.count;
      });
      this.$api.get(`/subjects/count/`).then((response) => {
        this.subjectCount = response.data.count;
      });
      this.$api.get(`/students/count/`).then((response) => {
        this.studentCount = response.data.count;
      });
      this.$api.get(`/grading-systems/count/`).then((response) => {
        this.gradingSystemCount = response.data.count;
      });
      // this.$api
      //   .get(`/assessments/count/?period=${this.currentPeriod.id}`)
      //   .then((response) => {
      //     this.assessmentCount = response.data.count;
      //   });
    },
  },
});
</script>
