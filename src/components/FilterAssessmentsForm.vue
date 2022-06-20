<template>
  <q-form @submit="filterAssessments" style="width: 100%">
    <div class="row justify-end">
      <div class="q-my-auto">Filter</div>
      <div class="col q-px-sm">
        <q-select
          outlined
          dense
          v-model.number="formData.period"
          :options="periods"
          label="Period"
          :option-label="(item) => `${item.name}`"
          option-value="id"
          emit-value
          map-options
        />
      </div>
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
        <q-select
          outlined
          dense
          v-model.number="formData.paper"
          :options="papers"
          label="Paper"
          :option-label="
            (item) => (item.id ? `${item.subject_name}/${item.number}` : `All`)
          "
          option-value="id"
          emit-value
          map-options
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
      periods: [{ id: "", name: "All" }],
      papers: [{ id: "", subject_name: "All", number: 0 }],
      classRooms: [{ id: "", name: "All", stream: "" }],
      formData: {
        period: "",
        class_room: "",
        paper: "",
      },
    };
  },
  created() {
    this.getPeriods();
    this.getPapers();
    this.getClassRooms();
  },
  methods: {
    getPeriods() {
      this.$api.get(`/periods/`).then((response) => {
        this.periods = this.periods.concat(response.data);
      });
    },
    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = this.classRooms.concat(response.data);
      });
    },
    getPapers() {
      this.$api.get(`/papers/`).then((response) => {
        this.papers = this.papers.concat(response.data);
      });
    },
    filterAssessments() {
      this.$emit("setLoading", true);
      var urlQuery = this.$buildURLQuery(this.formData);
      this.$api.get(`/assessments/?${urlQuery}`).then((response) => {
        this.$emit("updateAssessments", response.data);
        this.$emit("setLoading", false);
      });
    },
  },
};
</script>

<style>
</style>
