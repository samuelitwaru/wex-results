<template>
  <div>
    <q-btn color="primary" flat dense icon="download" @click="show = true" />
    <q-dialog v-model="show">
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6 q-py-sm">Download Class Report</div>
        </q-card-section>
        <q-form @submit="downloadClassRoomReport" class="q-gutter-md">
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
              <div>Select Columns</div>
              <div class="flex q-pa-sm">
                <div
                  class="text-left q-px-sm"
                  v-for="k in Object.keys(cv)"
                  :key="k"
                >
                  <input
                    :id="`check${k}`"
                    type="checkbox"
                    :title="`${$camelToNormal(k)}`"
                    v-model="cv[k]"
                  />
                  <label class="q-px-sm" :for="`check${k}`">{{
                    $camelToNormal(k)
                  }}</label>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn type="submit" label="Download" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      classRoom: null,
      assessmentColumns: {
        code: false,
        subject: true,
        paper: true,
        assessments: true,
        score: true,
        descriptor: true,
        total: true,
        average: true,
        aggregate: true,
        subjectAverage: true,
        aggregates: true,
        grade: true,
        points: true,
        subjectTeacher: false,
      },
      activityColumns: {
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
      formData: {
        report_type: "assessment",
      },
    };
  },
  computed: {
    cv() {
      if (this.formData.report_type == "assessment") {
        if (this.levelGroupName == "O") {
          delete this.assessmentColumns["grade"];
          delete this.assessmentColumns["points"];
          delete this.assessmentColumns["aggregate"];
        } else if (this.levelGroupName == "A") {
          delete this.assessmentColumns["score"];
          delete this.assessmentColumns["descriptor"];
          delete this.assessmentColumns["aggregates"];
        }
        return this.assessmentColumns;
      } else {
        return this.activityColumns;
      }
    },
  },
  created() {
    this.getClassRoom();
  },
  methods: {
    getClassRoom() {
      this.$api
        .get(`/class-rooms/${this.$route.params.id}/`)
        .then((response) => {
          if (response) {
            this.classRoom = response.data;
            console.log(this.classRoom);
            this.levelGroupName = this.classRoom.level_detail.level_group_name;
          }
        });
    },

    downloadClassRoomReport() {
      this.formData["columns"] = this.cv;
      this.$setLoading(this, true);
      this.$api
        .post(
          `/reports/computed/class-rooms/${this.$route.params.id}/download/`,
          this.formData
        )
        .then((response) => {
          if (response) {
            window.open(response.data.file_url, "_blank");
            this.$setLoading(this, false);
          }
        });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
