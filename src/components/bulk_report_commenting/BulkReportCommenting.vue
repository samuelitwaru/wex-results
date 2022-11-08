<template>
  <div v-if="isClassTeacher || $userHasGroup('head_teacher')">
    <q-btn
      color="primary"
      outline
      label="Bulk Commenting"
      @click="show = true"
    />
    <q-dialog v-model="show">
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
              :levelGroupName="levelGroupName"
              :classRoom="classRoom"
              v-if="formData.report_type == 'assessment'"
              @refreshReports="$emit(`refreshReports`)"
            />
            <BulkCompetencyReportCommenting
              :classRoom="classRoom"
              v-if="formData.report_type == 'activity'"
              @refreshReports="$emit(`refreshReports`)"
            />
          </div>
        </q-card-section>
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
  },
  components: { BulkTermlyReportCommenting, BulkCompetencyReportCommenting },
};
</script>
<style></style>
