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

      <q-radio v-model="formData.gender" val="M" label="Male" />
      <q-radio v-model="formData.gender" val="F" label="Female" />

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
        :option-label="(item) => `${item.name} ${item.stream || ''}`"
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

    <div class="q-pa-sm">
      <div class="text-h6">Subjects</div>
      <div class="q-py-sm">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Selectable Subjects</th>
              <th class="text-right">
                <add-student-subjects-modal
                  :student="student"
                  :level="level"
                  @updateStudent="student = $event"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subject in student?.subjects" :key="subject.id">
              <td class="text-left">{{ subject.name }}</td>
              <td class="text-right">{{ subject.abbr }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class="q-py-sm">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Compulsory Subjects</th>
              <th class="text-right"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subject in compulsorySubjects" :key="subject.id">
              <td class="text-left">{{ subject.name }}</td>
              <td class="text-right">{{ subject.abbr }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import AddStudentSubjectsModal from "./AddStudentSubjectsModal.vue";
export default {
  components: { AddStudentSubjectsModal },
  // props: ["student"],
  data() {
    return {
      classRooms: [],
      student: null,
      level: null,
      compulsorySubjects: [],
      formData: {
        first_name: null,
        last_name: null,
        middle_name: null,
        gender: null,
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
        console.log(this.student);
        this.$emit("updateStudent", response.data);
        this.formData.first_name = this.student?.first_name;
        this.formData.last_name = this.student?.last_name;
        this.formData.middle_name = this.student?.middle_name;
        this.formData.gender = this.student?.gender;
        this.formData.dob = this.student?.dob;
        this.formData.class_room = this.student?.class_room;
        this.$setLoading(this, false);
        this.getLevel();
      });
    },
    getLevel() {
      this.$api
        .get(`/levels/${this.student.class_room_detail.level}/`)
        .then((response) => {
          this.level = response.data;
          this.getCompulsorySubjects(this.level.level_group);
        });
    },
    getCompulsorySubjects() {
      this.$api
        .get(`/subjects/?level_group=${this.level.level_group}&is_selectable=0`)
        .then((response) => {
          this.compulsorySubjects = response.data;
        });
    },
    updateStudent() {
      this.$setLoading(this, true);
      this.$api
        .put(`/students/${this.student?.id}/`, this.formData)
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
