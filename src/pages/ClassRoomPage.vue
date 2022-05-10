<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ class_room.name }}
          </div>
          <div>{{ class_room.stream }}</div>
        </q-card-section>
      </q-card-section>

      <div class="q-pa-sm" align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          dense
          @click="deleteClassRoom(class_room.id)"
        />
      </div>

      <q-separator />

      <div>
        <div class="q-pa-sm">
          <strong>Class</strong>
          <q-form @submit="updateClassRoom" class="q-gutter-md">
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />

            <q-input v-model="formData.stream" type="text" label="Stream" />
            <q-select
              outlined
              v-model="formData.level"
              option-label="name"
              option-value="id"
              :options="levels"
              label="Level"
              emit-value
              map-options
            />
            <q-select
              outlined
              v-model="formData.teacher"
              option-label="name"
              option-value="id"
              :options="teachers"
              label="Class Teacher"
              emit-value
              map-options
            />

            <div align="right">
              <q-btn label="update" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { ConfirmDialog },
  data() {
    return {
      class_room: {},
      levels: [],
      teachers: [],

      formData: {
        name: "",
        stream: "",
        level: null,
        teacher: null,
      },
    };
  },
  created() {
    this.getClassRoom();
    this.getLevels();
    this.getTeachers();
  },
  methods: {
    getClassRoom() {
      this.$api
        .get(`/class-rooms/${this.$route.params.id}/`)
        .then((response) => {
          this.class_room = response.data;
          console.log(this.class_room);
          this.formData.name = this.class_room.name;
          this.formData.stream = this.class_room.stream;
          this.formData.level = this.class_room.level;
          this.formData.teacher = this.class_room.teacher;
        });
    },

    getLevels() {
      this.$api.get(`/levels/`).then((response) => {
        this.levels = response.data;
      });
    },

    getTeachers() {
      this.$api.get(`/teachers/`).then((response) => {
        this.teachers = response.data;
      });
    },

    updateClassRoom() {
      console.log(this.formData);
      this.$api
        .put(`/class-rooms/${this.class_room.id}/`, this.formData)
        .then((response) => {
          this.class_room = response.data;
          console.log(response.data);
        });
    },

    deleteClassRoom(id) {
      this.$refs.confirmDialog
        .show({
          title: "Hello",
          message: `Are you sure you want to delete the class room "${id}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api.delete(`/class-rooms/${id}/`).then((response) => {
              if (response.status == 204) {
                this.$router.push("/class-rooms");
              }
            });
          }
        });
    },

    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = response.data;
      });
    },
  },
};
</script>

<style>
</style>