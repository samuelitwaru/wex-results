<template>
  <div>
    <div class="q-pa-sm">
      <strong>Class</strong>
      <q-form @submit="updateClassRoom" class="q-gutter-md">
        <div class="row">
          <div class="col q-mr-xs">
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />
          </div>
          <div class="col q-mr-xs">
            <q-input v-model="formData.stream" type="text" label="Stream" />
          </div>
        </div>

        <div class="row">
          <div class="col q-mr-xs">
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
          </div>
          <div class="col q-mr-xs">
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
          </div>
        </div>

        <div align="right">
          <q-btn label="update" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
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
      this.$setLoading(this, true);
      this.$api
        .get(`/class-rooms/${this.$route.params.id}/`)
        .then((response) => {
          this.class_room = response.data;
          this.formData.name = this.class_room.name;
          this.formData.stream = this.class_room.stream;
          this.formData.level = this.class_room.level;
          this.formData.teacher = this.class_room.teacher;
          this.$setLoading(this, false);
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
      this.$setLoading(this, true);
      this.$api
        .put(`/class-rooms/${this.class_room.id}/`, this.formData)
        .then((response) => {
          this.class_room = response.data;
          this.$setLoading(this, false);
          this.$emit("updateClassRoom", response.data);
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
