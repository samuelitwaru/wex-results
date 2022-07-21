<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Assessments</label>
        <create-assessment-modal
          :teacher="teacher_id"
          @addAssessment="assessments.unshift($event)"
        />
      </div>

      <div class="flex justify-between q-py-sm">
        <filter-assessments-form
          @updateAssessments="assessments = $event"
          @setLoading="loading = $event"
        />
      </div>

      <q-table
        :rows="assessments"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[50]"
        :loading="loading"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary">
            <q-spinner-ios size="50px" color="primary" />
          </q-inner-loading>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <!-- <router-link class="text-white" :to="`/assessments/${props.key}`">
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link> -->
            |
            <router-link :to="`/assessments/${props.key}`">
              <q-btn color="primary" label="SCORES" no-caps flat dense />
            </router-link>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import CreateAssessmentModal from "src/components/CreateAssessmentModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import FilterAssessmentsForm from "src/components/FilterAssessmentsForm.vue";
export default {
  components: { CreateAssessmentModal, ConfirmDialog, FilterAssessmentsForm },
  name: "AssessmentsPage",
  data() {
    return {
      columns: [
        {
          name: "date",
          label: "Date",
          field: "date",
          align: "left",
        },
        {
          name: "period",
          label: "Period",
          field: "period_detail",
          align: "left",
          format: (data, row) => {
            if (data) {
              return `${data.name}`;
            }
          },
        },
        {
          name: "paper",
          label: "Paper",
          field: "paper_detail",
          format: (data, row) => `${data.subject_name}/${data.number}`,
          align: "left",
        },
        {
          name: "class_room",
          label: "Class",
          field: "class_room_detail",
          align: "left",
          format: (data, row) => {
            if (data) {
              return `${data.name} ${data.stream || ""}`;
            }
          },
        },
        {
          name: "teacher",
          label: "Teacher",
          field: "teacher_detail",
          align: "left",
          format: (data, row) => {
            if (data) {
              return `${data.name}`;
            }
          },
        },
        { name: "action", label: "Action", field: "action", align: "left" },
      ],
      assessments: [],
      loading: false,
      teacher_id: null,
    };
  },
  created() {
    this.getAssessments();
  },
  watch: {
    assessmentsUrl(newValue, oldValue) {
      this.getAssessments();
    },
  },
  computed: {
    assessmentsUrl() {
      if (this.$userHasGroup("teacher")) {
        var teacher_id = this.$store.state.results.user.teacher_id;
        this.teacher_id = teacher_id;
        if (teacher_id) return `/teachers/${teacher_id}/assessments/`;
      }
      return `/assessments/`;
    },
  },
  methods: {
    getAssessments() {
      this.loading = true;
      this.$api.get(`${this.assessmentsUrl}`).then((response) => {
        this.assessments = response.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style></style>
