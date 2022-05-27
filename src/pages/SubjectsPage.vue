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
        :loading="loading"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary">
            <q-spinner-ios size="50px" color="primary" />
          </q-inner-loading>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <router-link class="text-white" :to="`/subjects/${props.key}`">
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
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
          format: (data, row) => {
            return `${row.code} - ${data}`;
          },
        },
        {
          name: "papers",
          label: "Papers",
          field: "papers",
          align: "left",
          format: (data, row) => {
            return `${data.length}`;
          },
        },
        { name: "action", label: "Action", field: "action", align: "left" },
      ],
      subjects: [],
      loading: false,
    };
  },
  created() {
    this.getSubjects();
  },
  methods: {
    getSubjects() {
      this.loading = true;
      this.$api.get("/subjects/").then((response) => {
        this.subjects = response.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
</style>
