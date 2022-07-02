<template>
  <q-form @submit="filterReports" style="width: 100%">
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
      <div class="col q-px-sm" v-if="!class_room">
        <q-select
          outlined
          dense
          v-model.number="formData.student__class_room"
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
          v-model="formData.class_teacher_commented"
          :options="ctCommentedOptions"
          label="Commented (CT)"
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
          v-model="formData.head_teacher_commented"
          :options="htCommentedOptions"
          label="Commented (HT)"
          :option-label="(item) => `${item.name}`"
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
  props: {
    class_room: {
      type: Number,
      default: null,
    },
  },
  emits: ["updateReports"],
  data() {
    return {
      classRooms: [{ id: "", name: "All", stream: "" }],
      periods: [{ id: "", name: "All" }],
      htCommentedOptions: [
        { id: null, name: "All" },
        { id: "yes", name: "Yes" },
        { id: "no", name: "No" },
      ],
      ctCommentedOptions: [
        { id: null, name: "All" },
        { id: "yes", name: "Yes" },
        { id: "no", name: "No" },
      ],
      formData: {
        period: null,
        student: null,
        student__class_room: null,
        class_teacher_commented: null,
        head_teacher_commented: null,
        result: null,
      },
    };
  },
  created() {
    this.getClassRooms();
    this.getPeriods();
    this.formData.student__class_room = this.class_room;
  },
  methods: {
    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = this.classRooms.concat(response.data);
      });
    },
    getPeriods() {
      this.$api.get(`/periods/`).then((response) => {
        this.periods = this.periods.concat(response.data);
      });
    },
    filterReports() {
      this.$setLoading(this, true);
      var urlQuery = this.$buildURLQuery(this.formData);
      this.$api.get(`/reports/?${urlQuery}`).then((response) => {
        this.$emit("updateReports", response.data);
        this.$setLoading(this, false);
      });
    },
  },
};
</script>

<style>
</style>

