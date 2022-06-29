<template>
  <div>
    <!-- <q-btn dense icon="add" color="primary" @click="show = true" /> -->
    <q-dialog v-model="show">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Allocate Teacher</div>
        </q-card-section>

        <q-card-section>
          <q-markup-table flat bordered>
            <tbody>
              <tr>
                <td class="text-left">
                  <strong
                    >{{ classRoom.name }} {{ classRoom.stream || "" }}</strong
                  >
                </td>
              </tr>
              <tr>
                <td class="text-left">
                  <strong
                    >{{ paper.subject_name }} {{ paper.description }}</strong
                  >
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="setClassPaperTeacher" class="q-gutter-md">
            <div></div>
            <q-select
              outlined
              v-model="formData.teacher"
              :option-label="(item) => `${item.name}`"
              option-value="id"
              :options="teachers"
              label="Teacher"
              emit-value
              map-options
              required
            />

            <div class="flex justify-between">
              <div>
                <q-btn
                  flat
                  dense
                  color="primary"
                  label="Cancel"
                  v-close-popup
                />
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
  props: ["allocation"],
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
        class_room: null,
        paper: null,
        teacher: null,
      },
    };
  },
  watch: {
    allocation(newValue, oldValue) {
      this.formData.class_room = newValue.class_room;
      this.formData.paper = newValue.paper;
      this.formData.teacher = newValue.teacher_detail?.id || null;
      this.classRoom = newValue.class_room_detail;
      this.paper = newValue.paper_detail;
    },
  },
  created() {
    this.getTeachers();
  },
  methods: {
    getTeachers() {
      this.$api.get(`/teachers/`).then((response) => {
        this.teachers = response.data;
      });
    },

    setClassPaperTeacher() {
      this.$setLoading(this, true);
      if (this.allocation.id || null) {
        // update existing
        this.$api
          .put(
            `/teacher-class-room-papers/${this.allocation.id}/`,
            this.formData
          )
          .then((response) => {
            this.$emit("updateAllocation", response.data);
            this.$setLoading(this, false);
            this.show = false;
            this.resetForm();
          });
      } else {
        // create new
        this.$api
          .post(`/teacher-class-room-papers/`, this.formData)
          .then((response) => {
            this.$emit("updateAllocation", response.data);
            this.$setLoading(this, false);
            this.show = false;
            this.resetForm();
          });
      }
    },

    resetForm() {
      this.formData.class_room = null;
      this.formData.paper = null;
      this.formData.teacher = null;
    },
  },
};
</script>

<style>
</style>
