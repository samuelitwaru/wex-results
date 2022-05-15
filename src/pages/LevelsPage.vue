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
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <router-link class="text-white" :to="`/levels/${props.key}`">
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
            <!-- <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteLevel(props.key)"
            /> -->
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
    };
  },
  created() {
    this.getLevels();
  },
  methods: {
    getLevels() {
      this.$api.get("/levels/").then((response) => {
        this.levels = response.data;
        console.log(this.levels);
      });
    },
    // deleteLevel(id) {
    //   this.$refs.confirmDialog
    //     .show({
    //       title: "Hello",
    //       message: `Are you sure you want to delete the class room "${id}"?`,
    //       okButton: "Yes, delete",
    //     })
    //     .then((res) => {
    //       if (res) {
    //         this.$api.delete(`/levels/${id}/`).then((response) => {
    //           if (response.status == 204) {
    //             this.levels = this.levels.filter((level) => level.id != id);
    //           }
    //         });
    //       }
    //     });
    // },
  },
};
</script>

<style>
</style>
