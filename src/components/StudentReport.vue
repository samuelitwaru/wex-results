<template>
  <div>
    <h6 class="q-my-sm q-px-sm flex justify-between">
      Student Report
      <router-link :to="`/students/${$route.params.id}`">
        <q-btn color="primary" label="Student Info" no-caps flat dense />
      </router-link>
    </h6>

    <div class="row">
      <div class="col-md-6 q-my-auto q-px-none">
        <q-radio
          v-model="formData.report_type"
          val="assessment"
          label="Assessment Report"
        />
        <q-radio
          v-if="levelGroup?.name == 'O'"
          v-model="formData.report_type"
          val="activity"
          label="Activity Report"
        />
      </div>

      <div class="col-md-6 q-px-sm">
        <q-form
          class="q-my-sm"
          @submit="getStudentComputedReport"
          style="width: 100%"
        >
          <div class="row justify-end">
            <div class="q-my-auto">Filter</div>
            <div class="col q-px-sm q-my-auto">
              <q-select
                outlined
                dense
                v-model.number="formData.period"
                :options="periods"
                label="Period"
                :option-label="(item) => `${item.name}`"
                option-value="id"
                emit-value
                map-options
              />
            </div>
            <div class="q-my-auto">
              <q-btn label="Get" type="submit" color="primary" />
            </div>
          </div>
        </q-form>
      </div>
    </div>
    <div class="col q-pa-sm">
      <div v-if="subjectReports">
        <assessment-report
          v-if="formData.report_type == 'assessment'"
          :report="computedReport"
          :subjectReports="subjectReports"
          :levelGroup="levelGroup"
          :teacher="teacher"
        />

        <activity-report
          :report="computedReport"
          :subjectReports="subjectReports"
          :levelGroup="levelGroup"
          :teacher="teacher"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script>
import ActivityReport from "./ActivityReport.vue";
import AssessmentReport from "./AssessmentReport.vue";
export default {
  components: { AssessmentReport, ActivityReport },
  data() {
    return {
      student: {},
      levelGroup: null,
      period: null,
      periodLoaded: null,
      periods: [],
      computedReport: null,
      report: {},
      subjectReports: [],
      teacher: null,
      formData: {
        period: null,
        grading_system: null,
        report_type: "assessment",
      },
    };
  },
  created() {
    this.getPeriods();
    this.getStudent();
    this.getStudentComputedReport();
    this.getLatestPeriod();
  },

  methods: {
    getStudent() {
      this.$api.get(`/students/${this.$route.params.id}/`).then((response) => {
        this.student = response.data;
        this.subjects = this.student.subjects;
        this.$emit("updateStudent", response.data);
        this.teacher = this.student.class_room_detail.teacher_detail;
        this.getLevelGroup();
      });
    },
    getLevelGroup() {
      this.$api
        .get(
          `/level-groups/${this.student.class_room_detail.level_detail.level_group}/`
        )
        .then((response) => {
          this.levelGroup = response.data;
        });
    },
    getStudentComputedReport() {
      this.$setLoading(this, true);
      var urlQuery = this.$buildURLQuery(this.formData);
      this.$api
        .get(`/reports/computed/${this.$route.params.id}/?${urlQuery}`)
        .then((response) => {
          this.computedReport = response.data;
          this.report = this.computedReport.report;
          this.subjectReports = this.computedReport.subject_reports;
          this.$setLoading(this, false);
        });
    },
    getLatestPeriod() {
      this.$api.get(`/periods/latest/`).then((response) => {
        this.period = response.data;
        this.formData.period = this.period.id;
        this.periodLoaded = true;
      });
    },

    getPeriods() {
      this.$api.get(`/periods/`).then((response) => {
        this.periods = response.data;
      });
    },
  },
};
</script>

<style>
</style>
