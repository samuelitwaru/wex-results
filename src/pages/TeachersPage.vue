<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Teachers</label>
        <create-teacher-modal @addTeacher="teachers.push($event)" />
      </div>

      <q-table
        :rows="teachers"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[50]"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <router-link class="text-white" :to="`/teachers/${props.key}`">
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
            <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteTeacher(props.key)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import CreateTeacherModal from "src/components/CreateTeacherModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { CreateTeacherModal, ConfirmDialog },
  name: "TeachersPage",
  data() {
    return {
      columns: [
        {
          name: "name",
          label: "Name",
          field: "name",
          align: "left",
          // format: (data, row) =>
          // `${data} ${row.last_name} ${row.middle_name || ""}`,
        },
        { name: "action", label: "Action", field: "action", align: "left" },
      ],
      teachers: [],
    };
  },
  created() {
    this.getTeachers();
  },
  methods: {
    getTeachers() {
      this.$api.get("/teachers/").then((response) => {
        this.teachers = response.data;
      });
    },
    deleteTeacher(id) {
      this.$refs.confirmDialog
        .show({
          title: "Hello",
          message: `Are you sure you want to delete the teacher "${id}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api.delete(`/teachers/${id}/`).then((response) => {
              if (response.status == 204) {
                this.teachers = this.teachers.filter(
                  (teacher) => teacher.id != id
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