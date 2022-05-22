<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Levels</label>
        <create-level-modal @addLevel="levels.push($event)" />
      </div>

      <q-table
        :rows="levels"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[50]"
        :loading="loading"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary">
            <q-spinner-ios size="50px" color="primary" />
          </q-inner-loading>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <router-link class="text-white" :to="`/levels/${props.key}`">
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import CreateLevelModal from "src/components/CreateLevelModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { CreateLevelModal, ConfirmDialog },
  name: "LevelsPage",
  data() {
    return {
      columns: [
        { name: "rank", label: "Rank", field: "rank", align: "left" },
        { name: "name", label: "Name", field: "name", align: "left" },
        { name: "action", label: "Action", field: "action", align: "left" },
      ],
      levels: [],
      loading: false,
    };
  },
  created() {
    this.getLevels();
  },
  methods: {
    getLevels() {
      this.loading = true;
      this.$api.get("/levels/").then((response) => {
        this.levels = response.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
</style>
