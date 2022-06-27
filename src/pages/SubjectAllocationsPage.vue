<template>
  <div class="q-pa-sm">
    <div class="flex justify-between q-py-sm">
      <label class="text-h4">Subject Allocations</label>
      <!-- <create-teacher-modal @addTeacher="teachers.push($event)" /> -->
    </div>
    <q-table
      :rows="subjectAllocations"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[50]"
    >
      <template v-slot:body-cell-activities="props">
        <q-td :props="props">
          <router-link class="text-white" :to="`/subject-activities`">
            <q-btn color="primary" label="ACTIVITIES" no-caps flat dense />
          </router-link>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjectAllocations: [],
      columns: [
        {
          name: "subject",
          field: "paper_detail",
          label: "Subject",
          align: "left",
          format: (data, row) => `${data.subject_name} / ${data.number}`,
        },
        {
          name: "class_room",
          field: "class_room_detail",
          label: "Class Room",
          align: "left",
          format: (data, row) => `${data.name} ${data.stream || ""}`,
        },
        // {
        //   name: "teacher",
        //   field: "teacher_detail",
        //   label: "Teacher",
        //   align: "left",
        //   format: (data, row) => `${data.name}`,
        // },
        {
          name: "activities",
          label: "Activities",
          align: "center",
        },
      ],
    };
  },
  created() {
    this.getTeacherClassRoomPaper();
  },
  methods: {
    getTeacherClassRoomPaper() {
      this.$api.get(`/teacher-class-room-papers/`).then((response) => {
        this.subjectAllocations = response.data;
      });
    },
  },
};
</script>

<style>
</style>
