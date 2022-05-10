<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="col-3 flex flex-center">
          <q-img
            class="rounded-borders"
            src="~/assets/img/profile-placeholder.jpg"
            style="width: 100px; hieght: 100px"
          />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ student.first_name }} {{ student.last_name }}
            {{ student.middle_name }}
          </div>
          <div>
            {{ student.dob }}
          </div>
          <div v-if="student.class_room">
            {{ student.class_room_detail.name }}
            {{ student.class_room_detail.stream }}
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          dense
          @click="deleteStudent(student.id)"
        />
      </q-card-actions>

      <q-separator />

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
        <q-input
          v-model="formData.middle_name"
          type="text"
          label="Middle Name"
        />

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
                      <q-btn
                        label="Cancel"
                        color="primary"
                        flat
                        v-close-popup
                      />
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
          option-label="name"
          option-value="id"
          :options="classRooms"
          label="Class Room"
          emit-value
          map-options
        />

        <div align="right">
          <q-btn label="update" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { ConfirmDialog },
  data() {
    return {
      student: {},
      classRooms: [],

      formData: {
        first_name: "",
        last_name: "",
        middle_name: "",
        dob: null,
        class_room: {},
      },
    };
  },
  created() {
    this.getStudent();
    this.getClassRooms();
  },
  methods: {
    getStudent() {
      this.$api.get(`/students/${this.$route.params.id}/`).then((response) => {
        this.student = response.data;
        this.formData.first_name = this.student.first_name;
        this.formData.last_name = this.student.last_name;
        this.formData.middle_name = this.student.middle_name;
        this.formData.dob = this.student.dob;
        this.formData.class_room = this.student.class_room;
        console.log(this.student);
      });
    },

    updateStudent() {
      console.log(this.formData);
      this.$api
        .put(`/students/${this.student.id}/`, this.formData)
        .then((response) => {
          this.student = response.data;
          console.log(response.data);
        });
    },

    deleteStudent(id) {
      this.$refs.confirmDialog
        .show({
          title: "Hello",
          message: `Are you sure you want to delete the student "${id}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api.delete(`/students/${id}/`).then((response) => {
              if (response.status == 204) {
                this.$router.push("/students");
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
