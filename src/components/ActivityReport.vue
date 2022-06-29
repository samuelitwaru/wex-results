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
            <td :class="{ 'mini-col': !cv.score }">
              {{ subjectReport.activities[0]?.mark }}
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
            ></td>
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
            <td :class="{ 'mini-col': !cv.score }">
              {{ activity?.mark }}
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
        score: true,
        descriptor: true,
        skills: true,
        skills: true,
        remarks: true,
        subjectTeacher: true,
      },
    };
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
};
</script>

<style>
</style>
