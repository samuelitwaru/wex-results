<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Reports</label>
      </div>

      <div class="q-pb-sm">
        <filter-reports-form @updateReports="reports = $event" />
      </div>

      <q-markup-table flat bordered separator="cell" square dense>
        <thead>
          <tr>
            <th class="text-left">Student</th>
            <th class="text-right">Class Room</th>
            <th class="text-right">Result</th>
            <th class="text-right" colspan="2">Comments</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="report in reports" :key="report.id">
            <!-- <template v-for="report in reports" :key="report.id"> -->
            <tr>
              <td class="text-left" rowspan="2">
                {{ report.student.first_name }} {{ report.student.last_name }}
                {{ report.student.middle_name || "" }}
              </td>
              <td class="text-right" rowspan="2">
                {{ report.student.class_room_detail.name }}
                {{ report.student.class_room_detail.stream || "" }}
              </td>
              <td class="text-right" rowspan="2">18</td>
              <td>HM</td>
              <td></td>
            </tr>
            <!-- </template> -->
            <tr>
              <td
                style="
                  border-left: 1px solid rgba(0, 0, 0, 0.12);
                  padding-left: 0.45rem;
                "
              >
                CT
              </td>
              <td></td>
            </tr>
          </template>
        </tbody>
      </q-markup-table>

      <div class="q-pt-sm">
        <div class="text-h6">Comments</div>
        <q-input outlined v-model="formData.comment" />
        <!-- <div>Variables:</div> -->
        <div class="q-pt-sm" align="right">
          <q-btn color="primary" label="submit" @click="saveComment" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import FilterReportsForm from "src/components/FilterReportsForm.vue";
export default {
  components: { ConfirmDialog, FilterReportsForm },
  name: "ReportsPage",
  data() {
    return {
      reports: [],
      formData: {
        comment: null,
      },
    };
  },
  created() {
    this.getReports();
  },
  methods: {
    getReports() {
      this.$setLoading(this, true);
      this.$api.get("/reports/").then((response) => {
        this.reports = response.data;
        this.$setLoading(this, false);
      });
    },

    saveComment() {},
  },
};
</script>

<style>
</style>
