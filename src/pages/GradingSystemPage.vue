<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pa-sm">
          <div class="text-h5">
            {{ grading_system.name }}
          </div>
          <div>{{ grading_system.description }}</div>
        </q-card-section>
      </q-card-section>
      <div class="q-pa-sm" align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          flat
          dense
          @click="deleteGradingSystem(grading_system)"
        />
      </div>

      <q-separator />

      <div>
        <div class="q-pa-sm col-md-6">
          <strong>Grading system</strong>

          <q-form @submit="updateGradingSystem" class="q-gutter-md">
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />

            <q-select
              outlined
              v-model="formData.level_group"
              :option-label="(item) => `${item.full} Level`"
              option-value="id"
              :options="levelGroups"
              label="Level"
              emit-value
              map-options
              required
            />

            <q-checkbox v-model="formData.is_default" label="Make default" />

            <div align="right">
              <q-btn label="update" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
        <div class="q-pa-sm col-md-6">
          <div class="q-py-sm flex justify-between">
            <strong class="q-my-auto">Grades</strong>
            <!-- <create-grade-modal
              :grading_system="grading_system"
              @addGrade="this.grading_system.grades.push($event)"
            /> -->
          </div>

          <q-markup-table flat>
            <tbody>
              <tr style="background: #2ecc71">
                <td class="text-left">D1</td>
                <td class="text-right">
                  <span>{{ grading_system.D2 + 1 }}</span> -
                  <input
                    type="number"
                    min="0"
                    max="100"
                    :onchange="updateGrade"
                    id="D1"
                    name="D1"
                    :onfocus="
                      (event) => {
                        event.target.select();
                      }
                    "
                    :value="grading_system.D1"
                  />
                </td>
              </tr>
              <tr style="background: #58d68d">
                <td class="text-left">D2</td>
                <td class="text-right">
                  <span>{{ grading_system.C3 + 1 }}</span> -
                  <input
                    type="number"
                    min="0"
                    max="100"
                    id="D2"
                    name="D2"
                    :onchange="updateGrade"
                    :onfocus="
                      (event) => {
                        event.target.select();
                      }
                    "
                    :value="grading_system.D2"
                  />
                </td>
              </tr>
              <tr style="background: #82e0aa">
                <td class="text-left">C3</td>
                <td class="text-right">
                  <span>{{ grading_system.C4 + 1 }}</span> -
                  <input
                    type="number"
                    min="0"
                    max="100"
                    id="C3"
                    name="C3"
                    :onchange="updateGrade"
                    :onfocus="
                      (event) => {
                        event.target.select();
                      }
                    "
                    :value="grading_system.C3"
                  />
                </td>
              </tr>
              <tr style="background: #abebc6">
                <td class="text-left">C4</td>
                <td class="text-right">
                  <span>{{ grading_system.C5 + 1 }}</span> -
                  <input
                    type="number"
                    min="0"
                    max="100"
                    id="C4"
                    name="C4"
                    :onchange="updateGrade"
                    :onfocus="
                      (event) => {
                        event.target.select();
                      }
                    "
                    :value="grading_system.C4"
                  />
                </td>
              </tr>
              <tr style="background: #f9e79f">
                <td class="text-left">C5</td>
                <td class="text-right">
                  <span>{{ grading_system.C6 + 1 }}</span> -
                  <input
                    type="number"
                    min="0"
                    max="100"
                    id="C5"
                    name="C5"
                    :onchange="updateGrade"
                    :onfocus="
                      (event) => {
                        event.target.select();
                      }
                    "
                    :value="grading_system.C5"
                  />
                </td>
              </tr>
              <tr style="background: #fad7a0">
                <td class="text-left">C6</td>
                <td class="text-right">
                  <span>{{ grading_system.P7 + 1 }}</span> -
                  <input
                    type="number"
                    min="0"
                    max="100"
                    id="C6"
                    name="C6"
                    :onchange="updateGrade"
                    :onfocus="
                      (event) => {
                        event.target.select();
                      }
                    "
                    :value="grading_system.C6"
                  />
                </td>
              </tr>
              <tr style="background: #f5cba7">
                <td class="text-left">P7</td>
                <td class="text-right">
                  <span>{{ grading_system.P8 + 1 }}</span> -
                  <input
                    type="number"
                    min="0"
                    max="100"
                    id="P7"
                    name="P7"
                    :onchange="updateGrade"
                    :onfocus="
                      (event) => {
                        event.target.select();
                      }
                    "
                    :value="grading_system.P7"
                  />
                </td>
              </tr>
              <tr style="background: #edbb99">
                <td class="text-left">P8</td>
                <td class="text-right">
                  <span>{{ grading_system.F9 + 1 }}</span> -
                  <input
                    type="number"
                    min="0"
                    max="100"
                    :onchange="updateGrade"
                    id="P8"
                    name="P8"
                    :onfocus="
                      (event) => {
                        event.target.select();
                      }
                    "
                    :value="grading_system.P8"
                  />
                </td>
              </tr>
              <tr style="background: #e59866">
                <td class="text-left">F9</td>
                <td class="text-right">
                  <span>0</span> -
                  <input
                    type="number"
                    min="0"
                    max="100"
                    :onchange="updateGrade"
                    id="F9"
                    name="F9"
                    :onfocus="
                      (event) => {
                        event.target.select();
                      }
                    "
                    :value="grading_system.F9"
                  />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import CreateGradeModal from "src/components/CreateGradeModal.vue";
