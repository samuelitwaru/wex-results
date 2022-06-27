<template>
  <div>
    <!-- <q-btn dense icon="add" color="primary" @click="show = true" /> -->
    <q-dialog v-model="show">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Activity</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="createActivity"
            @reset="resetForm"
            class="q-gutter-md"
          >
            <q-input v-model="formData.name" type="text" label="Name" />
            <q-select
              outlined
              v-model="formData.subject"
              :option-label="(item) => `${item.code} ${item.name}`"
              option-value="id"
              :options="subjects"
              label="Subject"
              emit-value
              map-options
            />

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
  props: ["subject", "classRoom"],
  setup() {
    return {
      show: ref(false),
    };
  },
  data() {
    return {
      classRooms: [],
      subjects: [],
      formData: {
        name: null,
        class_room: null,
        subject: null,
      },
    };
  },
  watch: {
    classRoom(newValue, oldValue) {
      this.formData.class_room = newValue;
    },
    subject(newValue, oldValue) {
      this.formData.subject = newValue;
    },
  },
  created() {
    this.getClassRooms();
    this.getSubjects();
  },
  methods: {
    createActivity() {
      console.log(this.formData);
      this.$setLoading(this, true);
      this.$api.post(`/activities/`, this.formData).then((response) => {
        this.$emit("addActivity", response.data);
        this.show = false;
        this.resetForm();
        this.$setLoading(this, false);
      });
    },

    getSubjects() {
      this.$api.get(`/subjects/?level_group__name=O`).then((response) => {
        this.subjects = response.data;
      });
    },

    getClassRooms() {
      this.$api
        .get(`/class-rooms/?level__level_group__name=O`)
        .then((response) => {
          this.classRooms = response.data;
        });
    },

    resetForm() {
      this.formData.name = null;
      // this.formData.class_room = null;
      // this.formData.subject = null;
    },
  },
};
</script>

<style>
</style>
