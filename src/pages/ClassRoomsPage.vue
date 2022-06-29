<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Class Rooms</label>
        <create-class-room-modal @addClassRoom="class_rooms.push($event)" />
      </div>

      <q-table
        :rows="class_rooms"
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
            <router-link class="text-white" :to="`/class-rooms/${props.key}`">
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
            |
            <router-link
              class="text-white"
              :to="`/class-rooms/${props.key}/students`"
            >
              <q-btn color="primary" label="Students" no-caps flat dense />
            </router-link>
            |
            <router-link
              class="text-white"
              :to="`/class-rooms/${props.key}/reports`"
            >
              <q-btn color="primary" label="Reports" no-caps flat dense />
            </router-link>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import CreateClassRoomModal from "src/components/CreateClassRoomModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { CreateClassRoomModal, ConfirmDialog },
  name: "ClassRoomsPage",
  data() {
    return {
      columns: [
        {
          name: "name",
          label: "Name",
          field: "name",
          format: (data, row) => `${data} ${row.stream || ""}`,
          align: "left",
        },
        {
          name: "teacher",
          label: "Teacher",
          field: "teacher_detail",
          format: (data, row) => `${data?.name || ""}`,
          align: "left",
        },
        { name: "action", label: "Action", field: "action", align: "left" },
      ],
      class_rooms: [],
      loading: false,
    };
  },
  created() {
    this.getClassRooms();
  },
  methods: {
    getClassRooms() {
      this.loading = true;
      this.$api.get("/class-rooms/").then((response) => {
        this.class_rooms = response.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
</style>
