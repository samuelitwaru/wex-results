<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pa-sm">
          <div class="text-h5">
            {{ grading_system.name }}
          </div>
          <div>{{ grading_system.description }}</div>
        </q-card-section>
      </q-card-section>
      <div class="q-pa-sm" align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          flat
          dense
          @click="deleteGradingSystem(grading_system)"
        />
      </div>

      <q-separator />

      <div>
        <div class="q-pa-sm col-md-6">
          <strong>Grading system</strong>

          <q-form @submit="updateGradingSystem" class="q-gutter-md">
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />

            <q-input
              v-model="formData.description"
              type="text"
              label="Description"
            />
            <div align="right">
              <q-btn label="update" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
        <div class="q-pa-sm col-md-6">
          <div class="q-py-sm flex justify-between">
            <strong class="q-my-auto">Grades</strong>
            <create-grade-modal
              :grading_system="grading_system"
              @addGrade="this.grading_system.grades.push($event)"
            />
          </div>
          <q-table
            :rows="grading_system.grades"
            :columns="columns"
            row-key="id"
            :rows-per-page-options="[50]"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <update-grade-modal
                  :grade="props.row"
                  :grading_system="grading_system"
                  @replaceGrade="this.replaceGrade($event)"
                />
                <q-btn
                  color="negative"
                  icon-right="delete"
                  no-caps
                  flat
                  dense
                  @click="deleteGrade(props.key)"
                />
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import CreateGradeModal from "src/components/CreateGradeModal.vue";
import UpdateGradeModal from "src/components/UpdateGradeModal.vue";
export default {
  components: { ConfirmDialog, CreateGradeModal, UpdateGradeModal },
  data() {
    return {
      columns: [
        {
          name: "category",
          label: "Category",
          field: "category",
          align: "left",
        },
        {
          name: "range",
          label: "Range",
          field: "min_mark",
          format: (data, row) => `${data} - ${row.max_mark}`,
          align: "left",
        },
        { name: "points", label: "Points", field: "points", align: "left" },
        {
          name: "aggregates",
          label: "Aggregates",
          field: "aggregates",
          align: "left",
        },
        { name: "action", label: "Action", field: "action", align: "left" },
      ],
      grading_system: {},
      grading_systems: [],
      teachers: [],

      formData: {
        name: "",
        description: "",
      },
    };
  },
  created() {
    this.getGradingSystem();
  },
  methods: {
    getGradingSystem() {
      this.$api
        .get(`/grading-systems/${this.$route.params.id}/`)
        .then((response) => {
          this.grading_system = response.data;
          console.log(this.grading_system);
          this.formData.name = this.grading_system.name;
          this.formData.description = this.grading_system.description;
        });
    },

    updateGradingSystem() {
      this.$setLoading(this, true);
      this.$api
        .put(`/grading-systems/${this.grading_system.id}/`, this.formData)
        .then((response) => {
          this.grading_system = response.data;
          this.$setLoading(this, false);
        });
    },

    deleteGradingSystem(gradingSystem) {
      this.$refs.confirmDialog
        .show({
          title: "Hello",
          message: `Are you sure you want to delete the grading system "${gradingSystem.name}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api
              .delete(`/grading-systems/${gradingSystem.id}/`)
              .then((response) => {
                if (response.status == 204) {
                  this.$setLoading(this, false);
                  this.$router.push("/grading-systems");
                }
              });
          }
        });
    },

    deleteGrade(id) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Grade",
          message: `Are you sure you want to delete this grade?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api.delete(`/grades/${id}/`).then((response) => {
              if (response.status == 204) {
                console.log(response.data);
                this.grading_system.grades = this.grading_system.grades.filter(
                  (grade) => grade.id != id
                );
              }
            });
          }
        });
    },

    getGradingSystems() {
      this.$api.get(`/grading-systems/`).then((response) => {
        this.classRooms = response.data;
      });
    },

    replaceGrade(grade) {
      var index = this.grading_system.grades.findIndex(
        (item) => item.id == grade.id
      );
      this.grading_system.grades[index] = grade;
    },
  },
};
</script>

<style>
</style>
