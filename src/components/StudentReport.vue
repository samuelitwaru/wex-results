<template>
  <div>
    <h6 class="q-my-sm q-px-sm flex justify-between">
      Student Report
      <router-link :to="`/students/${$route.params.id}`">
        <q-btn color="primary" label="Student Info" no-caps flat dense />
      </router-link>
    </h6>
    <div class="q-pa-sm">
      <div class="q-pb-sm">
        <q-select
          outlined
          v-model="gradingSystem"
          option-label="name"
          option-value="id"
          :options="gradingSystems"
          label="Grading System"
          emit-value
          map-options
        />
      </div>

      <div class="flex">
        <span class="q-pa-sm" v-for="k in Object.keys(cv)" :key="k">
          <input type="checkbox" v-model="cv[k]" /> {{ $camelToNormal(k) }}
        </span>
      </div>

      <q-markup-table flat bordered separator="cell" square dense>
        <thead>
          <tr>
            <th class="text-left" v-if="cv.code">CODE</th>
            <th class="text-left" v-if="cv.subject">SUBJECT</th>
            <th class="text-left" v-if="cv.competency">COMPETENCY</th>
            <th class="text-left" v-if="cv.assessments">ASSESSMENTS</th>
            <th class="text-right" v-if="cv.total">TOTAL</th>
            <th class="text-right" v-if="cv.average">AVERAGE</th>
            <th class="text-right" v-if="cv.score">SCORE</th>
            <th class="text-right" v-if="cv.descriptor">DESCRIPTOR</th>
            <th class="text-right" v-if="cv.generalSkills">GENERAL SKILLS</th>
            <th class="text-right" v-if="cv.generalRemarks">GENERAL REMARKS</th>
            <th class="text-right" v-if="cv.aggregates">AGGREGATES</th>
            <th class="text-right" v-if="cv.points">POINTS</th>
            <th class="text-right" v-if="cv.classTeacher">CLASS TEACHER</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="subject in level.subjects" :key="subject.id">
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
                <td
                  :rowspan="subject.papers.length"
                  v-if="cv.classTeacher"
                ></td>
                <td :rowspan="subject.papers.length" v-if="cv.aggregates"></td>
                <td :rowspan="subject.papers.length" v-if="cv.points"></td>
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
          <tr v-if="!papers.length">
            <td colspan="6">
              <p class="q-pa-md q-my-auto" align="center">No papers to show</p>
            </td>
          </tr>
          <tr v-if="papers.length">
            <td><strong>TOTAL</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: {},
      level: {},
      papers: [],
      subjects: [],
      gradingSystems: [],
      gradingSystem: null,
      cv: {
        code: true,
        subject: true,
        competency: true,
        assessments: true,
        total: true,
        average: true,
        score: true,
        descriptor: true,
        generalSkills: true,
        generalRemarks: true,
        aggregates: true,
        points: true,
        classTeacher: true,
      },
    };
  },
  created() {
    this.getStudent();
    this.getGradingSystems();
  },
  methods: {
    getStudent() {
      this.$api.get(`/students/${this.$route.params.id}/`).then((response) => {
        this.student = response.data;
        this.$emit("updateStudent", response.data);
        this.getLevel();
      });
    },
    getLevel() {
      if (this.student.class_room_detail) {
        this.$api
          .get(`/levels/${this.student.class_room_detail.level}/`)
          .then((response) => {
            this.level = response.data;
            this.papers = this.level.papers;
            // this.subjects = Object.entries(
            //   this.$groupBy(this.papers, "subject_name")
            // );
            this.getPaperAssessments();
          });
      }
    },
    getGradingSystems() {
      this.$api.get(`/grading-systems/`).then((response) => {
        this.gradingSystems = response.data;
      });
    },
    getPaperAssessments() {
      this.level.subjects.forEach((subject) => {
        subject.papers.forEach((paper) => {
          this.$api
            .get(
              `/assessments/?paper=${paper.id}&class_room=${this.student.class_room}`
            )
            .then((response) => {
              paper.assessments = response.data.map((assessment) => {
                assessment.active = true;
                var filtered = assessment.scores.filter(
                  (score) => score.student == this.$route.params.id
                );
                if (filtered.length) {
                  assessment.score = filtered[0];
                  assessment.mark = assessment.score.mark;
                  assessment.markLabel = assessment.score.mark;
                } else {
                  assessment.score = null;
                  assessment.mark = 0;
                  assessment.markLabel = "--";
                }
                return assessment;
              });
            });
        });
      });
    },

    getTotal(assessments) {
      if (assessments) {
        var total = 0;
        for (let i = 0; i < assessments.length; i++) {
          const assessment = assessments[i];
          if (assessment.active) {
            total += parseInt(assessment.mark);
          }
        }
        return total;
      }
    },

    getAverage(assessments) {
      if (assessments) {
        var total = 0;
        var count = 0;
        for (let i = 0; i < assessments.length; i++) {
          const assessment = assessments[i];
          if (assessment.active) {
            count += 1;
            total += parseInt(assessment.mark);
          }
        }
        return Math.round(total / count || 0);
      }
    },

    getScore(assessments) {
      var avg = this.getAverage(assessments);
      return ((avg / 100) * 3).toFixed(1);
    },
    getDescriptor(assessments) {
      var score = this.getScore(assessments);
      if (score >= 0.9 && score <= 1.49) {
        return "Basic";
      } else if (score >= 1.5 && score <= 2.49) {
        return "Moderate";
      } else if (score >= 2.5 && score <= 3) {
        return "Outstanding";
      }
    },
  },
};
</script>

<style>
</style>