import UpdateGradeModal from "src/components/UpdateGradeModal.vue";
export default {
  components: { ConfirmDialog, CreateGradeModal, UpdateGradeModal },
  data() {
    return {
      grading_system: {},
      grading_systems: [],
      levelGroups: [],

      formData: {
        name: null,
        level_group: null,
        is_default: false,
      },
    };
  },
  created() {
    this.getGradingSystem();
    this.getLevelGroups();
  },
  methods: {
    getGradingSystem() {
      this.$setLoading(this, true);
      this.$api
        .get(`/grading-systems/${this.$route.params.id}/`)
        .then((response) => {
          this.grading_system = response.data;
          console.log(this.grading_system);
          this.formData.name = this.grading_system.name;
          this.formData.level_group = this.grading_system.level_group;
          this.formData.is_default = this.grading_system.is_default;
          this.$setLoading(this, false);
        });
    },

    updateGrade(event) {
      var levels = ["D1", "D2", "C3", "C4", "C5", "C6", "P7", "P8", "F9"];
      var level = event.target.name;
      var levelIndex = levels.findIndex((l) => l == level);
      var newVal = event.target.value;
      console.log(levelIndex);
      let beforeLevel;
      let afterLevel;
      let minVal;
      let maxVal;
      if (levelIndex > 0) {
        beforeLevel = levels[levelIndex + 1];
        afterLevel = levels[levelIndex - 1];
        maxVal = this.grading_system[afterLevel];
        minVal = this.grading_system[beforeLevel] + 1;
        if (levelIndex == 8) {
          minVal = 0;
        }
      } else if (levelIndex == 0) {
        maxVal = 100;
        beforeLevel = levels[levelIndex + 1];
        minVal = this.grading_system[beforeLevel] + 1;
      }

      if (newVal < maxVal && newVal > minVal) {
        this.formData[level] = newVal;
        this.updateGradingSystem();
      } else {
        event.target.value = this.grading_system[level];
      }
    },

    updateGradingSystem() {
      this.$setLoading(this, true);
      this.$api
        .put(`/grading-systems/${this.grading_system.id}/`, this.formData)
        .then((response) => {
          this.grading_system = response.data;
          this.$setLoading(this, false);
        });
    },

    getLevelGroups() {
      this.$api.get(`/level-groups/`).then((response) => {
        this.levelGroups = response.data;
      });
    },

    deleteGradingSystem(gradingSystem) {
      this.$refs.confirmDialog
        .show({
          title: "Hello",
          message: `Are you sure you want to delete the grading system "${gradingSystem.name}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api
              .delete(`/grading-systems/${gradingSystem.id}/`)
              .then((response) => {
                if (response.status == 204) {
                  this.$setLoading(this, false);
                  this.$router.push("/grading-systems");
                }
              });
          }
        });
    },

    deleteGrade(id) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Grade",
          message: `Are you sure you want to delete this grade?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api.delete(`/grades/${id}/`).then((response) => {
              if (response.status == 204) {
                this.grading_system.grades = this.grading_system.grades.filter(
                  (grade) => grade.id != id
                );
              }
            });
          }
        });
    },

    getGradingSystems() {
      this.$api.get(`/grading-systems/`).then((response) => {
        this.classRooms = response.data;
      });
    },

    replaceGrade(grade) {
      var index = this.grading_system.grades.findIndex(
        (item) => item.id == grade.id
      );
      this.grading_system.grades[index] = grade;
    },
  },
};
</script>

<style>
</style>
