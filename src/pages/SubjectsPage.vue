<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Subjects</label>
        <create-subject-modal @addSubject="subjects.push($event)" />
      </div>

      <q-table
        :rows="subjects"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[50]"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <router-link class="text-white" :to="`/subjects/${props.key}`">
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
            <!-- <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteSubject(props.key)"
            /> -->
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import CreateSubjectModal from "src/components/CreateSubjectModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { CreateSubjectModal, ConfirmDialog },
  name: "SubjectsPage",
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
      subjects: [],
    };
  },
  created() {
    this.getSubjects();
  },
  methods: {
    getSubjects() {
      this.$api.get("/subjects/").then((response) => {
        this.subjects = response.data;
      });
    },
    // deleteSubject(id) {
    //   this.$refs.confirmDialog
    //     .show({
    //       title: "Hello",
    //       message: `Are you sure you want to delete the subject "${id}"?`,
    //       okButton: "Yes, delete",
    //     })
    //     .then((res) => {
    //       if (res) {
    //         this.$api.delete(`/subjects/${id}/`).then((response) => {
    //           if (response.status == 204) {
    //             this.subjects = this.subjects.filter(
    //               (subject) => subject.id != id
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
