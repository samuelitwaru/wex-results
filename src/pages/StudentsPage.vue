<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Students</label>
        <create-student-modal
          v-if="canCreateStudent"
          @addStudent="students.push($event)"
        />
      </div>
      <div class="flex justify-between q-py-sm">
        <filter-students-form
          @updateStudents="students = $event"
          @setLoading="loading = $event"
        />
      </div>

      <q-table
        :rows="students"
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
            <router-link class="text-white" :to="`/students/${props.key}`">
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
            |
            <router-link
              class="text-white"
              :to="`/students/${props.key}/report`"
            >
              <q-btn
                color="primary"
                icon="book"
                label="Report"
                no-caps
                flat
                dense
              />
            </router-link>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import CreateStudentModal from "src/components/CreateStudentModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import FilterStudentsForm from "../components/FilterStudentsForm.vue";
export default {
  components: { CreateStudentModal, ConfirmDialog, FilterStudentsForm },
  name: "StudentsPage",
  data() {
    return {
      columns: [
        {
          name: "first_name",
          label: "Name",
          field: "first_name",
          align: "left",
          format: (data, row) =>
            `${data} ${row.last_name} ${row.middle_name || ""}`,
        },
        { name: "index_no", label: "Number", field: "index_no", align: "left" },
        {
          name: "class_room",
          label: "Class room",
          field: "class_room_detail",
          align: "left",
          format: (data, row) => {
            if (data) {
              return `${data.name} ${data.stream || ""}`;
            }
          },
        },
        { name: "action", label: "Action", field: "action", align: "left" },
      ],
      students: [],
      loading: true,
    };
  },
  computed: {
    canCreateStudent() {
      return this.$userHasGroup("dos");
    },
  },
  created() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      this.loading = true;
      this.$api.get("/students/").then((response) => {
        this.students = response.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style></style>
