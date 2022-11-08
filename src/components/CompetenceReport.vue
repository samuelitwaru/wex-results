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
        <tr
          v-for="subjectReport in subjectReports"
          :key="subjectReport.subject.id"
        >
          <td :class="{ 'mini-col': !cv.code }">
            {{ subjectReport.subject.code }}
          </td>
          <td :class="{ 'mini-col': !cv.subject }">
            {{ subjectReport.subject.name }}
          </td>
          <td :class="{ 'mini-col': !cv.scores }">
            {{ subjectReport.scores_string }}
          </td>
          <td :class="{ 'mini-col': !cv.average }">
            {{ subjectReport.activity_average_score }}
          </td>
          <td :class="{ 'mini-col': !cv.identifier }">
            {{ subjectReport.activity_score }}
          </td>
          <td :class="{ 'mini-col': !cv.achievement }">
            {{ subjectReport.activity_score_identifier }}
          </td>
          <td :class="{ 'mini-col': !cv.initials }">
            {{ subjectReport.subject_teacher_initials }}
          </td>
        </tr>
        <tr
          rowspan="8"
          style="height: 4rem; background-color: rgba(0, 0, 0, 0.02)"
        ></tr>
      </tbody>
    </q-markup-table>
    <q-markup-table>
      <tbody>
        <tr>
          <td><strong>Total</strong></td>
          <td>{{ report.total_scores }}</td>
          <td><strong>Average</strong></td>
          <td>{{ report.average_scores }}</td>
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
              <div v-if="report.report.competency_class_teacher_comment">
                {{ report.report.competency_class_teacher_comment }}
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
              <div v-if="report.report.competency_head_teacher_comment">
                {{ report.report.competency_head_teacher_comment }}
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
              <q-input
                outlined
                v-model="formData.competency_class_teacher_comment"
              />
            </div>

            <div class="q-py-sm" v-if="isHeadTeacher">
              <div class="text-subtitle1">Head Teacher</div>
              <q-input
                outlined
                v-model="formData.competency_head_teacher_comment"
              />
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
      cv: {
        code: true,
        subject: true,
        scores: true,
        average: true,
        identifier: true,
        achievement: true,
        initials: true,
      },
      formData: {
        competency_class_teacher_comment:
          this.report?.report?.competency_class_teacher_comment || "",
        competency_head_teacher_comment:
          this.report?.report?.competency_head_teacher_comment || "",
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
  },

  methods: {
    saveComment() {
      this.$setLoading(this, true);
      this.formData.reports = [this.report.report.id];
      this.$api
        .put(`/reports/competency/comment/`, this.formData)
        .then((response) => {
          this.report.report = response.data[0];
          this.$setLoading(this, false);
          this.show = false;
        });
    },
  },
};
</script>

<style></style>
