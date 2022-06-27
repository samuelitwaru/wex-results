<template>
  <div class="q-pa-sm">
    <div class="flex justify-between q-py-sm">
      <label class="text-h4">Subject Activities</label>
      <!-- <create-teacher-modal @addTeacher="teachers.push($event)" /> -->
    </div>
    <q-table
      :rows="subjectActivites"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[50]"
    >
      <template v-slot:body-cell-activities="props">
        <q-td :props="props"> edit|delete </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjectActivities: [],
      columns: [
        {
          name: "name",
          field: "name",
          label: "Activity",
          align: "left",
        },
        {
          name: "class_room",
          field: "class_room_detail",
          label: "Class Room",
          align: "left",
          format: (data, row) => `${data.name} ${data.stream || ""}`,
        },
        {
          name: "subject",
          field: "subject_detail",
          label: "Subject",
          align: "left",
          format: (data, row) => `${data.name}`,
        },
        {
          name: "period",
          field: "period_detail",
          label: "Period",
          align: "left",
          format: (data, row) => `${data.name}`,
        },
        {
          name: "Action",
          label: "Action",
          align: "center",
        },
      ],
    };
  },
  created() {
    this.getSubjectActivities();
  },
  methods: {
    getSubjectActivities() {
      this.$api.get(`/activities/`).then((response) => {
        this.subjectActivities = response.data;
      });
    },
  },
};
</script>

<style>
</style>
