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
      <tbody></tbody>
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
        classTeacher: true,
        classTeacher: true,
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
