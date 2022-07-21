<template>
  <q-form @submit="filterStudents" style="width: 100%">
    <div class="row justify-end">
      <div class="q-my-auto">Filter</div>
      <div class="col q-px-sm">
        <q-select
          outlined
          dense
          v-model.number="formData.class_room"
          :options="classRooms"
          label="Class Room"
          :option-label="(item) => `${item.name} ${item.stream || ''}`"
          option-value="id"
          emit-value
          map-options
        />
      </div>
      <div class="col q-px-sm">
        <q-input
          v-model="formData.search"
          outlined
          dense
          type="text"
          label="Name"
        />
      </div>
      <div class="q-my-auto">
        <q-btn label="Filter" type="submit" color="primary" />
      </div>
    </div>
  </q-form>
</template>

<script>
export default {
  data() {
    return {
      classRooms: [{ id: "", name: "All", stream: "" }],
      formData: {
        class_room: "",
        search: null,
      },
    };
  },
  created() {
    this.getClassRooms();
  },
  methods: {
    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = this.classRooms.concat(response.data);
      });
    },
    filterStudents() {
      this.$emit("setLoading", true);
      var urlQuery = this.$buildURLQuery(this.formData);
      this.$api.get(`/students/?${urlQuery}`).then((response) => {
        this.$emit("updateStudents", response.data);
        this.$emit("setLoading", false);
      });
    },
  },
};
</script>

<style></style>
