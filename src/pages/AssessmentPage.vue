<template>
  <q-page v-if="assessment">
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ assessment.subject_detail.name }} Assessment
          </div>
          <div>{{ assessment.teacher_detail.name }}</div>
          <div>{{ assessment.date }}</div>
          <div>
            {{ assessment.class_room_detail.name }}
            {{ assessment.class_room_detail.stream }}
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          dense
          @click="deleteAssessment(assessment.id)"
        />
      </q-card-actions>

      <q-separator />
    </q-card>

    <router-view
      :assessment="assessment"
      @updateAssessment="assessment = $event"
    ></router-view>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { ConfirmDialog },
  data() {
    return {
      assessment: null,
      // teachers: [],
      // levels: [],
      // subjects: [],
      // formData: {
      //   date: null,
      //   teacher: null,
      //   level: null,
      //   term: null,
      //   subject: null,
      // },
    };
  },
  created() {
    this.getAssessment();
    // this.getTeachers();
    // this.getLevels();
    // this.getSubjects();
  },
  methods: {
    getAssessment() {
      this.$api
        .get(`/assessments/${this.$route.params.id}/`)
        .then((response) => {
          this.assessment = response.data;
          // this.formData.date = this.assessment.date;
          // this.formData.level = this.assessment.level;
          // this.formData.subject = this.assessment.subject;
          // this.formData.teacher = this.assessment.teacher;
          // this.formData.term = this.assessment.term;
        });
    },

    // updateAssessment() {
    //   console.log(this.formData);
    //   this.$api
    //     .put(`/assessments/${this.assessment.id}/`, this.formData)
    //     .then((response) => {
    //       this.assessment = response.data;
    //       console.log(response.data);
    //     });
    // },

    deleteAssessment(id) {
      this.$refs.confirmDialog
        .show({
          title: "Hello",
          message: `Are you sure you want to delete the assessment "${id}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api.delete(`/assessments/${id}/`).then((response) => {
              if (response.status == 204) {
                this.$router.push("/assessments");
              }
            });
          }
        });
    },

    // getTeachers() {
    //   this.$api.get(`/teachers/`).then((response) => {
    //     this.teachers = response.data;
    //   });
    // },

    // getSubjects() {
    //   this.$api.get(`/subjects/`).then((response) => {
    //     this.subjects = response.data;
    //   });
    // },

    // getLevels() {
    //   this.$api.get(`/levels/`).then((response) => {
    //     this.levels = response.data;
    //   });
    // },
  },
};
</script>

<style>
</style>
