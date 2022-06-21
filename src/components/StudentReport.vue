<template>
  <div>
    <h6 class="q-my-sm q-px-sm flex justify-between">
      Student Report
      <router-link :to="`/students/${$route.params.id}`">
        <q-btn color="primary" label="Student Info" no-caps flat dense />
      </router-link>
    </h6>
    <div class="q-pa-sm">
      <q-form @submit="getStudentComputedReport" style="width: 100%">
        <div class="row justify-end">
          <div class="q-my-auto">Filter</div>
          <div class="col q-px-sm">
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
          <div class="col q-px-sm">
            <q-select
              outlined
              dense
              v-model="formData.grading_system"
              option-label="name"
              option-value="id"
              :options="gradingSystems"
              label="Grading System"
              emit-value
              map-options
            />
          </div>
          <div class="q-my-auto">
            <q-btn label="Get" type="submit" color="primary" />
          </div>
        </div>
      </q-form>
      <div class="q-pb-sm"></div>

      <q-markup-table flat bordered separator="cell" square dense>
        <thead>
          <th
            class="text-left q-px-none"
            :class="{
              'mini-col': !cv[k],
            }"
            v-for="k in Object.keys(cv)"
            :key="k"
          >
            <input
              type="checkbox"
              :title="`${$camelToNormal(k)}`"
              v-model="cv[k]"
            />
            {{ $camelToNormal(k) }}
          </th>
        </thead>
        <tbody>
          <template
            v-for="subjectReport in subjectReports"
            :key="subjectReport.subject.id"
          >
            <tr>
              <td
                :class="{ 'mini-col': !cv.code }"
                :rowspan="subjectReport.papers.length"
              >
                {{ subjectReport.subject.code }}
              </td>
              <td
                :class="{ 'mini-col': !cv.subject }"
                :rowspan="subjectReport.papers.length"
              >
                {{ subjectReport.subject.name }}
              </td>
              <td :class="{ 'mini-col': !cv.competency }">
                P{{ subjectReport.papers[0].paper.number }} -
                {{ subjectReport.papers[0].paper.description }}
              </td>
              <td :class="{ 'mini-col': !cv.assessments }" class="text-right">
                <q-btn
                  v-for="score in subjectReport.papers[0].scores"
                  :key="score"
                  class="q-py-none"
                  :label="score"
                  outline
                  dense
                  style="margin-left: 4px"
                />
              </td>
              <td :class="{ 'mini-col': !cv.total }">
                {{ subjectReport.papers[0].total }}
              </td>
              <td :class="{ 'mini-col': !cv.average }">
                {{ subjectReport.papers[0].average }}
              </td>
              <td :class="{ 'mini-col': !cv.score }">
                {{ subjectReport.papers[0].score }}
              </td>
              <td :class="{ 'mini-col': !cv.descriptor }">
                {{ subjectReport.papers[0].descriptor }}
              </td>
              <td
                :class="{ 'mini-col': !cv.subjectAverage }"
                :rowspan="subjectReport.papers.length"
              >
                {{ subjectReport.average }}
              </td>
              <td
                :class="{ 'mini-col': !cv.aggregates }"
                :rowspan="subjectReport.papers.length"
              >
                {{ $wrapAggr(subjectReport.aggregate) }}
              </td>
              <td
                :class="{ 'mini-col': !cv.grade }"
                :rowspan="subjectReport.papers.length"
              >
                {{ subjectReport.letter_grade }}
              </td>
              <td
                :class="{ 'mini-col': !cv.points }"
                :rowspan="subjectReport.papers.length"
              >
                {{ subjectReport.points }}
              </td>
              <td
                :class="{ 'mini-col': !cv.classTeacher }"
                :rowspan="subjectReport.papers.length"
              >
                {{ teacher?.initials }}
              </td>
            </tr>
            <tr
              v-for="paper in subjectReport.papers.slice(1)"
              :key="paper.paper.id"
            >
              <td
                :class="{ 'mini-col': !cv.competency }"
                style="
                  border-left: 1px solid rgba(0, 0, 0, 0.12);
                  padding-left: 0.45rem;
                "
              >
                P{{ paper.paper.number }} - {{ paper.paper.description }}
              </td>
              <td
                :class="{ 'mini-col': !cv.assessments }"
                class="text-right"
                style="
                  border-left: 1px solid rgba(0, 0, 0, 0.12);
                  padding-left: 0.45rem;
                "
              >
                <q-btn
                  v-for="score in paper.scores"
                  :key="score"
                  class="q-py-none"
                  :label="score"
                  outline
                  dense
                  style="margin-left: 4px"
                />
              </td>
              <td
                :class="{ 'mini-col': !cv.total }"
                style="
                  border-left: 1px solid rgba(0, 0, 0, 0.12);
                  padding-left: 0.45rem;
                "
              >
                {{ paper.total }}
              </td>
              <td
                :class="{ 'mini-col': !cv.average }"
                style="
                  border-left: 1px solid rgba(0, 0, 0, 0.12);
                  padding-left: 0.45rem;
                "
              >
                {{ paper.average }}
              </td>
              <td
                :class="{ 'mini-col': !cv.score }"
                style="
                  border-left: 1px solid rgba(0, 0, 0, 0.12);
                  padding-left: 0.45rem;
                "
              >
                {{ paper.score }}
              </td>
              <td
                :class="{ 'mini-col': !cv.descriptor }"
                style="
                  border-left: 1px solid rgba(0, 0, 0, 0.12);
                  padding-left: 0.45rem;
                "
              >
                {{ paper.descriptor }}
              </td>
            </tr>
          </template>
          <tr style="height: 5rem; background-color: rgba(0, 0, 0, 0.02">
            <td colspan="8"></td>
            <td :class="{ 'mini-col': !cv.subjectAverage }">
              <q-btn
                class="q-py-none"
                :label="`${averageMarks}`"
                outline
                dense
                style="margin-left: 4px"
              />
            </td>
            <td :class="{ 'mini-col': !cv.aggregates }">
              <q-btn
                v-if="levelGroup && levelGroup.name == 'O'"
                class="q-py-none"
                :label="`${bestOf8} Aggregate(s)`"
                outline
                dense
                style="margin-left: 4px"
              />
            </td>
            <td></td>
            <td :class="{ 'mini-col': !cv.points }">
              <q-btn
                v-if="levelGroup && levelGroup.name == 'A'"
                class="q-py-none"
                :label="`${totalPoints} Point(s)`"
                outline
                dense
                style="margin-left: 4px"
              />
            </td>
            <td></td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-form @submit="saveComment" class="q-gutter-md">
        <div class="q-py-sm">
          <div class="text-subtitle1">Class Teacher</div>
          <q-card class="my-card bg-grey-2" flat bordered>
            <q-card-section>
              <div>
                <div v-if="report.class_teacher_comment">
                  {{ report.class_teacher_comment }}
                </div>
                <div v-else class="text-grey">No comment</div>
              </div>
              <div>
                <q-input outlined v-model="formData.class_teacher_comment" />
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="q-py-sm">
          <div class="text-subtitle1">Head Teacher</div>
          <q-card class="my-card bg-grey-2" flat bordered>
            <q-card-section>
              <div>
                <div v-if="report.head_teacher_comment">
                  {{ report.head_teacher_comment }}
                </div>
                <div v-else class="text-grey">No comment</div>
              </div>
              <div>
                <q-input outlined v-model="formData.head_teacher_comment" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pt-s" align="right">
          <q-btn color="primary" label="submit" type="submit" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: {},
      levelGroup: null,
      gradingSystems: [],
      gradingSystem: null,
      period: null,
      periodLoaded: null,
      periods: [],
      report: {},
      subjectReports: [],
      teacher: null,
      totalPoints: 0,
      totalAggregates: 0,
      formData: {
        period: null,
        grading_system: null,
      },
      cv: {
        code: false,
        subject: true,
        competency: true,
        assessments: true,
        total: true,
        average: true,
        score: false,
        descriptor: false,
        subjectAverage: true,
        // generalSkills: true,
        // generalRemarks: true,
        aggregates: true,
        grade: true,
        points: true,
        classTeacher: false,
      },
      formData: {
        class_teacher_comment: "",
        head_teacher_comment: "",
        overwrite: true,
        reports: [],
      },
    };
  },
  created() {
    this.getPeriods();
    this.getStudent();
    this.getGradingSystems();
    this.getStudentComputedReport();
    this.getLatestPeriod();
  },
  computed: {
    averageMarks() {
      if (this.subjectReports.length > 0) {
        var total = 0;
        for (let index = 0; index < this.subjectReports.length; index++) {
          const subj = this.subjectReports[index];
          total += subj.average;
        }
        return (total / this.subjectReports.length).toFixed(1);
      }
      return 0;
    },
    bestOf8() {
      var compulsories = this.subjectReports
        .filter((subj) => subj.subject.is_selectable == false)
        .map((subj) => subj.aggregate)
        .sort();
      // .reduce((a, b) => a + b, 0);
      var optionals = this.subjectReports
        .filter((subj) => subj.subject.is_selectable == true)
        .map((subj) => subj.aggregate)
        .sort();

      var best10 = compulsories.concat(optionals.slice(0, 2));

      best10.push(optionals.pop());
      best10.sort();
      var best10;
      return best10.slice(0, 8).reduce((a, b) => a + b, 0);
    },
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
          this.formData.class_teacher_comment =
            this.report.class_teacher_comment;
          this.formData.head_teacher_comment = this.report.head_teacher_comment;
          this.formData.reports.push(this.report.id);
          this.subjectReports = this.computedReport.subject_reports;
          this.seTotalPoints();
          this.$setLoading(this, false);
        });
    },
    getLatestPeriod() {
      this.$api.get(`/periods/latest/`).then((response) => {
        this.period = response.data;
        this.formData.period = this.period.id;
        this.periodLoaded = true;
        // this.getPaperAssessments();
      });
    },

    getPeriods() {
      this.$api.get(`/periods/`).then((response) => {
        this.periods = response.data;
      });
    },

    seTotalPoints() {
      this.totalPoints = 0;
      this.subjectReports.forEach((subj) => {
        this.totalPoints += subj.points;
      });
    },
    getGradingSystems() {
      this.$api.get(`/grading-systems/`).then((response) => {
        this.gradingSystems = response.data;
      });
    },
    saveComment() {
      this.$setLoading(this, true);
      this.$api.put(`/reports/comment/`, this.formData).then((response) => {
        this.report = response.data[0];
        this.$setLoading(this, false);
      });
    },
  },
};
</script>

<style>
</style>
