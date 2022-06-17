<template>
  <div>
    <q-btn icon="add" color="primary" @click="medium = true" dense />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Student</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="createStudent"
            @reset="resetForm"
            class="q-gutter-md"
          >
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
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            v-close-popup
                          />
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

            <div class="flex justify-between">
              <div>
                <q-btn flat color="primary" label="Cancel" v-close-popup />
              </div>
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["students"],
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
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
  },
  methods: {
    createStudent() {
      this.$setLoading(this, true);
      console.log(this.formData);
      this.$api.post(`/students/`, this.formData).then((response) => {
        this.$emit("addStudent", response.data);
        this.medium = false;
        this.resetForm();
        this.$setLoading(this, false);
      });
    },

    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = response.data;
      });
    },

    resetForm() {
      this.formData.first_name = null;
      this.formData.last_name = null;
      this.formData.middle_name = null;
      this.formData.gender = null;
      this.formData.dob = null;
      this.formData.class_room = null;
    },
  },
};
</script>

<style>
</style>
