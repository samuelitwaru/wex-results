<template>
  <div>
    <q-btn icon="add" color="primary" flat dense @click="modal = true" />
    <q-dialog v-model="modal">
      <q-card style="width: 700px; max-width: 80vw">
        <div class="q-pa-md">
          <strong>Selectable Subjects</strong>
          <q-markup-table flat bordered>
            <tbody>
              <tr v-for="subject in subjects" :key="subject.id">
                <td class="text-left">
                  {{ subject.code }} - {{ subject.name }}
                </td>
                <td class="text-right">
                  <div class="flex justify-end">
                    <input
                      type="checkbox"
                      @change="addOrRemoveSubject"
                      :name="subject.id"
                      :id="`check${subject.id}`"
                      :checked="
                        student.subjects.findIndex(
                          (item) => item.id == subject.id
                        ) != -1
                      "
                    />
                  </div>
                </td>
              </tr>
              <tr v-if="!subjects.length">
                <div class="q-my-lg text-grey" align="center">
                  No selectable subjects found
                </div>
              </tr>
            </tbody>
          </q-markup-table>

          <div class="q-pt-md" align="right">
            <q-btn label="OK" @click="modal = false" color="primary" />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["student", "level"],
  data() {
    return {
      modal: false,
      subjects: [],
    };
  },

  watch: {
    level(newValue, oldValue) {
      console.log("doing");
      this.getLevelGroupSubjects(newValue.level_group);
    },
  },

  created() {
    if (this.student) {
      if (this.level) {
        console.log("doing");

        this.getLevelGroupSubjects(this.level.level_group);
      }
      // this.getLevel();
    }
  },

  methods: {
    // getLevel() {
    //   this.$api
    //     .get(`/levels/${this.student.class_room_detail.level}/`)
    //     .then((response) => {
    //       this.level = response.data;
    //       this.getLevelGroupSubjects(this.level.level_group);
    //     });
    // },
    getLevelGroupSubjects(levelGroupId) {
      this.$api
        .get(`/subjects/?level_group=${levelGroupId}&is_selectable=1`)
        .then((response) => {
          this.subjects = response.data;
        });
    },
    addOrRemoveSubject(event) {
      if (event.target.checked) {
        this.$api
          .put(`/students/${this.$route.params.id}/subjects/add/`, [
            event.target.name,
          ])
          .then((response) => {
            this.$emit("updateStudent", response.data);
          });
      } else {
        // remove
        this.$api
          .put(`/students/${this.$route.params.id}/subjects/remove/`, [
            event.target.name,
          ])
          .then((response) => {
            this.$emit("updateStudent", response.data);
          });
      }
    },
  },
};
</script>

<style>
</style>

