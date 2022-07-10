<template>
  <div>
    <confirm-dialog ref="confirmDialog" />

    <div class="flex justify-between q-py-sm">
      <label class="text-h6">Customizations</label>
    </div>
    <q-form
      @submit="createCustomGradingSystem"
      @reset="resetForm"
      class="q-gutter-md"
    >
      <q-markup-table bordered dense>
        <thead>
          <tr>
            <th class="text-left">Class Room</th>
            <th class="text-left">Subject</th>
            <th class="text-left">Grading System</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cgs in customGradingSystems" :key="cgs">
            <td class="text-left">
              {{ cgs.class_room_detail.name }}
              {{ cgs.class_room_detail.stream || "" }}
            </td>
            <td class="text-left">{{ cgs.subject_detail.name }}</td>
            <td class="text-left">{{ cgs.grading_system_detail.name }}</td>
            <td class="text-right">
              <q-btn
                color="negative"
                icon="delete"
                no-caps
                flat
                dense
                @click="deleteCustomGradingSystem(cgs)"
              />
            </td>
          </tr>
          <tr v-if="!customGradingSystems.length">
            <td colspan="4" class="text-grey" align="center">
              No Customizations
            </td>
          </tr>
          <tr>
            <td>
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
            </td>
            <td>
              <q-select
                outlined
                dense
                v-model="formData.subject"
                :option-label="(item) => `${item.name}`"
                option-value="id"
                :options="subjects"
                label="Subject"
                emit-value
                map-options
              />
            </td>
            <td>
              <q-select
                outlined
                dense
                v-model="formData.grading_system"
                :option-label="(item) => `${item.name}`"
                option-value="id"
                :options="gradingSystems"
                label="Grading System"
                emit-value
                map-options
              />
            </td>
            <td align="right">
              <q-btn icon="check" dense flat type="submit" color="primary" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-form>
  </div>
</template>

<script>
import ConfirmDialog from "./ConfirmDialog.vue";
export default {
  components: { ConfirmDialog },
  data() {
    return {
      customGradingSystems: [],
      gradingSystems: [],
      subjects: [],
      classRooms: [],
      formData: {
        class_room: null,
        subject: null,
        grading_system: null,
      },
    };
  },

  created() {
    this.getCustomGradingSystems();
    this.getClassRooms();
    this.getSubjects();
    this.getGradingSystems();
  },

  methods: {
    getCustomGradingSystems() {
      this.$api.get(`/custom-grading-systems/`).then((response) => {
        this.customGradingSystems = response.data;
      });
    },

    createCustomGradingSystem() {
      this.$setLoading(this, true);
      this.$api
        .post(`/custom-grading-systems/`, this.formData)
        .then((response) => {
          if (response) {
            this.customGradingSystems.push(response.data);
            this.$setLoading(this, false);
            this.resetForm();
          }
        });
    },

    deleteCustomGradingSystem(cgs) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Grading System",
          message: `Are you sure you want to delete this customized grading?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api
              .delete(`/custom-grading-systems/${cgs.id}/`)
              .then((response) => {
                if (response.status == 204) {
                  this.$setLoading(this, false);
                  this.getCustomGradingSystems();
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

    getSubjects(args = {}) {
      var queryString = this.$buildURLQuery(args);
      this.$api.get(`/subjects/?${queryString}`).then((response) => {
        this.subjects = response.data;
      });
    },

    getGradingSystems(args = {}) {
      var queryString = this.$buildURLQuery(args);
      this.$api
        .get(`/grading-systems/?${queryString}&is_default=0`)
        .then((response) => {
          this.gradingSystems = response.data;
        });
    },

    resetForm() {
      this.formData.class_room = null;
      this.formData.subject = null;
      this.formData.grading_system = null;
    },

    onChangeClassRoom(value) {
      this.formData.subject = null;
      var classRoom = this.classRooms.find(
        (classRoom) => classRoom.id == value
      );
      var args = {
        level_group: classRoom.level_detail.level_group,
      };
      this.getSubjects(args);
      this.getGradingSystems(args);
    },
  },
};
</script>

<style>
</style>
