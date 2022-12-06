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
            <td :class="{ 'mini-col': !cv.scores }" class="text-right">
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
            <td
              :class="{ 'mini-col': !cv.score }"
              v-if="levelGroup?.name == 'O'"
            >
              {{ subjectReport.papers[0]?.score }}
            </td>
            <td
              :class="{ 'mini-col': !cv.descriptor }"
              v-if="levelGroup?.name == 'O'"
            >
              {{ subjectReport.papers[0]?.descriptor }}
            </td>
            <td :class="{ 'mini-col': !cv.total }">
              {{ subjectReport.papers[0]?.total }}
            </td>
            <td :class="{ 'mini-col': !cv.average }">
              {{ subjectReport.papers[0]?.average }}
            </td>
            <td
              v-if="levelGroup?.name == 'A'"
              :class="{ 'mini-col': !cv.aggregate }"
            >
              {{ $wrapAggr(subjectReport.papers[0]?.aggregate) }}
            </td>
            <td
              :class="{ 'mini-col': !cv.subjectAverage }"
              :rowspan="subjectReport.papers.length"
            >
              {{ subjectReport.average }}
            </td>
            <td
              v-if="levelGroup?.name == 'O'"
              :class="{ 'mini-col': !cv.Grade }"
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
              :class="{ 'mini-col': !cv.subjectTeacher }"
              :rowspan="subjectReport.papers.length"
            >
              {{ subjectReport.subject_teacher_initials }}
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
              :class="{ 'mini-col': !cv.scores }"
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
              :class="{ 'mini-col': !cv.score }"
              v-if="levelGroup?.name == 'O'"
            >
              {{ paper.score }}
            </td>
            <td
              :class="{ 'mini-col': !cv.descriptor }"
              v-if="levelGroup?.name == 'O'"
            >
              {{ paper.descriptor }}
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
              v-if="levelGroup?.name == 'A'"
              :class="{ 'mini-col': !cv.aggregate }"
              style="
                border-left: 1px solid rgba(0, 0, 0, 0.12);
                padding-left: 0.45rem;
              "
            >
              {{ $wrapAggr(paper.aggregate) }}
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
          <td :class="{ 'mini-col': !cv.Grade }">
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
              :label="`${report?.points} Point(s)`"
              outline
              dense
              style="margin-left: 4px"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <div v-if="report">
      <div class="q-py-sm">
        <div>
          Class Teacher Comment
          <q-btn
            v-if="isClassTeacher"
            dense
            icon="edit"
            flat
            color="primary"
            @click="show = true"
          />
        </div>
        <q-card class="my-card bg-grey-2" flat bordered>
          <q-card-section>
            <div>
              <div v-if="report.report.class_teacher_comment">
                {{ report.report.class_teacher_comment }}
              </div>
              <div v-else class="text-grey">No comment</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-py-sm">
        <div>
          Head Teacher Comment
          <q-btn
            v-if="isHeadTeacher"
            dense
            icon="edit"
            flat
            color="primary"
            @click="show = true"
          />
        </div>
        <q-card class="my-card bg-grey-2" flat bordered>
          <q-card-section>
            <div>
              <div v-if="report.report.head_teacher_comment">
                {{ report.report.head_teacher_comment }}
              </div>
              <div v-else class="text-grey">No comment</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="show">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Comment</div>
        </q-card-section>
        <q-card-section>
          <q-form
            v-if="report && (isHeadTeacher || isClassTeacher)"
            @submit="saveComment"
          >
            <div class="q-py-sm" v-if="isClassTeacher">
              <div class="text-subtitle1">Class Teacher</div>
              <q-input outlined v-model="formData.class_teacher_comment" />
            </div>

            <div class="q-py-sm" v-if="isHeadTeacher">
              <div class="text-subtitle1">Head Teacher</div>
              <q-input outlined v-model="formData.head_teacher_comment" />
            </div>
            <div class="flex justify-between">
              <div>
                <q-btn flat color="primary" label="Cancel" v-close-popup />
              </div>
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["subjectReports", "report", "levelGroup", "teacher"],
  data() {
    return {
      show: false,
      columns: {
        code: false,
        subject: true,
        paper: true,
        scores: true,
        score: false,
        descriptor: false,
        total: true,
        average: true,
        aggregate: true,
        subjectAverage: false,
        Grade: true,
        grade: true,
        points: true,
        subjectTeacher: true,
      },
      formData: {
        class_teacher_comment: this.report?.report?.class_teacher_comment || "",
        head_teacher_comment: this.report?.report?.head_teacher_comment || "",
        overwrite: true,
        reports: [],
      },
    };
  },
  computed: {
    isClassTeacher() {
      const userTeacherId = this.$getState("user")?.teacher_id;
      const classTeacherId =
        this.report.report?.student?.class_room_detail?.teacher;
      return userTeacherId == classTeacherId;
    },
    isHeadTeacher() {
      return this.$userHasGroup("head_teacher");
    },
    cv() {
      if (this.levelGroup?.name == "O") {
        delete this.columns["grade"];
        delete this.columns["points"];
        delete this.columns["aggregate"];
      } else if (this.levelGroup?.name == "A") {
        delete this.columns["score"];
        delete this.columns["descriptor"];
        delete this.columns["Grade"];
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
  },
  methods: {
    saveComment() {
      this.$setLoading(this, true);
      this.formData.reports = [this.report.report.id];
      this.$api.put(`/reports/comment/`, this.formData).then((response) => {
        this.report.report = response.data[0];
        this.$setLoading(this, false);
        this.show = false;
      });
    },
  },
};
</script>

<style></style>
