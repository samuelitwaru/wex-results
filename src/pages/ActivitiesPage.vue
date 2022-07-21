<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Activities</label>
        <create-activity-modal
          ref="createActivityModal"
          :classRoom="formData.class_room"
          :subject="subject"
          @addActivity="getSubjects()"
        />
      </div>

      <div class="flex justify-between q-py-sm">
        <div class="q-my-auto">Filter</div>
        <div class="col q-px-sm">
          <q-select
            outlined
            dense
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
            <th class="text-left">Subjects</th>
            <th class="text-left">Activities</th>
            <th class="text-left" v-if="$userHasGroup('teacher')"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in subjects" :key="subject.id">
            <td>{{ subject.code }} {{ subject.name }}</td>
            <td>
              <q-list separato>
                <q-item
                  dense
                  v-for="activity in subject.activities"
                  :key="activity.id"
                >
                  <q-item-section>{{ activity.name }}</q-item-section>
                  <q-item-section>
                    <router-link
                      v-if="$userHasGroup('teacher')"
                      class="text-white"
                      :to="`/activities/${activity.id}`"
                      ><q-btn
                        color="primary"
                        icon-right="edit"
                        no-caps
                        flat
                        dense
                    /></router-link>
                  </q-item-section>
                  <q-item-section>
                    <router-link :to="`/activities/${activity.id}/scores`">
                      <q-btn
                        color="primary"
                        label="SCORES"
                        no-caps
                        flat
                        dense
                      />
                    </router-link>
                  </q-item-section>
                </q-item>
              </q-list>
            </td>
            <td v-if="$userHasGroup('teacher')">
              <q-btn
                color="primary"
                icon="add"
                flat
                dense
                @click="showCreateActivityModal(subject)"
              />
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
export default {
  components: { CreateActivityModal, ConfirmDialog },
  name: "ActivitiesPage",
  data() {
    return {
      classRooms: [],
      classRoom: null,
      subject: null,
      level: null,
      subjects: [],
      loading: false,
      formData: {
        class_room: null,
      },
    };
  },
  created() {
    this.getClassRooms();
  },
  computed: {
    subjectsUrl() {
      if (this.$userHasGroup("teacher")) {
        var teacher_id = this.$getState("user").teacher_id;
        return `teachers/${teacher_id}/allocated-class-rooms/${this.formData.class_room}/subjects/?level_group__name=O`;
      }
      return `/subjects/?level_group__name=O`;
    },

    classRoomsUrl() {
      if (this.$userHasGroup("teacher")) {
        var teacher_id = this.$getState("user").teacher_id;
        return `teachers/${teacher_id}/allocated-class-rooms/?level__level_group__name=O`;
      }
      return `/class-rooms/?level__level_group__name=O`;
    },

    isAcitityOwner() {
      var teacher_id = this.$getState("user")?.teacher_id;
      return teacher_id;
    },
  },
  methods: {
    getClassRooms() {
      this.$setLoading(this, true);
      this.$api.get(`${this.classRoomsUrl}`).then((response) => {
        this.classRooms = response.data;
        this.$setLoading(this, false);
        if (this.classRooms.length) {
          this.formData.class_room = this.classRooms[0].id;
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
      this.$api.get(`${this.subjectsUrl}`).then((response) => {
        this.subjects = response.data;
        this.getSubjectReports();
        this.$setLoading(this, false);
      });
    },

    getSubjectReports() {
      this.subjects.forEach((subject) => {
        this.$api
          .get(
            `/activities/?subject=${subject.id}&class_room=${this.classRoom.id}`
          )
          .then((reponse) => {
            subject.activities = reponse.data;
          });
      });
    },

    showCreateActivityModal(subject) {
      this.subject = subject.id;
      this.$refs.createActivityModal.show = true;
    },
  },
};
</script>

<style></style>
