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
              :rowspan="subjectReport.activities.length || 1"
            >
              {{ subjectReport.subject.code }}
            </td>
            <td
              :class="{ 'mini-col': !cv.subject }"
              :rowspan="subjectReport.activities.length || 1"
            >
              {{ subjectReport.subject.name }}
            </td>
            <td :class="{ 'mini-col': !cv.competency }">
              <span v-if="subjectReport.activities.length">1.</span>
              {{ subjectReport.activities[0]?.activity?.name }}
            </td>
            <td :class="{ 'mini-col': !cv.mark }">
              {{ subjectReport.activities[0]?.mark }}
            </td>
            <td :class="{ 'mini-col': !cv.score }">
              {{ subjectReport.activities[0]?.score }}
            </td>
            <td :class="{ 'mini-col': !cv.descriptor }">
              {{ subjectReport.activities[0]?.descriptor }}
            </td>
            <td
              :rowspan="subjectReport.activities.length || 1"
              :class="{ 'mini-col': !cv.skills }"
            ></td>
            <td
              :rowspan="subjectReport.activities.length || 1"
              :class="{ 'mini-col': !cv.remarks }"
            ></td>
            <td
              :rowspan="subjectReport.activities.length || 1"
              :class="{ 'mini-col': !cv.subjectTeacher }"
            >
              {{ subjectReport.subject_teacher_initials }}
            </td>
          </tr>
          <tr
            v-for="(activity, index) in subjectReport.activities.slice(1)"
            :key="activity.activity.id"
          >
            <td
              :class="{ 'mini-col': !cv.competency }"
              style="
                border-left: 1px solid rgba(0, 0, 0, 0.12);
                padding-left: 0.45rem;
              "
            >
              {{ index + 2 }}. {{ activity?.activity?.name }}
            </td>
            <td :class="{ 'mini-col': !cv.mark }">
              {{ activity?.mark }}
            </td>
            <td :class="{ 'mini-col': !cv.score }">
              {{ activity?.score }}
            </td>
            <td :class="{ 'mini-col': !cv.descriptor }">
              {{ activity?.descriptor }}
            </td>
          </tr>
        </template>
        <tr
          rowspan="8"
          style="height: 5rem; background-color: rgba(0, 0, 0, 0.02"
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
        competency: true,
        mark: true,
        score: true,
        descriptor: true,
        skills: true,
        skills: true,
        remarks: true,
        subjectTeacher: true,
      },
    };
  },
};
</script>

<style></style>
