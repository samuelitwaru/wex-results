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
            <th class="text-left"></th>
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
            <td>
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
  },
  methods: {
    getClassRooms() {
      this.$setLoading(this, true);
      console.log(this.classRoomsUrl);
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
      this.$api.get(`${this.subjectsUrl}`).then((response) => {
        console.log(response.data);
        this.subjects = response.data;
        // this.subjects = response.data.map((subj) => {
        //   subj.activities = [];
        //   this.$api
        //     .get(
        //       `/activities/?subject=${subj.id}&class_room=${this.classRoom.id}`
        //     )
        //     .then((response) => {
        //       subj.activities = response.data;
        //     });
        //   return subj;
        // });
      });
    },

    // getLevelSubjects(levelId) {
    //   this.$setLoading(this, true);
    //   this.$api.get(`/levels/${levelId}/`).then((response) => {
    //     this.level = response.data;
    //     this.subjects = this.level.subjects.map((subj) => {
    //       subj.activities = [];
    //       this.$api
    //         .get(
    //           `/activities/?subject=${subj.id}&class_room=${this.classRoom.id}`
    //         )
    //         .then((response) => {
    //           subj.activities = response.data;
    //         });
    //       return subj;
    //     });
    //     this.$setLoading(this, false);
    //   });
    // },
    showCreateActivityModal(subject) {
      this.subject = subject.id;
      this.$refs.createActivityModal.show = true;
    },
  },
};
</script>

<style>
</style>
