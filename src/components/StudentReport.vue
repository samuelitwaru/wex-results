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

      <div>
        Period: <span v-if="period">{{ period.name }}</span>
      </div>

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
            <input type="checkbox" v-model="cv[k]" /> {{ $camelToNormal(k) }}
          </th>
        </thead>
        <tbody>
          <template
            v-for="subjectReport in report"
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
              <td :class="{ 'mini-col': !cv.asessments }" class="text-right">
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
              <!-- <td :rowspan="subjectReport.papers.length"></td> -->
              <td
                :class="{ 'mini-col': !cv.subjectAverage }"
                :rowspan="subjectReport.papers.length"
              >
                {{ subjectReport.average }}
              </td>
              <td
                :class="{ 'mini-col': !cv.aggregate }"
                :rowspan="subjectReport.papers.length"
              >
                {{ $wrapAggr(subjectReport.aggregate) }}
              </td>
              <td
                :class="{ 'mini-col': !cv.points }"
                :rowspan="subjectReport.papers.length"
              >
                {{ subjectReport.points }}
              </td>
              <td
                :class="{ 'mini-col': !cv.letter_grade }"
                :rowspan="subjectReport.papers.length"
              >
                {{ subjectReport.letter_grade }}
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
        </tbody>
        <!-- <tbody>
          <template v-for="subject in report" :key="subject.id">
            <tr>
              <td
                class="text-left"
                :rowspan="subject.papers.length"
                v-if="cv.code"
              >
                {{ subject.code }}
              </td>
              <td
                class="text-left"
                :rowspan="subject.papers.length"
                v-if="cv.subject"
              >
                {{ subject.name }}
              </td>
              <template v-if="subject.papers.length">
                <td v-if="cv.competency">
                  P{{ subject.papers[0].number }} -
                  {{ subject.papers[0].description }}
                </td>
                <td v-if="cv.assessments">
                  <q-btn
                    v-for="assessment in subject.papers[0].assessments"
                    :key="assessment.id"
                    class="q-py-none"
                    :label="assessment.markLabel"
                    outline
                    dense
                    style="margin-left: 4px"
                    :class="{
                      active: assessment.active,
                      inactive: !assessment.active,
                    }"
                    @click="assessment.active = !assessment.active"
                  />
                </td>
                <td v-if="cv.total">
                  {{ getTotal(subject.papers[0].assessments) }}
                </td>
                <td v-if="cv.average">
                  {{ getAverage(subject.papers[0].assessments) }}
                </td>
                <td v-if="cv.score">
                  {{ getScore(subject.papers[0].assessments) }}
                </td>
                <td v-if="cv.descriptor">
                  {{ getDescriptor(subject.papers[0].assessments) }}
                </td>
                <td
                  :rowspan="subject.papers.length"
                  v-if="cv.generalSkills"
                ></td>
                <td
                  :rowspan="subject.papers.length"
                  v-if="cv.generalRemarks"
                ></td>
                <td :rowspan="subject.papers.length" v-if="cv.aggregates">
                  {{ getAggregate(subject.papers) }}
                </td>
                <td :rowspan="subject.papers.length" v-if="cv.points"></td>
                <td
                  :rowspan="subject.papers.length"
                  v-if="cv.classTeacher"
                ></td>
              </template>
            </tr>
            <tr v-for="paper in subject.papers.slice(1)" :key="paper.id">
              <td
                v-if="cv.competency"
                style="
                  border-left: 1px solid rgba(0, 0, 0, 0.12);
                  padding-left: 0.45rem;
                "
              >
                P{{ paper.number }} - {{ paper.description }}
              </td>
              <td v-if="cv.assessments">
                <q-btn
                  v-for="assessment in paper.assessments"
                  :key="assessment.id"
                  class="q-py-none"
                  :label="assessment.markLabel"
                  outline
                  dense
                  style="margin-left: 4px"
                  :class="{
                    active: assessment.active,
                    inactive: !assessment.active,
                  }"
                  @click="assessment.active = !assessment.active"
                />
              </td>
              <td v-if="cv.total">
                {{ getTotal(paper.assessments) }}
              </td>
              <td v-if="cv.average">
                {{ getAverage(paper.assessments) }}
              </td>
              <td v-if="cv.score">
                {{ getScore(paper.assessments) }}
              </td>
              <td v-if="cv.descriptor">
                {{ getDescriptor(paper.assessments) }}
              </td>
            </tr>
          </template>
          <tr v-if="papers.length">
            <td><strong>TOTAL</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody> -->
      </q-markup-table>

      <div class="flex">
        <span class="q-pa-sm" v-for="k in Object.keys(cv)" :key="k">
          <input type="checkbox" :id="`check${k}`" v-model="cv[k]" />
          <label :for="`check${k}`">{{ $camelToNormal(k) }}</label>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: {},
      gradingSystems: [],
      gradingSystem: null,
      period: null,
      periodLoaded: null,
      periods: [],
      report: null,
      teacher: null,
      formData: {
        period: null,
        grading_system: null,
      },
      cv: {
        code: true,
        subject: true,
        competency: true,
        assessments: true,
        total: true,
        average: true,
        score: true,
        descriptor: true,
        subjectAverage: true,
        // generalSkills: true,
        // generalRemarks: true,
        aggregates: true,
        points: true,
        grade: true,
        classTeacher: true,
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
  methods: {
    getStudent() {
      this.$api.get(`/students/${this.$route.params.id}/`).then((response) => {
        this.student = response.data;
        this.subjects = this.student.subjects;
        this.$emit("updateStudent", response.data);
        this.teacher = this.student.class_room_detail.teacher_detail;
      });
    },
    getStudentComputedReport() {
      this.$setLoading(this, true);
      var urlQuery = this.$buildURLQuery(this.formData);
      console.log(urlQuery);
      console.log(this.formData);
      this.$api
        .get(`/reports/computed/${this.$route.params.id}/?${urlQuery}`)
        .then((response) => {
          this.report = response.data;
          this.$setLoading(this, false);
        });
    },
    // getLevel() {
    //   this.level = this.student.class_room_detail.level_detail;
    //   var levelGroupId = this.level.level_group;
    //   this.$api
    //     .get(`/subjects/?level_group=${levelGroupId}&is_selectable=0`)
    //     .then((response) => {
    //       this.subjects = response.data.concat(this.subjects);
    //       this.getLatestPeriod();
    //     });
    // },
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
    // getPaperAssessments() {
    //   this.subjects.forEach((subject) => {
    //     subject.scores = [];
    //     subject.papers.forEach((paper) => {
    //       this.$api
    //         .get(
    //           `/assessments/?paper=${paper.id}&class_room=${this.student.class_room}&period=${this.period.id}`
    //         )
    //         .then((response) => {
    //           paper.assessments = response.data.map((assessment) => {
    //             assessment.active = true;
    //             // get student score from assessment scores
    //             var studentScore = assessment.scores.find(
    //               (score) => score.student == this.$route.params.id
    //             );
    //             if (studentScore) {
    //               assessment.score = studentScore;
    //               assessment.mark = assessment.score.mark;
    //               assessment.markLabel = assessment.score.mark;
    //             } else {
    //               assessment.score = null;
    //               assessment.mark = 0;
    //               assessment.markLabel = "--";
    //             }
    //             return assessment;
    //           });
    //           paper.assessmentTotal = 0;
    //           paper.assessmentAverage = 0;
    //           paper.assessmentScore = 0;
    //           paper.assessmentDescriptor = "";
    //         });
    //     });
    //   });
    // },
    getGradingSystems() {
      this.$api.get(`/grading-systems/`).then((response) => {
        this.gradingSystems = response.data;
      });
    },

    // getTotal(assessments) {
    //   if (assessments) {
    //     var total = 0;
    //     for (let i = 0; i < assessments.length; i++) {
    //       const assessment = assessments[i];
    //       if (assessment.active) {
    //         total += parseInt(assessment.mark);
    //       }
    //     }
    //     return total;
    //   }
    // },

    // getAverage(assessments) {
    //   if (assessments) {
    //     var total = 0;
    //     var count = 0;
    //     for (let i = 0; i < assessments.length; i++) {
    //       const assessment = assessments[i];
    //       if (assessment.active) {
    //         count += 1;
    //         total += parseInt(assessment.mark);
    //       }
    //     }
    //     return Math.round(total / count || 0);
    //   }
    // },

    // getScore(assessments) {
    //   var avg = this.getAverage(assessments);
    //   return ((avg / 100) * 3).toFixed(1);
    // },
    // getDescriptor(assessments) {
    //   var score = this.getScore(assessments);
    //   if (score >= 0.9 && score <= 1.49) {
    //     return "Basic";
    //   } else if (score >= 1.5 && score <= 2.49) {
    //     return "Moderate";
    //   } else if (score >= 2.5 && score <= 3) {
    //     return "Outstanding";
    //   }
    // },
    // getAggregate(papers) {
    //   return papers;
    // },
    // getGrade(markList) {
    //   count = markList.length;
    //   if (count == 2) {
    //   }
    // },
  },
};
</script>

<style>
</style>
