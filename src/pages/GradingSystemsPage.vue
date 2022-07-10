<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Grading Systems</label>
        <create-grading-system-modal @addGradingSystem="getLevelGroups()" />
      </div>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Level</th>
            <th class="text-left">Grading system</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="levelGroup in levelGroups" :key="levelGroup.id">
            <td class="text-left">{{ levelGroup.full }}</td>
            <td class="text-left">
              <q-list>
                <q-item v-for="gs in levelGroup.grading_systems" :key="gs.id">
                  <q-item-section>
                    {{ gs.name }}
                  </q-item-section>
                  <q-item-section>
                    <span v-if="gs.is_default">(default)</span>
                  </q-item-section>

                  <q-item-section>
                    <router-link
                      class="text-white"
                      :to="`/grading-systems/${gs.id}`"
                    >
                      <q-btn
                        color="primary"
                        icon-right="edit"
                        no-caps
                        flat
                        dense
                      />
                    </router-link>
                  </q-item-section>
                </q-item>
              </q-list>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <custom-grading-systems />
    </div>
  </q-page>
</template>

<script>
import CreateGradingSystemModal from "src/components/CreateGradingSystemModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import CustomGradingSystems from "src/components/CustomGradingSystems.vue";
export default {
  components: { CreateGradingSystemModal, ConfirmDialog, CustomGradingSystems },
  name: "GradingSystemsPage",
  data() {
    return {
      columns: [
        { name: "name", label: "Name", field: "name", align: "left" },
        { name: "action", label: "Action", field: "action", align: "left" },
      ],
      grading_systems: [],
      levelGroups: [],
      loading: false,
    };
  },
  created() {
    this.getLevelGroups();
    this.getGradingSystems();
  },
  methods: {
    getLevelGroups() {
      this.$api.get(`/level-groups/`).then((response) => {
        this.levelGroups = response.data;
      });
    },
    getGradingSystems() {
      this.$setLoading(this, true);
      this.$api.get("/grading-systems/").then((response) => {
        this.grading_systems = response.data;
        this.$setLoading(this, false);
      });
    },
  },
};
</script>

<style>
</style>
