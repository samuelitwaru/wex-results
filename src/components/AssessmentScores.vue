<template>
  <div class="q-px-sm">
    <h6 class="q-my-sm flex justify-between">
      Scores
      <router-link :to="`/assessments/${$route.params.id}`">
        <q-btn color="primary" label="Detials" no-caps flat dense />
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
              <input
                type="number"
                min="0"
                max="100"
                :name="student.id"
                :value="student.score.mark"
                :onchange="createOrUpdateOrDeleteStudentScore"
                :onfocus="
                  (event) => {
                    event.target.select();
                  }
                "
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
          this.getStudents();
        });
    },

    createOrUpdateOrDeleteStudentScore(event) {
      var formData = {
        mark: parseInt(event.target.value),
        assessment: this.assessment.id,
        student: parseInt(event.target.name),
      };
      var currentScore = this.getStudentScore(formData.student);
      if (currentScore.mark) {
        if (isNaN(formData.mark)) {
          this.removeStudentScore(formData.student);
          this.$api.delete(`/scores/${currentScore.id}/`).then((response) => {
            console.log(response.data);
          });
        } else {
          this.$api
            .put(`/scores/${currentScore.id}/`, formData)
            .then((response) => {
              console.log(response.data);
            });
        }
      } else {
        this.$api.post(`/scores/`, formData).then((response) => {
          this.scores.push(response.data);
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
      var index = this.scores.findIndex((score) => score.student == studentId);
      if (index >= 0) {
        return this.scores[index];
      }
      return { mark: null };
    },
    removeStudentScore(studentId) {
      this.scores = this.scores.filter((score) => score.student != studentId);
    },
  },
};
</script>

<style>
</style>
