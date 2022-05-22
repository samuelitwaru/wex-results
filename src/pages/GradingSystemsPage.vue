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
        :loading="loading"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary">
            <q-spinner-ios size="50px" color="primary" />
          </q-inner-loading>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <router-link
              class="text-white"
              :to="`/grading-systems/${props.key}`"
            >
              <q-btn color="primary" icon-right="edit" no-caps flat dense />
            </router-link>
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
      loading: false,
    };
  },
  created() {
    this.getGradingSystems();
  },
  methods: {
    getGradingSystems() {
      this.loading = true;
      this.$api.get("/grading-systems/").then((response) => {
        this.grading_systems = response.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
</style>
