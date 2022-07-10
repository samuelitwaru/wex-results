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
          <div v-if="assessment.is_open">
            <q-icon name="fa fa-unlock" /> OPEN
          </div>
          <div v-else><q-icon name="fa fa-lock" /> CLOSED</div>
        </q-card-section>
      </q-card-section>
      <q-card-actions
        align="right"
        v-if="isCurrentTeachersAssessment && assessment.is_open"
      >
        <q-btn color="primary" label="close" dense @click="closeAssessment" />
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          flat
          dense
          @click="deleteAssessment(assessment)"
        />
      </q-card-actions>
      <q-card-actions
        align="right"
        v-if="!assessment.is_open && $userHasGroup('dos')"
      >
        <q-btn color="primary" label="open" dense @click="openAssessment" />
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
  computed: {
    isCurrentTeachersAssessment() {
      const currentTeacherId = this.$getState("user")?.teacher_id;
      const assessmentTeacherId = this.assessment?.teacher;
      return currentTeacherId == assessmentTeacherId;
    },
  },
  methods: {
    getAssessment() {
      this.$setLoading(this, true);
      this.$api
        .get(`/assessments/${this.$route.params.id}/`)
        .then((response) => {
          this.assessment = response.data;
          this.$setLoading(this, false);
        });
    },

    deleteAssessment(assessment) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Assessment",
          message: `Are you sure you want to delete this assessment?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api
              .delete(`/assessments/${this.$route.params.id}/`)
              .then((response) => {
                if (response.status == 204) {
                  this.$setLoading(this, false);
                  this.$router.push("/assessments");
                }
              });
          }
        });
    },

    closeAssessment(assessment) {
      this.$refs.confirmDialog
        .show({
          title: "Confirm Close Assessment",
          message: `Are you sure you want to close this assessment?`,
          okButton: "Yes, close",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api
              .put(`/assessments/${this.$route.params.id}/close/`, {})
              .then((response) => {
                if (response) {
                  this.assessment = response.data;
                  this.$setLoading(this, false);
                }
              });
          }
        });
    },

    openAssessment(assessment) {
      this.$refs.confirmDialog
        .show({
          title: "Confirm Open Assessment",
          message: `Are you sure you want to open this assessment?`,
          okButton: "Yes, open",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api
              .put(`/assessments/${this.$route.params.id}/open/`, {})
              .then((response) => {
                if (response) {
                  this.assessment = response.data;
                  this.$setLoading(this, false);
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
