<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Grading Systems</label>
        <create-grading-system-modal
          @addGradingSystem="grading_systems.push($event)"
        />
      </div>

      <q-table
        :rows="grading_systems"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[50]"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <router-link
              class="text-white"
              :to="`/grading-systems/${props.key}`"
            >
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
            <!-- <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteGradingSystem(props.key)"
            /> -->
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import CreateGradingSystemModal from "src/components/CreateGradingSystemModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { CreateGradingSystemModal, ConfirmDialog },
  name: "GradingSystemsPage",
  data() {
    return {
      columns: [
        { name: "name", label: "Name", field: "name", align: "left" },
        {
          name: "description",
          label: "Description",
          field: "description",
          align: "left",
        },
        { name: "action", label: "Action", field: "action", align: "left" },
      ],
      grading_systems: [],
    };
  },
  created() {
    this.getGradingSystems();
  },
  methods: {
    getGradingSystems() {
      this.$api.get("/grading-systems/").then((response) => {
        this.grading_systems = response.data;
        console.log(this.grading_systems);
      });
    },
    // deleteGradingSystem(id) {
    //   this.$refs.confirmDialog
    //     .show({
    //       title: "Hello",
    //       message: `Are you sure you want to delete the class room "${id}"?`,
    //       okButton: "Yes, delete",
    //     })
    //     .then((res) => {
    //       if (res) {
    //         this.$api.delete(`/grading-systems/${id}/`).then((response) => {
    //           if (response.status == 204) {
    //             this.grading_systems = this.grading_systems.filter(
    //               (grading_system) => grading_system.id != id
    //             );
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
