<template>
  <div class="q-pa-sm">
    <h6 class="q-my-sm q-px-sm flex justify-between">
      Student Report
      <router-link :to="`/students/${$route.params.id}`">
        <q-btn color="primary" label="Student Info" no-caps flat dense />
      </router-link>
    </h6>

    <q-markup-table flat bordered separator="cell" square>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">MARKS</th>
          <th class="text-left" colspan="4"></th>
        </tr>
        <tr>
          <th class="text-left">SUBJECTS</th>
          <th class="text-right"></th>
          <th class="text-right">Total</th>
          <th class="text-right">AVERAGE</th>
          <th class="text-right">AGGREGATES</th>
          <th class="text-right">POINTS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subject in subjects" :key="subject.id">
          <td class="text-left">{{ subject.name }}</td>
          <td class="text-right"></td>
          <td class="text-right"></td>
          <td class="text-right"></td>
          <td class="text-right"></td>
          <td class="text-right"></td>
        </tr>
        <tr v-if="!subjects.length">
          <td colspan="6">
            <p class="q-pa-md q-my-auto" align="center">No subjects to show</p>
          </td>
        </tr>
        <tr v-if="subjects.length">
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
</template>

<script>
export default {
  data() {
    return {
      student: {},
      level: {},
      subjects: [],
    };
  },
  created() {
    this.getStudent();
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
            this.subjects = this.level.subjects;
          });
      }
    },
  },
};
</script>

<style>
</style>
