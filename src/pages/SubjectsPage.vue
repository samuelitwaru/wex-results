<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Subjects</label>
        <q-btn color="primary" icon="add" label="Add Subject">
          <q-menu
            fit
            transition-show="scale"
            transition-hide="scale"
            v-model="showing"
          >
            <q-list style="min-width: 200px">
              <create-subject-modal
                @addSubject="
                  levelGroups
                    .find((lg) => lg.id == $event.level_group)
                    .subjects.push($event)
                "
              />
              <setup-subjects-modal
                :subjects="subjects"
                @addSubject="
                  levelGroups
                    .find((lg) => lg.id == $event.level_group)
                    .subjects.push($event)
                "
              />
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <q-markup-table flat>
        <tbody>
          <template v-for="levelGroup in levelGroups" :key="levelGroup.id">
            <tr v-if="levelGroup.subjects">
              <td class="text-left">
                {{ levelGroup.full }}
              </td>
              <td class="text-left">
                <q-list>
                  <q-item v-for="subj in levelGroup.subjects" :key="subj.code">
                    <q-item-section>
                      <q-item-label
                        >{{ subj.code }} {{ subj.name }}</q-item-label
                      >
                      <q-item-label caption lines="2"
                        >{{ subj.no_papers }} Paper(s)</q-item-label
                      >
                    </q-item-section>
                    <router-link
                      class="text-white"
                      :to="`/subjects/${subj.id}`"
                    >
                      <q-btn
                        color="primary"
                        icon-right="edit"
                        no-caps
                        flat
                        dense
                      />
                    </router-link>
                  </q-item>
                  <q-item v-if="levelGroup.subjects.length == 0">
                    <q-item-section>
                      <q-item-label caption lines="2">No subjects</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </td>
            </tr>
          </template>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import CreateSubjectModal from "src/components/CreateSubjectModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import SetupSubjectsModal from "src/components/SetupSubjectsModal.vue";
export default {
  components: { CreateSubjectModal, ConfirmDialog, SetupSubjectsModal },
  name: "SubjectsPage",
  data() {
    return {
      levelGroups: [],
      subjects: [],
      loading: false,
      showing: false,
    };
  },
  created() {
    this.getLevelGroups();
  },
  methods: {
    getLevelGroups() {
      this.$setLoading(this, true);
      this.$api.get(`/level-groups/`).then((response) => {
        this.levelGroups = response.data;
        this.$setLoading(this, false);
      });
    },
  },
};
</script>

<style>
</style>
