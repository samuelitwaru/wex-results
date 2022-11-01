<template>
  <div v-if="isClassTeacher || $userHasGroup('head_teacher')">
    <q-btn
      color="primary"
      outline
      label="Bulk Commenting"
      @click="show = true"
    />
    <q-dialog v-model="show" persistent>
      <q-card>
        <q-card-section class="items-center">
          <div>
            <div>Report Type</div>
            <q-radio
              v-model="formData.report_type"
              val="assessment"
              label="Assessment"
            />
            <q-radio
              v-if="levelGroupName == 'O'"
              v-model="formData.report_type"
              val="activity"
              label="Activity"
            />
          </div>
          <div>
            <BulkTermlyReportCommenting
              ref="bulkTermlyReportCommenting"
              :levelGroupName="levelGroupName"
              v-if="formData.report_type == 'assessment'"
              @get-reports="getReports"
            />
            <BulkCompetencyReportCommenting
              ref="bulkCompetencyReportCommenting"
              :classRoom="classRoom"
              v-if="formData.report_type == 'activity'"
              @get-reports="getReports"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Submit" color="primary" @click="saveComment" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import BulkTermlyReportCommenting from "./BulkTermlyReportCommenting.vue";
import BulkCompetencyReportCommenting from "./BulkCompetencyReportCommenting.vue";
export default {
  data() {
    return {
      show: false,
      classRoom: null,
      levelGroupName: null,
      formData: {
        report_type: "assessment",
      },
    };
  },
  created() {
    this.getClassRoom();
  },
  computed: {
    isClassTeacher() {
      const currentTeacher = this.$getState("user")?.teacher_id;
      const classTeacher = this.classRoom?.teacher;
      return currentTeacher == classTeacher;
    },
  },
  methods: {
    getClassRoom() {
      this.$api
        .get(`/class-rooms/${this.$route.params.id}/`)
        .then((response) => {
          if (response) {
            this.classRoom = response.data;
            this.levelGroupName = this.classRoom.level_detail.level_group_name;
          }
        });
    },
    saveComment() {
      if (this.formData.report_type == "assessment") {
        this.$refs.bulkTermlyReportCommenting.saveComment();
      } else {
        this.$refs.bulkCompetencyReportCommenting.saveComment();
      }
    },
    getReports() {
      this.$emit("get-reports");
    },
  },
  components: { BulkTermlyReportCommenting, BulkCompetencyReportCommenting },
};
</script>
<style></style>
