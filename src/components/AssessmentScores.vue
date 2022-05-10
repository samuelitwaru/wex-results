<template>
  <div class="q-px-sm">
    <h6 class="q-my-sm flex justify-between">
      Scores
      <router-link :to="`/assessments/${$route.params.id}`">
        <q-btn color="primary" label="Detials" no-caps flat />
      </router-link>
    </h6>
    <div bordered>
      <q-markup-table flat bordered>
        <thead>
          <tr>
            <th class="text-left">Student</th>
            <th class="text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td class="text-left">
              {{ student.first_name }} {{ student.last_name }}
              {{ student.middle_name }}
            </td>
            <td class="text-right">
              <!-- {{ student }} -->
              <input
                type="number"
                min="0"
                max="100"
                :name="student.id"
                :value="student.score.mark"
                :onchange="createOrUpdateStudentScore"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["assessment"],
  emits: ["updateAssessment"],
  data() {
    return {
      scores: [],
      students: [],
    };
  },
  created() {
    this.getAssessmentScores();
  },
  methods: {
    getAssessmentScores() {
      this.$api
        .get(`/scores/?assessment=${this.$route.params.id}`)
        .then((response) => {
          this.scores = response.data;
          console.log(this.scores);
          this.getStudents();
        });
    },

    createOrUpdateStudentScore(event) {
      console.log(event.target.value);
      console.log(event.target.name);
      var formData = {
        mark: parseInt(event.target.value),
        assessment: this.assessment.id,
        student: parseInt(event.target.name),
      };
      console.log(formData);
      var currentScore = this.getStudentScore(formData.student);
      console.log(Boolean(currentScore.mark));
      if (currentScore.mark) {
        this.$api
          .put(`/scores/${currentScore.id}/`, formData)
          .then((response) => {
            console.log(response.data);
          });
      } else {
        this.$api.post(`/scores/`, formData).then((response) => {
          console.log(response.data);
        });
      }
    },

    getStudents() {
      this.$api
        .get(`/students/?class_room=${this.assessment.class_room}`)
        .then((response) => {
          this.students = response.data;
          this.students = this.students.map((student) => {
            student.score = this.getStudentScore(student.id);
            return student;
          });
          console.log(this.students);
        });
    },

    getStudentScore(studentId) {
      var scoreList = this.scores.filter((score) => studentId == score.student);
      if (scoreList.length) {
        return scoreList[0];
      }
      return { mark: null };
    },
  },
};
</script>

<style>
</style>
