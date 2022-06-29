<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Subject Allocations</label>
        <set-class-paper-teacher
          ref="setClassPaperTeacherModal"
          :allocation="allocation"
          @updateAllocation="getAllocations()"
        />
      </div>

      <div class="flex justify-between q-py-sm">
        <div class="q-my-auto">Filter</div>
        <div class="col q-px-sm">
          <q-select
            outlined
            v-model="formData.class_room"
            :option-label="(item) => `${item.name} ${item.stream || ''}`"
            option-value="id"
            :options="classRooms"
            label="Class"
            emit-value
            map-options
            @update:model-value="onChangeClassRoom"
          />
        </div>
      </div>

      <q-markup-table flat separator="cell" bordered dense>
        <thead>
          <tr>
            <th class="text-left">Subject</th>
            <th class="text-left">Allocations</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in subjects" :key="subject.id">
            <td>{{ subject.code }} {{ subject.name }}</td>
            <td>
              <q-list separato>
                <q-item dense v-for="paper in subject.papers" :key="paper.id">
                  <q-item-section>{{ paper.description }}</q-item-section>
                  <q-item-section>
                    <span v-if="getAllocation(paper)" class="text-bold">{{
                      getAllocation(paper).teacher_detail.name
                    }}</span>
                    <span v-else class="text-grey">Unallocted</span>
                  </q-item-section>
                  <q-item-section>
                    <q-btn
                      color="primary"
                      icon="edit"
                      flat
                      dense
                      @click="showSetClassPaperTeacherModal(paper)"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </td>
          </tr>
          <tr v-if="subjects.length == 0">
            <td style="height: 60px" class="text-grey text-center" colspan="3">
              No subjects allocated
            </td>
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
      classRooms: [],
      classRoom: null,
      paper: null,
      subject: null,
      subjects: [],
      allocations: [],
      allocation: null,
      teacher: null,
      loading: false,
      formData: {
        class_room: null,
      },
    };
  },
  created() {
    this.getClassRooms();
    this.getAllocations();
  },
  methods: {
    getClassRooms() {
      this.$setLoading(this, true);
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = response.data;
        this.$setLoading(this, false);
        if (this.classRooms.length) {
          this.classRoom = this.classRooms[0];
          this.formData.class_room = this.classRoom.id;
          this.onChangeClassRoom(this.formData.class_room);
        }
      });
    },
    onChangeClassRoom(value) {
      this.classRoom = this.classRooms.find((cr) => cr.id == value);
      this.getSubjects();
    },

    getSubjects() {
      this.$setLoading(this, true);
      this.$api
        .get(
          `/subjects/?level_group=${this.classRoom.level_detail.level_group}`
        )
        .then((response) => {
          this.subjects = response.data;
          this.$setLoading(this, false);
        });
    },

    showCreateActivityModal(subject) {
      this.subject = subject.id;
      this.$refs.showCreateActivityModal.show = true;
    },

    showSetClassPaperTeacherModal(paper) {
      this.allocation = this.getAllocation(paper);
      if (this.allocation == null) {
        this.allocation = {
          paper_detail: paper,
          paper: paper.id,
          class_room_detail: this.classRoom,
          class_room: this.classRoom.id,
        };
      }
      this.$refs.setClassPaperTeacherModal.show = true;
    },

    getAllocations() {
      this.$api.get(`/teacher-class-room-papers/`).then((response) => {
        this.allocations = response.data;
      });
    },

    getAllocation(paper) {
      var allocation = this.allocations.find((alloc) => {
        return alloc.class_room == this.classRoom.id && alloc.paper == paper.id;
      });
      if (allocation) {
        return allocation;
      }
      return null;
    },
  },
};
</script>

<style>
</style>
