<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Levels</label>
      </div>

      <div v-if="levelGroups.length">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Stage</th>
              <th class="text-right">Levels</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="levelGroup in levelGroups" :key="levelGroup.id">
              <tr>
                <td :rowspan="levelGroup.levels.length" class="text-left">
                  {{ levelGroup.full }}
                </td>
                <td
                  style="
                    border-left: 1px solid rgba(0, 0, 0, 0.12);
                    padding-left: 0.45rem;
                  "
                  class="flex justify-between"
                >
                  {{ levelGroup.levels[0].name }}
                  <router-link
                    class="text-white"
                    :to="`/levels/${levelGroup.levels[0].id}`"
                  >
                    <q-btn
                      color="primary"
                      icon-right="edit"
                      no-caps
                      flat
                      dense
                    />
                  </router-link>
                </td>
              </tr>

              <tr v-for="level in levelGroup.levels.slice(1)" :key="level.id">
                <td
                  style="
                    border-left: 1px solid rgba(0, 0, 0, 0.12);
                    padding-left: 0.45rem;
                  "
                  class="flex justify-between"
                >
                  {{ level.name }}
                  <router-link class="text-white" :to="`/levels/${level.id}`">
                    <q-btn
                      color="primary"
                      icon-right="edit"
                      no-caps
                      flat
                      dense
                    />
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>
        </q-markup-table>
      </div>

      <div v-else align="center">
        <p class="q-my-lg text-grey">No period was found</p>
        <setup-levels-modal />
      </div>
    </div>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import SetupLevelsModal from "src/components/SetupLevelsModal.vue";
export default {
  components: { ConfirmDialog, SetupLevelsModal },
  name: "LevelsPage",
  data() {
    return {
      levelGroups: [],
      loading: false,
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
        console.log(this.levelGroups);
        this.$setLoading(this, false);
      });
    },
  },
};
</script>

<style>
</style>
