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
          <td :class="{ 'mini-col': !cv.totalScores }">
            {{ subjectReport.activity_total_scores }}
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
          style="height: 5rem; background-color: rgba(0, 0, 0, 0.02)"
        ></tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  props: ["subjectReports", "report", "levelGroup", "teacher"],
  data() {
    return {
      cv: {
        code: true,
        subject: true,
        totalScores: true,
        average: true,
        identifier: true,
        achievement: true,
        initials: true,
      },
    };
  },
};
</script>

<style></style>
