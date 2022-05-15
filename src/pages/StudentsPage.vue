<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Students</label>
        <create-student-modal @addStudent="students.push($event)" />
      </div>

      <q-table
        :rows="students"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[50]"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <router-link class="text-white" :to="`/students/${props.key}`">
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
            <router-link
              class="text-white"
              :to="`/students/${props.key}/report`"
            >
              <q-btn color="primary" icon-right="book" no-caps flat dense />
            </router-link>
            <!-- <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteStudent(props.key)"
            /> -->
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import CreateStudentModal from "src/components/CreateStudentModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { CreateStudentModal, ConfirmDialog },
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
        { name: "dob", label: "Date of birth", field: "dob", align: "left" },
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
    };
  },
  created() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      this.$api.get("/students/").then((response) => {
        this.students = response.data;
      });
    },
    // deleteStudent(id) {
    //   this.$refs.confirmDialog
    //     .show({
    //       title: "Hello",
    //       message: `Are you sure you want to delete the student "${id}"?`,
    //       okButton: "Yes, delete",
    //     })
    //     .then((res) => {
    //       if (res) {
    //         this.$api.delete(`/students/${id}/`).then((response) => {
    //           if (response.status == 204) {
    //             this.students = this.students.filter(
    //               (student) => student.id != id
    //             );
    //           }
    //         });
    //       }
    //     });
    // },
  },
};
</script>

<style>
</style>
