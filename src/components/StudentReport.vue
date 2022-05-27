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
      <q-markup-table flat bordered separator="cell" square dense>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">ASSESSMENTS</th>
            <th class="text-left" colspan="4"></th>
          </tr>
          <tr>
            <th class="text-left">SUBJECTS</th>
            <th class="text-left">SCORES</th>
            <th class="text-right">Total</th>
            <th class="text-right">AVERAGE</th>
            <th class="text-right">AGGREGATES</th>
            <th class="text-right">POINTS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in level.subjects" :key="subject.id">
            <td class="text-left">{{ subject.name }}</td>
            <td class="text-right">
              <table>
                <tbody>
                  <tr
                    class="q-pa-none"
                    v-for="paper in subject.papers"
                    :key="paper.id"
                  >
                    <td>P{{ paper.number }}</td>
                    <td>
                      <q-btn
                        v-for="assessment in paper.assessments"
                        :key="assessment.id"
                        class="q-px-sm"
                        :label="assessment.markLabel"
                        outline
                        style="margin-left: 4px"
                        :class="{
                          active: assessment.active,
                          inactive: !assessment.active,
                        }"
                        @click="assessment.active = !assessment.active"
                      />
                    </td>
                    <!-- <td>
                      {{ getTotal(paper.assessments) }}
                    </td>
                    <td>
                      {{ getAverage(paper.assessments) }}
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="text-right">
              <table>
                <tbody>
                  <tr
                    class="q-pa-none"
                    v-for="paper in subject.papers"
                    :key="paper.id"
                  >
                    <td>
                      {{ getTotal(paper.assessments) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- {{ getTotal(paper.assessments) }} -->
            </td>
            <td class="text-right">
              <table>
                <tbody>
                  <tr
                    class="q-pa-none"
                    v-for="paper in subject.papers"
                    :key="paper.id"
                  >
                    <td>
                      {{ getAverage(paper.assessments) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- {{ getAverage(paper.assessments) }} -->
            </td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
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
        <!-- <tbody>
          <tr v-for="paper in papers" :key="paper.id">
            <td class="text-left">{{ paper.subject_name }}</td>
            <td class="text-right">
              <q-btn
                v-for="assessment in paper.assessments"
                :key="assessment.id"
                class="q-px-sm"
                :label="assessment.markLabel"
                outline
                style="margin-left: 4px"
                :class="{
                  active: assessment.active,
                  inactive: !assessment.active,
                }"
                @click="assessment.active = !assessment.active"
              />
            </td>
            <td class="text-right">
              {{ getTotal(paper.assessments) }}
            </td>
            <td class="text-right">
              {{ getAverage(paper.assessments) }}
            </td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
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
        </tbody> -->
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
        return total / count || 0;
      }
    },
  },
};
</script>

<style>
</style>
