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
        :loading="loading"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary">
            <q-spinner-ios size="50px" color="primary" />
          </q-inner-loading>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <router-link class="text-white" :to="`/teachers/${props.key}`">
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
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
        },
        { name: "action", label: "Action", field: "action", align: "left" },
      ],
      teachers: [],
      loading: false,
    };
  },
  created() {
    this.getTeachers();
  },
  methods: {
    getTeachers() {
      this.loading = true;
      this.$api.get("/teachers/").then((response) => {
        this.teachers = response.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
</style>
