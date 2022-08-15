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
            <div class="row">
              <div class="col q-mr-xs">
                <q-input
                  v-model="formData.first_name"
                  type="text"
                  label="First Name"
                  :rules="[$required]"
                />
              </div>
              <div class="col q-ml-xs">
                <q-input
                  v-model="formData.last_name"
                  type="text"
                  label="Last Name"
                  required
                  :rules="[$required]"
                />
              </div>
            </div>

            <div class="row">
              <div class="col q-mr-xs">
                <q-input
                  v-model="formData.middle_name"
                  type="text"
                  label="Middle Name"
                />
              </div>
              <div class="col q-ml-xs">
                <q-input v-model="formData.house" type="text" label="House" />
              </div>
            </div>

            <!-- <div>
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
            </div> -->

            <div class="row">
              <div class="col q-mr-xs">
                <q-select
                  outlined
                  v-model="formData.nationality"
                  :option-label="(item) => `${item[1]}`"
                  option-value="0"
                  :options="nationalities"
                  label="Nationality"
                  emit-value
                  map-options
                  :rules="[$required]"
                />
              </div>
              <div class="col q-ml-xs">
                <q-select
                  v-if="!class_room"
                  outlined
                  v-model="formData.class_room"
                  :option-label="(item) => `${item.name} ${item.stream || ''}`"
                  option-value="id"
                  :options="classRooms"
                  label="Class"
                  emit-value
                  map-options
                  :rules="[$required]"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="row">
              <div class="col q-my-auto">
                <q-radio v-model="formData.gender" val="M" label="Male" />
                <q-radio v-model="formData.gender" val="F" label="Female" />
              </div>
            </div>

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
  props: ["class_room"],
  props: {
    class_room: {
      type: Number,
      default: null,
    },
  },
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
      nationalities: [],
      formData: {
        first_name: null,
        last_name: null,
        middle_name: null,
        house: null,
        gender: null,
        dob: null,
        class_room: null,
        nationality: "Uganda",
      },
    };
  },
  created() {
    this.getClassRooms();
    this.getNationalities();
    this.formData.class_room = this.class_room;
  },
  watch: {
    class_room(newValue, oldValue) {
      this.formData.class_room = newValue;
    },
  },
  methods: {
    createStudent() {
      this.$setLoading(this, true);
      this.$api.post(`/students/`, this.formData).then((response) => {
        this.$emit("addStudent", response.data);
        this.$router.push(`/students/${response.data.id}`);
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

    getNationalities() {
      this.$api.get(`/core/nationalities/`).then((response) => {
        this.nationalities = response.data;
      });
    },

    resetForm() {
      this.formData.first_name = null;
      this.formData.last_name = null;
      this.formData.middle_name = null;
      this.formData.house = null;
      this.formData.gender = null;
      // this.formData.dob = null;
      this.formData.class_room = null;
      this.formData.nationality = null;
    },
  },
};
</script>

<style></style>
