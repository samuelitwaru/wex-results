<template>
  <div class="q-px-sm q-pb-sm">
    <q-item clickable @click="medium = true">
      <q-item-section>* Add from existing</q-item-section>
    </q-item>
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Add from existing</div>
        </q-card-section>

        <q-card-section class="q-pa-none">
          <div v-if="levelGroups.length">
            <q-markup-table flat>
              <tbody>
                <template
                  v-for="levelGroup in levelGroups"
                  :key="levelGroup.id"
                >
                  <tr v-if="levelGroup.subjects">
                    <td class="text-left">
                      {{ levelGroup.full }}
                    </td>
                    <td class="text-left">
                      <q-list>
                        <q-item
                          v-for="subj in levelGroup.subjects"
                          :key="subj.code"
                        >
                          <q-item-section>
                            <q-item-label
                              >{{ subj.code }} {{ subj.name }}</q-item-label
                            >
                            <q-item-label caption lines="2"
                              >{{ subj.no_papers }} Paper(s)</q-item-label
                            >
                          </q-item-section>
                          <input type="checkbox" @click="createSubject(subj)" />
                        </q-item>
                        <q-item v-if="levelGroup.subjects.length == 0">
                          <q-item-section>
                            <q-item-label caption lines="2"
                              >No subjects</q-item-label
                            >
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </td>
                  </tr>
                </template>
              </tbody>
            </q-markup-table>
          </div>
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
  props: ["subjects"],
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
      levelGroups: [],
      systemSubjects: [],
    };
  },
  created() {
    this.getSystemSubjects();
  },
  methods: {
    createSubject(subject) {
      this.$setLoading(this, true);
      var levelGroup = this.findLevelGroupByName(subject.level_group);
      subject.level_group = levelGroup.id;
      this.$api.post(`/subjects/`, subject).then((response) => {
        this.$emit("addSubject", response.data);
        // this.medium = false;
        this.$setLoading(this, false);
        this.getSystemSubjects();
      });
    },

    getSystemSubjects() {
      this.$api.get(`/subjects/system/unadded/`).then((response) => {
        this.systemSubjects = response.data;
        this.getLevelGroups();
      });
    },

    getLevelGroups() {
      this.$api.get(`/level-groups/`).then((response) => {
        this.levelGroups = response.data;
        this.levelGroups = this.levelGroups.map((lg) => {
          lg.subjects = this.systemSubjects.filter(
            (subj) => lg.name === subj.level_group
          );
          return lg;
        });
      });
    },

    findLevelGroupByName(name) {
      return this.levelGroups.find((lg) => lg.name == name);
    },
  },
};
</script>

<style>
</style>

