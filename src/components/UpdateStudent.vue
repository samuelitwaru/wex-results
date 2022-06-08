<template>
  <div>
    <h6 class="q-my-sm q-px-sm flex justify-between">
      Student Info
      <router-link :to="`/students/${$route.params.id}/report`">
        <q-btn color="primary" label="Student Report" no-caps flat dense />
      </router-link>
    </h6>
    <q-form @submit="updateStudent" class="q-gutter-md q-pa-sm">
      <q-input
        v-model="formData.first_name"
        type="text"
        label="First Name"
        required
      />
      <q-input
        v-model="formData.last_name"
        type="text"
        label="Last Name"
        required
      />
      <q-input v-model="formData.middle_name" type="text" label="Middle Name" />

      <div>
        <label class="text-grey-8">Date of Birth</label>
        <div
          class="row q-pa-xs rounded-borders"
          style="border: 1px solid #dddddd"
        >
          <div class="col-9 q-my-auto">
            {{ formData.dob }}
          </div>
          <div class="col-3" align="right">
            <q-btn col="2" icon="event" round color="primary">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="formData.dob"
                  mask="YYYY-MM-DD"
                  :title="formData.dob"
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
        v-model="formData.class_room"
        :option-label="(item) => `${item.name} ${item.stream}`"
        option-value="id"
        :options="classRooms"
        label="Class"
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
  // props: ["student"],
  data() {
    return {
      classRooms: [],
      student: {},
      formData: {
        first_name: null,
        last_name: null,
        middle_name: null,
        dob: null,
        class_room: null,
      },
    };
  },
  created() {
    this.getClassRooms();
    this.getStudent();
  },
  methods: {
    getStudent() {
      this.$setLoading(this, true);
      this.$api.get(`/students/${this.$route.params.id}/`).then((response) => {
        this.student = response.data;
        this.$emit("updateStudent", response.data);
        this.formData.first_name = this.student.first_name;
        this.formData.last_name = this.student.last_name;
        this.formData.middle_name = this.student.middle_name;
        this.formData.dob = this.student.dob;
        this.formData.class_room = this.student.class_room;
        this.$setLoading(this, false);
      });
    },
    updateStudent() {
      this.$setLoading(this, true);
      this.$api
        .put(`/students/${this.student.id}/`, this.formData)
        .then((response) => {
          this.student = response.data;
          this.$emit("updateStudent", response.data);
          this.$setLoading(this, false);
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
