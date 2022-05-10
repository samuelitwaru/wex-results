<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Assessments</label>
        <create-assessment-modal @addAssessment="assessments.push($event)" />
      </div>

      <q-table
        :rows="assessments"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[50]"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <router-link class="text-white" :to="`/assessments/${props.key}`">
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
            <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteAssessment(props.key)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import CreateAssessmentModal from "src/components/CreateAssessmentModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { CreateAssessmentModal, ConfirmDialog },
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
        { name: "term", label: "Term", field: "term", align: "left" },
        {
          name: "class_room",
          label: "Class",
          field: "class_room_detail",
          align: "left",
          format: (data, row) => {
            if (data) {
              return `${data.name} ${data.stream}`;
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
    };
  },
  created() {
    this.getAssessments();
  },
  methods: {
    getAssessments() {
      this.$api.get("/assessments/").then((response) => {
        this.assessments = response.data;
        console.log(this.assessments);
      });
    },
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
                this.assessments = this.assessments.filter(
                  (assessment) => assessment.id != id
                );
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
