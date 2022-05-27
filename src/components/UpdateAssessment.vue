<template>
  <div class="q-px-sm">
    <h6 class="q-my-sm flex justify-between">
      Assessment
      <router-link :to="`/assessments/${$route.params.id}/scores`">
        <q-btn color="primary" label="Scores" no-caps flat dense />
      </router-link>
    </h6>
    <q-form @submit="updateAssessment" class="q-gutter-md">
      <div>
        <label class="text-grey-8">Date</label>
        <div
          class="row q-pa-xs rounded-borders"
          style="border: 1px solid #dddddd"
        >
          <div class="col-9 q-my-auto">
            {{ formData.date }}
          </div>
          <div class="col-3" align="right">
            <q-btn col="2" icon="event" round color="primary">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="formData.date"
                  mask="YYYY-MM-DD"
                  :title="formData.date"
                  subtitle="Date of Birth"
                  years-in-month-view
                >
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
          </div>
        </div>
      </div>
      <q-select
        outlined
        v-model="formData.period"
        option-label="name"
        option-value="id"
        :options="periods"
        label="Period"
        emit-value
        map-options
      />
      <q-select
        outlined
        v-model="formData.class_room"
        :option-label="(item) => `${item.name} ${item.stream}`"
        option-value="id"
        :options="classRooms"
        label="Class"
        emit-value
        map-options
      />
      <q-select
        outlined
        v-model="formData.paper"
        :option-label="(item) => `${item.subject_name}/${item.number}`"
        option-value="id"
        :options="papers"
        label="Subject Paper"
        emit-value
        map-options
      />
      <q-select
        outlined
        v-model="formData.teacher"
        option-label="name"
        option-value="id"
        :options="teachers"
        label="Teacher"
        emit-value
        map-options
      />

      <div align="right">
        <q-btn label="update" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  components: {},
  //   emits: ["updateAssessment"],
  data() {
    return {
      assessment: null,
      teachers: [],
      classRooms: [],
      papers: [],
      periods: [],
      formData: {
        date: null,
        teacher: null,
        class_room: null,
        period: null,
        paper: null,
      },
    };
  },
  created() {
    this.getAssessment();
    this.getTeachers();
    this.getClassRooms();
    this.getPapers();
    this.getPeriods();
  },
  methods: {
    getAssessment() {
      this.$api
        .get(`/assessments/${this.$route.params.id}/`)
        .then((response) => {
          this.assessment = response.data;
          this.formData.date = this.assessment.date;
          this.formData.class_room = this.assessment.class_room;
          this.formData.paper = this.assessment.paper;
          this.formData.teacher = this.assessment.teacher;
          this.formData.period = this.assessment.period;
        });
    },

    updateAssessment() {
      console.log(this.formData);
      this.$api
        .put(`/assessments/${this.assessment.id}/`, this.formData)
        .then((response) => {
          this.assessment = response.data;
          this.$emit("updateAssessment", this.assessment);
        });
    },

    getPeriods() {
      this.$api.get(`/periods/`).then((response) => {
        this.periods = response.data;
      });
    },

    getTeachers() {
      this.$api.get(`/teachers/`).then((response) => {
        this.teachers = response.data;
      });
    },

    getPapers() {
      this.$api.get(`/papers/`).then((response) => {
        this.papers = response.data;
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
