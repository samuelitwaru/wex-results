<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Subject Allocations</label>
        <!-- <set-class-paper-teacher
          ref="setClassPaperTeacherModal"
          :allocation="allocation"
          @updateAllocation="getAllocations()"
        /> -->
      </div>

      <q-form @submit="getAllocations" class="q-gutter-md">
        <div class="flex justify-between q-py-sm">
          <div class="q-my-auto">Filter</div>
          <div class="col q-px-sm q-my-auto">
            <q-select
              dense
              outlined
              v-model="formData.class_room"
              :option-label="(item) => `${item.name} ${item.stream || ''}`"
              option-value="id"
              :options="classRooms"
              label="Class"
              emit-value
              map-options
            />
          </div>
          <div class="col q-px-sm q-my-auto">
            <q-select
              dense
              outlined
              v-model="formData.paper__subject"
              :option-label="(item) => `${item.code} ${item.name}`"
              option-value="id"
              :options="subjects"
              label="Subject"
              emit-value
              map-options
            />
          </div>
          <div class="col q-px-sm q-my-auto">
            <q-select
              dense
              outlined
              v-model="formData.teacher"
              :option-label="(item) => `${item.name}`"
              option-value="id"
              :options="teachers"
              label="Teacher"
              emit-value
              map-options
            />
          </div>
          <div class="q-my-auto">
            <q-btn color="primary" type="submit" label="Filter" />
          </div>
        </div>
      </q-form>
      <q-markup-table bordered dense>
        <thead>
          <tr>
            <th class="text-left">Class Room</th>
            <th class="text-left">Paper</th>
            <th class="text-left">Teacher</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alloc in paperAllocations" :key="alloc.id">
            <td class="text-left">
              {{ alloc.class_room_detail.name }}
              {{ alloc.class_room_detail.stream || "" }}
            </td>
            <td class="text-left">
              {{ alloc.paper_detail.subject_name }} /
              {{ alloc.paper_detail.number }}
            </td>
            <td class="text-left">
              <select
                class="js-example-basic-single"
                :name="`alloc${alloc.id}`"
                :id="`alloc${alloc.id}`"
                @change="updatePaperAllocation($event, alloc)"
              >
                <!-- <option :value="0" style="color: grey">Unallocated</option> -->
                <option
                  v-for="teacher in teachers2"
                  :key="teacher.id"
                  :value="teacher.id"
                  :selected="teacher.id == alloc.teacher_detail?.id"
                >
                  {{ teacher.name }}
                </option>
              </select>
              <q-icon
                class="q-px-xs"
                v-if="!alloc.teacher_detail?.name"
                color="red"
                name="fa fa-exclamation-circle"
              />
            </td>
          </tr>
          <tr v-if="!paperAllocations.length">
            <td colspan="4" class="text-grey" align="center">No Allocations</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import CreateActivityModal from "src/components/CreateActivityModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import UpdateTeacherClassRoomPaperModal from "src/components/UpdateTeacherClassRoomPaperModal.vue";
import SetClassPaperTeacher from "./SetClassPaperTeacher.vue";
export default {
  components: {
    CreateActivityModal,
    ConfirmDialog,
    UpdateTeacherClassRoomPaperModal,
    SetClassPaperTeacher,
  },
  name: "ActivitiesPage",
  data() {
    return {
      classRooms: [{ id: null, name: "All" }],
      teachers: [
        { id: null, name: "All" },
        { id: "0", name: "Unallocated" },
      ],
      subjects: [{ id: null, code: "", name: "All" }],
      paperAllocations: [],
      loading: false,
      formData: {
        class_room: null,
        paper__subject: null,
        teacher: null,
      },
    };
  },
  created() {
    this.getClassRooms();
    this.getAllocations();
    this.getTeachers();
    this.getSubjects();
  },
  computed: {
    teachers2() {
      return this.teachers.filter((tr) => Boolean(tr.id));
    },
  },
  methods: {
    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        if (response) this.classRooms = this.classRooms.concat(response.data);
      });
    },
    getTeachers() {
      this.$api.get(`/teachers/`).then((response) => {
        if (response) this.teachers = this.teachers.concat(response.data);
      });
    },

    getSubjects() {
      this.$api.get(`/subjects/`).then((response) => {
        if (response) this.subjects = this.subjects.concat(response.data);
      });
    },

    getAllocations() {
      var queryString = this.$buildURLQuery(this.formData);
      this.$setLoading(this, true);
      this.$api.get(`/paper-allocations/?${queryString}`).then((response) => {
        if (response) {
          this.paperAllocations = response.data;
          this.$setLoading(this, false);
        }
      });
    },

    updatePaperAllocation(event, alloc) {
      const teacher = parseInt(event.target.value) || null;
      const formData = {
        teacher: teacher,
        class_room: alloc.class_room,
        paper: alloc.paper,
      };
      this.$setLoading(this, true);
      this.$api
        .put(`/paper-allocations/${alloc.id}/`, formData)
        .then((response) => {
          if (response) {
            this.paperAllocations[
              this.paperAllocations.findIndex(
                (paperAlloc) => paperAlloc.id == alloc.id
              )
            ] = response.data;
            this.$setLoading(this, false);
          }
        });
    },
  },
};
</script>

<style></style>
