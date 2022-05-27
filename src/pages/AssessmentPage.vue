<template>
  <q-page v-if="assessment">
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ assessment.paper_detail.subject_name }} Assessment
          </div>
          <div>
            Paper {{ assessment.paper_detail.number }}
            <span v-if="assessment.paper_detail.description">
              ({{ assessment.paper_detail.description }})
            </span>
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
          flat
          dense
          @click="deleteAssessment(assessment)"
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
    };
  },
  created() {
    this.getAssessment();
  },
  methods: {
    getAssessment() {
      this.$api
        .get(`/assessments/${this.$route.params.id}/`)
        .then((response) => {
          this.assessment = response.data;
        });
    },

    deleteAssessment(assessment) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Assignment",
          message: `Are you sure you want to delete the assessment "${assessment.name}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api
              .delete(`/assessments/${assessment.id}/`)
              .then((response) => {
                if (response.status == 204) {
                  this.$router.push("/assessments");
                }
              });
          }
        });
    },
  },
};
</script>

<style>
</style>
