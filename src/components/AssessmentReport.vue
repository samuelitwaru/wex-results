<template>
  <div>
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
            <td :class="{ 'mini-col': !cv.paper }">
              {{ subjectReport.papers[0]?.paper?.description }}
            </td>
            <td :class="{ 'mini-col': !cv.assessments }" class="text-right">
              <q-btn
                v-for="score in subjectReport.papers[0]?.scores"
                :key="score"
                class="q-py-none"
                :label="score"
                outline
                dense
                style="margin-left: 4px"
              />
            </td>
            <td :class="{ 'mini-col': !cv.total }">
              {{ subjectReport.papers[0]?.total }}
            </td>
            <td :class="{ 'mini-col': !cv.average }">
              {{ subjectReport.papers[0]?.average }}
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
              v-if="levelGroup?.name == 'A'"
              :class="{ 'mini-col': !cv.grade }"
              :rowspan="subjectReport.papers.length"
            >
              {{ subjectReport.letter_grade }}
            </td>
            <td
              v-if="levelGroup?.name == 'A'"
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
              :class="{ 'mini-col': !cv.paper }"
              style="
                border-left: 1px solid rgba(0, 0, 0, 0.12);
                padding-left: 0.45rem;
              "
            >
              {{ paper.paper.description }}
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
          </tr>
        </template>
        <tr style="height: 5rem">
          <td colspan="6"></td>
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
              :label="`${report?.aggregates} Aggregate(s)`"
              outline
              dense
              style="margin-left: 4px"
            />
          </td>
          <td></td>
          <td
            v-if="levelGroup?.name == 'A'"
            :class="{ 'mini-col': !cv.points }"
          >
            <q-btn
              class="q-py-none"
              :label="`${report.points} Point(s)`"
              outline
              dense
              style="margin-left: 4px"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <q-form @submit="saveComment" class="q-gutter-md" v-if="report">
      <div class="q-py-sm">
        <div class="text-subtitle1">Class Teacher</div>
        <q-input outlined v-model="formData.class_teacher_comment" />
        <!-- <q-card class="my-card bg-grey-2" flat bordered>
          <q-card-section>
            <div>
              <div v-if="report.report.class_teacher_comment">
                {{ report.report.class_teacher_comment }}
              </div>
              <div v-else class="text-grey">No comment</div>
            </div>
          </q-card-section>
        </q-card> -->
      </div>

      <div class="q-py-sm">
        <div class="text-subtitle1">Head Teacher</div>
        <q-input outlined v-model="formData.head_teacher_comment" />
        <!-- <q-card class="my-card bg-grey-2" flat bordered>
          <q-card-section>
            <div>
              <div v-if="report.report.head_teacher_comment">
                {{ report.report.head_teacher_comment }}
              </div>
              <div v-else class="text-grey">No comment</div>
            </div>
          </q-card-section>
        </q-card> -->
      </div>
      <div class="q-pt-s" align="right">
        <q-btn color="primary" label="submit" type="submit" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  props: ["subjectReports", "report", "levelGroup", "teacher"],
  data() {
    return {
      columns: {
        code: false,
        subject: true,
        paper: true,
        assessments: true,
        total: true,
        average: true,
        subjectAverage: true,
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
  computed: {
    cv() {
      if (this.levelGroup?.name == "O") {
        delete this.columns["grade"];
        delete this.columns["points"];
      }
      return this.columns;
    },
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
  watch: {
    report(newValue, oldValue) {
      this.formData.class_teacher_comment =
        newValue.report.class_teacher_comment;
      this.formData.head_teacher_comment = newValue.report.head_teacher_comment;
      this.formData.reports = [newValue.report.id];
    },
  },
  methods: {
    saveComment() {
      this.$setLoading(this, true);
      console.log(this.formData);
      this.$api.put(`/reports/comment/`, this.formData).then((response) => {
        this.report.report = response.data[0];
        this.$setLoading(this, false);
      });
    },
  },
};
</script>

<style>
</style>
